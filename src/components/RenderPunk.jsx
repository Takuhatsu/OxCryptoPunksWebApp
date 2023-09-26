import React, { useState } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import LoadingAnimation from './LoadingAnimation';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import PunkBot from '../images/Bot.png';
import DotsAnimation from './DotsAnimation';

export const RenderPunk = () => {
  const [punkId, setPunkId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState(null);
  const [punkError, setPunkError] = useState(null);
  const [attributesError, setAttributesError] = useState(null);
  const [svgImage, setSvgImage] = useState(null);
  const [isAttributesLoading, setIsAttributesLoading] = useState(false);
  const infuraProvider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/ffed0621bad74886bffe623e6abddaca'
  );

  const contractAddress = '0x5cC33e376A6438FA1c72b5085bc2C996F748253D';
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
      name: 'getPunkImageSvg',
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
      name: 'getPunkAttributes',
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

  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    infuraProvider
  );

  const fetchPunkImage = async () => {
    try {
      const [svg] = await Promise.all([
        contract.getPunkImageSvg(punkId).catch((error) => {
          const punkError = error.message;
          console.error(punkError);
          throw error;
        }),
      ]);

      const svgContent = svg.replace(`data:image/svg+xml;utf8,`, ``);
      setSvgImage(svgContent);
    } catch (error) {
      console.log(error);
      setPunkError('An error occurred while fetching the Punk.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPunkAttributes = async () => {
    try {
      setIsAttributesLoading(true);
      const attributes = await contract.getPunkAttributes(punkId);
      setAttributes(attributes);
      setAttributesError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      if (error.message.includes('Attributes not added')) {
        setAttributesError('Attributes not added');
      } else if (error.message.includes('value out-of-bounds')) {
        setAttributesError('value out-of-bounds');
      } else if (error.message.includes('Invalid index')) {
        setAttributesError('Invalid index');
      } else {
        setAttributesError(error.message);
      }
    } finally {
      setIsAttributesLoading(false);
    }
  };

  const handleLoadClick = async () => {
    setPunkError(null);
    setIsLoading(true);

    // Fetch image and attributes concurrently
    Promise.all([fetchPunkImage(), fetchPunkAttributes()]);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component='form' noValidate autoComplete='off'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '240px',
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
            position: 'relative',
            marginTop: '1rem',
            overflow: 'hidden',
          }}
        >
          {isLoading && !punkError && (
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
          {!isLoading && punkError && (
            <img
              src={PunkBot}
              alt='PunkBot'
              style={{
                width: '100%',
                height: '100%',
                imageRendering: 'pixelated',
              }}
            />
          )}
          {!isLoading && !punkError && svgImage && (
            <div dangerouslySetInnerHTML={{ __html: svgImage }}></div>
          )}
        </div>
        <div id='punkAttributes'>
  {isAttributesLoading ? (
    <div
      style={{
        display: 'flex',
        marginLeft: '25%',
      }}
    >
      <DotsAnimation />
    </div>
  ) : (
    <div  style={{ textAlign: 'center' }}>
      {attributesError === 'Attributes not added' ? 'Attributes not added' :
        attributesError === 'value out-of-bounds' ? 'There are only 10,000 oxPunks' :
        attributesError === 'Invalid index' ? '404' :
        attributes ? attributes : ''}
    </div>
  )}
</div>
      </Box>
    </div>
  );
};
