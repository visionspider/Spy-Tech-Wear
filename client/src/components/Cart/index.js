import { useContext, useState } from "react";
import {
  AiOutlineClose as Close,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";

import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import Item from "../ListingGrid/Item";

//disapear and msg about limit reached
//form needs ID and qty

const Cart = () => {
  const [noStock, setNoStock] = useState("");
  const { shoppingCart, setShoppingCart, updateCart, handleCart } =
    useContext(ShoppingCartContext);

  const filteredCart = handleCart();
  console.log(shoppingCart.length);
  if (shoppingCart.length !== 0) {
    return (
      <>
        <Wrapper>
          {filteredCart.map((item) => {
            console.log(item._id);
            return (
              <ItemDiv>
                <Item key={item._id} item={item} type="cart" />

                <UnstyledBtn
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
                  className={noStock}
                  onClick={(ev) =>
                    setNoStock(
                      updateCart(ev.currentTarget.value, "plus")
                        ? ""
                        : "disappear"
                    )
                  }
                >
                  <Plus />
                </UnstyledBtn>
              </ItemDiv>
            );
          })}

          <Checkout>Checkout</Checkout>
        </Wrapper>
      </>
    );
  } else {
    return <Wrapper>Cart is empty...</Wrapper>;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const ItemDiv = styled.div`
  display: flex;
  border-radius: 10px;
  margin-top: 1%;
  width: 20%;
  padding: 1%;
  -webkit-box-shadow: 0px 0px 10px 0px #c3c3c3;
  box-shadow: 0px 0px 10px 0px #c3c3c3;
`;
const Checkout = styled.button`
  cursor: pointer;
  color: white;
  background-color: red;
  border: solid 1px red;
  border-radius: 8px;
  padding: 0.5%;
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
export default Cart;
