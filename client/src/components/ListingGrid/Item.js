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
        <img src={imageSrc} />
        <p>{name}</p>
      </Link>
    </Wrapper>
  ) : type === "single" ? (
    <div>
      <img src={imageSrc} />
      <p>{name}</p>
      <p>{price}</p>
      <p>{}</p>
    </div>
  ) : type === "cart" ? (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <p>{`x ${cartAmount}`}</p>
    </div>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  width: 10%;
`;

export default Item;
