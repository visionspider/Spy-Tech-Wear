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
