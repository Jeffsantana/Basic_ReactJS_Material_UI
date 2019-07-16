import React from "react";
import { Page } from "../../components";
import image from "../../assets/images/developing.png";

const Developing = () => (
  <Page style={{ textAlign: "center" }}>
    <img
      src={image}
      style={{ objectFit: "container", width: "100%", maxHeigth: 400 }}
      alt="Developing Page"
    />
    <h1>Developing Page</h1>
  </Page>
);

export default Developing;
