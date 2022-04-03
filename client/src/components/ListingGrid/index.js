import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { ItemsContext } from "../MyItemsContext";
import HomePageItem from "./HomePageItem";
import PullDownList from "./PullDownList";
const ListingGrid = () => {
  const {
    itemsArray,
    status,
    companyArray,
    pageInfo,
    renderArray,
    setRenderArray,
    pageNumberArray,
    setPageNumberArray,
  } = useContext(ItemsContext);
  const { page } = useParams();
  const categoryName = [
    "Fitness",
    "Medical",
    "Lifestyle",
    "Entertainment",
    "Industrial",
    "Pets and Animals",
    "Gaming",
  ];
  const BodyLocationName = [
    "Wrist",
    "Arms",
    "Head",
    "Waist",
    "Chest",
    "Hands",
    "Neck",
    "Feet",
    "Torso",
  ];
  let companyName = [];
  const [pageNumber, setPageNumber] = useState(1);
  const handlePageNumberSelect = (ev) => {
    const num = ev.target.value;
    setPageNumber(num);
  };
  const handleResetAll = () => {
    const element = document.getElementsByClassName("PullDown");
    for (let i = 0; i < element.length; i++) {
      element[i].selectedIndex = 0;
    }

    let arr = [];
    let pageNumber = Math.floor(itemsArray.length / 25) + 1;

    for (let i = 1; i <= pageNumber; i++) {
      arr.push(i);
    }
    setPageNumberArray([...arr]);
    setRenderArray([...itemsArray]);
    setPageNumber(1);
  };
  if (status !== "loading") {
    companyName = companyArray.map((item) => {
      return item.name;
    });
  }
  return status !== "loading" ? (
    <Container>
      <Navigation>
        <PullDownList
          valueArray={companyName}
          name="name"
          setPageNumber={setPageNumber}
        />
        <PullDownList
          valueArray={categoryName}
          name="category"
          setPageNumber={setPageNumber}
        />
        <PullDownList
          valueArray={BodyLocationName}
          name="body_location"
          setPageNumber={setPageNumber}
        />
        <PageNumberList>
          <form>
            <select
              id="selectNumber"
              className="PullDown"
              onChange={handlePageNumberSelect}
            >
              <option value="">Pages</option>
              {pageNumberArray.map((num) => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </form>
        </PageNumberList>
        <Button onClick={handleResetAll}>Show all</Button>
      </Navigation>

      <Flexbox>
        {renderArray
          .slice((pageNumber - 1) * 25, pageNumber * 25)
          .map((item) => {
            return <HomePageItem key={item._id} item={item} />;
          })}
      </Flexbox>
    </Container>
  ) : (
    <h1>loading</h1>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Navigation = styled.div`
  width: 100vw;
  height: 40px;
  background: gray;
  display: grid;
  grid-template-columns: 20vw 15vw 10vw 10vw 10vw;
  background: royalblue;
`;
const Flexbox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background: royalblue;
`;
const PageNumberList = styled.div`
  height: 30px;
  form {
    height: 30px;
    text-align: center;
  }
  select {
    height: 25px;
    text-align: center;
    background: royalblue;
    color: goldenrod;
    font-size: 20px;
  }
`;
const Button = styled.button`
  color: royalblue;
  background: lightblue;
  height: 30px;
  border-radius: 8px;
  &:hover {
    color: red;
    box-shadow: 0 0 10px;
  }
`;
export default ListingGrid;
