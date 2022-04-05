import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { GiSecretDoor as Secret } from "react-icons/gi";
const Index = () => {
  const [msg, setMsg] = useState(true);
  return (
    <Container>
      <Wrapper>
        <Button to="/armoury/1">
          <Mission
            onMouseLeave={() => setMsg(true)}
            onMouseEnter={() => {
              setMsg(false);
            }}
          >
            {msg ? (
              <>
                TOP <Secret /> SECRET
              </>
            ) : (
              <>
                WELCOME AGENT, YOUR<br></br>
                FIRST MISSION: <Underline>CLICK ME</Underline>
              </>
            )}
          </Mission>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  height: 100vh;
  background-image: url("https://www.transparenttextures.com/patterns/3px-tile.png");
  background-repeat: space;
  background-color: black;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Button = styled(NavLink)`
  text-decoration: none;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 15px;
  border: solid 1px inherit;
  perspective: 600px;
  perspective-origin: center top;
`;
const Underline = styled.span`
  text-decoration: underline overline line-through;
`;
const Mission = styled.h1`
  transform: rotateX(45deg);
  color: #fff;
  letter-spacing: 2px;
  animation: mission 1.5s ease-in-out infinite alternate;
  text-align: center;
  font-size: 45px;

  @keyframes mission {
    from {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #ff1177,
        0 0 80px #ff1177, 0 0 90px #ff1177, 0 0 100px #ff1177, 0 0 150px #ff1177;
    }

    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff1177,
        0 0 35px #ff1177, 0 0 40px #ff1177, 0 0 50px #ff1177, 0 0 75px #ff1177;
    }
  }
  &:active {
  }
`;

const BigRedButton = styled.img`
  z-index: 100;
  position: absolute;
  width: 50%;
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
