import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";

const ListingGrid = () => {
  const [itemList, setItemList] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    fetch(`/api/get-25items/${page}`)
      .then((res) => res.json())
      .then((items) => setItemList(items.data));
    fetch("/api/getPagination")
      .then((res) => res.json())
      .then((items) => {
        console.log("res = ", items.data);
        setPages(items.data);
      });
  }, [page]);

  // console.log("number of pages = ", pages[0]?.numberOfPage);
  if (pages !== undefined) {
    if (pages[0]?.numberOfPage !== pageArr.length && pages.length !== 0) {
      setPageArr([...Array(+pages[0]?.numberOfPage)]);
    }

    // console.log("page arr = ", pageArr);
    return (
      <>
        <p>
          You are viewing {pages[0]?.itemsPerPage} out of{" "}
          {pages[0]?.numberOfProducts}. Page {page} out of{" "}
          {pages[0]?.numberOfPage} pages.
        </p>
        <Flexbox>
          {itemList?.map((item, index) => {
            return <Item key={item._id} item={item} type={"multi"} />;
          })}
        </Flexbox>
        {pageArr.length > 0 && (
          <div>
            {pageArr?.map((p, index) => {
              const pageNum = index + 1;
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
  } else {
    return <>{setPages(pages)}</>;
  }
};

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CurrPage = styled.span`
  color: white;
`;
export default ListingGrid;
