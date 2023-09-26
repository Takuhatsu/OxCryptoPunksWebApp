import React from 'react';
import nfsManifesto from '../images/BlackMarket_anim.mp4';

const Manifesto = () => {
  return (
    <div className='mainpage-container'>
      <div className='manifesto-video'>
          <video
            className='image'
            src={nfsManifesto}
            alt='Punk Variety'
            autoPlay
            loop
            muted
            playsInline
          />
      </div>
    </div>
  );
};

export default Manifesto;
