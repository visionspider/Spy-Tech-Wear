import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";

import Company from "./Company";
import Item from "./Item";

const SingleItem = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  const [isStocked, setIsStocked] = useState(false);
  const [oops, setOops] = useState(false);
  const [item, setItem] = useState([]);
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    fetch(`/api/get-items/${id}`)
      .then((res) => res.json())
      .then((items) => setItem(items.data))
      .catch((err) => {
        console.log(err, "ERRRORRRRRRR,ITEM");
      });
  }, [id]);
  if (item?.length > 0 && company.length < 1) {
    fetch(`/api/get-companies/${item[0]?.companyId}`)
      .then((res) => res.json())
      .then((items) => {
        // console.log(items.data);
        setCompany(items.data);
      })
      .catch((err) => {
        console.log(err, "ERRORCOMP");
      });
  }
  console.log("item = ", item);
  console.log("shopping cart = ", shoppingCart);
  console.log("is stocked = ", isStocked);

  if (company?.length !== 0) {
    return (
      <BG>
        <ItemHolder>
          {item.map((i) => (
            <>
              <Item key={i._id} item={i} type={"single"} />
              <>
                {company.map((company) => (
                  <Company key={company._id} company={company} />
                ))}
              </>
              <AddCart
                key={"10" + i._id}
                onClick={() =>
                  setShoppingCart(
                    (shoppingCart) => [...shoppingCart, i],
                    "cart"
                  )
                }
                disabled={
                  i?.numInStock ===
                    shoppingCart?.filter((cartItem) => cartItem._id === i._id)
                      .length || item[0]?.numInStock === 0
                }
              >
                {i?.numInStock ===
                  shoppingCart?.filter((cartItem) => cartItem._id === i._id)
                    .length || item[0]?.numInStock === 0
                  ? "out of stock"
                  : "Add to cart"}
              </AddCart>
            </>
          ))}
        </ItemHolder>
      </BG>
    );
  } else return <Loading />;
};

const AddCart = styled.button`
  cursor: ${(p) => (p.disabled ? "cursor" : "pointer")};
  background-color: red;
  border: solid 1px red;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  width: fit-content;
  align-self: center;

  margin-top: 1.5%;
  &:disabled {
    background-color: gray;
    border: solid 1px gray;
  }
`;

const ItemHolder = styled.div`
  align-self: center;
  min-width: fit-content;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 130%;
  justify-items: center;
  padding-bottom: 1%;
`;

const BG = styled.div`
  margin: auto;
  position: relative;
  // GIFLENS-https://media0.giphy.com/media/sULKEgDMX8LcI/200.gif
`;

export default SingleItem;
