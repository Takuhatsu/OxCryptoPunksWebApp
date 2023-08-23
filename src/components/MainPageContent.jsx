import React from 'react';
import { Link } from 'react-router-dom';
import { RenderPunk } from './RenderPunk';
import Mint from './Mint';
import OnchainPunk from './OnchainPunk';
import punkIntro from '../images/LOAD.mp4'

const MainPageContent = () => {

  return (
    <div className="App">
      <div className="hero-video">
        <div className='crt'>
        <video className="image" src={punkIntro} alt="Punk Variety" autoPlay loop muted playsInline />
        </div>
      </div>
      <div className='content-wrapper'>
      <figcaption className="caption">
        Strongly influenced by CryptoPunks™
      </figcaption>
      <p className="text-web">
        10,000 unique collectible characters, with proof of ownership stored as
        binary code on the Ethereum blockchain, which can be retrieved and
        rendered as a final image. This project is a combo of a classic NFT
        collection utilizing IPFS to store images and metadata with fully
        on-chain implementation.
      </p>
      <h1 className="titles">RENDER PUNK FROM THE BLOCKCHAIN</h1>
      <p className="pID">
        Type the punk's ID into the form and press the LOAD button. If the
        requested punk is already on the chain, it will be rendered.
      </p>
      <div className="attention-container">
        <div className='svg-container'>
          <svg
            data-v-86a7af3e=""
            width="29"
            height="26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                stroke="#bfc500"
                strokeWidth="2"
                strokeLinejoin="round"
                d="M9.686 25h-8.5l13-24 13 24h-8"
              ></path>
              <path
                d="M15.134 21.478l.893-8.398v-.38h-3.382v.38l.893 8.398h1.596zM15.875 26v-3.04h-3.078V26h3.078z"
                fill="#bfc500"
                fillRule="nonzero"
              ></path>
            </g>
          </svg>
        </div>
        <figcaption className="attCaption">
          If a specific punk doesn't render, it means it's not on the chain yet.
          Read more in the On-Chain section below.
        </figcaption>
      </div>
      <RenderPunk />
      <h1 className="titles">ABOUT THE OX™</h1>
      <p className="text-web">
        We've recreated all the original CryptoPunks layers, added some new
        unique attributes, invented the Pigeons type, and
        generated 10,000 new CryptoPunks. The code we used for generating the
        collection is available on{" "}
        <a
          className="link-in-text"
          href="https://github.com/Takuhatsu/oxcryptopunks-image-generator"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </p>
      <h1 className="titles">TECH SPECS</h1>
      <p className="text-web">
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
      <p className="text-web">
        But first, we need to populate the internal storage with data. We
        decided to entrust this to the community. To put an OxPunk on chain, you
        need to go to the{" "}
        <Link className="link-in-text" to="/onchainpunk">
          On-Chain
        </Link>{" "}
        page, enter the punk’s ID, and press{" "}
        <span className="text-web-italic">ADD PUNK</span>. This will push byte
        data of a punk to the internal storage of the OxCryptoPunks smart
        contract. <span className="text-web-italic">ADD ATTRIBUTES</span> will
        push the attributes list of the selected punk to the blockchain. Punks
        can only be inserted to the blockchain in sequential order. On the{" "}
        <Link className="link-in-text" to="/onchainpunk">
          On-Chain
        </Link>{" "}
        page, under the <span className="text-web-italic">ADD PUNK</span> and{" "}
        <span className="text-web-italic">ADD ATTRIBUTES</span> form, you will
        see the information about the next available image ID and attributes ID
        for onchaining. After all punks and all attributes are on the
        blockchain, we will seal the contract and the internal storage will not
        be modifiable anymore.
      </p>
      <h1 id="scrollToMint" className="titles">
        MINT A PUNK
      </h1>
      <Mint id="mint-section" />
      <h1 id="scrollToOnChain" className="titles">
        ON-CHAIN
      </h1>
      <p className="text-web">
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
      <OnchainPunk />
      <p id="smart-contract-address" className="text-web">
        VERIFIED SMART CONTRACT ADDRESS:{" "}
        <a
          className="link-in-text"
          href="https://github.com/Takuhatsu/oxcryptopunks-image-generator"
          target="_blank"
          rel="noreferrer"
        >
          0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
        </a>
      </p>
      <p id="smart-contract-address-mobile" className="text-web">
        VERIFIED SMART CONTRACT ADDRESS:{" "}
        <a
          className="link-in-text"
          href="https://github.com/Takuhatsu/oxcryptopunks-image-generator"
          target="_blank"
          rel="noreferrer"
        >
          0xBC4CA0E...8a936f13D
        </a>
      </p>
      </div>
    </div>
  );
};

export default MainPageContent;