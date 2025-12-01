import React, { useEffect, useState } from "react";
import "./RatesTableModal.css";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";
// 1. IMPORTAR DADOS DE MOEDA
import { currencyData } from "../../../utils/CurrencData"; // <--- ATENÇÃO: Verifique e ajuste este caminho conforme a sua estrutura!

function RatesModal({ onClose }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Busca todas as moedas disponíveis ao montar
  useEffect(() => {
    let mounted = true;
    
    async function fetchAllCurrencies() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates("USD");
        const ratesObj = data.conversion_rates || data.rates || data || {};
        
        if (!ratesObj || Object.keys(ratesObj).length === 0) {
          throw new Error("Nenhuma moeda retornada pela API");
        }
        
        if (mounted) {
          setAllCurrencies(Object.keys(ratesObj).sort());
        }
      } catch (err) {
        console.error("Erro ao buscar moedas:", err);
        if (mounted) {
          setError("Erro ao buscar moedas. Tente novamente.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    fetchAllCurrencies();
    return () => { mounted = false; };
  }, []);

  // ✅ Busca as taxas da moeda selecionada
  useEffect(() => {
    let mounted = true;
    
    async function fetchRatesForSelected() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRates(baseCurrency);
        const ratesObj = data.conversion_rates || data.rates || data || {};
        
        if (!ratesObj || Object.keys(ratesObj).length === 0) {
          throw new Error("Nenhuma taxa retornada");
        }
        
        if (mounted) {
          setRates(ratesObj);
        }
      } catch (err) {
        console.error("Erro ao buscar taxas:", err);
        if (mounted) {
          setError("Erro ao buscar taxas. Tente novamente.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (baseCurrency) {
      fetchRatesForSelected();
    }
    
    return () => { mounted = false; };
  }, [baseCurrency]);

  const hasRates = Object.keys(rates).length > 0;

  return (
    <div className="rates-modal-overlay">
      <div className="rates-modal-container">

        {/* HEADER */}
        <div className="rates-modal-header">
          <h2>Taxas de Câmbio</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <p className="rates-modal-subtitle">
          Visualize as taxas de conversão para diferentes moedas
        </p>

        {/* SELECT DA MOEDA BASE */}
        <div className="rates-select-wrapper">
          <label>Moeda Base</label>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            disabled={loading || !hasRates}
          >
            {allCurrencies.length > 0 ? (
              allCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {/* 2. EXIBINDO O NOME COMPLETO NO DROPDOWN */}
                  {currencyData[currency]?.namecomplete || currency} ({currency})
                </option>
              ))
            ) : (
              <option value={baseCurrency} disabled>
                {loading ? "Carregando..." : "Sem dados"}
              </option>
            )}
          </select>
        </div>
        
        {/* FEEDBACK DE STATUS */}
        {loading && <p className="status-message">Carregando taxas...</p>}
        {error && <p className="status-message error-message">{error}</p>}

        {/* TABELA */}
        {!loading && !error && hasRates && (
          <table className="rates-table-grid">
            <thead>
              <tr>
                <th>Moeda</th>
                <th>Código</th>
                <th>Taxa</th>
                <th>1 {baseCurrency} =</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([currency, rate]) => {
                // Obtém a informação da moeda, se existir
                const currencyInfo = currencyData[currency] || {};
                // Usa o nome completo, senão o nome curto, senão o código
                const displayName = currencyInfo.namecomplete || currencyInfo.name || currency;

                return (
                  <tr key={currency}>
                    <td className="currency-cell">
                      <Flag currency={currency} />
                      {/* 3. EXIBINDO O NOME COMPLETO NA TABELA */}
                      {displayName}
                    </td>
                    <td>{currency}</td>
                    {/* ALTERAÇÃO 1: Taxa agora com 2 casas decimais */}
                    <td>{Number(rate || 0).toFixed(2)}</td> 
                    {/* ALTERAÇÃO 2: Valor de 1 {baseCurrency} agora com 2 casas decimais */}
                    <td>{(1 * rate).toFixed(2)} {currency}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* INFO BOX */}
        {!loading && hasRates && (
          <div className="rates-info-box">
            💡 As taxas são atualizadas em tempo real através da API de câmbio.
          </div>
        )}

      </div>
    </div>
  );
}

export default RatesModal;