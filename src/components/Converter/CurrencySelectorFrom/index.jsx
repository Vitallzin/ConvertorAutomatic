import React from 'react'; // importa React
import Flag from '../../Flag'; // importa o componente que exibe a bandeira
import './CurrencySelectorFrom.css'; // importa estilos específicos do seletor

// Lista de moedas suportadas pelo seletor
const currencies = ['USD', 'BRL', 'EUR', 'JPY', 'GBP'];

// Componente que renderiza o seletor da moeda de origem
// Adicionado 'minimal' para saber como renderizar (integrado ao input)
function CurrencySelectorFrom({ fromCurrency, setFromCurrency, minimal }) {
  // A classe 'currency-selector' é ajustada para o estilo minimal
  return (
    <div className={minimal ? "currency-selector-minimal" : "currency-selector"}>{/* container do seletor + bandeira */}
      {/* Se estiver no modo minimal, a bandeira é renderizada aqui, ao lado do select, para o visual integrado */}
      {minimal && <Flag currency={fromCurrency} minimal={true} />} 
      <select
        value={fromCurrency} // valor atualmente selecionado no select
        onChange={(e) => setFromCurrency(e.target.value)} // atualiza o estado quando o usuário muda
        className={minimal ? "currency-select-minimal" : ""} // Classe para estilizar o select minimal
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