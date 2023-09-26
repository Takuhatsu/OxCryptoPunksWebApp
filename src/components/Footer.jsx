import React from 'react';
import { FaTwitter, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className='footer-wrapper'>
        <footer className='footer'>
          <div className='footer-content'>
            <div className='footer-logo'>
              <svg
                className='RDLogo'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 687.06 521.16'
              >
                <polygon points='687.06 387.78 553.93 317.64 549.53 10.21 433.13 10.34 436.38 255.71 387.89 230.16 387.2 0 266.51 .36 268.02 167 222.35 142.94 227.83 15.63 109.44 10.31 106.47 81.89 55.27 54.92 0 158.75 101.05 212.54 88.38 517.63 206.07 521.16 216.71 274.11 269.24 302.07 271.08 506.35 388.71 506 388.29 365.45 438.19 392.01 439.83 516.27 556.77 516.17 555.89 454.67 630.35 494.31 687.06 387.78' />
              </svg>
            </div>
            <div className='footer-social-icons'>
              <div id='icons'>
                <a
                  href='https://twitter.com/OxCryptoPunks'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaTwitter />
                </a>
                <a
                  href='https://instagram.com/oxcryptopunks'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaInstagram />
                </a>
                <a
                  href='https://discord.com/766347'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaDiscord />
                </a>
                <a
                  href='https://youtube.com/rockstardrop'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaYoutube />
                </a>
              </div>
              <p className='pFooter'>© 2023 Rockstar Drop</p>
              <Link to='/terms' id='tos'>
                OxPunks Terms & Conditions
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;