import { RiNumber1 } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = ({ item, type }) => {
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
  return type === "multi" ? (
    <Wrapper>
      <Link to={`/tech-ware/${_id}`}>
        <ItemPic src={imageSrc} />
        <p>{name}</p>
      </Link>
    </Wrapper>
  ) : type === "single" ? (
    <Wrapper>
      <img src={imageSrc} />
      <p>{name}</p>
      <p>{price}</p>
      <p>{numInStock}</p>
    </Wrapper>
  ) : type === "cart" ? (
    <>
      <p>{name}</p>
      <p>{price}</p>
      <p>{`x ${cartAmount}`}</p>
    </>
  ) : (
    <>
      <Loading
        src={"https://media2.giphy.com/media/3kXazx72G3NbfCjemP/200.gif"}
      />
    </>
  );
};

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
export default Item;
