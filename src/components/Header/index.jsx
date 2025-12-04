import React from 'react'; // Necessário para criar o componente
import './Header.css'; // Arquivo de estilização do header
import ThemeToggle from '../ThemeToggle'; // Trocar o tema claro/escuro

function Header() {

  // Função que recarrega a página inteira ao clicar na logo - "ConvertorAutomatic"
  const handleReloadClick = () => {
    window.location.reload();
  };
  
  return (
    <header className="app-header">     {/* Layout principal do header */}
      
      <div className="header-left">     {/* Lado esquerdo do header */}

        {/* Logo clicável que recarrega a página */}
        <a onClick={handleReloadClick} className="logo"> 
          ConvertorAutomatic
        </a>

        <a href="#"> Ajuda </a>

        {/* Link da API de conversão de moedas */}
        <a 
          href="https://www.exchangerate-api.com/" 
          target="_blank"
          rel="noreferrer"     // Prática de segurança e privacidade
        >
          API Exchange
        </a>

        {/* Link da API para as bandeiras dos países */}
        <a
          href="https://flagsapi.com/#countries"
          target="_blank" 
          rel="noreferrer"
        >
          API CountryFlag
        </a>
      </div>

      {/* Lado direito do header */}
      <div className="header-right">
        <ThemeToggle /> {/* Componente do botão de tema */}
      </div>

    </header>
  );
}

export default Header;     // Permite que o componente seja importado no App.jsx