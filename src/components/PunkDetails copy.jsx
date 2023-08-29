import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LoadingAnimation from "./LoadingAnimation"; // Make sure to provide the correct path to LoadingAnimation

const PunkDetails = ({ selectedPunk, onClose }) => {
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const punkNumber = extractPunkNumber(selectedPunk.name);

    // Replace with your contract's address and ABI
    const contractAddress = "0x3e83D6adcBe766F51D7223A14A10abD81daBDF3E";
    const infuraProvider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/1a73e3cf898942dd9fd748aedba6a430');
    const abi = [
      {
        constant: true,
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ];

    async function fetchOwner() {
      const contract = new ethers.Contract(contractAddress, abi, infuraProvider);
    
      try {
        const ownerAddress = await contract.ownerOf(punkNumber);
        setOwner(ownerAddress);
      } catch (error) {
        console.error("Error fetching owner:", error);
        setOwner("BRB"); // Set owner to an empty string
      } finally {
        setLoading(false);
      }
    }

    fetchOwner();
  }, [selectedPunk]);

  function extractPunkNumber(punkName) {
    const matches = punkName.match(/\d+$/); // Find the last sequence of digits in the name
    if (matches) {
      return parseInt(matches[0], 10);
    }
    return 0; // Default value
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="punkDetail">
      <div className="overlay" onClick={onClose} />
      <div className="punkCard">
        <div className="close-icon" onClick={onClose}>
          <span>&times;</span>
        </div>
        <img
          src={selectedPunk.imageSource}
          alt=""
          className="punk-image"
        />
        <div className="text-web">{selectedPunk.name}</div>
        <div className="text-web">Owner: {owner}</div>
      </div>
    </div>
  );
};

export default PunkDetails;