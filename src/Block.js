import React from "react";
import Error from "./Error";

const Block = ({ error, title, response }) => {
  const data = response ? (
    <div className="response">{JSON.stringify(response, null, 2)}</div>
  ) : (
    "No response yet"
  );

  return (
    <div className="block">
      <h2>{title}</h2>
      {error ? <Error /> : data}
    </div>
  );
};

export default Block;
