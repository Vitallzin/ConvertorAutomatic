import React from 'react';
import './Header.css';
import ThemeToggle from '../ThemeToggle';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <a href="/" className="logo" target = "_blank">ConverterAutomatic</a>
        <a href="#">Ajuda</a>
        <a 
          href="https://www.exchangerate-api.com/" 
          target="_blank" 
          rel="noreferrer"
        >
          API Exchange
        </a>
      </div>

      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
