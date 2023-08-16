import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButton = ({ onClick, children }) => {
  const StyledButton = styled(Button)`
  && {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #000;
    border-radius: 0px;
    min-height: 56px;
    box-shadow: none;
    background-color: #bfc500;
    width: 100%;
    transition: background-color 0.5s, color 0.5s; /* Combine transitions here */
    &:hover {
      background-color: #0e0e0e;
      color: #fff; /* Apply color change on hover */
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