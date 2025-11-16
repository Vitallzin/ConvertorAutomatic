import React, { useEffect, useState } from "react";
import "./RatesModal.css";
import { getRates } from "../../../services/Api";
import Flag from "../../Flag/Flag";

function RatesModal({ onClose }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({});

  useEffect(() => {
    async function fetchRates() {
      try {
        const data = await getRates(baseCurrency);
        setRates(data.conversion_rates);
      } catch (err) {
        console.error("Erro ao carregar taxas:", err);
      }
    }
    fetchRates();
  }, [baseCurrency]);

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
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* TABELA */}
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
            {Object.entries(rates).map(([currency, rate]) => (
              <tr key={currency}>
                <td className="currency-cell">
                  <Flag currency={currency} />
                  {currency}
                </td>
                <td>{currency}</td>
                <td>{rate.toFixed(4)}</td>
                <td>{(1 * rate).toFixed(4)} {currency}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* INFO BOX */}
        <div className="rates-info-box">
          💡 As taxas são atualizadas em tempo real através da API de câmbio.
        </div>

      </div>
    </div>
  );
}

export default RatesModal;
