// Loader.jsx (ou index.jsx do seu componente Loader)

import React from 'react';
import './Loader.css'; // Importa o CSS acima

function Loader() {
  return (
    // Adiciona um container para centralizar o spinner
    <div className="loader-container"> 
      <div className="loader">
        {/* Indicador de carregamento (spinner) enquanto os dados estão sendo buscados.*/}
      </div>
    </div>
  );
}
export default Loader;