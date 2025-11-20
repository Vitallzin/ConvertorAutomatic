import React from "react";
import "./ResultBox.css";

// O componente ResultBox AGORA recebe 'minimal' e o prop 'targetSymbol'
const ResultBox = ({converted, targetSymbol, minimal = false }) => {
  // Se não houver valor convertido E não for o modo minimal, não renderiza nada
  if (converted === undefined || converted === null) {
      if (minimal) {
          // No modo minimal, exibe um placeholder para manter o layout
          return <div className="result-box minimal">{targetSymbol}0.00</div>;
      }
      return null;
  }

  // Tornar a renderização mais defensiva: capturar possíveis exceções ao formatar
  let formattedConverted;
  try {
    // ... (restante da lógica de formatação de valores e data)
    // ...
    // Configurações de casas decimais
    // Adaptei para usar 2 casas, um padrão mais universal
    const AMOUNT_DECIMALS = 2; 
    // Formatação dos valores numéricos
    formattedConverted = Number(converted).toFixed(AMOUNT_DECIMALS); 
    ;
  } catch (formatErr) {
    console.error("Erro ao formatar ResultBox:", formatErr);
    return (
      <div className={`result-box ${minimal ? 'minimal' : ''}`}>
        <p className="result-main">Erro ao exibir resultado</p>
      </div>
    );
  }

  // Adiciona a classe 'minimal' se a prop for verdadeira
  const boxClass = `result-box ${minimal ? 'minimal' : ''}`;

  // Se for o modo minimal, exibe apenas a linha principal
  if (minimal) {
      return (
          <div className={boxClass}>
              {/* No modo minimal, exibimos apenas o valor e o código da moeda alvo */}
              <p className="result-main">
                  {targetSymbol}{formattedConverted}
              </p>
          </div>
      );
  }

  // Modo Completo (padrão)
  return (
    <>
    </>
  );
};

export default ResultBox;