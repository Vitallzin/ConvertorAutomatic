import React from "react";
import './Flag.css'
import { currencyToCountry } from "../../utils/currencyToCountry";

export default function Flag({ currency }) {
  if (!currency) return null;

  const upper = currency.toUpperCase();
  const country = currencyToCountry[upper];

  if (!country) {
    console.warn(`Moeda não encontrada: ${upper}`);
    return (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: "#ccc",
          borderRadius: "4px"
        }}
      />
    );
  }

  const url = `https://flagsapi.com/${country}/flat/32.png`;

  return (
    <img
      src={url}
      onError={() => console.error(`Erro ao carregar imagem: ${url}`)}
    />
  );
}
