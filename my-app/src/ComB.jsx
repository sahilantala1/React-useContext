import React, { useContext } from "react";
// import { ComC } from "./ComC";
import { FirstName, LastName } from "./App";

export const ComB = () => {
  const fname = useContext(FirstName);
  const lname = useContext(LastName);

  return (
    <div>
      <h1>{fname}</h1>
      <h1>{lname}</h1>
    </div>
  );
};
