import React, { useEffect, useState } from "react";
import "./RatesTableModal.css";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";

function RatesModal({ onClose }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true); // Adiciona estado de loading

  useEffect(() => {
    async function fetchRates() {
      setLoading(true); // Inicia o loading
      try {
        const data = await getRates(baseCurrency);
        // Verifica se a estrutura é a esperada antes de setar o estado
        if (data && data.conversion_rates) {
            setRates(data.conversion_rates);
        } else {
            setRates({}); // Garante que é um objeto vazio em caso de erro de API
        }
      } catch (err) {
        console.error("Erro ao carregar taxas:", err);
        setRates({}); // Limpa o estado em caso de erro
      } finally {
        setLoading(false); // Finaliza o loading
      }
    }
    fetchRates();
  }, [baseCurrency]);

  // Função auxiliar para verificar se o objeto de taxas está vazio/pronto
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
            disabled={loading && !hasRates} // Desabilita se estiver carregando a primeira vez
          >
            {/* CORREÇÃO APLICADA: Só mapeia se 'rates' tiver chaves (hasRates) */}
            {hasRates ? (
                Object.keys(rates).map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))
            ) : (
                // Opção de fallback enquanto carrega ou se houver erro
                <option value={baseCurrency} disabled>
                    {loading ? "Carregando..." : "Sem dados"}
                </option>
            )}
          </select>
        </div>
        
        {/* FEEDBACK DE STATUS (Carregando ou Erro) */}
        {loading && !hasRates && (
            <p className="status-message">Carregando taxas...</p>
        )}

        {/* TABELA (Renderizada apenas se houver taxas e não estiver carregando a primeira vez) */}
        {!loading && hasRates && (
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
                    {/* CORREÇÃO APLICADA: A iteração só ocorre se 'hasRates' for true */}
                    {Object.entries(rates).map(([currency, rate]) => (
                        <tr key={currency}>
                            <td className="currency-cell">
                                <Flag currency={currency} />
                                {/* Se sua API retornar taxas de todas as moedas,
                                    é bom evitar listar a moeda base como taxa dela mesma (USD para USD = 1)
                                    Você pode adicionar: {currency !== baseCurrency && (...) }
                                */}
                                {currency}
                            </td>
                            <td>{currency}</td>
                            <td>{rate.toFixed(4)}</td>
                            <td>{(1 * rate).toFixed(4)} {currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {/* MENSAGEM DE ERRO/FALHA NA BUSCA */}
        {!loading && !hasRates && (
             <p className="status-message error-message">Falha ao carregar as taxas. Tente novamente.</p>
        )}


        {/* INFO BOX */}
        <div className="rates-info-box">
          💡 As taxas são atualizadas em tempo real através da API de câmbio.
        </div>

      </div>
    </div>
  );
}

export default RatesModal;                    