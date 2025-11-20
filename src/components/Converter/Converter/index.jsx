import React, { useState } from "react";
import "./Converter.css";
import Flag from "../../Flag";
import AmountInput from "../AmountInput";
import SwapButton from "../SwapButton";

export default function Converter() {
  const [valor, setValor] = useState("");
  const [de, setDe] = useState("USD");
  const [para, setPara] = useState("BRL");
  const [resultado, setResultado] = useState(null);
  const [taxa, setTaxa] = useState(null);

  // Busca as taxas quando muda a moeda "de"
  React.useEffect(() => {
    const fetchTaxas = async () => {
      if (!de || !para) return;

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://open.er-api.com/v6";
        const response = await fetch(`${apiUrl}/latest/${de}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar taxas de câmbio");
        }

        const data = await response.json();
        const taxas = data.conversion_rates || data.rates || {};
        const taxaConversao = taxas[para];

        if (!taxaConversao) {
          throw new Error(`Moeda ${para} não encontrada`);
        }

        setTaxa(taxaConversao);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchTaxas();
  }, [de, para]);

  // Atualiza o resultado em tempo real conforme o usuário digita
  React.useEffect(() => {
    if (valor && taxa) {
      const total = valor * taxa;
      setResultado(total);
    } else {
      setResultado(null);
    }
  }, [valor, taxa]);

  const trocarMoedas = () => {
    const temp = de;
    setDe(para);
    setPara(temp);
  };

  return (
    <div className="conv-box">
      <h1 className="conv-title">Conversor de Moeda</h1>

      {/* COMPONENTE 1: AmountInput */}
      <div className="conv-field">
        <label>Valor</label>
        <AmountInput value={valor} onChange={setValor} />
      </div>

      <div className="conv-row">
        {/* SELETOR DE/PARA */}
        <div className="conv-field">
          <label>DE</label>
          <div className="conv-select-wrapper">
            <Flag code={de} />
            <select 
              className="conv-select" 
              value={de} 
              onChange={(e) => setDe(e.target.value)}
            >
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="BRL">BRL - Real</option>
              <option value="GBP">GBP - Libra</option>
              <option value="JPY">JPY - Iene</option>
            </select>
          </div>
        </div>

        {/* COMPONENTE 5: SwapButton */}
        <SwapButton onClick={trocarMoedas} />

        <div className="conv-field">
          <label>PARA</label>
          <div className="conv-select-wrapper">
            <Flag code={para} />
            <select 
              className="conv-select" 
              value={para} 
              onChange={(e) => setPara(e.target.value)}
            >
              <option value="BRL">BRL - Real</option>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Libra</option>
              <option value="JPY">JPY - Iene</option>
            </select>
          </div>
        </div>
      </div>

      {/* BOTÃO RESULTADO - Mostra o valor em tempo real */}
              <div className="resultado-box">
                Resultado: {resultado !== null ? `${Number(resultado).toFixed(2)} ${para}` : ""}
              </div>

    </div>
  );
}
