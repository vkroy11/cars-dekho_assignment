import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          borderRadius: 36,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          padding: "0 28px",
        }}
      >
        <div
          style={{
            width: 124,
            height: 16,
            background: "#ffffff",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            width: 88,
            height: 16,
            background: "#ffffff",
            borderRadius: 8,
            opacity: 0.9,
          }}
        />
        <div
          style={{
            width: 44,
            height: 16,
            background: "#ffffff",
            borderRadius: 8,
            opacity: 0.75,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
