import React from 'react'; // importa React
import Flag from '../../Flag'; // importa o componente que exibe a bandeira
import './CurrencySelectorFrom.css'; // importa estilos específicos do seletor

// Lista de moedas suportadas pelo seletor
const currencies = ['USD', 'BRL', 'EUR', 'JPY', 'GBP'];

// Componente que renderiza o seletor da moeda de origem
function CurrencySelectorFrom({ fromCurrency, setFromCurrency }) {
  return (
    <div className="currency-selector">{/* container do seletor + bandeira */}
      <Flag currency={fromCurrency} />{/* componente que mostra a bandeira da moeda atual */}
      <select
        value={fromCurrency} // valor atualmente selecionado no select
        onChange={(e) => setFromCurrency(e.target.value)} // atualiza o estado quando o usuário muda
      >
        { /* Gera um <option> para cada moeda disponível */ }
        {currencies.map((code) => (
          <option key={code} value={code}> {/* key única para React e value para o select */}
            {code} {/* exibe o código da moeda (ex: USD) */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelectorFrom; // exporta o componente para uso externo