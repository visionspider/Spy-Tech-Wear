import { useContext } from "react";
import { AiOutlineClose as Close } from "react-icons/ai";
import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import Item from "../ListingGrid/Item";

const Cart = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  //adding itemCount as a key value pair i.e cartAmount : num,
  shoppingCart?.map((item, i, arr) => {
    let itemCount = arr.filter((item1) => item1._id === item._id);
    item.cartAmount = itemCount.length;
  });
  //Keeping only 1 id per unique product and putting it back into array
  const productIds = Array.from(new Set(shoppingCart.map((item) => item._id)));

  const filteredCart = productIds?.map((productId) => {
    return shoppingCart?.find((item) => item._id === productId);
  });

  return (
    <>
      <Wrapper>
        {filteredCart?.map((item) => {
          return <Item key={item._id} item={item} type="cart" />;
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
export default Cart;
