import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-moview.png"));
  const logoSrc = `data:image/png;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1c",
          borderRadius: 36,
        }}
      >
        <img
          src={logoSrc}
          alt=""
          style={{
            width: "76%",
            height: "76%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
