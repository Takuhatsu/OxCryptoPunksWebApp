import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  MenuItem,
  Breadcrumbs,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PunkLogo from '../images/OxLogo.svg';
import { Link, useLocation } from 'react-router-dom';

const CustomSeparator = () => {
  return null; // Return null to remove the separator
};

const Navbar = ({ className }) => {
  const [activeLink, setActiveLink] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    // Scroll to the Mint a Punk section
    const mintSection = document.getElementById('mint');
    if (mintSection) {
      mintSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Update the active link when the location changes
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Preserve scroll position when navigating
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', JSON.stringify(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Restore scroll position when navigating back or forward
    const scrollPosition =
      JSON.parse(sessionStorage.getItem('scrollPosition')) || 0;
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);

    // Disable scroll restoration when navigating
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.key]);

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
        <div role='presentation' className='breadcrumbs-container'>
          <Breadcrumbs aria-label='breadcrumb' separator={<CustomSeparator />}>
            <Link
              className='navlink'
              style={{
                textDecoration:
                  activeLink === '/mintapunk' ? 'line-through' : 'none',
                color: activeLink === '/mintapunk' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
              onClick={handleMenuClose} // Add onClick event handler
            >
              Mint a Punk
            </Link>
            <Link
              className='navlink'
              to='/onchainpunk'
              style={{
                textDecoration:
                  activeLink === '/onchainpunk' ? 'line-through' : 'none',
                color: activeLink === '/onchainpunk' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
            >
              On-Chain a Punk
            </Link>
            <Link
              className='navlink'
              to='/gallery'
              style={{
                textDecoration:
                  activeLink === '/gallery' ? 'line-through' : 'none',
                color: activeLink === '/gallery' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
            >
              Gallery
            </Link>
            <Link
              className='navlink'
              to='/manifesto'
              style={{
                textDecoration:
                  activeLink === '/manifesto' ? 'line-through' : 'none',
                color: activeLink === '/manifesto' ? '#ea34b0' : 'inherit',
                transition: 'color 0.3s',
                cursor: 'pointer',
              }}
            >
              Manifesto
            </Link>
          </Breadcrumbs>
        </div>
        <div className='menu-icon-container'>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            className='dropdown-menu'
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Mint a Punk</MenuItem>
            <MenuItem
              component={Link}
              to='/onchainpunk'
              onClick={handleMenuClose}
            >
              On-Chain a Punk
            </MenuItem>
            <MenuItem component={Link} to='/gallery' onClick={handleMenuClose}>
              Gallery
            </MenuItem>
            <MenuItem
              component={Link}
              to='/manifesto'
              onClick={handleMenuClose}
            >
              Manifesto
            </MenuItem>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;