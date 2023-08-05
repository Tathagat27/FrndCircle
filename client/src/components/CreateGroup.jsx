import React from "react";
import "./myStyles.css";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CreateGroup = () => {
  return (
    <div className="createGroup">
      <div className="create-group-input">
        <input placeholder="Enter Group Name" className="input-group" />
        <IconButton>
          <CheckCircleIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CreateGroup;
