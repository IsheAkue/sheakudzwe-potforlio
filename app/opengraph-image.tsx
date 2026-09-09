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
          alignItems: "center",
          justifyContent: "center",
          background: "#f7efe3",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 200,
            fontWeight: 700,
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#a8501c" }}>S</span>
          <span style={{ color: "#221d18" }}>Z</span>
          <span style={{ color: "#a8501c" }}>M</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 600,
            color: "#221d18",
            marginTop: 20,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#a8501c",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 14,
          }}
        >
          Web Developer — Based in Zimbabwe
        </div>
      </div>
    ),
    { ...size }
  );
}
