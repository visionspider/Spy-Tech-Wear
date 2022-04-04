import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import styled from "styled-components";
import Cart from "./Cart";
import GlobalStyle from "./GlobalStyles";
import Header from "./Header";
import Index from "./LandingPage/Index";
import ListingGrid from "./ListingGrid";
import SingleItem from "./ListingGrid/SingleItem";
import { CheckoutForm } from "./Forms/CheckoutForm";

import Matrix from "./Matrix";
//useLocation and going to test out empty result for header

function App() {
  return (
    <>
      <GlobalStyle />

      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>

          {/* <Matrix style={{ zIndex: "-100" }}> */}
          <div>
            <Header />
            <Route exact path="/armoury/:page">
              {/* Home : Listing grid */}
              <ListingGrid />
            </Route>
            {/* {the armoury is the list of items} */}

            <Route exact path="/tech-ware/:id">
              <SingleItem />
            </Route>

            <Route exact path="/agent-handler/cart">
              <Cart />
            </Route>
            <Route exact path="/classified">
              <CheckoutForm />
            </Route>

            {/* <Route exact path="/mission-status/:id">
            Order status
          </Route> */}

            <Route exact path="/welcome-agent">
              {/* Confirmation Human Intelligence says your mission was accepted. */}
            </Route>
          </div>
        </Switch>
        {/* </Matrix> */}
      </Router>
    </>
  );
}

export default App;
