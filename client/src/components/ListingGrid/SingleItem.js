import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { companies } from "../../companies";
import { items } from "../../items";
import Company from "./Company";
import Item from "./Item";

const SingleItem = () => {
  const [item, setItem] = useState([]);
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setItem(items.filter((item) => +item._id === +id));
    // fetch(`/api/get-items/${id}`)
    //   .then((res) => res.json())
    //   .then((items) => setItem(items.data));
  }, [id]);
  if (item.length > 0 && company.length < 1) {
    setCompany(
      companies.filter((company) => +company._id === item[0].companyId)
    );
    // fetch(`/api/get-companies/${item.companyId}`)
    //   .then((res) => res.json())
    //   .then((items) => setCompany(items.data));
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
