import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Company from "./Company";
import Item from "./Item";

const SingleItem = () => {
  const [item, setItem] = useState([]);
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`/api/get-items/${id}`)
      .then((res) => res.json())
      .then((items) => setItem(items.data));
  }, [id]);
  if (item.length > 0 && company.length < 1) {
    fetch(`/api/get-companies/${item[0]?.companyId}`)
      .then((res) => res.json())
      .then((items) => {
        console.log(items.data);
        setCompany(items.data);
      });
  }

  return (
    <>
      {item.map((item) => (
        <Item key={item._id} item={item} type={"single"} />
      ))}
      {company.map((company) => (
        <Company key={company._id} company={company} />
      ))}
    </>
  );
};

export default SingleItem;
