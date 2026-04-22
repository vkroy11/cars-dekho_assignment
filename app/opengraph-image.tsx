import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Car Decision Assistant — From 40 options to 3 clear choices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1000px 600px at 50% -10%, #bae6fd 0%, transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#0a0a0a",
        }}
      >
        {/* Top: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <div
              style={{ height: 5, background: "#ffffff", borderRadius: 3, width: "100%" }}
            />
            <div
              style={{
                height: 5,
                background: "#ffffff",
                borderRadius: 3,
                width: "65%",
                opacity: 0.9,
              }}
            />
            <div
              style={{
                height: 5,
                background: "#ffffff",
                borderRadius: 3,
                width: "30%",
                opacity: 0.75,
              }}
            />
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            Car Decision Assistant
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            From 40 overwhelming options to
            <span style={{ color: "#0ea5e9", marginLeft: 18 }}> 3 clear picks.</span>
          </div>
          <div style={{ fontSize: 30, color: "#475569", maxWidth: 900 }}>
            Weighted, explainable car recommendations — tailored to your budget, fuel
            preference, and priorities. Free, no sign-up.
          </div>
        </div>

        {/* Bottom: metadata chips */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {["40 curated cars", "2025/26 India", "Free · No sign-up"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                color: "#0f172a",
                fontWeight: 500,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
