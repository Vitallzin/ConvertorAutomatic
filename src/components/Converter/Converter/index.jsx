import React from 'react';
import './Converter.css';
import Amountinput from '../AmountInput'; // Componente para o campo de valor.
import ConvertButton from '../ConvertButton'; // Componente para o botão de converter.
import CurrencySelectorFrom from '../CurrencySelectorFrom'; // Componente para o seletor de moeda de origem.
import CurrencySelectorTo from '../CurrencySelectorTo'; // Componente para o seletor de moeda de destino.
import ResultBox from '../ResultBox'; // Componente para exibir o resultado da conversão.
import SwapButton from '../SwapButton'; // Componente para o botão de inverter moedas.



function Converter() {
  return (
    <div className="converter-container">
      <h2>Conversor de Moedas</h2>
      <div className="converter-controls">
        <Amountinput />
        <CurrencySelectorFrom />
        <SwapButton />
        <CurrencySelectorTo />
        <ConvertButton /> 
      </div>
      <ResultBox />
    </div>
  );
}

export default Converter;