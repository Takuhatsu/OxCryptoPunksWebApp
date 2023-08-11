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

// const MainPage = () => {

//   return (
//     <div>
//       <div className='title-image'>
//        <img className='image' src={PunkVar} alt='Punk Variety' /> 
//        <figcaption className='caption'>Strongly influenced by CryptoPunks™</figcaption>
//        </div>
//        <MainPageContent />
//     </div>
//   );
// };

const App = () => {

  
  return (
    <HashRouter>
      <div className='App'>
        <Navbar className='navbar' />
        <Routes>
          <Route path='/onchainpunk' element={<OnchainPunk />} />
          <Route path='/gallery' element={<GalleryPage />} />
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