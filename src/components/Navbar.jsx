import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Breadcrumbs } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import PunkLogo from '../images/OxLogo.svg';
import './Navbar.css';
import { scrollToSectionSmoothly } from './SmoothScroll';

const CustomSeparator = () => {
  return ''; // Return null to remove the separator
};

const Navbar = ({ className, onMintLinkClick  }) => {
  const [activeLink, setActiveLink] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
    // You can add any other actions you want to perform when the menu is closed.
    // The scrolling behavior is removed from this function.
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

// Do we need the following code? Seems it's the part from old scrolling behavior. But need to check

  // useEffect(() => {
  //   const handleScroll = () => {
  //     sessionStorage.setItem('scrollPosition', JSON.stringify(window.scrollY));
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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

  const mintLinkDestination = activeLink === '/' ? '#mint' : '/';
  const onchainLinkDestination = activeLink === '/' ? '#onchain' : '/';


  return (
    <AppBar
      className={className}
      position='static'
      elevation={0}
      edge='start'
      color='inherit'
      aria-label='logo'
    >
      <Toolbar disableGutters>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div id='OxLogo'>
            <img src={PunkLogo} alt='Punk Logo' />
          </div>
        </Link>
        <div className='breadcrumbs-container'>
          <Breadcrumbs aria-label='breadcrumb' separator={<CustomSeparator />}>
            <Link
              className='navlink'
              style={{
                textDecoration:
                  'none',
                color: activeLink === '/mintapunk' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => scrollToSectionSmoothly('scrollToMint')}
              to={mintLinkDestination}
            >
              Mint a Punk
            </Link>
            <Link
              className='navlink'
              style={{
                textDecoration:
                  'none',
                color: activeLink === '/mintapunk' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSectionSmoothly('scrollToOnChain');
              }}
              to={onchainLinkDestination}
            >
              On-Chain a Punk
            </Link>
           
            <Link
              className={`navlink ${
                activeLink === '/gallery'
              }`}
              style={{
                textDecoration: 'none',
                color: activeLink === '/gallery' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
              }}
              onClick={() => {
                setActiveLink('/gallery');
                setIsMobileMenuOpen(false);
              }}
              to='/gallery'
            >
              Gallery
            </Link>
           
            <Link
              className={`navlink ${
                activeLink === '/manifesto'
              }`}
              style={{
                textDecoration: 'none',
                color: activeLink === '/manifesto' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
              }}
              onClick={() => {
                setActiveLink('/manifesto');
                setIsMobileMenuOpen(false);
              }}
              to='/manifesto'
            >
              Manifesto
            </Link>
          </Breadcrumbs>
        </div>
        <div className='menu-icon-container'>
          {isMobileMenuOpen ? (
            <CloseIcon onClick={handleMenuClose} />
          ) : (
            <MenuIcon
              onClick={() => {
                handleMobileMenuToggle();
                if (activeLink === '/mintapunk') {
                }
              }}
            />
          )}
        </div>
      </Toolbar>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='mobile-menu'>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              scrollToSectionSmoothly('scrollToMint');
              setIsMobileMenuOpen(false);
            }}
            to={mintLinkDestination}
          >
            Mint a Punk
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              scrollToSectionSmoothly('scrollToOnChain');
              setIsMobileMenuOpen(false);
            }}
            to={onchainLinkDestination}
          >
            On-Chain a Punk
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              setActiveLink('/gallery');
              setIsMobileMenuOpen(false);
            }}
            to='/gallery'
          >
            Gallery
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              setActiveLink('/manifesto');
              setIsMobileMenuOpen(false);
            }}
            to='/manifesto'
          >
            Manifesto
          </Link>
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;