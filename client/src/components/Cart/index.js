import { useContext, useState } from "react";
import {
  AiOutlineClose as Close,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import Item from "../ListingGrid/Item";
import CartItem from "./CartItem";

//disapear and msg about limit reached
//form needs ID and qty
//the cart is displaying the order of items based on position in array sometimes they are switching between each other
const Cart = ({ type }) => {
  const [noStock, setNoStock] = useState("");
  const { shoppingCart, setShoppingCart, updateCart, handleCart, handleTotal } =
    useContext(ShoppingCartContext);

  const filteredCart = handleCart();
  console.log(shoppingCart.length);
  if (shoppingCart.length !== 0) {
    if (type === "hover-cart") {
      return (
        <>
          <Wrapper>
            {filteredCart.map((item) => {
              console.log(item._id);
              return (
                <HoverItemDiv>
                  <CartItem key={item._id} item={item} type="hover-cart" />

                  <UnstyledBtn
                    value={item._id}
                    onClick={(ev) =>
                      setNoStock(
                        updateCart(ev.currentTarget.value, "minus")
                          ? ""
                          : "disappear"
                      )
                    }
                  >
                    <Minus />
                  </UnstyledBtn>
                  <UnstyledBtn
                    value={item._id}
                    className={
                      item.numInStock ===
                      shoppingCart?.filter(
                        (cartItem) => cartItem._id === item._id
                      ).length
                        ? "disappear"
                        : ""
                    }
                    onClick={(ev) => updateCart(ev.currentTarget.value, "plus")}
                  >
                    <Plus />
                  </UnstyledBtn>
                </HoverItemDiv>
              );
            })}
            <Wrapper>
              <p>Total: $ {handleTotal()}</p>
            </Wrapper>
            <Checkout to={"/classified"}>Checkout</Checkout>
          </Wrapper>
        </>
      );
    } else {
      return (
        <>
          <Wrapper>
            {filteredCart.map((item) => {
              console.log(item._id);
              return (
                <ItemDiv>
                  <Item key={item._id} item={item} type="cart" />

                  <UnstyledBtn
                    value={item._id}
                    onClick={(ev) =>
                      setNoStock(
                        updateCart(ev.currentTarget.value, "minus")
                          ? ""
                          : "disappear"
                      )
                    }
                  >
                    <Minus />
                  </UnstyledBtn>
                  <UnstyledBtn
                    value={item._id}
                    className={
                      item.numInStock ===
                      shoppingCart?.filter(
                        (cartItem) => cartItem._id === item._id
                      ).length
                        ? "disappear"
                        : ""
                    }
                    onClick={(ev) => updateCart(ev.currentTarget.value, "plus")}
                  >
                    <Plus />
                  </UnstyledBtn>
                </ItemDiv>
              );
            })}
            <Wrapper>
              <p>Total: $ {handleTotal()}</p>
            </Wrapper>
            <Checkout to={"/classified"}>Checkout</Checkout>
          </Wrapper>
        </>
      );
    }
  } else {
    return <Wrapper>Cart is empty...</Wrapper>;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const ItemDiv = styled.div`
  display: flex;
  border-radius: 10px;
  margin-top: 1%;
  width: 30%;
  padding: 1%;
  -webkit-box-shadow: 0px 0px 10px 0px #c3c3c3;
  box-shadow: 0px 0px 10px 0px #c3c3c3;

  &:hover {
    background-color: #ddd;
  }
`;
const Checkout = styled(NavLink)`
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
const Plus = styled(AiOutlinePlus)``;

const Minus = styled(AiOutlineMinus)``;

const UnstyledBtn = styled.button`
  display: block;
  margin: 1%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  z-index: 1;
  &:active {
    color: inherit;
  }

  &.disappear {
    visibility: hidden;
  }
`;

//CART HOVER

const HoverItemDiv = styled.div`
  display: flex;
  border-radius: 10px;
  margin-top: 5%;
  width: 90%;
  padding: 1%;
  -webkit-box-shadow: 0px 0px 10px 0px #c3c3c3;
  box-shadow: 0px 0px 10px 0px #c3c3c3;

  &:hover {
    background-color: #ddd;
  }
`;
export default Cart;
