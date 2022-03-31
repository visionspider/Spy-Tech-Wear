import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    // GIFLENS-https://media2.giphy.com/media/Mz6oZpw81uKQg/200.gif
    <Container>
      <Wrapper>
        <>
          <Button to="/armoury/:page">
            <>
            
              <Mission>Mission Accepted 👀?</Mission>
            </>
            <img
              src={"https://media0.giphy.com/media/cjiJHyD9Xwd8d6Bb7l/200.gif"}
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
`;

const Wrapper = styled.div`
  background-image: url("https://media2.giphy.com/media/Mz6oZpw81uKQg/200.gif");
  height: 50%;
  background-repeat: space;
  padding: 10%;
  width: 40%;
  height: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(NavLink)`
  text-decoration: none;
  background-color: #CBD8DF;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Mission = styled.h1`
  color: #9798ac;
  text-align: center;
  font-size: 45px;
`;
