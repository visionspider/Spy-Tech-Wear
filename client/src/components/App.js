import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./Header";
import ListingGrid from "./ListingGrid";
import SingleItem from "./ListingGrid/SingleItem";
import Matrix from "./Matrix";
function App() {
  // useEffect(() => {
  //   // fetch("/bacon")
  //   //   .then((res) => res.json())
  //   //   .then((data) => setBacon(data));
  // }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        {/* <Matrix style={{ zIndex: "1" }}> */}
        <Switch>
          <Route exact path="/tech-spywear">
            Landing Page
          </Route>
          <Route exact path="/armoury/:page">
            {/* Home : Listing grid */}
            <ListingGrid />
          </Route>
          {/* {the armoury is the list of items} */}

          <Route exact path="/tech-ware/:id">
            <SingleItem />
          </Route>

          <Route exact path="/agent-handler">
            Cart
          </Route>
          <Route exact path="/classified">
            Form
          </Route>

          {/* <Route exact path="/mission-status/:id">
            Order status
          </Route> */}

          <Route exact path="/welcome-agent">
            Confirmation Human Intelligence says your missiong was accepted.
          </Route>
        </Switch>
        {/* </Matrix> */}
      </Router>
    </>
  );
}

export default App;
