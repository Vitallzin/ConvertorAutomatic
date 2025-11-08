import React from 'react';
import './Header.css';

function Header() {
  return (
    // Você pode adicionar uma classe aqui para estilizar com um arquivo CSS externo
    <header className="app-header"> 
      
      {/* Título principal */}
      <h1>ConvertorAutomatic</h1>
      
      {/* Navegação/Links */}
      <nav>
        {/* Link simples */}
        <a href="https://www.exchangerate-api.com/">
          LinkAPI
        </a>
      </nav>
    </header>
  );
}

export default Header;