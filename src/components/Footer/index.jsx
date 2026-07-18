import React from 'react';
import { FiGithub } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sobre o projeto */}
        <div className="footer-about">
          <p className="footer-brand">ConvertorAutomatic</p>
          <p className="footer-tagline">
            Conversor de moedas em tempo real, criado como projeto acadêmico
            para colocar em prática o consumo de APIs, componentização em
            React e boas práticas de front-end.
          </p>
        </div>

        {/* APIs utilizadas */}
        <div className="footer-apis">
          <p className="footer-heading">APIs utilizadas</p>
          <ul className="footer-links">
            <li>
              <a href="https://www.exchangerate-api.com/" target="_blank" rel="noopener noreferrer">
                Exchange Rate API
              </a>
              <span>Cotações de câmbio em tempo real</span>
            </li>
            <li>
              <a href="https://flagcdn.com/" target="_blank" rel="noopener noreferrer">
                FlagCDN
              </a>
              <span>Bandeiras dos países</span>
            </li>
          </ul>
        </div>

        {/* Desenvolvedor */}
        <div className="footer-team">
          <p className="footer-heading">Desenvolvido por</p>
          <a
            className="footer-github"
            href="https://github.com/Vitallzin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub size={18} />
            <span>Vitallzin</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ConvertorAutomatic. Todos os direitos reservados | V1.2</p>
      </div>
    </footer>
  );
}

export default Footer;
