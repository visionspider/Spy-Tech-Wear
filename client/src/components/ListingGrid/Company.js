import { NavLink } from "react-router-dom";

const Company = ({ company }) => {
  const { name, url, country, _id } = company;
  return (
    <>
      <p>{name}</p>
      <NavLink to={{ pathname: url }} target="_blank">
        {url}
      </NavLink>
      <p>{country}</p>
    </>
  );
};

export default Company;

// name: "Belkin",
//     url: "http://www.belkin.com/",
//     country: "United States",
//     _id: 16384,
