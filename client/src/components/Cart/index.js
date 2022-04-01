import { useContext } from "react";
import { AiOutlineClose as Close } from "react-icons/ai";
import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import Item from "../ListingGrid/Item";

const Cart = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  return (
    <>
      <Wrapper>
        {shoppingCart?.map((item) => (
          <Item key={item._id} item={item} type="single" />
        ))}
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
export default Cart;
