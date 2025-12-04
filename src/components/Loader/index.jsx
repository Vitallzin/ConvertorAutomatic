import React from 'react';     // Necessário para criar os componentes funcionais
import './Loader.css';        // Arquivo de estilização do loader

function Loader() {
  return (
    <div className="loader-container">     {/* Container utilizado para centralizar o loader */}
      <div className="loader">             {/* Div que representa o loader */}
      </div>
    </div>
  );
}
export default Loader;     // Exporta para que possa ser usada em outras partes do codigo