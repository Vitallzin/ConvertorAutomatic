import React from 'react'; // importa React
import Flag from '../../Flag'; // componente para exibir bandeira conforme código
import './CurrencySelectorTo.css'; // estilos para o seletor de destino

// Lista de moedas suportadas (igual ao selector From)
const currencies = ['USD', 'BRL', 'EUR', 'JPY', 'GBP'];

// Componente seletor para a moeda de destino
function CurrencySelectorTo({ toCurrency, setToCurrency, minimal }) {
  // A classe 'currency-selector' é ajustada para o estilo minimal
  return (
    <div className={minimal ? "currency-selector-minimal" : "currency-selector"}>{/* container do seletor */}
      {/* Se estiver no modo minimal, a bandeira é renderizada aqui, ao lado do select, para o visual integrado */}
      {minimal && <Flag currency={toCurrency} minimal={true} />} 
      <select
        value={toCurrency} // mostra o valor atualmente selecionado
        onChange={(e) => setToCurrency(e.target.value)} // atualiza o estado do pai ao mudar
        className={minimal ? "currency-select-minimal" : ""} // Classe para estilizar o select minimal
      >
        { /* Mapeia a lista de moedas para opções do select */ }
        {currencies.map((code) => (
          <option key={code} value={code}>{/* key única para React */}
            {code} {/* exibe o código da moeda */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelectorTo; // exporta para uso em outros componentes
