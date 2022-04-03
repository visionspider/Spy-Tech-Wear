import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePageItem = ({ item }) => {
  const {
    name,
    price,
    body_location,
    category,
    _id,
    imageSrc,
    numInStock,
    companyId,
  } = item;
  return (
    <Wrapper>
      <Link to={`/tech-ware/${_id}`}>
        <img src={imageSrc} />
      </Link>
      <div>
        <p>Category:{category}</p>
        <p>Body_location:{body_location}</p>
        <p>{name}</p>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 10px;
  width: 15vw;

  img {
    width: 13vw;
    height: 13vw;
    border-radius: 8px;
    background: transparent;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px;
    }
  }
  div {
    &:hover {
      color: red;
      transform: scale(1.1);
    }
  }
  p {
    font-size: 20px;
  }
`;

export default HomePageItem;
