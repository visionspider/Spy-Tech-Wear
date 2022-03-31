import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <StyledNavLink to={`/armoury/1`}>
        <Title>SpyTechWear</Title>
      </StyledNavLink>
      <StyledNavLink to={`/agent-handler`}>Cart</StyledNavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: solid 1px red;
`;
const StyledNavLink = styled(NavLink)`
  color: red;
`;

const Title = styled.h1`
  color: red;
`;
export default Header;
