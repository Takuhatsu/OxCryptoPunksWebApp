import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import LoadingAnimation from './LoadingAnimation';
import dizzyFaceEmoji from '../images/emoji/dizzy-face_1f635.png';
import partyFaceEmoji from '../images/emoji/partying-face_1f973.png';

const Mint = () => {

  const [numPunks, setNumPunks] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = '0x5cC33e376A6438FA1c72b5085bc2C996F748253D';
  const contractABI = [
    {
      constant: false,
      inputs: [
        {
          name: 'numPunks',
          type: 'uint16',
        },
      ],
      name: 'getPunk',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
  ];
  const punkPrice = ethers.utils.parseEther('0.005');


  const handleMint = async () => {
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
  
        const num = parseInt(numPunks);
        const value = punkPrice.mul(num);

        setIsLoading(true); // Start loading animation

        const mintTx = await contract.getPunk(num, {
          value: value,
        });
        await mintTx.wait();
        const displayMessage = 'Minted!'
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
        console.log('Successfully minted!');
      } else {
        console.log('MetaMask is not installed or not available.');
      }

    } catch (error) {
      let displayMessage = error.message;
        if (displayMessage.includes('user rejected transaction')) {
          displayMessage = 'Transaction has been rejected.'
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
        console.log(error);
      } finally {
        setIsLoading(false); // Stop loading animation
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
          value={numPunks}
          label='Enter quantaty'
          onChange={(e) => setNumPunks(e.target.value)}
        />
        </div>
        <div className='on-chain-button'>
        <CustomButton onClick={handleMint}
        >Mint</CustomButton>
        </div>
        <div className='loading-container'>
        <div id='onchainLoading'>
        {isLoading && <LoadingAnimation />}
        </div>
        </div>
        {displayMessage && (
          <div className='displayMessage'>{displayMessage}</div>
        )}
      </Box>
    </div>
  );
};

export default Mint;