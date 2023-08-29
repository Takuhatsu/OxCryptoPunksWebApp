import React from 'react';
import './App.css';
import MainPageContent from './components/MainPageContent';
import Navbar from './components/Navbar';
import OnchainPunk from './components/OnchainPunk';
import GalleryPage from './components/GalleryPage';
import Manifesto from './components/Manifesto';
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import SeparateLine from './components/SeparateLine';
import Footer from './components/Footer';
import Terms from './components/Terms';
import PunkDetails from "./components/PunkDetails"; // Import the new component

const App = () => {
  
  return (
    <HashRouter basename={process.env.PUBLIC_URL}> {/* Set basename */}
      <div className='App'>
        <Navbar className='navbar' />
        <Routes>
          <Route path='/onchainpunk' element={<OnchainPunk />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/punks/:punkId' element={<PunkDetails />} />
          <Route path='/manifesto' element={<Manifesto />} />
          <Route path='/' element={<MainPageContent />} />
          <Route path='/terms' element={<Terms />} />
        </Routes>
        <SeparateLine />
        <Footer />
        <header className='App-header'></header>
      </div>
    </HashRouter>
  );
}

export default App;