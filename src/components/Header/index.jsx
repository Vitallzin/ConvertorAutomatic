import React from 'react';
import './Header.css';
import ThemeToggle from '../ThemeToggle';

function Header() {
    const handleReloadClick = () => {
    // Recarrega a página atual do navegador
    window.location.reload();
  };
  
  return (
    <header className="app-header">
      <div className="header-left">
        <a onClick={handleReloadClick} className="logo">ConvertorAutomatic</a>
        <a href="#">Ajuda</a>
        <a 
          href="https://www.exchangerate-api.com/" 
          target="_blank" 
          rel="noreferrer"
        >
          API Exchange
        </a>
        <a
          href="https://flagsapi.com/#countries"
          target="_blank" 
          rel="noreferrer"
          >
          API CountryFlag
        </a>
      </div>
      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
