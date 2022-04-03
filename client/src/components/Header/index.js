import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { RiSuitcaseFill as ShoppingCart } from "react-icons/ri";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import { ItemsContext } from "../MyItemsContext";

import Cart from "../Cart";
const Header = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const { setRenderArray, setStatus } = useContext(ItemsContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleSearch = (ev) => {
    ev.preventDefault();
    if (search.trim() !== "") {
      setStatus("loading");
      fetch(`/api/search-items?keywords=${search}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);

          setSearch("");
          if (data.data.length !== 0) {
            setRenderArray(data.data);
            //fix the loadingpage header
            //pass down data.data to resetAfterSearch
            //show loading while waiting for data to show on the page
            //use status from Item to set to "loading"
            // set status to "idle" when done
            setStatus("idle");
            history.push(`/armoury/1`);
          }
          //add reset here resetAfterSearch
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setSearch("");
    }
  };

  return (
    <Wrapper>
      <StyledNavLink to={`/armoury/1`}>
        <img src="client/src/img/logo.png" />
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
  min-width: 200px;
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
