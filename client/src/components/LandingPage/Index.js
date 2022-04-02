import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    // GIFLENS-https://media2.giphy.com/media/Mz6oZpw81uKQg/200.gif
    <Container>
      <Wrapper>
        <>
          <Button to="/armoury/1">
            <>
              <Mission>Do you accept this Mission?🔴 👀 🕵🏾‍♀️ </Mission>
            </>
            <Frogs
              src={"https://media0.giphy.com/media/cjiJHyD9Xwd8d6Bb7l/200.gif"}
            />
            <BigRedButton
              src={"https://media1.giphy.com/media/5522aGFLNVRnddYMxJ/200.gif"}
            />
          </Button>
        </>
      </Wrapper>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  margin: auto;
  padding: 5%;
  background-color: black;
`;

const Wrapper = styled.div`
  background-image: url("https://media2.giphy.com/media/Mz6oZpw81uKQg/200.gif");
  height: 50%;
  background-repeat: space;
  padding: 50%;
  width: 40%;
  height: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

const Button = styled(NavLink)`
  text-decoration: none;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 15px;
  padding: 50%;
`;

const Mission = styled.h1`
  color: red;
  text-align: center;
  font-size: 45px;
  background-color: black;
`;

const BigRedButton = styled.img`
  z-index: 100;
  position: absolute;
  width: 30%;
  stroke: greenyellow;
  stroke-width: 5px;
  align-self: center;
  :hover {
    display: none;
  }
`;

const Frogs = styled.img`
  display: none;
  z-index: 300;
  width: 50%;
  :hover {
    display: block;
  }
`;
