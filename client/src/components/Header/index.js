import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { SiSpyderide as LockSpy } from "react-icons/si";
import { RiSuitcaseFill as ShoppingCart } from "react-icons/ri";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { ItemsContext } from "../MyItemsContext";
import Cart from "../Cart";
import ResetHomePage from "../ListingGrid/ResetHomePage";
const Header = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const { setRenderArray, setStatus, setPageNumber, setPageNumberArray } =
    useContext(ItemsContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleSearch = (ev) => {
    ev.preventDefault();
    if (search.trim() !== "") {
      setStatus("loading");
      fetch(`/api/search-items?keywords=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setSearch("");
          setStatus("idle");
          history.push("/armoury/1");
          if (data.status === 200) {
            setRenderArray(data.data);
            ResetHomePage(data.data, setPageNumber, setPageNumberArray);
          } else {
            setRenderArray([]);
          }
        })
        .catch((error) => {
          setStatus("idle");
          console.log(error.message);
        });
    } else {
      setSearch("");
    }
  };

  return (
    <Wrapper>
      <StyledNavLink to={`/armoury/1`}>
        <LockSpy style={{ fontSize: "2rem" }} />
        <Title>SPYTECHWEAR</Title>
      </StyledNavLink>
      {/* {search onSubmit or onChange} */}
      <Form onSubmit={(ev) => handleSearch(ev)}>
        <Input
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          placeholder="search here"
        ></Input>
        <Search type="submit">Search</Search>
      </Form>
      <CartDiv className={"dropdown"}>
        <StyledNavLink className={"dropbtn"} to={`/agent-handler/cart`}>
          <Circle className={shoppingCart.length !== 0 ? "" : "disappear"}>
            {shoppingCart.length}
          </Circle>
          <CartLogo />
        </StyledNavLink>
        <CartContentDiv className={"dropdown-content"}>
          <Cart type={"hover-cart"} />
        </CartContentDiv>
      </CartDiv>
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
  text-decoration: none;
  color: red;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    h1 {
      border-bottom: solid 5px red;
    }
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
  outline: solid 1px grey;
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

const CartLogo = styled(ShoppingCart)`
  width: 100%;
  font-size: 10vh;
`;
const Circle = styled.span`
  text-decoration: none;
  text-align: center;
  display: inline-block;
  font-size: 1.5rem;
  padding: 5%;
  height: 100%;
  width: 50%;
  border-radius: 50%;
  color: white;
  background-color: red;
  &.disappear {
    visibility: hidden;
  }
`;

const CartDiv = styled.div`
  margin-right: 1%;
  position: relative;
  display: inline-block;

  &.dropdown:hover {
    .dropdown-content {
      display: block;
    }
  }

  &.dropdown:hover {
    .dropbtn {
      background-color: RGBA(22, 233, 227, 0.3);
      border-bottom: solid 5px red;
    }
  }
`;

const CartContentDiv = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: RGBA(241, 241, 241, 0.9);
  border-radius: 4px;
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;

  &.dropdown-content {
    p {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
  }
`;
export default Header;
