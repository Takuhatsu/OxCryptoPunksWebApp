import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Import useParams
import { ethers } from 'ethers';
import LoadingAnimation from './LoadingAnimation';

const PunkDetails = () => {
  // Remove the 'selectedPunk' prop
  const { punkId } = useParams(); // Get the punkId from the route params
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const contractAddress = '0x5cC33e376A6438FA1c72b5085bc2C996F748253D';
    const infuraProvider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/ffed0621bad74886bffe623e6abddaca'
    );
    const abi = [
      {
        constant: true,
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];

    async function fetchOwner() {
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        infuraProvider
      );

      try {
        const ownerAddress = await contract.ownerOf(punkId); // Use the punkId from useParams
        setOwner(ownerAddress);
      } catch (error) {
        console.error('Error fetching owner:', error);
        setOwner('0x0000000000000000000000000000000000000000');
      } finally {
        setLoading(false);
      }
    }

    fetchOwner();
  }, [punkId]); // Add punkId to the dependency array

  if (loading) {
    return (
      <div className='loading-container'>
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='App'>
      <div className='punkImageBg'>
        <div className='punkDetailsImage'>
          <img
            src={`https://raw.githubusercontent.com/Takuhatsu/OxCryptoPunksWebApp/main/src/images/gallery/${punkId}.png`} // Use the punkId for the image source
            alt=''
            className='punkDetailsImage'
          />
        </div>
      </div>
      <div className='content-wrapper'>
        <div
          className='text-web'
          id='textCenter'
        >{`OxCryptoPunk #${punkId}`}</div>

        <div id='metamaskAddress'>
          Owner:{' '}
          <a
            className='link-in-text'
            target='_blank'
            rel='noreferrer'
            href={`https://etherscan.io/address/${owner}`}
          >
            {`${owner}`}
          </a>
        </div>
        <div id='metamaskAddressMobile'>
          Owner:{' '}
          <a
            className='link-in-text'
            target='_blank'
            rel='noreferrer'
            href={`https://etherscan.io/address/${owner}`}
          >
            {`${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`}
          </a>
        </div>
      </div>
<div className='content-wrapper'>
      {' '}
          <Link className='linkNoHighlight' to='/gallery'>
            Back to gallery 
          </Link>{' '}
          </div>

      {/* <div className='transactionTable'>
        <table className='table'>
          <tbody>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Txn</th>
            </tr>
            <tr className='punk-history-row-claim'>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default PunkDetails;
