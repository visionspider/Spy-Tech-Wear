import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ShoppingCartProvider } from "./components/Context/ShoppingCartContext";

ReactDOM.render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
