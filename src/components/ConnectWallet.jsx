import React, { useState, useEffect } from 'react';
import MetaMaskWalletLogo from '../images/MetaMask_Fox.png'; // Replace with actual path

const ConnectWallet = () => {
  const [showButton, setShowButton] = useState(false); // Set initial state to false

  useEffect(() => {
    const mobileOS = getMobileOS();
  
    if (mobileOS === 'iOS' || mobileOS === 'Android') {
      setShowButton(true); // Show the button only on mobile devices
    }
  }, []);

  const getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return 'Android';
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      return 'iOS';
    }
    return 'Other';
  };

  const handleConnectClick = () => {
    // Perform the desired action when the div is clicked
    window.location.href = 'https://metamask.app.link/dapp/oxcryptopunks.app';
  };

  return showButton ? (
    <div className='walletConnectIfMobile'>
      <div className='centered-content'>
        <p className='j'>Please connect your wallet since you're on mobile.</p>
        <div className='launchMetaMask' onClick={handleConnectClick}>
          <p className='text-web'>
            {' '}
            <img
              src={MetaMaskWalletLogo}
              alt='MetaMask Wallet Logo'
              className='metamaskImage'
            />
            Connect Wallet
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConnectWallet;