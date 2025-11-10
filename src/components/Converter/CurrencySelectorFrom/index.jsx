import React from 'react';
import Flag from '../../Flag'; // importa o componente de bandeira
import './CurrencySelectorFrom.css'; //estilização

// Lista básica de moedas (eur, real, euro, iene japones, libra esterlina)
const currencies = ['USD', 'BRL', 'EUR', 'JPY', 'GBP'];

//função para escolher as moedas de iniciais (de origem)
function CurrencySelectorFrom({ fromCurrency, setFromCurrency }) {
  return (
    <div className="currency-selector">
      <Flag currency={fromCurrency} /> {/* bandeira que está selecioanda */}
      <select
      // menu que mostra as opções para o usuario escolher a moeda
        value={fromCurrency} //valor atual do seletor 
        onChange={(e) => setFromCurrency(e.target.value)} //atualiza quando o usuario escolhe outra moeda
      >
        {/* cira uma opção para cada moeda da lista */}
        {currencies.map((code) => (
          <option key={code} value={code}> {/* Key serve como indentificador unico*/}
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}

//exporta este componente para ser usado em outros arquivos
export default CurrencySelectorFrom;