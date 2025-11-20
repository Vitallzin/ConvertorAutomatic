import React from "react";
import './Flag.css'
import { currencyData } from "../../utils/CurrencData";

export default function Flag({ currency, size = 32 }) {
  if (!currency) return null;

  const upper = currency.toUpperCase();
  // Pega todos os dados da moeda, incluindo o novo campo 'flag'
  const data = currencyData?.[upper]; 
  const country = data?.country;

  // 1. VERIFICA IMAGEM LOCAL PRIMEIRO (Para EUR)
  // Se o objeto de dados da moeda tiver a propriedade 'flag', usa a imagem local.
  if (data?.flag) {
    return (
      <img
        src={data.flag} // Usa a imagem importada localmente (EU.png)
        alt={`Bandeira ${upper}`}
        width= {size}
        height={size}
        style={{ borderRadius: 4, objectFit: "cover" }}
      />
    );
  }

  // 2. Tenta usar a API de bandeiras
  if (!country) {
    // Retorna um placeholder se não houver código de país válido (e não houver imagem local)
    console.warn(`Moeda não encontrada ou sem código de país: ${upper}`);
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

  // Tenta construir a URL com o código de país da API
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