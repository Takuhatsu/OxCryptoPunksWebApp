import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import oxPunkByteData from '../OxPunkByteStorage.json';
import oxPunkAttributesData from '../OxPunkAttributesStorage.json';
import LoadingAnimation from './LoadingAnimation';
import dizzyFaceEmoji from '../images/emoji/dizzy-face_1f635.png';
import partyFaceEmoji from '../images/emoji/partying-face_1f973.png';
import neutralFaceEmoji from '../images/emoji/neutral-face_1f610.png';

const OnchainPunk = () => {

  const [punkId, setPunkId] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = '0x5cC33e376A6438FA1c72b5085bc2C996F748253D';
  
  const contractABI = [
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
      name: 'addPunkImage',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },

    {
      inputs: [
        {
          internalType: 'uint16',
          name: 'index',
          type: 'uint16',
        },
        {
          internalType: 'uint8[]',
          name: 'attributeIndices',
          type: 'uint8[]',
        },
      ],
      name: 'addToPunkAttributesVault',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
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
            signer
          );

          const index = parseInt(selectedPunk.OxCryptoPunk);
          const hexValue = selectedPunk.HexValue;

          setIsLoading(true); // Start loading animation

          const transaction = await contract.addPunkImage(index, hexValue);
          await transaction.wait();
          const displayMessage = 'Punk image added successfully!';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={partyFaceEmoji}
                alt='Party Face'
                className='emojiImage'
              />
            </div>
          );
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        let displayMessage = error.message;
        if (displayMessage.includes('user rejected transaction')) {
          displayMessage = 'Transaction has been rejected.';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
        if (
          displayMessage.includes(
            'Only the owner of the given punk is allowed to run this function'
          )
        ) {
          displayMessage = 'You do not own this punk.';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={neutralFaceEmoji}
                alt='Neutra Face'
                className='emojiImage'
              />
            </div>
          );
        }
        if (
          displayMessage.includes(
            'execution reverted: ERC721: invalid token ID'
          )
        ) {
          displayMessage = 'This punk isn\'t minted yet';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
        if (displayMessage.includes('Punk not found in the list')) {
          displayMessage = 'There is only 10.000 oxPunks';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    } else {
      const displayMessage = 'There are only 10.000 oxPunks';
      setDisplayMessage(
        <div>
          {displayMessage}{' '}
          <img src={dizzyFaceEmoji} alt='Dizzy Face' className='emojiImage' />
        </div>
      );
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

          const transaction = await contract.addToPunkAttributesVault(
            index,
            attributes
          );
          await transaction.wait();
          const displayMessage = 'Attributes added successfully!';
          setDisplayMessage(
            <div>
              {displayMessage}
              <img
                src={partyFaceEmoji}
                alt='Party Face'
                className='emojiImage'
              />
            </div>
          );
        } else {
          console.log('MetaMask is not installed or not available.');
        }
      } catch (error) {
        let displayMessage = error.message;
        if (displayMessage.includes('user rejected transaction')) {
          displayMessage = 'Transaction has been rejected.';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
        if (
          displayMessage.includes(
            'execution reverted: ERC721: invalid token ID'
          )
        ) {
          displayMessage = 'This punk isn\'t minted yet';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
        if (displayMessage.includes('Punk not found in the list')) {
          displayMessage = 'There is only 10.000 oxPunks';
          setDisplayMessage(
            <div>
              {displayMessage}{' '}
              <img
                src={dizzyFaceEmoji}
                alt='Dizzy Face'
                className='emojiImage'
              />
            </div>
          );
        }
        console.log('Error adding attributes:', error);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    } else {
      const displayMessage = 'There are only 10.000 oxPunks';
      setDisplayMessage(
        <div>
          {displayMessage}{' '}
          <img src={dizzyFaceEmoji} alt='Dizzy Face' className='emojiImage' />
        </div>
      );
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
        {/* <div className='on-chain-button'>
          <CustomButton
            variant='contained'
            onClick={() => {
              fetchAttributesCount();
              fetchImagesCount();
            }}
          >
            Get ID
          </CustomButton>
        </div> */}
        {/* <div className='return-attributes-count'>
          Image ID:{' '}
          {imagesCount !== null
            ? imagesCount.toString()
            : <BouncingBallAnimation />}
        </div>
        <div className='return-attributes-count'>
          Attributes ID:{' '}
          {attributesCount !== null
            ? attributesCount.toString()
            : <BouncingBallAnimation />}
        </div> */}
        <div className='loading-container'>
          <div id='onchainLoading'>{isLoading && <LoadingAnimation />}</div>
        </div>
        {displayMessage && (
          <div className='displayMessage'>{displayMessage}</div>
        )}
      </Box>
    </div>
  );
};

export default OnchainPunk;
