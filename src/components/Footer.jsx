import React from 'react';
import { FaTwitter, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import RDLogo from "../images/rdlogo.svg";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={RDLogo} alt="Rockstar Drop" />
          </div>
          <div className="footer-social-icons">
            <div id='icons'>
            <a href="https://twitter.com/OxCryptoPunks" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/oxcryptopunks" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://discord.com/766347" target="_blank" rel="noreferrer">
              <FaDiscord />
            </a>
            <a href="https://youtube.com/rockstardrop" target="_blank" rel="noreferrer">
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