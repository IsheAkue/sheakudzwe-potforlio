import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7efe3",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a8501c",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Web Developer — Based in Zimbabwe
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 54,
            lineHeight: 1.2,
            color: "#221d18",
            fontWeight: 600,
          }}
        >
          <span>I build websites</span>
          <span style={{ color: "#6b6255" }}>and design digital experiences</span>
          <span style={{ color: "#a8501c", fontStyle: "italic" }}>
            that businesses run and rely on.
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8a8072" }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
