import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { ItemsContext } from "../MyItemsContext";
import HomePageItem from "./HomePageItem";
import PullDownList from "./PullDownList";
import Loading from "../../Loading";
import { keyframes } from "styled-components";
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
    pageNumber,
    setPageNumber,
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
        <PullDownList valueArray={companyName} name="name" />
        <PullDownList valueArray={categoryName} name="category" />
        <PullDownList valueArray={BodyLocationName} name="body_location" />
        <PageNumberList>
          <form>
            <select
              style={{ cursor: "pointer" }}
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
        <Button style={{ cursor: "pointer" }} onClick={handleResetAll}>
          Show all
        </Button>
      </Navigation>
      {renderArray.length ? (
        <Flexbox>
          {renderArray
            .slice((pageNumber - 1) * 25, pageNumber * 25)
            .map((item) => {
              return <HomePageItem key={item._id} item={item} />;
            })}
        </Flexbox>
      ) : (
        <NoMatchedItem>
          <img alt="top secret" src={"/NomatchedItems.png"} />

          <p>Come back later, we may declassify it soon !</p>
        </NoMatchedItem>
      )}
    </Container>
  ) : (
    <Loading />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* background-image: url(/ecommerce.jpg); */
  background: lightgrey;
  min-height: 100vh;
`;
const Navigation = styled.div`
  width: 100vw;
  height: 40px;

  background: red;
  display: grid;
  grid-template-columns: 25vw 20vw 20vw 10vw 10vw;
  vertical-align: center;
`;
const Flexbox = styled.div`
  padding: 0 6vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* background: royalblue; */
`;
const PageNumberList = styled.div`
  height: 40px;

  form {
    font-size: 24px;
    height: 40px;
    text-align: center;
  }
  select {
    font-weight: 800;
    height: 40px;
    text-align: center;
    background: transparent;
    color: gold;

    font-size: 20px;
  }
  &:hover {
    select {
      color: goldenrod;
    }
  }
`;
const Button = styled.button`
  color: royalblue;
  background: lightblue;
  height: 40px;
  border-radius: 8px;
  font-size: 24px;
  &:hover {
    color: red;
    box-shadow: 0 0 10px;
  }
`;
const textAnimation = keyframes`
from {
  background-position: 0
  }
  to {
    background-position: 700px;
  }`;
const NoMatchedItem = styled.div`
  position: relative;

  p {
    color: black;
    background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
    background-position: 0;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    top: 100px;
    left: 20vw;
    font-weight: 900;
    font-size: 48px;
    animation: ${textAnimation} 3s infinite forwards;
  }
  img {
    position: absolute;
    width: 100vw;
  }
`;
export default ListingGrid;
