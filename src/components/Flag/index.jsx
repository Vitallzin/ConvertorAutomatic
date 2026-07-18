import React from "react";
import './Flag.css'
import { currencyData } from "../../utils/CurrencData";

export default function Flag({ currency, size = 32, loading = "lazy" }) {
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
        loading={loading}
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

  // Usa o FlagCDN (CDN estático, muito mais confiável que APIs geradas na hora).
  // A CDN só serve alguns tamanhos fixos (w20, w40, w80...); pegamos w40 e deixamos
  // o <img> escalar via width/height para o tamanho pedido.
  const url = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;

  return (
    <img
      src={url}
      alt={`Bandeira ${upper}`}
      width={size}
      height={size}
      style={{ borderRadius: 4, objectFit: "cover" }}
      loading={loading}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}