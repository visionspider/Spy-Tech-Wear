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
      <form onSubmit={(ev) => ev}>
        <input
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          placeholder="search here"
        ></input>
        <button>Search</button>
      </form>
      <StyledNavLink to={`/agent-handler/cart`}>
        <CartSpan>
          <Circle className={shoppingCart.length !== 0 ? "" : "disappear"}>
            {shoppingCart.length}
          </Circle>
          <Cart />
        </CartSpan>
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
  width: 10%;
  color: red;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.h1`
  color: red;
`;

const CartSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &:hover {
    color: orange;
    opacity: 0.5;
  }
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
  font-size: 100%;
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
