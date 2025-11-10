import React, {useState} from 'react';
import './Converter.css';
import Amountinput from '../AmountInput'; // Componente para o campo de valor.
import ConvertButton from '../ConvertButton'; // Componente para o botão de converter.
import CurrencySelectorFrom from '../CurrencySelectorFrom'; // Componente para o seletor de moeda de origem.
import CurrencySelectorTo from '../CurrencySelectorTo'; // Componente para o seletor de moeda de destino.
import ResultBox from '../ResultBox'; // Componente para exibir o resultado da conversão.
import SwapButton from '../SwapButton'; // Componente para o botão de inverter moedas.



function Converter() {
  // moedas que irão aparecer primneiro no seletor
  const [fromCurrency, setFromCurrency] = useState('USD'); // Estado para a moeda de origem.
  const [toCurrency, setToCurrency] = useState('BRL'); // Estado para a moeda de destino.

  return (
    <div className="converter-container">
      <h2>Conversor de Moedas</h2>
      <div className="converter-controls">
        <Amountinput />
        <CurrencySelectorFrom 
          fromCurrency={fromCurrency} // Passa a moeda de origem e a função para atualizá-la como props.
          setFromCurrency={setFromCurrency} // Função para atualizar a moeda de origem.
        />
        <SwapButton />
        <CurrencySelectorTo 
          toCurrency={toCurrency} // Passa a moeda de destino e a função para atualizá-la como props.
          setToCurrency={setToCurrency} // Função para atualizar a moeda de destino.
        />
        <ConvertButton /> 
      </div>
      <ResultBox />
    </div>
  );
}

export default Converter;