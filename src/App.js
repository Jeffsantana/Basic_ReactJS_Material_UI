import React, { Fragment } from "react";
import { GlobalStyle } from "./styles";

import { Header, Menu } from "./components";

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Header />
    <Menu />
  </Fragment>
);

export default App;
