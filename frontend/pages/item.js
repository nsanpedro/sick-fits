import React from "react";
import SingleItem from "../components/SingleItem";

const Item = ({ query }) => (
  <>
    <SingleItem id={query.id} />
  </>
);

export default Item;
