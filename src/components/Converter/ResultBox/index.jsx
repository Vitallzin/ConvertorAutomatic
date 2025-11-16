import React from "react"; // importa React
import "./ResultBox.css"; // importa estilos do ResultBox

// Componente que exibe o resultado da conversão e informações auxiliares
const ResultBox = ({ amount, converted, rate, date, base, target }) => {
  // Se não houver valor convertido, não renderiza nada
  if (converted === undefined || converted === null) return null; // retorno nulo evita exibir caixa vazia

  // Tornar a renderização mais defensiva: capturar possíveis exceções ao formatar
  let formattedConverted, formattedRate, formattedInverse, localDate;
  try {
    // Configurações de casas decimais
    const AMOUNT_DECIMALS = target === "BRL" ? 0 : 2; // menos casas para BRL conforme pedido
    const RATE_DECIMALS = 4; // casas decimais para taxa exibida
    const INVERSE_DECIMALS = 6; // casas para a taxa invertida

    // Formatação dos valores numéricos
    formattedConverted = Number(converted).toFixed(AMOUNT_DECIMALS); // valor convertido formatado
    formattedRate = rate !== undefined && rate !== null ? Number(rate).toFixed(RATE_DECIMALS) : "—"; // taxa formatada
    formattedInverse = rate ? (1 / Number(rate)).toFixed(INVERSE_DECIMALS) : "—"; // taxa invertida formatada

    // Converte a data (UTC) para o fuso de São Paulo para exibir na UI
    localDate = date
      ? (() => {
          try {
            return new Date(date).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo", // fuso de São Paulo
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
          } catch {
            return String(date); // fallback: retorna string original se parsing falhar
          }
        })()
      : "—"; // se não houver data, mostra traço
  } catch (formatErr) {
    // Se algo inesperado acontecer durante a formatação, log e renderiza fallback leve
    console.error("Erro ao formatar ResultBox:", formatErr, { amount, converted, rate, date, base, target });
    return (
      <div className="result-box">
        <p className="result-main">Erro ao exibir resultado</p>
        <p className="result-meta">Verifique o console para detalhes</p>
      </div>
    );
  }

  return (
    <div className="result-box"> {/* container principal do resultado */}
      <p className="result-main"> {/* linha principal com valor convertido */}
        {amount} {base} = {formattedConverted} {target}
      </p>
      <p className="result-meta"> {/* taxa e data */}
        Taxa usada: {formattedRate} | Atualizado em: {localDate}
      </p>
      <p className="result-small"> {/* informação adicional com taxa invertida */}
        1 {base} = {formattedRate} {target} • 1 {target} = {formattedInverse} {base}
      </p>
    </div>
  );
};

export default ResultBox; // exporta componente
