import React, { useState } from "react"; // importa React e useState
import AmountInput from "../AmountInput"; // campo de entrada do valor
import SwapButton from "../SwapButton"; // botão que inverte as moedas
import ConvertButton from "../ConvertButton"; // botão que inicia a conversão
import ResultBox from "../ResultBox"; // componente que exibe resultado e meta-info
import CurrencySelectorFrom from "../CurrencySelectorFrom"; // seletor de moeda origem
import CurrencySelectorTo from "../CurrencySelectorTo"; // seletor de moeda destino
import "./Converter.css"; // estilos do conversor
import { convertCurrency } from "../../../services/api"; // função que busca taxas e calcula

// Componente principal do conversor (versão ajustada para usar services/api.js)
const Converter = () => {
  const [amount, setAmount] = useState(""); // valor digitado pelo usuário
  const [fromCurrency, setFromCurrency] = useState("USD"); // moeda de origem
  const [toCurrency, setToCurrency] = useState("BRL"); // moeda de destino
  const [result, setResult] = useState(null); // valor convertido
  const [rate, setRate] = useState(null); // taxa retornada pela API
  const [date, setDate] = useState(null); // data da última atualização
  const [loading, setLoading] = useState(false); // estado de carregamento

  // Inverte as moedas selecionadas e limpa resultado
  const handleSwap = () => {
    const temp = fromCurrency; // guarda temporariamente fromCurrency
    setFromCurrency(toCurrency); // seta fromCurrency com o anterior toCurrency
    setToCurrency(temp); // seta toCurrency com o valor temporário
    setResult(null); // limpa resultado anterior
  };

  // Executa a conversão usando a função do serviço
  const handleConvert = async () => {
    if (!amount) { // valida entrada
      alert("Por favor, digite um valor!"); // avisa usuário
      return; // sai sem converter
    }

    try {
      setLoading(true); // ativa loading

      // chamada ao serviço que retorna { result, rate, lastUpdate, raw }
      const response = await convertCurrency(fromCurrency, toCurrency, Number(amount));

      setResult(response.result); // armazena valor convertido (numérico)
      setRate(response.rate); // armazena taxa
      setDate(response.lastUpdate); // armazena data de atualização
    } catch (err) {
      console.error("Erro na conversão:", err); // log detalhado
      alert(`Erro ao converter: ${err && err.message ? err.message : String(err)}`); // mostra mensagem ao usuário
    } finally {
      setLoading(false); // garante desligar loading
    }
  };

  // JSX do componente com comentários inline para facilitar leitura
  return (
    <div className="converter-container">{/* container principal */}
      <h2 className="converter-title">💱 Sistema de Conversão</h2>{/* título */}

      <AmountInput
        value={amount}
        onChange={(v) => {
          setAmount(v); // atualiza valor
          setResult(null); // limpa resultado ao editar para evitar inconsistências
          setRate(null); // limpa taxa associada
          setDate(null); // limpa data
        }}
      />{/* campo de valor */}

      <div className="converter-selectors">{/* área dos seletores */}
        <CurrencySelectorFrom
          fromCurrency={fromCurrency} // valor atual de origem
          setFromCurrency={setFromCurrency} // função para alterar origem
        />{/* seletor de moeda origem */}

        <SwapButton onClick={handleSwap} />{/* botão que inverte moedas */}

        <CurrencySelectorTo
          toCurrency={toCurrency} // valor atual de destino
          setToCurrency={setToCurrency} // função para alterar destino
        />{/* seletor de moeda destino */}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <ConvertButton onClick={handleConvert} loading={loading} />{/* botão Converter */}
        <button
          type="button"
          className="clear-button"
          onClick={() => {
            setResult(null); // limpa resultado manualmente
            setRate(null);
            setDate(null);
            setAmount("");
          }}
        >
          Limpar
        </button>
      </div>

      <ResultBox
        amount={amount} // valor enviado para exibição
        converted={result} // valor convertido (numérico)
        rate={rate} // taxa utilizada
        date={date} // data da taxa
        base={fromCurrency} // moeda base
        target={toCurrency} // moeda alvo
      />{/* caixa de resultado */}
    </div>
  );
};

export default Converter;
