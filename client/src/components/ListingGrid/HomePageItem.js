import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePageItem = ({ item }) => {
  const { name, _id, imageSrc } = item;
  return (
    <Wrapper>
      <MyLink to={`/tech-ware/${_id}`}>
        <img src={imageSrc} />
        <div>
          {/* <p>Category: {category}</p>
          <p>Body Location: {body_location}</p> */}
          <p>{name}</p>
        </div>
      </MyLink>
    </Wrapper>
  );
};
const MyLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 15vw;
  background: white;
  text-align: center;
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px;
    p {
      color: red;
    }
  }
  img {
    width: 11vw;
    height: 11vw;
    border-radius: 8px;
    background: transparent;
    padding-top: 5px;
  }

  p {
    font-size: 16px;
    color: black;
    padding-bottom: 5px;
  }
`;

export default HomePageItem;
