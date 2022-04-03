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
      <p>Category:{category}</p>
      <p>Body_location:{body_location}</p>
      <p>{name}</p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 18vw;
  color: goldenrod;
  img {
    width: 18vw;
    height: 18vw;
    border-radius: 8px;
    background: transparent;
    &:hover {
      transform: scale(1.05);
    }
  }
  p {
    text-decoration: none;
  }
`;

export default HomePageItem;
