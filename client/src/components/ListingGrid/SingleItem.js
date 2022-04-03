import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";

import Company from "./Company";
import Item from "./Item";

const SingleItem = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  const [isStocked, setIsStocked] = useState(false);
  const [item, setItem] = useState([]);
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    fetch(`/api/get-items/${id}`)
      .then((res) => res.json())
      .then((items) => setItem(items.data));
  }, [id]);
  if (item.length > 0 && company.length < 1) {
    fetch(`/api/get-companies/${item[0]?.companyId}`)
      .then((res) => res.json())
      .then((items) => {
        // console.log(items.data);
        setCompany(items.data);
      });
  }
  console.log("item = ", item);
  console.log("shopping cart = ", shoppingCart);
  console.log("is stocked = ", isStocked);
  return (
    <>
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
                i?.numInStock >
                shoppingCart?.filter((cartItem) => cartItem._id === i._id)
                  .length
                  ? setShoppingCart(
                      (shoppingCart) => [...shoppingCart, i],
                      "cart"
                    )
                  : setIsStocked(true)
              }
              disabled={isStocked}
            >
              {!isStocked ? "Add to cart" : "out of stock"}
            </AddCart>
          </>
        ))}
      </ItemHolder>
    </>
  );
};

const AddCart = styled.button`
  cursor: ${(p) => (p.disabled ? "cursor" : "pointer")};
  background-color: red;
  border: solid 1px red;
  padding: 5px;
  border-radius: 5px;
  text-align: center;

  margin-top: 1.5%;
  &:disabled {
    background-color: gray;
    border: solid 1px gray;
  }
`;

const ItemHolder = styled.div`
  margin-top: 10%;
  justify-content: center;
  text-align: center;
`;

export default SingleItem;
