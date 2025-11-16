import React from "react"; // importa React
import "./AmountInput.css"; // importa estilos do input

// Campo numérico onde o usuário digita o valor
const AmountInput = ({ value, onChange }) => (
  <input
    className="amount-input" // classe CSS aplicada
    type="number" // tipo numérico para permitir apenas números
    placeholder="Digite o valor" // texto exibido quando vazio
    value={value} // valor controlado vindo do estado pai
    onChange={(e) => onChange(e.target.value)} // atualiza o estado pai ao digitar
  />
);

export default AmountInput; // exporta o componente
