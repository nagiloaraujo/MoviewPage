import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
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
        }}
      >
        <img
          src={logoSrc}
          alt=""
          style={{
            width: "86%",
            height: "86%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
