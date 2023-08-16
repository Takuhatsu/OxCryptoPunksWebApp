import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Breadcrumbs } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSectionSmoothly } from './SmoothScroll';

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
            <svg className='OxLogoSVG'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 230.2 44.1'
            >
              <polygon 
                points='146.1,12.5 143.1,14.3 143.1,16.5 143.1,18.9 143.1,21.8 143.1,23.9 143.1,25.7 143.2,25.7 146.1,25.7 
			146.1,21.8 146.1,19 148.6,19 148.6,16.5 146.1,16.5 		'
              />
              <path 
                d='M135.4,16.2c-0.7,0-1.5,0.2-2.1,0.5s-1.1,0.8-1.5,1.4v-1.6H129v15.7h3v-5.7c0.5,0.6,1.1,1,1.6,1.3
			c0.5,0.3,1.1,0.4,1.7,0.4c1.3,0,2.5-0.5,3.4-1.6c0.9-1,1.4-2.6,1.4-4.5c0-1.8-0.5-3.3-1.4-4.3C137.8,16.8,136.7,16.2,135.4,16.2z
			 M136.4,24.9c-0.5,0.5-1,0.8-1.7,0.8c-0.7,0-1.4-0.3-1.8-0.9c-0.5-0.6-0.7-1.6-0.7-2.8c0-1.1,0.3-1.9,0.7-2.6
			c0.5-0.5,1.1-0.8,1.8-0.8c0.7,0,1.3,0.3,1.7,0.8c0.5,0.5,0.7,1.5,0.7,2.6C137,23.4,136.8,24.4,136.4,24.9z'
              />
              <polygon 
                points='88.4,16.5 84.8,16.5 82.7,19.6 80.7,16.5 77.1,16.5 81,22.1 76.9,27.9 80.4,27.9 82.7,24.4 85,27.9 88.7,27.9 
			84.5,21.9 		'
              />
              <path 
                d='M121,24.6l-2.7-8H115l4.3,11.3c-0.2,0.6-0.5,1.2-0.7,1.6c-0.4,0.5-0.8,0.6-1.6,0.6c-0.4,0-0.8,0-1.3-0.1l0.3,2.4
			c0.5,0.1,1.1,0.2,1.7,0.2c0.6,0,1.1-0.1,1.6-0.2s0.8-0.3,1.2-0.5c0.4-0.3,0.5-0.5,0.8-0.8c0.3-0.4,0.5-0.8,0.7-1.6l0.7-2l4-11
			h-3.1L121,24.6z'
              />
              <rect x='173.9' y='14.9' width='2.4' height='4.5' />
              <path 
                d='M203.4,17.5c-0.3-0.4-0.7-0.6-1.3-0.9c-0.5-0.3-1.2-0.4-1.8-0.4c-1.5,0-2.7,0.6-3.7,1.9v-1.6h-2.8v11.4h3v-5.1
			c0-1.3,0.1-2.1,0.3-2.6s0.5-0.8,0.8-1.1s0.9-0.5,1.4-0.5c0.4,0,0.7,0.1,1,0.3c0.3,0.2,0.5,0.5,0.6,0.8c0.1,0.4,0.2,1.2,0.2,2.4
			v5.8h3v-7c0-0.9-0.1-1.6-0.2-2C203.7,18.4,203.6,17.9,203.4,17.5z'
              />
              <polygon 
                points='217.8,16.5 214.1,16.5 210.6,20.5 210.6,12.2 207.6,12.2 207.6,27.9 210.6,27.9 210.6,24.3 212,22.8 214.9,27.9 
			218,27.9 213.9,20.7 		'
              />
              <path 
                d='M229,22.1c-0.6-0.5-1.7-1-3.4-1.4c-1.6-0.4-2.6-0.6-2.8-0.8c-0.2-0.2-0.3-0.4-0.3-0.5c0-0.3,0.1-0.5,0.4-0.6
			c0.4-0.2,0.9-0.4,1.7-0.4c0.6,0,1.1,0.1,1.5,0.4c0.4,0.3,0.5,0.5,0.7,1l2.8-0.5c-0.3-1-0.8-1.7-1.6-2.3c-0.7-0.5-1.9-0.7-3.5-0.7
			c-1.6,0-2.8,0.4-3.7,1s-1.2,1.5-1.2,2.5c0,1.1,0.5,1.9,1.4,2.6c0.6,0.5,2.2,0.9,4.7,1.5c0.5,0.1,0.8,0.3,1,0.4
			c0.2,0.2,0.2,0.4,0.2,0.5c0,0.4-0.1,0.6-0.4,0.8c-0.4,0.3-1,0.5-1.7,0.5c-0.7,0-1.3-0.2-1.6-0.5c-0.4-0.3-0.6-0.7-0.8-1.4l-3,0.5
			c0.3,1.1,0.8,1.9,1.7,2.6c0.9,0.6,2.1,0.9,3.7,0.9c1.7,0,3-0.4,3.8-1.1s1.3-1.6,1.3-2.6C229.9,23.4,229.6,22.6,229,22.1z'
              />
              <polygon  points='182.8,20.3 182.8,16.5 179.8,16.5 179.8,20.3 179.8,23.7 179.8,24.9 179.9,24.9 182.8,24.9 182.8,21.8 		' />
              <path  d='M187.1,16.5v4.8c0,0.1,0,0.3,0,0.4v0.5v2.6h-4.3v3h4.3h0.2h2.8v-3v-2.6v-5.7H187.1z' />
              <path 
                d='M99.8,15.3c0.5,0.5,1,1.1,1.2,1.9l3.1-0.7c-0.4-1.3-0.9-2.2-1.6-2.9c-1.2-1.1-2.7-1.7-4.7-1.7c-0.5,0-0.9,0-1.3,0.1v2.7
			c0.4-0.1,0.7-0.2,1.1-0.2C98.5,14.7,99.2,14.9,99.8,15.3z'
              />
              <path 
                d='M99.8,24.6c-0.6,0.5-1.4,0.8-2.2,0.8c-1.2,0-2.1-0.5-2.7-1.3c-0.6-0.8-1.1-2.3-1.1-4.2c0-1.1,0.2-2,0.4-2.7h-3.3
			c-0.3,0.9-0.4,1.9-0.4,3c0,2.5,0.6,4.4,2,5.8c1.4,1.5,3,2.1,5.1,2.1c1.6,0,3.1-0.5,4.2-1.3c1.1-0.8,1.9-2.1,2.4-3.8l-3.1-1
			C100.8,23.3,100.4,24.1,99.8,24.6z'
              />
              <polygon  points='96.5,14.8 96.5,14.8 94.1,14.8 94.1,17.2 96.5,17.2 		' />
              <rect x='146.1' y='25.7' width='2.4' height='2.4' />
              <path  
                d='M111.3,16.6c-0.4,0.3-0.8,0.7-1.3,1.6v-1.6h-2.8v11.4h3v-3.5c0-1.9,0.1-3.2,0.3-3.8c0.2-0.6,0.4-1,0.7-1.3
			c0.4-0.3,0.6-0.4,1.1-0.4s0.9,0.2,1.4,0.5l0.9-2.6c-0.6-0.4-1.3-0.5-2-0.5C112.1,16.2,111.7,16.4,111.3,16.6z'
              />
              <polygon 
                points='167.9,17.2 167.9,14.9 169.5,14.9 173.9,14.9 173.9,12.6 173.9,12.2 167.9,12.2 167.9,12.2 164.8,12.2 
			164.8,27.9 167.9,27.9 167.9,22 173.9,22 173.9,21.5 173.9,19.3 167.9,19.3 		'
              />
              <path 
                d='M67.8,12c-0.5,0-1,0.1-1.5,0.1v2.8c0.5-0.2,0.9-0.3,1.5-0.3c1.3,0,2.4,0.5,3.1,1.3c0.8,0.9,1.2,2.2,1.2,4
			c0,1.8-0.4,3.2-1.2,4.1c-0.8,0.9-1.8,1.4-3.1,1.4c-1.3,0-2.3-0.4-3.1-1.4c-0.8-1-1.2-2.3-1.2-4c0-1.1,0.2-2,0.5-2.7h2.4v-2.4h-2.5
			v2.4h-3.4c-0.2,0.9-0.3,1.8-0.3,2.9c0,2.5,0.7,4.5,2.1,5.8c1.4,1.4,3.2,2.1,5.6,2.1c2.3,0,4.1-0.7,5.6-2.2
			c1.5-1.5,2.1-3.4,2.1-5.9s-0.7-4.6-2.1-6C72,12.5,70,12,67.8,12z'
              /> 
              <path     
                d='M156,16.2c-1.1,0-2.1,0.3-3,0.7c-0.9,0.5-1.6,1.2-2.1,2.1c-0.5,0.9-0.7,1.9-0.7,2.9c0,1.3,0.3,2.4,0.7,3.3
			c0.5,0.9,1.2,1.6,2.2,2.1s1.9,0.7,3,0.7c1.6,0,3.1-0.5,4.2-1.7c1.1-1.1,1.6-2.6,1.6-4.3c0-1.7-0.5-3.1-1.6-4.2
			C159.1,16.9,157.7,16.2,156,16.2z M158,24.8c-0.5,0.6-1.2,0.9-2,0.9s-1.5-0.3-2-0.9c-0.5-0.6-0.8-1.5-0.8-2.6c0-1.1,0.3-2,0.8-2.6
			s1.2-0.9,2-0.9s1.5,0.3,2,0.9c0.5,0.6,0.8,1.5,0.8,2.6C158.8,23.4,158.5,24.2,158,24.8z'
              />


              {/* Slash separator */}
              <polygon className='OxLogoSlashSeparatorSVG' points='52.4,29.4 46.4,29.4 51.8,13.3 57.8,13.3 		' />
              {/* End of slash separator */}


              <path d='M26.4,22.1' />


              {/* Flower paths starts here */}
              <path className='OxLogoFlowerSVG'
                d='M26.4,12.8l-0.9-0.4l1.6-3.8c0.7-1.7,0.5-3.5-0.5-5s-2.7-2.4-4.5-2.4h-0.2c-1.8,0-3.5,0.9-4.5,2.4
						s-1.2,3.4-0.5,5l1.6,3.8l-0.9,0.4L16,8.9c-0.8-2-0.6-4.2,0.6-6c1.2-1.8,3.2-2.8,5.3-2.8h0.2c2.1,0,4.1,1.1,5.3,2.8
						c1.2,1.8,1.4,4,0.6,6L26.4,12.8z'
              />
              <path className='OxLogoFlowerSVG'
                d='M12.4,18.6L8.5,17c-2-0.8-3.4-2.5-3.8-4.6c-0.4-2.1,0.2-4.2,1.7-5.7l0.1-0.1c1.5-1.5,3.7-2.2,5.7-1.7
						c2.1,0.4,3.8,1.8,4.6,3.8l1.6,3.8l-0.9,0.4L16,8.9c-0.7-1.7-2.1-2.9-3.9-3.2c-1.8-0.4-3.6,0.2-4.8,1.5L7.2,7.3
						c-1.3,1.3-1.8,3.1-1.5,4.8s1.5,3.2,3.2,3.9l3.9,1.6L12.4,18.6z'
              />
              <path className='OxLogoFlowerSVG'
                d='M6.5,28.5c-1.2,0-2.5-0.4-3.5-1.1c-1.8-1.2-2.8-3.2-2.8-5.3V22c0-2.1,1.1-4.1,2.8-5.3c1.8-1.2,4-1.4,6-0.6
						l3.9,1.6l-0.4,0.9L8.5,17c-1.7-0.7-3.5-0.5-5,0.5c-1.5,1-2.4,2.7-2.4,4.5v0.2c0,1.8,0.9,3.5,2.4,4.5c1.5,1,3.4,1.2,5,0.5
						l3.9-1.6l0.4,0.9L8.9,28C8.1,28.4,7.3,28.5,6.5,28.5z'
              />
              <path className='OxLogoFlowerSVG'
                d='M11.1,39.5c-1.7,0-3.3-0.7-4.5-1.9l-0.1-0.1c-1.5-1.5-2.2-3.7-1.7-5.7c0.4-2.1,1.8-3.8,3.8-4.6l3.8-1.6
						l0.4,0.9L8.9,28c-1.7,0.7-2.9,2.1-3.2,3.9c-0.4,1.8,0.2,3.6,1.5,4.8l0.1,0.1c1.3,1.3,3.1,1.8,4.8,1.5c1.8-0.3,3.2-1.5,3.9-3.2
						l1.6-3.8l0.9,0.4L17,35.6c-0.8,2-2.5,3.4-4.6,3.8C11.9,39.5,11.5,39.5,11.1,39.5z'
              />
              <path className='OxLogoFlowerSVG'
                d='M22.1,44h-0.2c-2.1,0-4.1-1.1-5.3-2.8c-1.2-1.8-1.4-4-0.6-6l1.6-3.8l0.9,0.4L17,35.6
						c-0.7,1.7-0.5,3.5,0.5,5c1,1.5,2.7,2.4,4.5,2.4h0.2c1.8,0,3.5-0.9,4.5-2.4s1.2-3.4,0.5-5l-1.6-3.8l0.9-0.4l1.6,3.8
						c0.8,2,0.6,4.2-0.6,6C26.2,42.9,24.3,44,22.1,44z'
              />
              <path className='OxLogoFlowerSVG'
                d='M33,39.5c-0.4,0-0.8,0-1.2-0.1c-2.1-0.4-3.8-1.8-4.6-3.8l-1.6-3.8l0.9-0.4l1.6,3.8
						c0.7,1.7,2.1,2.9,3.9,3.2c1.8,0.4,3.6-0.2,4.8-1.5l0.1-0.1c1.3-1.3,1.8-3.1,1.5-4.8c-0.4-1.8-1.5-3.2-3.2-3.9l-3.9-1.6l0.4-0.9
						l3.9,1.6c2,0.8,3.4,2.5,3.8,4.6c0.4,2.1-0.2,4.2-1.7,5.7l-0.1,0.1C36.2,38.8,34.6,39.5,33,39.5z'
              />
              <path className='OxLogoFlowerSVG'
                d='M37.6,28.5c-0.8,0-1.7-0.2-2.4-0.5l-3.8-1.6l0.4-0.9l3.8,1.6c1.7,0.7,3.5,0.5,5-0.5c1.5-1,2.4-2.7,2.4-4.5
						V22c0-1.8-0.9-3.5-2.4-4.5s-3.4-1.2-5-0.5l-3.9,1.6l-0.4-0.9l3.9-1.6c2-0.8,4.2-0.6,6,0.6s2.8,3.2,2.8,5.3v0.2
						c0,2.1-1.1,4.1-2.8,5.3C40,28.2,38.8,28.5,37.6,28.5z'
              />
              <path className='OxLogoFlowerSVG'
                d='M31.6,18.6l-0.4-0.9l3.9-1.6c1.7-0.7,2.9-2.1,3.2-3.9s-0.2-3.6-1.5-4.8l-0.1-0.1c-1.3-1.3-3.1-1.8-4.8-1.5
						c-1.8,0.4-3.2,1.5-3.9,3.2l-1.6,3.9l-0.9-0.4l1.6-3.9c0.8-2,2.5-3.4,4.6-3.8c2.1-0.4,4.2,0.2,5.7,1.7l0.1,0.1
						c1.5,1.5,2.2,3.7,1.7,5.7c-0.4,2.1-1.8,3.8-3.8,4.6L31.6,18.6z'
              />
              <path className='OxLogoFlowerSVG'
                d='M22,32.8c-5.9,0-10.8-4.8-10.8-10.8S16.1,11.3,22,11.3c5.9,0,10.8,4.8,10.8,10.8S28,32.8,22,32.8z M22,12.3
				c-5.4,0-9.8,4.4-9.8,9.8s4.4,9.8,9.8,9.8c5.4,0,9.8-4.4,9.8-9.8S27.4,12.3,22,12.3z'
              />
              <path className='OxLogoFlowerSVG'
                d='M17.5,16.7l2.6-0.9c0,0-1.2,1.8-1.9,3.9c-0.6,1.9,1.8,0.1,2.4-0.4c0,0,0.1,0,0,0l-4.5,7.3c0,0-0.1,0-0.1,0
					c0.4-1.1,1.3-3.1,1.2-4.1c-0.1-1-2,1-2.3,1.4S17.5,16.7,17.5,16.7z'
              />
              <path className='OxLogoFlowerSVG'
                d='M25.7,16.7l2.6-0.9c0,0-1.2,1.8-1.9,3.9c-0.6,1.9,1.8,0.1,2.4-0.4c0,0,0.1,0,0,0l-4.5,7.3c0,0-0.1,0-0.1,0
					c0.4-1.1,1.3-3.1,1.2-4.1c-0.1-1-2,1-2.3,1.4S25.7,16.7,25.7,16.7z'
              />
              {/* Flower paths ends here */}


            </svg>
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
  );
};

export default Navbar;
