import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { ethers } from "ethers";
import LoadingAnimation from "./LoadingAnimation";

const PunkDetails = () => {
  // Remove the "selectedPunk" prop
  const { punkId } = useParams(); // Get the punkId from the route params
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const contractAddress = "0x3e83D6adcBe766F51D7223A14A10abD81daBDF3E";
    const infuraProvider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/1a73e3cf898942dd9fd748aedba6a430"
    );
    const abi = [
      {
        constant: true,
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
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
        console.error("Error fetching owner:", error);
        setOwner("0x0000000000000000000000000000000000000000");
      } finally {
        setLoading(false);
      }
    }

    fetchOwner();
  }, [punkId]); // Add punkId to the dependency array

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <div className="punkImageBg">
        <div className="punkDetailsImage">
          <img
            src={`https://raw.githubusercontent.com/Takuhatsu/OxCryptoPunksWebApp/main/src/images/gallery/${punkId}.png`} // Use the punkId for the image source
            alt=""
            className="punkDetailsImage"
          />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="text-web">{`OxCryptoPunk #${punkId}`}</div>
        <div className="text-web">
          Owner:
          <a
            className="link-in-text"
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/address/${owner}`}
          >
            {`${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PunkDetails;
