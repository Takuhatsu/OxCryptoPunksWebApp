import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import oxPunkByteData from '../OxPunkByteStorage.json';
import oxPunkAttributesData from '../OxPunkAttributesStorage.json';

const OnchainPunk = () => {
  const [punkId, setPunkId] = useState('');

  const contractAddress = '0x544075560A2b2640955e23e304df98194D52C67F';
  const contractABI = [
    // Existing ABI for addPunk function
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'uint16',
          name: '_index',
          type: 'uint16',
        },
        {
          internalType: 'bytes',
          name: '_data',
          type: 'bytes',
        },
      ],
      name: 'addPunk',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    // New ABI for addToPunkAttributesMap function
    {
      inputs: [
        {
          internalType: 'uint16[]',
          name: 'indexes',
          type: 'uint16[]',
        },
        {
          internalType: 'uint8[][]',
          name: 'attributeIndices',
          type: 'uint8[][]',
        },
      ],
      name: 'addToPunkAttributesMap',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const handleAddPunk = async () => {
    const selectedPunk = oxPunkByteData.find((punk) => punk.OxCryptoPunk === punkId);
  
    if (selectedPunk) {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          const index = parseInt(selectedPunk.OxCryptoPunk);
          const hexValue = selectedPunk.HexValue;
  
          const transaction = await contract.addPunk(index, hexValue);
          await transaction.wait();
          console.log('Punk added successfully!');
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        console.log('Error adding punk:', error);
      }
    } else {
      console.log('Punk not found in the list.');
    }
  };

  const handleAddAttributes = async () => {
    const selectedPunk = oxPunkAttributesData.find((punk) => punk.OxCryptoPunk === punkId);
  
    if (selectedPunk) {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          const index = parseInt(selectedPunk.OxCryptoPunk);
          const attributes = JSON.parse(selectedPunk.Attributes);
  
          const transaction = await contract.addToPunkAttributesMap([index], [attributes]);
          await transaction.wait();
          console.log('Attributes added successfully!');
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        console.log('Error adding attributes:', error);
      }
    } else {
      console.log('Punk not found in the list.');
    }
  };

  return (
    <Box>
      <TextField
        label="Punk ID"
        variant="outlined"
        value={punkId}
        onChange={(e) => setPunkId(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddPunk}>
        Add Punk
      </Button>
      <Button variant="contained" onClick={handleAddAttributes}>
        Add Attributes
      </Button>
    </Box>
  );
};

export default OnchainPunk;