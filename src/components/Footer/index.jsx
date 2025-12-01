import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-content">
        {/* sobre o projeto*/}
        <div>
          <p className="footer-sobre">
            Sobre o projeto
          </p>
          <p className="footer-credit">
          Projeto de conversão de moedas desenvolvido para fins educativos.<br></br>
          Os dados de câmbio são fornecidos pela API Exchange Rate em tempo real.
          </p>
        </div>
        {/* Professor orientador */}
        <di>
          <p className="footer-orientador">
            Professor Orientador
          </p>
         <p className="footer-professor">
          Professor: Jorge Lucas <br></br>
          Turma B de Analise e Desenvolvimento de Sistemas
        </p>
        </di>

        {/* Nomes dos colaboradores */}
        <div className="footer-team">
          <p>Desenvolvido por:</p>
          <ul>
            <li>Cauã Vital</li>
            <li>Francisco Marques</li>
            <li>Gabriel Cesar</li>
            <li>João Victor</li>
            <li>Eduardo Vinícius</li>
          </ul>
        </div>
        
        
      </div>
      <footer className='foote-final'>
          {/* Texto principal */}
          <p>© 2025 ConvertorAutomatic. Todos os direitos reservados | V1.1.5</p>
        </footer>
    </footer>
  );
}

export default Footer;