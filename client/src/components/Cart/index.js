import { useContext } from "react";
import {
  AiOutlineClose as Close,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";

import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import Item from "../ListingGrid/Item";

const Cart = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  const handleCart = () => {
    //adding itemCount as a key value pair i.e cartAmount : num,
    shoppingCart.forEach((item, i, arr) => {
      let itemCount = arr.filter((item1) => item1._id === item._id);

      item.cartAmount = itemCount.length;
    });
    //Keeping only 1 id per unique product and putting it back into array
    const productIds = Array.from(
      new Set(shoppingCart.map((item) => item._id))
    );

    return productIds.map((productId) => {
      return shoppingCart.find((item) => item?._id === productId);
    });
  };
  const updateCart = (id, value) => {
    if (value === "minus") {
      let pos = shoppingCart.findIndex((item) => item._id === +id);
      let copyCart = [...shoppingCart];
      copyCart.splice(pos, 1);
      setShoppingCart(() => [...copyCart]);
    } else if (
      value === "plus" &&
      shoppingCart.some((item) => +item.cartAmount < +item.numInStock)
    ) {
      const addItem = shoppingCart.find((item) => item._id === +id);

      setShoppingCart((shoppingCart) => [...shoppingCart, addItem]);
    }
  };
  const filteredCart = handleCart();
  return (
    <>
      <Wrapper>
        {filteredCart.map((item) => {
          console.log(item._id);
          return (
            <>
              <Item key={item._id} item={item} type="cart" />
              <UnstyledBtn
                value={item._id}
                onClick={(ev) => updateCart(ev.currentTarget.value, "minus")}
              >
                <Minus />
              </UnstyledBtn>
              <UnstyledBtn
                value={item._id}
                onClick={(ev) => updateCart(ev.currentTarget.value, "plus")}
              >
                <Plus />
              </UnstyledBtn>
            </>
          );
        })}
      </Wrapper>
      <Checkout>Checkout</Checkout>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const Checkout = styled.button`
  cursor: pointer;
  background-color: red;
  border: solid 1px red;
  border-radius: 8px;
  padding: 2px;
`;
const Plus = styled(AiOutlinePlus)``;

const Minus = styled(AiOutlineMinus)``;

const UnstyledBtn = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  z-index: 1;
  &:active {
    color: inherit;
  }
`;
export default Cart;
