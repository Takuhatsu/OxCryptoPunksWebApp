import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledInput = styled(TextField)`
  && {
    width: 100%;
    input {
      color: #333;
      caret-color: #212121 !important;
    }
    label {
      color: #a5abb1;
    }
    .MuiFilledInput-root {
      border-radius: 0; /* Remove the rounded border */
    }
    .MuiFilledInput-underline:before,
    .MuiFilledInput-underline:after {
      border-bottom-color: #bfc500;
    }
    
    /* Custom CSS rules you provided */
    .MuiFormLabel-root {
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 400 !important;
      font-style: italic;
    }
    
    .MuiFormLabel-root.Mui-focused {
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 400 !important;
      font-style: italic;
      color: #a5abb1 !important;
    }
    
    .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before {
      border-bottom: 1px solid #bfc500 !important;
    }
    
    .MuiFormControl-root.MuiTextField-root label {
      color: #a5abb1 !important;
    }
  }
`;

const CustomInput = ({ value, onChange, onKeyDown, label }) => {
  return (
    <StyledInput
      id='filled-basic'
      label={label}
      variant='filled'
      autoComplete='off'
      className='no-rounded-border'
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      fullWidth // Take up the available width
    />
  );
};

export default CustomInput;