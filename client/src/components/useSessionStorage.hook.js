// import { useState } from "react";

// const useSessionStorage = (keyName, defaultValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const value = window.sessionStorage.getItem(keyName);

//       if (value) {
//         return JSON.parse(value);
//       } else {
//         window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     } catch (err) {
//       return defaultValue;
//     }
//   });

//   const setValue = (newValue) => {
//     try {
//       window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
//     } catch (err) {}
//     setStoredValue(newValue);
//   };

//   return [storedValue, setValue];
// };

// export default useSessionStorage;

import { useRef, useEffect, useState } from "react";

const usePersistedState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    const persistedState = sessionStorage.getItem(key);

    return JSON.parse(persistedState)?.length !== 0
      ? JSON.parse(persistedState)
      : defaultValue;
  });

  useEffect(() => {
    console.log("value = ", state);
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
