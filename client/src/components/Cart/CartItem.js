import { RiNumber1 } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CartItem = ({ item, type }) => {
  const {
    name,
    price,
    body_location,
    category,
    _id,
    imageSrc,
    numInStock,
    companyId,
    cartAmount = 0,
  } = item;
  //   console.log(item);
  return type === "hover-cart" ? (
    <HoverCart>
      <p>{name}</p>
      <p>{price}</p>
      <p>{`x ${cartAmount}`}</p>
    </HoverCart>
  ) : (
    <>
      <Loading
        src={"https://media2.giphy.com/media/3kXazx72G3NbfCjemP/200.gif"}
      />
    </>
  );
};

const HoverCart = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: auto;
  gap: 20px;
`;
const Wrapper = styled.div`
  width: 30%;
  text-align: center;
  justify-items: center;
  margin: auto;
`;

const Loading = styled.img`
  margin: auto;
`;

const ItemPic = styled.img`
  width: 100%;
  justify-self: center;
`;
export default CartItem;
