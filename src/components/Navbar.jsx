import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Breadcrumbs } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSectionSmoothly } from './SmoothScroll';
import OxLogo from '../images/OxLogo.png';

const CustomSeparator = () => {
  return ''; // Return null to remove the separator
};

const Navbar = ({ className, onMintLinkClick }) => {
  const [activeLink, setActiveLink] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
    <div className='navbar-wrapper'>
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
          <img id='OxLogo' src={OxLogo} alt='Ox Logo' />
          </div>
        </Link>
        <div className='breadcrumbs-container'>
          <Breadcrumbs aria-label='breadcrumb' separator={<CustomSeparator />}>
            <Link
              className='navlink'
              style={{
                textDecoration: 'none',
                color: activeLink === '/mintapunk' ? '#bfc500' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => scrollToSectionSmoothly('scrollToMint')}
              to={mintLinkDestination}
            >
              MINT A PUNK
            </Link>
            <Link
              className='navlink'
              style={{
                textDecoration: 'none',
                color: activeLink === '/mintapunk' ? '#bfc500' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSectionSmoothly('scrollToOnChain');
              }}
              to={onchainLinkDestination}
            >
              ON-CHAIN A PUNK
            </Link>

            <Link
              className={`navlink ${activeLink === '/gallery'}`}
              style={{
                textDecoration: 'none',
                color: activeLink === '/gallery' ? '#bfc500' : 'inherit',
                transition: 'color 0.3s',
              }}
              onClick={() => {
                setActiveLink('/gallery');
                setIsMobileMenuOpen(false);
              }}
              to='/gallery'
            >
              GALLERY
            </Link>

            <Link
              className={`navlink ${activeLink === '/manifesto'}`}
              style={{
                textDecoration: 'none',
                color: activeLink === '/manifesto' ? '#bfc500' : 'inherit',
                transition: 'color 0.3s',
              }}
              onClick={() => {
                setActiveLink('/manifesto');
                setIsMobileMenuOpen(false);
              }}
              to='/manifesto'
            >
              MANIFESTO
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
            MINT A PUNK
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              scrollToSectionSmoothly('scrollToOnChain');
              setIsMobileMenuOpen(false);
            }}
            to={onchainLinkDestination}
          >
            ON-CHAIN A PUNK
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              setActiveLink('/gallery');
              setIsMobileMenuOpen(false);
            }}
            to='/gallery'
          >
            GALLERY
          </Link>
          <Link
            className='mobile-menu-link'
            onClick={() => {
              setActiveLink('/manifesto');
              setIsMobileMenuOpen(false);
            }}
            to='/manifesto'
          >
            MANIFESTO
          </Link>
        </div>
      )}
    </AppBar>
    </div>
  );
};

export default Navbar;
