import React, { useState } from "react";
import styled from "styled-components";

export default function ShowButtonHover() {
  const [style, setStyle] = useState({ display: "none" });

  return (
    <div>
      <h2>Hidden Button in the box. Move mouse in the box</h2>
      <BigRedButton
        src={"https://media1.giphy.com/media/5522aGFLNVRnddYMxJ/200.gif"}
        style={{
          border: "1px solid gray",
          width: 300,
          height: 300,
          padding: 10,
          margin: 100,
        }}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      />
    </div>
  );
}

const BigRedButton = styled.button`
  z-index: 100;
  position: absolute;
  width: 20%;
`;
