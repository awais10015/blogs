import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
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
          <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <div
              style={{
                width: 2,
                height: 4,
                background: "#D2F8DC",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                width: 2,
                height: 5,
                background: "#D2F8DC",
                borderRadius: 1,
              }}
            />
            <div
              style={{
                width: 2,
                height: 4,
                background: "#D2F8DC",
                borderRadius: 1,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 14,
                height: 11,
                background: "#D2F8DC",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                width: 4,
                height: 7,
                border: "2px solid #D2F8DC",
                borderLeft: "none",
                borderRadius: "0 6px 6px 0",
                marginLeft: -1,
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
