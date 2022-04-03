import { createContext, useState, useEffect } from "react";
export const ItemsContext = createContext(null);
export const ItemsContextProvider = ({ children }) => {
  //itemsArray contains all 300+ items, it is a array of object
  const [itemsArray, setItemsArray] = useState([]);
  const [companyArray, setCompantArray] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  //statusBegin is a indicator for finishing fetch data in this context file
  const [status, setStatus] = useState("loading");
  // orderArray contains order information. for example: orderArray = [{_id:6543,qty:2},{_id:6545,qty:4},...]
  const [orderArray, setOrderArray] = useState([]);
  const [renderArray, setRenderArray] = useState([]);
  const [pageNumberArray, setPageNumberArray] = useState([]);
  useEffect(() => {
    fetch("/api/get-companies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCompantArray(data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    fetch("/api/getPagination")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setPageInfo(data.data);
        return fetch("/api/get-items")
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            setItemsArray(data.data);
            setStatus("idle");
            setRenderArray(data.data);
            let arr = [];
            let pageNumber = Math.floor(data.data.length / 25 + 1);
            for (let i = 1; i <= pageNumber; i++) {
              arr.push(i);
            }
            setPageNumberArray([...arr]);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <ItemsContext.Provider
      value={{
        itemsArray,
        companyArray,
        status,
        orderArray,
        pageInfo,
        renderArray,
        pageNumberArray,
        setPageNumberArray,
        setItemsArray,
        setCompantArray,
        setStatus,
        setOrderArray,
        setPageInfo,
        setRenderArray,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
