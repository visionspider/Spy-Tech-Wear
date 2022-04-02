import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { ItemsContext } from "../MyItemsContext";
import Item from "./Item";

const ListingGrid = () => {
  const { itemsArray, status, pageInfo } = useContext(ItemsContext);
  console.log(status);
  console.log(itemsArray);
  console.log(pageInfo);

  const [pageArr, setPageArr] = useState([]);
  //turn pagination into context
  //add a context for fetch of all items
  // get api search items name, body_location and category
  // conditionally render the pagination at the bottom so user can't click multiple times
  const { page } = useParams();
  //import item context

  // useEffect(() => {
  //   fetch(`/api/get-25items/${page}`)
  //     .then((res) => res.json())
  //     .then((items) => setItemList(items.data));

  //   fetch("/api/getPagination")
  //     .then((res) => res.json())
  //     .then((items) => {
  //       console.log("res = ", items.data);
  //       setpageInfo(items.data);
  //     });
  // }, [page]);

  // console.log("number of pageInfo = ", pageInfo[0]?.numberOfPage);
  if (pageInfo !== undefined) {
    if (pageInfo[0]?.numberOfPage !== pageArr.length && pageInfo.length !== 0) {
      setPageArr([...Array(+pageInfo[0]?.numberOfPage)]);
    }

    if (status !== "loading") {
      // console.log("page arr = ", pageArr);
      return (
        <Container>
          <Flexbox>
            {itemsArray?.map((item, index) => {
              if (index + 1 <= page * 25 && index + 1 >= (page - 1) * 25) {
                return <Item key={item._id} item={item} type={"multi"} />;
              }
            })}
          </Flexbox>

          {pageArr.length > 0 && (
            <PageHolder>
              <h6>
                Collection Items: {pageInfo[0].itemsPerPage} of{" "}
                {pageInfo[0]?.numberOfProducts}. <br></br>Collection {page} out
                of {pageInfo[0]?.numberOfPage} Collections.
              </h6>
              {pageArr?.map((p, index) => {
                const pageNum = index + 1;
                return +pageNum === +page ? (
                  <CurrPage key={pageNum}>{pageNum}</CurrPage>
                ) : (
                  <>
                    <StyledLink to={`/armoury/${pageNum}`} key={pageNum}>
                      {pageNum}
                    </StyledLink>
                  </>
                );
              })}
            </PageHolder>
          )}
        </Container>
      );
    } else {
      return <></>;
    }
  }
};

const Container = styled.div`
  margin: auto;
  margin-block-end: 20%;
  display: flex;
  background-color: black;
`;

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
  margin: auto;
  width: 50%;
  margin-block-end: 10%;
  margin-block-start: 10%;
  background-color: slategray;
`;
const CurrPage = styled.span`
  color: red;
  font-size: 25px;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  justify-content: right;
  font-size: 25px;
  display: flex;
  flex-direction: row;
`;

const PageHolder = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: grey;

  /* /* // GIFLENS-https://media4.giphy.com/media/1YpPqJ6p8hS9y/200.gif  
  background-image: url() */

  width: 22%;
  margin: auto;
  padding: 0.5%;
  margin-left: 2.5%;
  text-align: right;
`;

export default ListingGrid;
