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
      <h3> Category: {category} </h3>
      <h3> Body Location: {body_location}</h3>

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
    <CartWrapper>
      <ItemPic src={imageSrc} />
      <p>{name}</p>
      <p>{price}</p>
      <p>x&nbsp;{cartAmount}</p>
    </CartWrapper>
  ) : (
    <></>
  );
};

const CartWrapper = styled.div`
  display: flex;
  width: 40%;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
  padding: 15px;
  gap: 5px;
  margin-top: 1.5%;
`;

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
  animation: slidein 1s ease-in-out;
}

@keyframes slidein {
  0% {
    margin-left: 100%;
    width: 30%;
  }

  50% {
    margin-left: 0%;
    width: 80%;
  }
  100% {
    margin-left: 30%;
  }
`;

const ItemPic = styled.img`
  width: 100%;
  justify-self: center;
  border-radius: 4px;
`;

const SingleItemPic = styled.img`
  min-width: 50%;
  margin: auto;
  padding-bottom: 5px;
  justify-self: center;
  border-radius: 4px;
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
