import { createContext } from "react";
import usePersistedState from "../useSessionStorage.hook";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = usePersistedState([], "cart");
  const handleCart = () => {
    //adding itemCount as a key value pair i.e cartAmount : num,
    shoppingCart.forEach((item, i, arr) => {
      let itemCount = arr.filter((item1) => item1._id === item._id);

      item.cartAmount = itemCount.length;
    });
    //Keeping only 1 id per unique product and putting it back into array
    const productIds = Array.from(
      new Set(shoppingCart.map((item) => item._id))
    );

    return productIds.map((productId) => {
      return shoppingCart.find((item) => item._id === productId);
    });
  };
  const updateCart = (id, value) => {
    if (value === "minus") {
      let pos = shoppingCart.findIndex((item) => +item._id === +id);
      let copyCart = [...shoppingCart];

      copyCart.splice(+pos, 1);

      setShoppingCart(() => [...copyCart]);
    } else if (
      value === "plus" &&
      shoppingCart.some((item) => +item.cartAmount < +item.numInStock)
    ) {
      const addItem = shoppingCart.find((item) => item._id === +id);

      setShoppingCart((shoppingCart) => [...shoppingCart, addItem]);
    }
  };
  const handleTotal = () => {
    const itemTotals = shoppingCart.map((item) => item.price.slice(1));

    return itemTotals.length > 1
      ? itemTotals?.reduce((total, num) => +total + +num)?.toFixed(2)
      : itemTotals;
  };
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        updateCart,
        handleCart,
        handleTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
