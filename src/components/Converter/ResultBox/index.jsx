import React from "react";
import './ResultBox.css';

// Mostra o resultado, taxa usada e data da última atualização
const ResultBox = ({ amount, converted, rate, date, base, target }) => {
  // Não mostra nada se ainda não há resultado
  if (converted === undefined || converted === null) return null;

  // Configurações de casas decimais
  // Reduz casas decimais para BRL conforme pedido (ex.: 6149.01 -> 6149)
  const AMOUNT_DECIMALS = target === "BRL" ? 0 : 2; // casas decimais para o valor convertido
  const RATE_DECIMALS = 4; // casas decimais para a taxa
  const INVERSE_DECIMALS = 6; // casas decimais para taxa invertida

  // Formata valores
  const formattedConverted = Number(converted).toFixed(AMOUNT_DECIMALS); // Formata o valor convertido
  const formattedRate = rate !== undefined && rate !== null ? Number(rate).toFixed(RATE_DECIMALS) : "—"; // Formata a taxa
  const formattedInverse = rate ? (1 / Number(rate)).toFixed(INVERSE_DECIMALS) : "—"; // Formata a taxa invertida

  // Converte a data UTC para o fuso de São Paulo (Brasil)
  const localDate = date
    ? (() => {
        try {
          return new Date(date).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit", // Adiciona minutos
            second: "2-digit", // Adiciona segundos para maior precisão
            hour12: false,
          });
        } catch {
          return String(date);
        }
      })()
    : "—";

  return (
    <div
      style={{
        marginTop: "20px",
        textAlign: "center",
        fontSize: "18px",
        backgroundColor: "#333",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <p style={{ margin: 0 }}>
        {amount} {base} = {formattedConverted} {target}
      </p>
      <p style={{ fontSize: "14px", color: "#ccc", marginTop: "5px" }}>
        Taxa usada: {formattedRate} | Atualizado em: {localDate}
      </p>
      <p style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>
        1 {base} = {formattedRate} {target} • 1 {target} = {formattedInverse} {base}
      </p>
    </div>
  );
};


export default ResultBox;