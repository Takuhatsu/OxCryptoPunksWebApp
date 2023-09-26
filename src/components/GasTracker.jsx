import React, { useState, useEffect } from 'react';

const GasPriceTracker = () => {
  const [gasPrices, setGasPrices] = useState({
    safeGasPrice: null,
    proposedGasPrice: null,
    fastGasPrice: null,
  });

  const fetchGasPrices = () => {
    const apiKey = 'IV8ZDP33SVEDUJEBV429FUCMXNBS1TZSJZ';
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { result } = data;
        if (result) {
          setGasPrices({
            safeGasPrice: result.SafeGasPrice,
            proposedGasPrice: result.ProposeGasPrice,
            fastGasPrice: result.FastGasPrice,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching gas prices:', error);
      });
  };

  useEffect(() => {
    // Initial fetch
    fetchGasPrices();

    // 14-second interval to fetch gas prices periodically
    const intervalId = setInterval(fetchGasPrices, 14000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Ethereum Gas Prices</h2>
      <p>Safe Gas Price: {gasPrices.safeGasPrice} Gwei</p>
      <p>Proposed Gas Price: {gasPrices.proposedGasPrice} Gwei</p>
      <p>Fast Gas Price: {gasPrices.fastGasPrice} Gwei</p>
    </div>
  );
};

export default GasPriceTracker;