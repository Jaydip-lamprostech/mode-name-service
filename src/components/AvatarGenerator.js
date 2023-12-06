// src/AvatarGenerator.js
import React from "react";

function AvatarGenerator({ name, width, height }) {
  const generateColorsFromName = (name) => {
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Limit to 360 degrees
    return [`hsl(${hue}, 70%, 70%)`, `hsl(${(hue + 60) % 360}, 70%, 70%)`];
  };

  const [color1, color2] = generateColorsFromName(name);

  return (
    <div className="avatar-container">
      <div
        className="avatar"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          width: width ? width : "30px",
          height: height ? height : "30px",
          borderRadius: "100px",
        }}
      ></div>
    </div>
  );
}

export default AvatarGenerator;
