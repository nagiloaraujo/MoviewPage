import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const outputDir = path.join(publicDir, "processed");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg", ".avif"]);

const standardBackground = { r: 235, g: 241, b: 244, alpha: 1 };
const minCanvasWidth = 1200;
const minCanvasHeight = 600;
const cardAspectRatio = minCanvasWidth / minCanvasHeight;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "processed") return [];
        return walk(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isNearBlackPixel(data, index, alpha) {
  if (alpha <= 12) return false;

  const r = data[index];
  const g = data[index + 1];
  const b = data[index + 2];
  return r <= 40 && g <= 40 && b <= 40;
}

function detectDarkBorderBounds(data, width, height, channels) {
  const rowIsMostlyDark = (y) => {
    let darkCount = 0;
    let currentRun = 0;
    let longestRun = 0;

    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * channels;
      const alpha = data[index + 3];
      if (isNearBlackPixel(data, index, alpha)) {
        darkCount += 1;
        currentRun += 1;
        if (currentRun > longestRun) longestRun = currentRun;
      } else {
        currentRun = 0;
      }
    }

    return darkCount / width >= 0.72 && longestRun / width >= 0.58;
  };

  const columnIsMostlyDark = (x) => {
    let darkCount = 0;
    let currentRun = 0;
    let longestRun = 0;

    for (let y = 0; y < height; y += 1) {
      const index = (y * width + x) * channels;
      const alpha = data[index + 3];
      if (isNearBlackPixel(data, index, alpha)) {
        darkCount += 1;
        currentRun += 1;
        if (currentRun > longestRun) longestRun = currentRun;
      } else {
        currentRun = 0;
      }
    }

    return darkCount / height >= 0.72 && longestRun / height >= 0.58;
  };

  let top = 0;
  while (top < height - 1 && rowIsMostlyDark(top)) top += 1;

  let bottom = height - 1;
  while (bottom > top && rowIsMostlyDark(bottom)) bottom -= 1;

  let left = 0;
  while (left < width - 1 && columnIsMostlyDark(left)) left += 1;

  let right = width - 1;
  while (right > left && columnIsMostlyDark(right)) right -= 1;

  return {
    left,
    top,
    width: Math.max(1, right - left + 1),
    height: Math.max(1, bottom - top + 1),
  };
}

function detectOpaqueBounds(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * channels + 3];
      if (alpha <= 12) continue;

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX === -1 || maxY === -1) {
    return { left: 0, top: 0, width, height, coverage: 1 };
  }

  const boundsWidth = maxX - minX + 1;
  const boundsHeight = maxY - minY + 1;
  const coverage = (boundsWidth * boundsHeight) / (width * height);

  return {
    left: minX,
    top: minY,
    width: boundsWidth,
    height: boundsHeight,
    coverage,
  };
}

function expandBounds(bounds, width, height) {
  const padding = Math.round(Math.max(bounds.width, bounds.height) * 0.12);
  const left = clamp(bounds.left - padding, 0, width - 1);
  const top = clamp(bounds.top - padding, 0, height - 1);
  const right = clamp(bounds.left + bounds.width + padding, 1, width);
  const bottom = clamp(bounds.top + bounds.height + padding, 1, height);

  return {
    left,
    top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  };
}

function findHorizontalDarkBand(data, width, height, channels, fromTop = true) {
  const maxScanRows = Math.max(80, Math.round(height * 0.25));
  const minimumBandHeight = Math.max(24, Math.round(height * 0.03));

  const rowIsDarkBand = (y) => {
    let darkCount = 0;
    let currentRun = 0;
    let longestRun = 0;

    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * channels;
      const alpha = data[index + 3];
      if (isNearBlackPixel(data, index, alpha)) {
        darkCount += 1;
        currentRun += 1;
        if (currentRun > longestRun) longestRun = currentRun;
      } else {
        currentRun = 0;
      }
    }

    return darkCount / width >= 0.72 && longestRun / width >= 0.58;
  };

  const indices = fromTop
    ? Array.from({ length: maxScanRows }, (_, index) => index)
    : Array.from({ length: maxScanRows }, (_, index) => height - 1 - index);

  let runStart = -1;
  let runEnd = -1;

  for (const y of indices) {
    if (rowIsDarkBand(y)) {
      if (runStart === -1) runStart = y;
      runEnd = y;
    } else if (runStart !== -1) {
      const bandHeight = Math.abs(runEnd - runStart) + 1;
      if (bandHeight >= minimumBandHeight) {
        return {
          start: Math.min(runStart, runEnd),
          end: Math.max(runStart, runEnd),
        };
      }

      runStart = -1;
      runEnd = -1;
    }
  }

  if (runStart !== -1) {
    const bandHeight = Math.abs(runEnd - runStart) + 1;
    if (bandHeight >= minimumBandHeight) {
      return {
        start: Math.min(runStart, runEnd),
        end: Math.max(runStart, runEnd),
      };
    }
  }

  return null;
}

