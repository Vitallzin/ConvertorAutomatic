import React from "react"; // importa React
import "./SwapButton.css"; // importa estilos do botão

// Botão que inverte as moedas "de" e "para"
const SwapButton = ({ onClick }) => (
  <button
    className="swap-button" // classe CSS para aparência
    onClick={onClick} // evento chamado ao clicar
  >
    🔁{/* ícone de swap */}
  </button>
);

export default SwapButton; // exporta o componente
