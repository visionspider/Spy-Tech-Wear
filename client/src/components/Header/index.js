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
`;
const StyledNavLink = styled(NavLink)`
  color: red;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: red;
`;

const Cart = styled(ShoppingCart)`
  font-size: 2rem;
`;
const Circle = styled.span`
  text-align: center;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: white;
  background-color: red;
  &.disappear {
    visibility: hidden;
  }
`;
export default Header;
