import React from 'react';
import './Header.css';
import ThemeToggle from '../ThemeToggle';

function Header() {
  return (
    // Você pode adicionar uma classe aqui para estilizar com um arquivo CSS externo
    <header className="app-header"> 
     <div className="header-content">
        <h1>Convertor Automatic</h1>
        <a href="https://www.exchangerate-api.com/" target="_blank" rel="noreferrer">
        Link-API
        </a>
        <ThemeToggle/>
      </div>

    </header>
  );
}

export default Header;