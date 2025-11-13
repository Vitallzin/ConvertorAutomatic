import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Texto principal */}
        <p>© 2024 API-Moeda. Todos os direitos reservados.</p>

        {/* Nomes dos colaboradores */}
        <div className="footer-team">
          <p>Desenvolvido por:</p>
          <ul>
            <li>Cauã Vital</li>
            <li>Francisco Marques</li>
            <li>Gabriel César</li>
            <li>João Victor</li>
            <li>Eduardo Vinícius</li>
          </ul>
        </div>

        {/* Professor orientador */}
        <p className="footer-professor">
          Orientador: Jorge Lucas
        </p>

        {/* Créditos do projeto */}
        <p className="footer-credit">
          Projeto Desenvolvido pelo Grupo 5 — API-Moeda
        </p>
      </div>
    </footer>
  );
}

export default Footer;
