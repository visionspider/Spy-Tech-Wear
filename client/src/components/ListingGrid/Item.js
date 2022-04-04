import { RiNumber1 } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "./SingleItem";

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
      <SingleItemPic src={imageSrc} />

      <h1>{name}</h1>
      <PriceisRight>
        <strong>
          <p>{price}</p>{" "}
        </strong>
        <Stock>
          <strong>{numInStock}</strong> in Stock
        </Stock>
      </PriceisRight>
    </Wrapper>
  ) : type === "cart" ? (
    <>
      <p>{name}</p>
      <p>{price}</p>
      <p>{`x ${cartAmount}`}</p>
    </>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
  padding: 15px;
  gap: 2.5px;
  margin-top: 1.5%;
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 30%;
  }

  to {
    margin-left: 0%;
    width: 80%;
  }
`;

const ItemPic = styled.img`
  width: 100%;
  justify-self: center;
`;

const SingleItemPic = styled.img`
  min-width: 50%;
  margin: auto;
  padding-bottom: 5px;
  justify-self: center;
`;

const PriceisRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Stock = styled.p`
  color: olive;
  font-weight: 2;
  font-size: 36px;
`;
export default Item;
