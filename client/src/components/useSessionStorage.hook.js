import { useEffect, useState } from "react";

const usePersistedState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    const persistedState = sessionStorage.getItem(key);

    return persistedState && defaultValue.length === 0
      ? JSON.parse(persistedState)
      : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;

// const [state, setState] = useState(() => {
//   const persistedState = sessionStorage.getItem(key);

//   const filterDfltValue = defaultValue?.forEach((item, i, arr) => {
//     let itemCount = arr.filter((item1) => item1._id === item._id);

//     item.cartAmount = itemCount.length;
//   });

//   const productIds = Array.from(
//     new Set(filterDfltValue?.map((item) => item._id))
//   );
//   return persistedState && defaultValue.length === 0
//     ? JSON.parse(persistedState)
//     : productIds.map((productId) => {
//         return filterDfltValue.find((item) => item._id === productId);
//       });
// });
