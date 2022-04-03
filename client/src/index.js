import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ShoppingCartProvider } from "./components/Context/ShoppingCartContext";
import { ItemsContextProvider } from "./components/MyItemsContext.js";
ReactDOM.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </ItemsContextProvider>
  </React.StrictMode>,
  //
  document.getElementById("root")
);
