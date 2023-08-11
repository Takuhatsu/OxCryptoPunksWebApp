import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { RenderPunk } from './components/RenderPunk';
import PunkMesh from '../images/OxPunkMesh.png';
import Mint from './components/Mint';

const MainPageText = () => {
  const mintRef = useRef(null);

  return (
    <div className='mainpage-container'>
      <p className='text-web'>
        10,000 unique collectible characters, with proof of ownership stored as
        binary code on the Ethereum blockchain, which can be retrieved and
        rendered as a final image. This project is a combo of a classic NFT
        collection utilizing IPFS to store images and metadata with fully
        on-chain implementation.
      </p>
      <h1 className='titles'>Render Punk from the Blockchain</h1>
      <p className='text-web'>
        Type the punk's ID into the form and press the LOAD button. If the
        requested punk is already on the chain, it will be rendered.
      </p>
      <RenderPunk />
      <h1 className='titles'>About the Ox™</h1>
      <p className='text-web'>
        We've recreated all the original CryptoPunks layers, added some new
        unique attributes, invented the Pigeons type of characters, and
        generated 10,000 new CryptoPunks. The code we used for generating the
        collection is available on{' '}
        <a
          className='link-in-text'
          href='https://github.com/Takuhatsu/oxcryptopunks-image-generator'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
        .
      </p>
      <h1 className='titles'>On-Chain</h1>
      <p className='text-web'>
        This collection stores data in two ways: files on IPFS with links to
        them on the OxCryptoPunks smart contract, and the contract's internal
        storage. All attributes are stored as an array of strings and there is a
        mapping for each punk. Images are stored as raw bytes data. This data
        can be retrieved in the Render Punk from the Blockchain section. You
        enter a punk's ID and press the LOAD button. The contract's function
        encodes the raw byte data, which contains information about each pixel,
        into SVG format and renders it on this page. The same LOAD button also
        calls the function that encodes the punk's attributes into a readable
        format and renders it on this page.
      </p>
      <p className='text-web'>
        But first, we need to populate the internal storage with data. We
        decided to entrust this to the community. To put an OxPunk on chain, you
        need to go to the{' '}
        <Link className='link-in-text' to='/onchainpunk'>
          On-Chain
        </Link>{' '}
        page, enter the punk’s ID, and press <span className='text-web-italic'>ADD PUNK</span>. This will push byte
        data of a punk to the internal storage of the OxCryptoPunks smart
        contract. <span className='text-web-italic'>ADD ATTRIBUTES</span> will
        push the attributes list of the selected punk to the blockchain. Punks can
        only be inserted to the blockchain in sequential order. On the{' '}
        <Link className='link-in-text' to='/onchainpunk'>
          On-Chain
        </Link>{' '}
        page, under the <span className='text-web-italic'>ADD PUNK</span> and{' '}
        <span className='text-web-italic'>ADD ATTRIBUTES</span> form, you will
        see the information about the next available image ID and attributes ID
        for onchaining. After all punks and all attributes are on the
        blockchain, we will seal the contract and the internal storage will not
        be modifiable anymore.
      </p>
      <h1 id='mint' ref={mintRef} className='titles'>
        Mint a Punk
      </h1>
      <Mint />
      <div className='punkmesh-expl'>
        <p className='text-web'>
          To put an OxPunk on chain, you need to go to the On-Chain page, enter
          the punk’s ID, and press ADD PUNK. This will push bytes data of a punk
          to the internal storage of the OxCryptoPunks smart contract. ADD
          ATTRIBUTES will push the attributes list of the picked punk to the
          blockchain.
        </p>
        <img
          itemID='punkMesh'
          className='image'
          src={PunkMesh}
          alt='Punk Mesh'
        />
      </div>
      <p id='smart-contract-address' className='text-web'>VERIFIED SMART CONTRACT ADDRESS: <a
          className='link-in-text'
          href='https://github.com/Takuhatsu/oxcryptopunks-image-generator'
          target='_blank'
          rel='noreferrer'
        >0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D</a></p>
        <p id='smart-contract-address-mobile' className='text-web'>VERIFIED SMART CONTRACT ADDRESS: <a
          className='link-in-text'
          href='https://github.com/Takuhatsu/oxcryptopunks-image-generator'
          target='_blank'
          rel='noreferrer'
        >0xBC4CA0E...8a936f13D</a></p>
    </div>
  );
};

export default MainPageText;
