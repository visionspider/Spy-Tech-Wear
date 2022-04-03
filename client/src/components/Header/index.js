import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RiSuitcaseFill as ShoppingCart } from "react-icons/ri";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
const Header = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [search, setSearch] = useState("");
  return (
    <Wrapper>
      <StyledNavLink to={`/armoury/1`}>
        <Title>SpyTechWear</Title>
      </StyledNavLink>
      {/* {search onSubmit or onChange} */}
      <Form onSubmit={(ev) => ev}>
        <Input
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          placeholder="search here"
        ></Input>
        <Search value={"submit"}>Search</Search>
      </Form>
      <StyledNavLink to={`/agent-handler/cart`}>
        <Circle className={shoppingCart.length !== 0 ? "" : "disappear"}>
          {shoppingCart.length}
        </Circle>
        <Cart />
      </StyledNavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid 1px red;
  display: flex;
  justify-content: space-between;
  height: 10vh;
`;
const StyledNavLink = styled(NavLink)`
  /* width: 1%; */
  color: red;
  display: flex;
  align-items: center;

  justify-content: flex-end;
  &:hover {
    /* color: orange; */
    opacity: 0.5;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.8%;
  border-radius: 4px;

  &:focus {
    -webkit-box-shadow: 0px 0px 10px 0px orange;
    box-shadow: 0px 0px 10px 0px orange;
    border: none;
    outline: none;
  }
`;
const Search = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: red;
  border: solid 1px red;
  border-bottom: 6px solid orange;
  border-radius: 4px;
  padding: 0.8%;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.1s;
  &:hover {
    margin-top: 2px;
    border-bottom-width: 3px;
    cursor: pointer;
  }
  &:active {
    margin-top: 5px;
    border-bottom-width: 0px;
  }
`;

const Title = styled.h1`
  color: red;
`;

const Cart = styled(ShoppingCart)`
  font-size: 2rem;
  /* &:hover {
    font-size: 2.5rem;
  } */
`;
const Circle = styled.span`
  text-decoration: none;
  text-align: center;
  display: inline-block;
  /* font-size: 100%; */
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: white;
  background-color: red;
  &.disappear {
    visibility: hidden;
  }

  /* &:hover {
    height: 30px;
    width: 30px;
    font-size: 1.5rem;
  } */
`;
export default Header;
