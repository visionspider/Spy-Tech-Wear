import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { items } from "../../items";

import Item from "./Item";

const ListingGrid = () => {
  const [itemList, setItemList] = useState([]);
  const [pages, setPages] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    setItemList(items);
    // fetch("/api/get-items")
    //   .then((res) => res.json())
    //   .then((items) => setItemList(items.data));
  }, []);
  const pageSum = Math.round(itemList.length / 25);
  if (pages.length !== pageSum) {
    setPages([...Array(pageSum)]);
  }

  return (
    <>
      <p>
        You are viewing 25 out of {itemList.length}. Page {page} out of{" "}
        {pages.length} pages.
      </p>
      <Flexbox>
        {itemList.map((item, index) => {
          if (index + 1 <= page * 25 && index + 1 >= (page - 1) * 25) {
            return <Item key={item._id} item={item} type={"multi"} />;
          }
        })}
      </Flexbox>
      {pages.length > 0 && (
        <div>
          {pages.map((p, index) => {
            console.log("index = ", index, " and page = ", page);
            const pageNum = index + 1;
            console.log(typeof page);
            return +pageNum === +page ? (
              <CurrPage key={pageNum}>{pageNum}</CurrPage>
            ) : (
              <NavLink to={`/armoury/${pageNum}`} key={pageNum}>
                {pageNum}
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CurrPage = styled.span`
  color: white;
`;
export default ListingGrid;
