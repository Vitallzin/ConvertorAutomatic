import React from 'react';
import Flag from '../../Flag'; // importa o componente que mostra as bandeiras
import './CurrencySelectorTo.css'; // estilização

// Lista de moedas igual ao do From
const currencies = ['USD', 'BRL', 'EUR', 'JPY', 'GBP'];

//função para escolher a moeda e a bandeira do destino desejado
function CurrencySelectorTo({ toCurrency, setToCurrency }) {
  return (
    <div className="currency-selector">
      <Flag currency={toCurrency} /> {/*mostra a bandeira  selecionada como "destino" (A que quer converter) */}
      <select
        value={toCurrency} //valor atual da seleção mesmo que no from
        onChange={(e) => setToCurrency(e.target.value)} //tbm atualiza o estado quando escolhe uma nova moeda
      >
        {/* gera automaticamente opções apartir da  lista (array"const currencies") */}
        {currencies.map((code) => (
          <option key={code} value={code}> {/*key é um identificador unico para cada opção (opition ) */}
            {code}  {/* mostra o codigo da moeda */}
          </option>
        ))}
      </select>
    </div>
  );
}

//exporta este componente para ser usado em outros arquivos
export default CurrencySelectorTo;
