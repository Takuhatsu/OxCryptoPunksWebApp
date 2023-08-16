import React from "react";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)`
  && {
    width: 100%;
    input {
      color: #333;
      caret-color: #212121 !important;
    }
    label {
      color: #212121;
    }
    .MuiFilledInput-root {
      border-radius: 0; /* Remove the rounded border */
    }
    .MuiFilledInput-underline:before,
    .MuiFilledInput-underline:after {
      border-bottom-color: #bfc500;
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
