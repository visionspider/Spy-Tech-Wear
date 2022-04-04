const ResetHomePage = ({ dataArr, setPageNumber, setPageNumberArray }) => {
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

export default ResetHomePage;
