import React from "react";
import { Link } from "react-router-dom";
import { RenderPunk } from "./RenderPunk";
import Mint from "./Mint";
import OnchainPunk from "./OnchainPunk";
import punkIntro from "../images/LOAD.mp4";
import fingerDown from "../images/emoji/white-down-pointing-backhand-index_1f447.png";
import explosionHead from "../images/emoji/shocked-face-with-exploding-head_1f92f.png";

const MainPageContent = () => {
  const oxpunksSmartContractAddress =
    "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  return (
    <div className="App">
      <div className="hero-video">
        <div className="crt">
          <video
            className="image"
            src={punkIntro}
            alt="Punk Variety"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      <div className="content-wrapper">
        <figcaption className="caption">
          Strongly influenced by CryptoPunks™
        </figcaption>
        <p className="text-web">
          10,000 unique collectible characters, with proof of ownership stored
          as binary code on the Ethereum blockchain, which can be retrieved and
          rendered as a final image. This project is a combo of a classic NFT
          collection utilizing IPFS to store images and metadata with fully
          on-chain implementation.
        </p>
        <h1 className="titles">RENDER PUNK FROM THE BLOCKCHAIN</h1>
        <p className="pID">
          Type the punk's ID into the form and press the LOAD button. If the
          requested punk is already on the chain, it will be rendered.{" "}
          <img
            src={explosionHead}
            alt="Explosion head"
            className="emoji-image"
          />
        </p>
        <div className="attention-container">
          <div className="svg-container">
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
            If a specific punk doesn't render, it means it's not on the chain
            yet. Read more in the On-Chain section below.
          </figcaption>
        </div>
        <RenderPunk />
        <h1 className="titles">ABOUT THE OX™</h1>
        <p className="text-web">
          OxCryptoPunks are created by Takuhatsu, an animation/illustration
          artist, and software developer who has collaborated with The New
          Yorker, Esquire, Disney, MTV, Machinima, and many others. For
          OxCryptoPunks, Takuhatsu recreated all the original CryptoPunks
          layers, added new unique attributes, introduced the Pigeon type, and
          generated 10,000 new CryptoPunks. Through the OxCryptoPunks NFT
          collection, Takuhatsu presents a new art movement called Blackmarket.
          For more information, visit the{" "}
          <Link className="link-in-text" to="/manifesto">
            Manifesto
          </Link>{" "}
          page. The code written to generate the collection is available on{" "}
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
        <h1 id="scrollToMint" className="titles">
          MINT A PUNK
        </h1>
        <p className="text-web">
          After you purchased a punk, you can insert its image and attributes in
          the blockchain. For more information, see the On-Chain section below
          <img
            src={fingerDown}
            alt="Finger pointing down"
            className="emoji-image"
          />
          .
        </p>
        <Mint id="mint-section" />
        <h1 id="scrollToOnChain" className="titles">
          ON-CHAIN
        </h1>
        <p className="text-web">
          To upload a punk image to the blockchain, connect your wallet, enter the ID of the punk you
          own and press the <span className="text-web-italic">ADD PUNK</span>{" "}
          button. To upload punk attributes to the blockchain, enter the ID of
          the punk you own and press the{" "}
          <span className="text-web-italic">ADD ATTRIBUTES</span> button. You
          will be asked to pay a gas fee for both transactions. No additional
          costs will be deducted from you. Please note that only a punk owner is allowed to use these functions! 
        </p>
        <OnchainPunk />
        <h1 className="titles">TECH SPECS</h1>
        <p className="text-web">
          Any digital file in the world can be represented as bytecode. Bytecode
          contains complete information about the file. This means that if we
          have the file's bytecode, we can easily restore the file from it. Raw
          bytecode consists of 1s and 0s - something like 100101011100101. Such
          bytecode, which represents a tiny 24x24 pixel punk image, is still
          quite large. Here's where the hexadecimal numerical system comes to
          our aid. If you have a MetaMask wallet, just take a look at its
          original address - it's a number in the hexadecimal system.
        </p>
        <p className="text-web">
          So, what did we do here? After generating all the OxCryptoPunks, we
          processed each of them through our precious algorithm. This algorithm
          obtained bytecode for each image and converted it into hexadecimal
          numbers, which are much shorter than raw bytecode but can still be
          converted back to full bytecode.
        </p>
        <p className="text-web">
          When you press the <span className="text-web-italic">ADD PUNK</span>{" "}
          button, a hexadecimal representation of the bytecode for the given
          punk image is sent to the internal storage of the smart contract and
          will remain there forever... well, until the Ethereum network ceases
          to exist...
        </p>
        <p className="text-web">
          Then, when you press the Load button, the hexadecimal bytecode
          retrieved from the contract's internal storage is processed through
          the contract's algorithm to be converted into SVG code. Finally, that
          SVG code is rendered on this page. Voilà!{" "}
          <span className="text-web-italic">ADD ATTRIBUTES</span> has a slightly
          different implementation, but the idea is the same - we upload the
          given punk's attributes to the contract's internal storage to make
          them permanently available on the Ethereum blockchain.
        </p>
        <p className="text-web">
          The entire concept of storing images and attributes on the blockchain
          was inspired by the{" "}
          <a
            className="link-in-text"
            href="https://etherscan.io/address/0x16f5a35647d6f03d5d3da7b35409d65ba03af3b2#code"
            target="_blank"
            rel="noreferrer"
          >
            CryptopunksData
          </a>{" "}
          project.
        </p>
        <p className="text-web">
          But first, we need to populate the internal storage with data. We
          decided to entrust this to the community. To put an OxPunk on chain,
          you need to go to the{" "}
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
          see the information about the next available image ID and attributes
          ID for onchaining. After all punks and all attributes are on the
          blockchain, we will seal the contract and the internal storage will
          not be modifiable anymore.
        </p>
        <p id="smart-contract-address" className="text-web">
          VERIFIED SMART CONTRACT ADDRESS:{" "}
          <a
            className="link-in-text"
            href="https://github.com/Takuhatsu/oxcryptopunks-image-generator"
            target="_blank"
            rel="noreferrer"
          >
            {oxpunksSmartContractAddress}
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
            {`${oxpunksSmartContractAddress.substring(
              0,
              6
            )}...${oxpunksSmartContractAddress.substring(
              oxpunksSmartContractAddress.length - 4
            )}`}
          </a>
        </p>
      </div>
    </div>
  );
};

export default MainPageContent;
