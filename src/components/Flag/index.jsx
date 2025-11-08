import React from "react";
import './Flag.css'
import { currencyToCountry } from "../../utils/currencyToCountry";

// FLAG COMPONENT
export default function Flag({ currency, size = 32, style = "flat" }) {
  if (!currency) return null; // se não houver moeda, não renderiza nada

  const upper = currency.toUpperCase(); // converte para maiúsculas

  // pega país correspondente (USD -> US)
  const country = currencyToCountry[upper]; // procura no mapa currencyToCountry

  // fallback caso a moeda não exista no mapa
  if (!country)  {
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: "#ccc",
          borderRadius: "4px"
        }}
      />
    );
  } // se país não encontrado, renderiza um quadrado cinza

  // Monta URL da FlagsAPI
  const url = `https://flagsapi.com/${country}/${style}/${size}.png`; // exemplo: https://flagsapi.com/US/flat/32.png

  return (
    <img
      src={url}
      alt={`Bandeira de ${currency}`}
      width={size}
      height={size}
      style={{ borderRadius: "4px" }}
    />
  ); // renderiza a imagem da bandeira
} 
