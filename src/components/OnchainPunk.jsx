import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import oxPunkByteData from '../OxPunkByteStorage.json';
import oxPunkAttributesData from '../OxPunkAttributesStorage.json';
import LoadingAnimation from './LoadingAnimation';
import BouncingBallAnimation from './BouncingBallAnimation';

const OnchainPunk = () => {
  // Web3 provider
  const infuraProvider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/0eaaa29755f44904aa391055a05c4b39');

  const [punkId, setPunkId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagesCount, setImagesCount] = useState(null);
  const [attributesCount, setAttributesCount] = useState(null);

  const contractAddress = '0xfBF273A6A0100AE8317D65DdB19312f4071C6293';
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

    {
      inputs: [
        {
          internalType: "uint16",
          name: "index",
          type: "uint16"
        },
        {
          internalType: "uint8[]",
          name: "attributeIndices",
          type: "uint8[]"
        }
      ],
      name: "addToPunkAttributesMap",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },

    {
      inputs: [],
      name: 'getPunkAttributesCount',
      outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
      stateMutability: 'view',
      type: 'function',
    },

    {
      inputs: [],
      name: 'getPunkImagesCount',
      outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const handleAddPunk = async () => {
    const selectedPunk = oxPunkByteData.find(
      (punk) => punk.OxCryptoPunk === punkId
    );

    if (selectedPunk) {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
          );

          const index = parseInt(selectedPunk.OxCryptoPunk);
          const hexValue = selectedPunk.HexValue;

          setIsLoading(true); // Start loading animation

          const transaction = await contract.addPunk(index, hexValue);
          await transaction.wait();
          setSuccessMessage('Punk added successfully!');
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        console.log('Error adding punk:', error);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    } else {
      console.log('Punk not found in the list.');
    }
  };

  const handleAddAttributes = async () => {
    const selectedPunk = oxPunkAttributesData.find(
      (punk) => punk.OxCryptoPunk === punkId
    );

    if (selectedPunk) {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const index = parseInt(selectedPunk.OxCryptoPunk);
          const attributes = JSON.parse(selectedPunk.Attributes);

          setIsLoading(true); // Start loading animation

          const transaction = await contract.addToPunkAttributesMap(
            index,
            attributes
          );
          await transaction.wait();
          setSuccessMessage('Attributes added successfully!');
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        console.log('Error adding attributes:', error);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    } else {
      console.log('Punk not found in the list.');
    }
  };

  const handleGetPunkAttributesCountCall = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        infuraProvider
      );
      const attributesCount = await contract.getPunkAttributesCount();
  
      console.log('Punk Attributes Count:', attributesCount);
  
      setAttributesCount(attributesCount);
    } catch (error) {
      console.log('Error fetching punk attributes count:', error);
    }
  };

  const fetchAttributesCount = async () => {
    try {
      await handleGetPunkAttributesCountCall();
    } catch (error) {
      console.log('Error fetching attributes count:', error);
    }
  };

  const handleGetPunkImagesCountCall = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        infuraProvider
      );
      const imagesCount = await contract.getPunkImagesCount();
  
      console.log('Punk Images Count:', imagesCount);
  
      setImagesCount(imagesCount);
    } catch (error) {
      console.log('Error fetching punk images count:', error);
    }
  };

  const fetchImagesCount = async () => {
    try {
      await handleGetPunkImagesCountCall();
    } catch (error) {
      console.log('Error fetching attributes count:', error);
    }
  };

  return (
    <div className='mint-form'>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div className='on-chain-button'>
          <CustomInput
            label='Punk ID'
            variant='outlined'
            value={punkId}
            onChange={(e) => setPunkId(e.target.value)}
          />
        </div>
        <div className='on-chain-button'>
          <CustomButton variant='contained' onClick={handleAddPunk}>
            Add Punk
          </CustomButton>
        </div>
        <div className='on-chain-button'>
          <CustomButton variant='contained' onClick={handleAddAttributes}>
            Add Attributes
          </CustomButton>
        </div>
        <div className='on-chain-button'>
          <CustomButton
            variant='contained'
            onClick={() => {
              fetchAttributesCount();
              fetchImagesCount();
            }}
          >
            Get ID
          </CustomButton>
        </div>
        <div className='return-attributes-count'>
          {/* Display the attributes count */}
          Image ID:{' '}
          {imagesCount !== null
            ? imagesCount.toString()
            : <BouncingBallAnimation />}
        </div>
        <div className='return-attributes-count'>
          {/* Display the attributes count */}
          Attributes ID:{' '}
          {attributesCount !== null
            ? attributesCount.toString()
            : <BouncingBallAnimation />}
        </div>
        {isLoading && <LoadingAnimation />}
        {successMessage && (
          <div className='success-message'>{successMessage}</div>
        )}
      </Box>
    </div>
  );
};

export default OnchainPunk;
