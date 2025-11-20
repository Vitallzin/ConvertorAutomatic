import React, { useState, useCallback, useEffect } from "react"; 
import AmountInput from "../AmountInput"; 
import SwapButton from "../SwapButton"; 
// Removido o ConvertButton, usando lógica de debounce com useEffect
import ResultBox from "../ResultBox"; 
import CurrencySelectorFrom from "../CurrencySelectorFrom"; 
import CurrencySelectorTo from "../CurrencySelectorTo"; 
import "./Converter.css"; 
import { convertCurrency } from "../../../services/Api"; 
import RatesModal from "../../RatesTable/RatesTableModal";
// ✅ Importação necessária para buscar os símbolos
import { currencyData } from "../../../utils/CurrencData"; // Ajuste o caminho se necessário


const Converter = () => {
  const [amount, setAmount] = useState(""); 
  const [fromCurrency, setFromCurrency] = useState("USD"); 
  const [toCurrency, setToCurrency] = useState("BRL"); 
  const [result, setResult] = useState(null); 
  const [rate, setRate] = useState(null); 
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // ✅ CÁLCULO: Símbolo da moeda de ORIGEM (para o AmountInput)
  const currencySymbolFrom = currencyData[fromCurrency]?.symbol || ''; 
  // ✅ CÁLCULO: Símbolo da moeda de DESTINO (para o ResultBox)
  const currencySymbolTo = currencyData[toCurrency]?.symbol || ''; 
  
  // Inverte as moedas selecionadas e limpa resultado
  const handleSwap = () => {
    const temp = fromCurrency; 
    setFromCurrency(toCurrency); 
    setToCurrency(temp); 
    setResult(null); 
  };
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Executa a conversão usando a função do serviço (função estável)
  const runConversion = useCallback(async (currentAmount, currentFrom, currentTo) => {
    if (!currentAmount || Number(currentAmount) <= 0) { 
        setResult(null);
        setRate(null);
        setDate(null);
        return; 
    }

    try {
      setLoading(true); 

      const response = await convertCurrency(currentFrom, currentTo, Number(currentAmount));

      setResult(response.result); 
      setRate(response.rate); 
      setDate(response.lastUpdate); 
    } catch (err) {
      console.error("Erro na conversão:", err); 
      setResult(null); 
      setRate(null);
      setDate(null);
    } finally {
      setLoading(false); 
    }
  }, []); 

  // Efeito que executa a conversão após o usuário parar de digitar (debounce)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
        if (amount && !loading) {
            runConversion(amount, fromCurrency, toCurrency);
        }
    }, 500); // Espera 500ms

    return () => clearTimeout(debounceTimer); 
    
  }, [amount, fromCurrency, toCurrency, runConversion, loading]); 

  const handleAmountChange = (v) => {
    setAmount(v); 
    setResult(null); 
  };

  const handleFromCurrencyChange = (v) => {
    setFromCurrency(v); 
  };

  const handleToCurrencyChange = (v) => {
    setToCurrency(v); 
  };

  // JSX do componente
  return (
    <div className="conv-box">
      <h2 className="conv-title">Conversor de Moedas</h2>
      <p className="conv-subtitle">Conversão em tempo real com as melhores taxas</p> 

      {/* SEÇÃO DE */}
      <div className="conv-field"> 
        <label htmlFor="amount-input"></label>
        <div className="conv-input-group"> 
          <AmountInput
            id="amount-input"
            value={amount}
            onChange={handleAmountChange}
            disabled={loading}
            symbol={currencySymbolFrom} // ✅ Passa o símbolo para o input
          />
          <CurrencySelectorFrom
            fromCurrency={fromCurrency} 
            setFromCurrency={handleFromCurrencyChange} 
            minimal={true}
          />
        </div>
      </div>

      <div className="conv-swap-container"> 
        <SwapButton onClick={handleSwap} />
      </div>

      {/* SEÇÃO PARA */}
      <div className="conv-field"> 
        <label htmlFor="result-display"></label>
        <div className="conv-input-group"> 
          {/* Note: Aqui ResultBox está sendo usado para exibição MÍNIMA do valor convertido */}
          <ResultBox
            id="result-display"
            converted={result} 
            target={toCurrency} 
            loading={loading} 
            minimal={true} 
            targetSymbol={currencySymbolTo} // ✅ Passa o símbolo para exibição minimalista
          />
          <CurrencySelectorTo
            toCurrency={toCurrency} 
            setToCurrency={handleToCurrencyChange} 
            minimal={true}
          />
        </div>
      </div>

      {/* RESULTADO DA TAXA GRANDE (Exibição completa) */}
      {result !== null && rate !== null && (
        <ResultBox
          amount={amount} 
          rate={rate} 
          base={fromCurrency} 
          target={toCurrency} 
          date={date} 
          minimal={false}
          targetSymbol={currencySymbolTo} // ✅ Passa o símbolo para exibição completa
        />
      )}

      {/* BOTÃO DO MODAL */}
      <button 
        type="button"
        className="conv-btn-main" 
        onClick={handleOpenModal}
      >
        Ver Tabela de Taxas de Câmbio
      </button>

      {isModalOpen && (
        <RatesModal onClose={handleCloseModal} />
      )}
      
    </div>
  
  );
};

export default Converter;