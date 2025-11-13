// Serviço para interagir com a API de conversão de moedas

// URL base da API. Se a variável de ambiente não estiver definida, usa um fallback público
// (open.er-api.com fornece endpoints no formato /latest/{BASE}).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://open.er-api.com/v6"; // URL base da API

// Buscar taxas da moeda base (USD por padrão)
export async function getRates(baseCurrency = "USD") {
  const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar taxas da API."); // Mensagem de erro genérica
  }

  const data = await response.json(); // Dados da API
  return data; // Retorna os dados da API
}

// Converter de uma moeda para outra
export async function convertCurrency(from, to, amount) {
  const ratesData = await getRates(from); // Buscar taxas da moeda base

  // Suporta diferentes formatos de resposta de provedores:
  // - open.er-api.com -> { conversion_rates: { EUR: ... }, time_last_update_utc }
  // - exchangerate.host -> { rates: { EUR: ... }, date }
  // - outros podem retornar nested data; tentamos localizar o objeto de taxas
  const ratesObj =
    (ratesData && ratesData.conversion_rates) ||
    (ratesData && ratesData.rates) ||
    (ratesData && ratesData.data && ratesData.data.rates) ||
    null;

  if (!ratesObj) {
    console.error("Formato inesperado da resposta de taxas:", ratesData);
    throw new Error("Formato inesperado da resposta da API de taxas.");
  }

  const rate = ratesObj[to]; // Taxa de conversão para a moeda alvo

  if (rate === undefined || rate === null) {
    console.error("Taxa não encontrada para", to, "no objeto:", ratesObj);
    throw new Error(`Moeda não encontrada: ${to}`); // Erro se a moeda alvo não for encontrada
  }

  const result = amount * rate; // Calcula o valor convertido

  // Tentativa de extrair a última atualização em vários formatos
  const lastUpdate =
    (ratesData && ratesData.time_last_update_utc) ||
    (ratesData && ratesData.time_last_update_unix && new Date(ratesData.time_last_update_unix * 1000).toUTCString()) ||
    ratesData.date ||
    (ratesData && ratesData.data && ratesData.data.time_last_update_utc) ||
    null;

  return {
    result,
    rate,
    base: from,
    target: to,
    lastUpdate,
    raw: ratesData,
  }; // Retorna o resultado da conversão e informações adicionais
}