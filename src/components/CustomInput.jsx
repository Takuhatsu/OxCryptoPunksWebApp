import React from "react";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)`
  && {
    width: 100%;
    input {
      color: #333;
      caret-color: #333; /* Add this line to set the caret color */
    }
    label {
      color: #333;
    }
    .MuiFilledInput-root {
      border-radius: 0; /* Remove the rounded border */
    }
    .MuiFilledInput-underline:before,
    .MuiFilledInput-underline:after {
      border-bottom-color: #ea34b0;
    }
  }
`;

const CustomInput = ({ value, onChange, onKeyDown, label }) => {
  return (
    <StyledInput
      id="filled-basic"
      label={label}
      variant="filled"
      autoComplete="off"
      className="no-rounded-border"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      fullWidth // Take up the available width
    />
  );
};

export default CustomInput;
