import React from "react"; // importa React
import "./ConvertButton.css"; // importa estilos do botão

// Botão que dispara a conversão. Mostra estado "Convertendo..." quando loading=true
const ConvertButton = ({ onClick, loading }) => {
  return (
    <button
      className={`convert-button ${loading ? "loading" : ""}`} // aplica classe 'loading' condicionalmente
      onClick={onClick} // função a ser chamada ao clicar
      disabled={loading} // desabilita quando está carregando
    >
      {loading ? "Convertendo..." : "Converter"} {/* texto condicional */}
    </button>
  );
};

export default ConvertButton; // exporta o componente
