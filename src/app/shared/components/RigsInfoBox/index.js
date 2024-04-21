import React from "react";
import "./rigs.scss";
const RigsInfoBox = ({ info }) => {
  return (
    <div className="rigs-info">
      {" "}
      <h2>Rigs Info</h2>
      <ul>
        <li>
          ID:<strong>{info.id}</strong>
        </li>
        <li>Title:</li>
        <strong>{info.title}</strong>
      </ul>
    </div>
  );
};

export default RigsInfoBox;
