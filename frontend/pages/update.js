import React from "react";
import UpdateItem from "../components/UpdateItem";

const sell = ({ query }) => (
  <>
    <UpdateItem id={query.id} />
  </>
);

export default sell;
