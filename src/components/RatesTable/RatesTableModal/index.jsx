import React, { useEffect, useState } from "react";
import "./RatesTableModal.css";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag";
import CurrencyDropdown from "../../Converter/CurrencyDropdown";
import { FiX } from "react-icons/fi";
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
      setLoading(true); // Inicia o loading
      setError(null); // Reseta o erro
      try { // Busca as taxas com USD como base para obter todas as moedas
        const data = await getRates("USD"); // Pega as taxas
        const ratesObj = data.conversion_rates || data.rates || data || {}; // Suporta diferentes formatos de resposta
        
        if (!ratesObj || Object.keys(ratesObj).length === 0) { // Verifica se há moedas
          throw new Error("Nenhuma moeda retornada pela API"); // Lança erro se não houver
        }
        
        if (mounted) { // Atualiza o estado se o componente ainda estiver montado
          setAllCurrencies(Object.keys(ratesObj).sort()); // Ordena alfabeticamente
        }
      } catch (err) { // Captura erros
        console.error("Erro ao buscar moedas:", err); // Loga o erro
        if (mounted) { // Atualiza o estado de erro se montado
          setError("Erro ao buscar moedas. Tente novamente."); // Mensagem de erro amigável
        }
      } finally { // Finaliza o loading
        if (mounted) { // Verifica se ainda está montado
          setLoading(false); // Termina o loading
        }
      }
    }
    
    fetchAllCurrencies(); // Chama a função para buscar moedas
    return () => { mounted = false; }; // Cleanup para evitar atualizações em componentes desmontados
  }, []); // Executa apenas uma vez ao montar

  //  Busca as taxas da moeda selecionada
  useEffect(() => { // Atualiza quando a moeda base muda
    let mounted = true; // Flag para verificar se o componente está montado
    
    async function fetchRatesForSelected() { // Função para buscar taxas
      setLoading(true); // Inicia o loading
      setError(null); // Reseta o erro
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
      <div className="rates-modal-shell">
        {/* BOTÃO DE FECHAR, flutuando no canto de fora do card.
            Fica fora do container com scroll para não ser cortado pelo overflow. */}
        <button className="close-btn" onClick={onClose} aria-label="Fechar">
          <FiX size={18} />
        </button>

      <div className="rates-modal-container">

        {/* HEADER */}
        <div className="rates-modal-header">
          <h2>Taxas de Câmbio</h2>
        </div>

        <p className="rates-modal-subtitle">
          Visualize as taxas de conversão para diferentes moedas
        </p>

        {/* SELETOR DA MOEDA BASE (com bandeira e busca) */}
        <div className="rates-select-wrapper">
          <label>Moeda Base</label>
          <CurrencyDropdown
            value={baseCurrency}
            onChange={setBaseCurrency}
            currencies={allCurrencies.length > 0 ? allCurrencies : [baseCurrency]}
            disabled={loading || !hasRates}
          />
        </div>

        {/* FEEDBACK DE STATUS */}
        {loading && <p className="status-message">Carregando taxas...</p>}   {/* Mostra loading se estiver carregando */}
        {error && <p className="status-message error-message">{error}</p>}  {/* Mostra erro se houver */}

        {/* TABELA */}
        {!loading && !error && hasRates && (
          <table className="rates-table-grid">
            <thead>
              <tr> 
                <th>Moeda</th>
                <th>Código</th>
                <th>Taxa</th>
                <th>1 {baseCurrency} =</th>  {/* Cabeçalho atualizado */}
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([currency, rate]) => {
                // Obtém a informação da moeda, se existir
                const currencyInfo = currencyData[currency] || {};
                // Usa o nome completo, senão o nome curto, senão o código
                const displayName = currencyInfo.namecomplete || currencyInfo.name || currency; 

                return (
                  <tr key={currency}>  {/* Linha para cada moeda */}
                    <td className="currency-cell">
                      <Flag currency={currency} /> {/* Mostra a bandeira */}
                      {/* 3. EXIBINDO O NOME COMPLETO NA TABELA */}
                      {displayName}
                    </td>
                    <td>{currency}</td>
                    {/* ALTERAÇÃO 1: Taxa agora com 2 casas decimais */}
                    <td>{Number(rate || 0).toFixed(2)}</td>  {/* Formata a taxa com 2 casas decimais */} 
                    {/* ALTERAÇÃO 2: Valor de 1 {baseCurrency} agora com 2 casas decimais */}
                    <td>{(1 * rate).toFixed(2)} {currency}</td>  {/* Formata o valor convertido com 2 casas decimais */}
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
    </div>
  );
}

export default RatesModal;