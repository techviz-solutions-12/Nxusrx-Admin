import React from "react";
import rigs from "../../../../assets/images/rigs.png";
import { Tooltip } from "@mui/material";
const LocationMarker = ({ onClick, title }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <Tooltip title={title}>
        <img src={rigs} />
      </Tooltip>
    </div>
  );
};

export default LocationMarker;
