import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RenderPunk } from './RenderPunk';
import Mint from './Mint';
import OnchainPunk from './OnchainPunk';
import punkIntro from '../images/LOAD.mp4';
import { scrollToSectionSmoothly } from './SmoothScroll';
import ConnectWallet from './ConnectWallet';
import GasPriceTracker from './GasTracker';

const MainPageContent = () => {
  const oxpunksSmartContractAddress =
    '0x5cC33e376A6438FA1c72b5085bc2C996F748253D';

  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const scrollPosition =
      JSON.parse(sessionStorage.getItem('scrollPosition')) || 0;
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.key]);

  const onchainLinkDestination = activeLink === '/' ? '#onchain' : '/';

  return (
    <div className='App'>
      <div className='hero-video'>
        <div className='crt'>
          <video
            className='image'
            src={punkIntro}
            alt='Punk Variety'
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      <div className='content-wrapper'>
        <figcaption className='caption'>
          Strongly influenced by CryptoPunks™
        </figcaption>
        <p className='text-web'>
          10,000 unique collectible characters, with proof of ownership stored
          as binary code on the Ethereum blockchain, which can be retrieved and
          rendered as a final image. This project is a combo of a classic NFT
          collection utilizing IPFS to store images and metadata with fully
          on-chain implementation.
        </p>
        <h1 className='titles'>RENDER PUNK FROM THE BLOCKCHAIN</h1>
        <p className='pID'>
          Type the punk's ID into the form and press the{' '}
          <span className='text-web-italic'>LOAD</span> button. If the requested
          punk is already on the chain, it will be rendered.
        </p>
        <div className='attention-container'>
          <div className='svg-container'>
            <svg
              data-v-86a7af3e=''
              width='29'
              height='26'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  stroke='#bfc500'
                  strokeWidth='2'
                  strokeLinejoin='round'
                  d='M9.686 25h-8.5l13-24 13 24h-8'
                ></path>
                <path
                  d='M15.134 21.478l.893-8.398v-.38h-3.382v.38l.893 8.398h1.596zM15.875 26v-3.04h-3.078V26h3.078z'
                  fill='#bfc500'
                  fillRule='nonzero'
                ></path>
              </g>
            </svg>
          </div>
          <figcaption className='attCaption'>
            If a specific oxPunk doesn't render, it means it's not on the chain
            yet. Read more in the On-Chain section below.
          </figcaption>
        </div>
        <RenderPunk />
        <p className='text-web'>
          If you've got the punk bot image for the provided ID, it means that
          there is no image on-chain for the given oxPunk. If it's your oxPunk,
          you can go to the
          <Link
            style={{
              textDecoration: 'none',
              color: activeLink === '/mintapunk' ? '#bfc500' : 'inherit',
              transition: 'color 0.3s',
              cursor: 'pointer',
            }}
            onClick={() => {
              scrollToSectionSmoothly('scrollToOnChain');
            }}
            to={onchainLinkDestination}
          >
            {' '}
            <span className='text-web-italic'>On-Chain</span>{' '}
          </Link>
          section and add your oxPunk to the blockchain by running the{' '}<span className='text-web-italic'>ADD PUNK</span>{' '}and{' '}<span className='text-web-italic'>ADD ATTRIBUTES</span>{' '}functions.
        </p>

        <h1 className='titles'>ABOUT THE OX™</h1>
        <p className='text-web'>
        <span className='text-web-italic'>OxCryptoPunks</span>{' '}are created by{' '}<span className='text-web-italic'>Takuhatsu</span>, an animation/illustration
          artist, and software developer who has collaborated with{' '}<span className='text-web-italic'>The New
          Yorker</span>,{' '}<span className='text-web-italic'>Esquire</span>,{' '}<span className='text-web-italic'>Disney</span>,{' '}<span className='text-web-italic'>MTV</span>,{' '}<span className='text-web-italic'>Machinima</span>, and many others. For
          OxCryptoPunks, Takuhatsu recreated all the original CryptoPunks
          layers, added new unique attributes, introduced the Pigeon type, and
          generated 10,000 new CryptoPunks. Through the OxCryptoPunks NFT
          collection, Takuhatsu presents a new art movement called{' '}
          <span className='text-web-bold'>Blackmarket</span>. For more
          information, visit the{' '}
          <Link className='link-in-text' to='/manifesto'>
            Manifesto
          </Link>{' '}
          page. The code written to generate the collection is available on{' '}
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
        <h1 id='scrollToMint' className='titles'>
          MINT A PUNK
        </h1>
        <p className='text-web'>Price: 0.005Ξ</p>
        <p className='text-web'>
          After you purchased a punk, you can insert its image and attributes in
          the blockchain. For more information, see the On-Chain section. If
          you're browsing this website from a mobile device, you should see the{' '}<span className='text-web-italic'>Connect Wallet</span>{' '}button below. This button will open the website within
          your MetaMask application browser, enabling the{' '}
          <span className='text-web-italic'>MINT</span>,{' '}
          <span className='text-web-italic'>ADD PUNK</span>, and{' '}
          <span className='text-web-italic'>ADD ATTRIBUTES</span> buttons for
          mobile use.
        </p>
        <ConnectWallet />
        <Mint id='mint-section' />
        <h1 id='scrollToOnChain' className='titles'>
          ON-CHAIN
        </h1>
        <GasPriceTracker />
        <p className='text-web'>
          To upload a punk image to the blockchain, connect your wallet, enter
          the ID of the punk you own and press the{' '}
          <span className='text-web-italic'>ADD PUNK</span> button. To upload
          punk attributes to the blockchain, enter the ID of the punk you own
          and press the <span className='text-web-italic'>ADD ATTRIBUTES</span>{' '}
          button. You will be asked to pay a gas fee for both transactions. No
          additional costs will be deducted from you. Please note that only a
          punk owner is allowed to use these functions!
        </p>
        <div className='attention-container'>
          <div className='svg-container'>
            <svg
              data-v-86a7af3e=''
              width='29'
              height='26'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  stroke='#bfc500'
                  strokeWidth='2'
                  strokeLinejoin='round'
                  d='M9.686 25h-8.5l13-24 13 24h-8'
                ></path>
                <path
                  d='M15.134 21.478l.893-8.398v-.38h-3.382v.38l.893 8.398h1.596zM15.875 26v-3.04h-3.078V26h3.078z'
                  fill='#bfc500'
                  fillRule='nonzero'
                ></path>
              </g>
            </svg>
          </div>
          <figcaption className='attCaption'>
            Images and attributes can be added to the same oxPunk ID infinitely. Make sure to keep track of oxPunks you adding.
          </figcaption>
        </div>
        <OnchainPunk />
        <h1 className='titles'>TECH SPECS</h1>
        <div className='text-web'>
          Any uncompressed digital image file can be represented as bytecode. In
          this case, bytecode contains the complete pixel data of the file.
          Hence, we can easily restore the file from its bytecode. For
          demonstration, the following is the bytecode which represents the text
          'OxCryptoPunks', where each group of 1s and 0s represents a
          corresponding symbol:
          <div className='bytecodeDemo'>
            01001111 01111000 01000011 01110010 01111001 01110000 01110100
            01101111 01010000 01110101 01101110 01101011 01110011
          </div>
          <p className='text-web'>Here, x = '01111000', and s = '01110011'.</p>
        </div>
        <p className='text-web'>
          So, what did we accomplish here? After generating all the
          OxCryptoPunks, we processed each of them using our precious algorithm,
          resulting in bytecode containing full information about each pixel
          within a 24x24 pixel image.
        </p>
        <p className='text-web'>
          When you press the <span className='text-web-italic'>ADD PUNK</span>{' '}
          button, bytecode for the given punk image is sent to the internal
          storage of the smart contract and will remain there forever... well,
          until the Ethereum network ceases to exist...
        </p>
        <p className='text-web'>
          Then, when you press the <span className='text-web-italic'>LOAD</span>{' '}
          button to view your punk, bytecode retrieved from the contract's
          internal storage is processed through the contract's algorithm,
          converting it into image. Finally, this image is rendered on this
          page. Voilà! <span className='text-web-italic'>ADD ATTRIBUTES</span>{' '}
          has a different implementation, but the idea remains the same: we
          upload the given punk's attributes to the contract's internal storage,
          making them permanently available on the Ethereum blockchain.
        </p>
        <p className='text-web'>
          The entire concept of storing images and attributes on the blockchain
          was inspired by the{' '}
          <a
            className='link-in-text'
            href='https://etherscan.io/address/0x16f5a35647d6f03d5d3da7b35409d65ba03af3b2#code'
            target='_blank'
            rel='noreferrer'
          >
            CryptopunksData
          </a>{' '}
          project.
        </p>
        <br />
        <p id='metamaskAddress' className='text-web'>
          VERIFIED SMART CONTRACT ADDRESS:{' '}
          <a
            className='link-in-text'
            href='https://etherscan.io/address/0x5cc33e376a6438fa1c72b5085bc2c996f748253d'
            target='_blank'
            rel='noreferrer'
          >

            <span id='linkUnderlined'>{oxpunksSmartContractAddress}</span>
          </a>
        </p>
        <p id='metamaskAddressMobile' className='text-web'>
          VERIFIED SMART CONTRACT ADDRESS:{' '}
          <a
            className='link-in-text'
            href='https://etherscan.io/address/0x5cc33e376a6438fa1c72b5085bc2c996f748253d'
            target='_blank'
            rel='noreferrer'
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
