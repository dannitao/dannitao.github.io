import React from "react";
import "./Watched.css";

const WatchedPage: React.FC = () => {
  return (
    <div className="watched-container">
      <iframe
        src="/watched.html"
        title="Watched Archive"
        className="watched-iframe"
      />
    </div>
  );
};

export default WatchedPage;
