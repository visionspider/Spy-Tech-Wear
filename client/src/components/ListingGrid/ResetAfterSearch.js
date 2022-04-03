import { useContext } from "react";
import { ItemsContext } from "../MyItemsContext";
const ResetAfterSearch = ({ dataArr }) => {
  const { setPageNumber, setPageNumberArray } = useContext(ItemsContext);
  const element = document.getElementsByClassName("PullDown");
  for (let i = 0; i < element.length; i++) {
    element[i].selectedIndex = 0;
  }
  document.getElementById("selectNumber").selectedIndex = 1;
  let arr = [];
  let pageNumber = Math.floor(dataArr.length / 25) + 1;

  for (let i = 1; i <= pageNumber; i++) {
    arr.push(i);
  }
  setPageNumberArray([...arr]);
  setPageNumber(1);
};

export default ResetAfterSearch;
