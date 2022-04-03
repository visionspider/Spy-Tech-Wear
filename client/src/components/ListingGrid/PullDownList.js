import styled from "styled-components";
import { ItemsContext } from "../MyItemsContext";
import { useContext } from "react";
const PullDownList = ({ valueArray, name, setPageNumber }) => {
  const {
    itemsArray,
    status,
    renderArray,
    setRenderArray,
    setPageNumberArray,
  } = useContext(ItemsContext);
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
      }
      if (name === "category") {
        document.getElementById("name").selectedIndex = 0;
        document.getElementById("body_location").selectedIndex = 0;
      }
      if (name === "body_location") {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("name").selectedIndex = 0;
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
      <select id={name} className="PullDown" onChange={handleSelect}>
        <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
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
  height: 30px;
  width: 10vw;
  text-align: center;

  select {
    height: 25px;
    text-align: center;
    background: royalblue;
    font-size: 20px;
    color: gold;
    &:hover {
      color: greenyellow;
    }
  }
`;
export default PullDownList;
