import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import LoadingAnimation from './LoadingAnimation';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export const RenderPunk = () => {
  const [punkId, setPunkId] = useState('');
  const [svgImage, setSvgImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState(null);
  // const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/90880ea69ac546a091223cba5f884868');
  const infuraProvider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/a6ef5c5c299b49cd95802b35e0681061');

  const handleLoadClick = async () => {
    try {
      // if (punkId === previousPunkId) {
      //   return; // Skip if the current punkId is the same as the previous one
      // }

      setIsLoading(true);

      // const contractAddress = '0x888a16eed949a9f19e16e9c131608153a65160c2';
      const contractAddress = '0x4fD7Bd1A5Bea1104Dda1f1786229440002d455Ad';
      const contractABI = [
        {
          constant: true,
          inputs: [
            {
              internalType: 'uint16',
              name: 'index',
              type: 'uint16',
            },
          ],
          name: 'punkImageSvg',
          outputs: [
            {
              internalType: 'string',
              name: 'svg',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              internalType: 'uint16',
              name: 'index',
              type: 'uint16',
            },
          ],
          name: 'punkAttributes',
          outputs: [
            {
              internalType: 'string',
              name: 'text',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];
      const contract = new ethers.Contract(contractAddress, contractABI, infuraProvider);

      const [svg] = await Promise.all([
        contract.punkImageSvg(punkId),
      ]);

      const svgContent = svg.replace(`data:image/svg+xml;utf8,`, ``);
      setSvgImage(svgContent);
      setIsLoading(false);

      // Retrieve attributes if available
      try {
        const attributes = await contract.punkAttributes(punkId);
        setAttributes(attributes);
      } catch {
        setAttributes(null);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const imageElement = document.getElementById('punkImageSvgRender');
    imageElement.innerHTML = svgImage;
  }, [svgImage]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box component='form' noValidate autoComplete='off'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '240px', // Set the width to match the punkImageSvg square

          }}
        >
            <CustomInput
              value={punkId}
              label='Enter Punk Id'
              onChange={(e) => setPunkId(e.target.value)}
            />

          <CustomButton onClick={handleLoadClick}>Load</CustomButton>
        </div>
        <div
          id='punkImageSvgRender'
          style={{
            width: '240px',
            height: '240px',
            backgroundColor: '#a5abb1',
            position: 'relative', // Add position relative to the container
            marginTop: '1rem',
          }}
        >
          {svgImage && (
            <div dangerouslySetInnerHTML={{ __html: svgImage }}></div>
          )}
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <LoadingAnimation />
              </div>
            </div>
          )}
        </div>
        <div id='punkAttributes'>
          {attributes ? (
            <p style={{ textAlign: 'center' }}>{attributes}</p>
          ) : (
            <p style={{ textAlign: 'center' }}></p>
          )}
        </div>
      </Box>
    </div>
  );
};