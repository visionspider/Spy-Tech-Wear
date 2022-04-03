import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Company = ({ company }) => {
  const { name, url, country, _id } = company;
  return (
    <CompanyDiv>
      <p>{name}</p>
      <NavLink to={{ pathname: url }} target="_blank">
        {url}
      </NavLink>
      <p>{country}</p>
    </CompanyDiv>
  );
};
const CompanyDiv = styled.div`
  justify-content: center;
`;

export default Company;

// name: "Belkin",
//     url: "http://www.belkin.com/",
//     country: "United States",
//     _id: 16384,
