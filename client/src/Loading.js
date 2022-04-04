import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Loadingimg
      src={"https://media2.giphy.com/media/3kXazx72G3NbfCjemP/200.gif"}
    />
  );
};

const Loadingimg = styled.img`
  margin: auto;
  width: 100%;
`;

export default Loading;
