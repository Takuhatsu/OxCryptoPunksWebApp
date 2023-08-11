import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButton = ({ onClick, children }) => {
  const StyledButton = styled(Button)`
    && {
      border-radius: 0px;
      min-height: 56px;
      box-shadow: none;
      background-color: #ea34b0;
      width: 100%;

      transition: background-color 0.3s;
      &:hover {
        background-color: rgb(14, 14, 14);
      }
    }
  `;

  const StyledBox = styled(Box)`
    && {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;


    }
  `;

  return (
    <StyledBox>
      <StyledButton variant="contained" onClick={onClick}>
        {children}
      </StyledButton>
    </StyledBox>
  );
};

export default CustomButton;