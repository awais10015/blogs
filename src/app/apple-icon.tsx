import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E4F21",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 8,
                height: 22,
                background: "#D2F8DC",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 8,
                height: 28,
                background: "#D2F8DC",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 8,
                height: 22,
                background: "#D2F8DC",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 78,
                height: 62,
                background: "#D2F8DC",
                borderRadius: 14,
              }}
            />
            <div
              style={{
                width: 22,
                height: 38,
                border: "8px solid #D2F8DC",
                borderLeft: "none",
                borderRadius: "0 20px 20px 0",
                marginLeft: -4,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
