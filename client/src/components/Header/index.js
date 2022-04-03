import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RiSuitcaseFill as ShoppingCart } from "react-icons/ri";
const Header = () => {
  return (
    <Wrapper>
      <StyledNavLink to={`/armoury/1`}>
        <Title>SpyTechWear</Title>
      </StyledNavLink>
      {/* {search onSubmit or onChange} */}
      <form onSubmit={(ev) => ev}>
        <input value={"variable"} placeholder="search here"></input>
        <button>Search</button>
      </form>
      <StyledNavLink to={`/agent-handler/cart`}>
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
`;

const Title = styled.h1`
  color: red;
`;

const Cart = styled(ShoppingCart)`
  font-size: 2rem;
`;
export default Header;
