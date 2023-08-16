import React from 'react';
import { FaTwitter, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-logo'>
          <svg
            className='RDLogo'
            version='1.1'
            id='Layer_3'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 398.5 291.2'
            xmlSpace='preserve'
          >
              <polygon points='398.4,183.6 336.4,159.9 311,6.4 241.5,17.9 260.2,130.7 230.3,119.3 234,21.2 163.6,18.5 160.8,92.7 
	              133.3,82.1 141.5,13 71.5,4.7 65.4,56.2 25.3,40.8 0.1,106.6 56.9,128.3 39.1,278.7 109.1,287 124.8,154.3 158,167 153.5,285.1 
	              223.9,287.8 227.5,193.6 273.5,211.2 286.1,287.1 355.6,275.6 349.8,240.4 373.2,249.4' />
            </svg>
          </div>
          <div className='footer-social-icons'>
            <div id='icons'>
            <a href='https://twitter.com/OxCryptoPunks' target='_blank' rel='noreferrer'>
              <FaTwitter />
            </a>
            <a href='https://instagram.com/oxcryptopunks' target='_blank' rel='noreferrer'>
              <FaInstagram />
            </a>
            <a href='https://discord.com/766347' target='_blank' rel='noreferrer'>
              <FaDiscord />
            </a>
            <a href='https://youtube.com/rockstardrop' target='_blank' rel='noreferrer'>
              <FaYoutube />
            </a>
            </div>
            <p className='pFooter'>© 2023 Rockstar Drop</p>
            <Link to='/terms' id='tos'>OxPunks Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;