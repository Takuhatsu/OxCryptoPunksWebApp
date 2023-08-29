import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const Mint = () => {

  const [numPunks, setNumPunks] = useState('');
  const contractAddress = '0x3e83D6adcBe766F51D7223A14A10abD81daBDF3E';
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
  const punkPrice = ethers.utils.parseEther('0.007');


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
        const mintTx = await contract.getPunk(num, {
          value: value,
        });
        await mintTx.wait();
  
        console.log('Punks minted successfully!');
      } else {
        console.log('MetaMask is not installed or not available.');
      }

    } catch (error) {
      console.log('Error minting punks:', error);
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
      </Box>
    </div>
  );
};

export default Mint;