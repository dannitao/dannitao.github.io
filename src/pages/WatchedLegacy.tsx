import { FC } from "react";

const WatchedLegacy: FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/watched.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
        }}
        title="Watched List (Legacy)"
      />
    </div>
  );
};

export default WatchedLegacy;
