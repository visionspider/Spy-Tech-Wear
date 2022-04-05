import styled from "styled-components";
import { ItemsContext } from "../MyItemsContext";
import { useContext } from "react";
const PullDownList = ({ valueArray, name }) => {
  const {
    itemsArray,
    status,
    renderArray,
    setRenderArray,
    setPageNumberArray,
    setPageNumber,
  } = useContext(ItemsContext);
  let optionName = "";
  if (name === "name") {
    optionName = "Brand Name";
  }
  if (name === "category") {
    optionName = "Category";
  }
  if (name === "body_location") {
    optionName = "Body Location";
  }
  const handleSelect = (ev) => {
    const value = ev.target.value;

    if (value) {
      const arr = itemsArray.filter((item) => {
        return item[name].includes(value);
      });
      let numberArr = [];
      let pageNumber = Math.floor(arr.length / 25) + 1;

      for (let i = 1; i <= pageNumber; i++) {
        numberArr.push(i);
      }
      if (name === "name") {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("body_location").selectedIndex = 0;
        optionName = "Company Name";
      }
      if (name === "category") {
        document.getElementById("name").selectedIndex = 0;
        document.getElementById("body_location").selectedIndex = 0;
        optionName = "Category";
      }
      if (name === "body_location") {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("name").selectedIndex = 0;
        optionName = "Body Location";
      }

      document.getElementById("selectNumber").selectedIndex = 1;
      setRenderArray([...arr]);
      setPageNumber(1);
      setPageNumberArray([...numberArr]);
    } else {
      setRenderArray([...renderArray]);
    }
  };
  return (
    <Form>
      <select
        style={{ cursor: "pointer" }}
        id={name}
        className="PullDown"
        onChange={handleSelect}
      >
        <option value="">{optionName}</option>
        {valueArray.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </Form>
  );
};
const Form = styled.form`
  height: 40px;
  width: 10vw;
  text-align: center;

  select {
    height: 40px;
    text-align: center;
    background: transparent;
    font-size: 24px;
    color: gold;
    &:hover {
      color: goldenrod;
    }
  }
`;
export default PullDownList;
