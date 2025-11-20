import React from "react";
import "./AmountInput.css";
// Campo numérico onde o usuário digita o valor

const AmountInput = ({value, onChange, symbol = '' }) => (

  <input
    className="amount-input" // classe CSS aplicada
    type="number" // tipo numérico
    placeholder={symbol ? ` ${symbol} 0.00` : "Digite o valor"} // placeholder dinâmico
    value={value} // valor controlado vindo do estado pai
    onChange={(e) => onChange(e.target.value)} // atualiza o estado pai ao digitar
    // exibe o símbolo da moeda se fornecido
    
  />

);

export default AmountInput; // exporta o componente

//placeholder={symbol ? `${symbol}0.00` : "Digite o valor"}
//const AmountInput = ({ id, value, onChange, disabled = false, symbol = '' }) => (