async function processImage(filePath) {
  // Trim uniform dark borders first to remove black letterbox bars from source assets.
  const initiallyTrimmedBuffer = await sharp(filePath)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 1 }, threshold: 18 })
    .png()
    .toBuffer();

  const initiallyTrimmedRaw = await sharp(initiallyTrimmedBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const darkBorderBounds = detectDarkBorderBounds(
    initiallyTrimmedRaw.data,
    initiallyTrimmedRaw.info.width,
    initiallyTrimmedRaw.info.height,
    initiallyTrimmedRaw.info.channels,
  );
  const preparedBuffer = await sharp(initiallyTrimmedBuffer)
    .extract(darkBorderBounds)
    .png()
    .toBuffer();

  const metadata = await sharp(preparedBuffer).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  if (!width || !height) {
    throw new Error(`Nao foi possivel ler as dimensoes de ${filePath}`);
  }

  const raw = await sharp(preparedBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bounds = detectOpaqueBounds(raw.data, raw.info.width, raw.info.height, raw.info.channels);
  const expandedBounds = expandBounds(bounds, width, height);
  const outputWidth = Math.max(
    minCanvasWidth,
    expandedBounds.width,
    Math.round(expandedBounds.height * cardAspectRatio),
  );
  const outputHeight = Math.max(minCanvasHeight, Math.round(outputWidth / cardAspectRatio));
  const contentWidth = Math.round(outputWidth * 0.96);
  const contentHeight = Math.round(outputHeight * 0.9);

  let contentBuffer;

  // Transparent logos keep the detected focal area centered; opaque images use attention crop.
  if (bounds.coverage < 0.92) {
    contentBuffer = await sharp(preparedBuffer)
      .ensureAlpha()
      .extract(expandedBounds)
      .normalise()
      .modulate({ brightness: 1.05, saturation: 1.03 })
      .sharpen({ sigma: 0.5 })
      .resize({
        width: contentWidth,
        height: contentHeight,
        fit: "contain",
        withoutEnlargement: false,
      })
      .png()
      .toBuffer();
  } else {
    contentBuffer = await sharp(preparedBuffer)
      .ensureAlpha()
      .normalise()
      .modulate({ brightness: 1.04, saturation: 1.02 })
      .sharpen({ sigma: 0.45 })
      .resize({
        width: contentWidth,
        height: contentHeight,
        fit: "contain",
      })
      .png()
      .toBuffer();
  }

  const relativePath = path.relative(publicDir, filePath);
  const outputPath = path.join(outputDir, relativePath).replace(/\.(png|jpe?g|avif)$/i, ".png");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const compositedBuffer = await sharp({
    create: {
      width: outputWidth,
      height: outputHeight,
      channels: 4,
      background: standardBackground,
    },
  })
    .composite([{ input: contentBuffer, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const compositedRaw = await sharp(compositedBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const topBand = findHorizontalDarkBand(
    compositedRaw.data,
    compositedRaw.info.width,
    compositedRaw.info.height,
    compositedRaw.info.channels,
    true,
  );
  const bottomBand = findHorizontalDarkBand(
    compositedRaw.data,
    compositedRaw.info.width,
    compositedRaw.info.height,
    compositedRaw.info.channels,
    false,
  );
  const cleanedTop = topBand ? topBand.end + 1 : 0;
  const cleanedBottom = bottomBand ? bottomBand.start - 1 : compositedRaw.info.height - 1;
  const cleanedBounds = {
    left: 0,
    top: clamp(cleanedTop, 0, compositedRaw.info.height - 1),
    width: compositedRaw.info.width,
    height: Math.max(1, cleanedBottom - cleanedTop + 1),
  };

  await sharp(compositedBuffer)
    .extract(cleanedBounds)
    .resize({
      width: outputWidth,
      height: outputHeight,
      fit: "contain",
      background: standardBackground,
      withoutEnlargement: false,
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return {
    input: relativePath.replace(/\\/g, "/"),
    output: path.relative(publicDir, outputPath).replace(/\\/g, "/"),
    outputSize: `${outputWidth}x${outputHeight}`,
  };
}

async function main() {
  const allFiles = await walk(publicDir);
  const imageFiles = allFiles.filter((filePath) =>
    supportedExtensions.has(path.extname(filePath).toLowerCase()),
  );

  if (!imageFiles.length) {
    console.log("Nenhuma imagem suportada encontrada em public/.");
    return;
  }

  const results = [];
  for (const filePath of imageFiles) {
    const result = await processImage(filePath);
    results.push(result);
  }

  console.log(`Processadas ${results.length} imagens.`);
  for (const result of results) {
    console.log(`- ${result.input} -> ${result.output} (${result.outputSize}px)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
