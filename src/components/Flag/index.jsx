import React from "react";
import './Flag.css'
import { currencyData } from "../../utils/CurrencData";

export default function Flag({ currency, size = 32 }) {
  if (!currency) return null;

  const upper = currency.toUpperCase();
  const country = currencyData?.[upper]?.country;

  if (!country) {
    console.warn(`Moeda não encontrada em currencyData: ${upper}`);
    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: "#ccc",
          borderRadius: 4
        }}
      />
    );
  }

  const url = `https://flagsapi.com/${country}/flat/${size}.png`;

  return (
    <img
      src={url}
      alt={`Bandeira ${upper}`}
      width={size}
      height={size}
      style={{ borderRadius: 4, objectFit: "cover" }}
      onError={(e) => {
        console.error(`Erro ao carregar imagem: ${url}`);
        e.currentTarget.style.display = "none";
      }}
    />
  );
}