// Serviço para interagir com a API de conversão de moedas

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // URL base da API

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
  const rates = await getRates(from); // Buscar taxas da moeda base

  const rate = rates.conversion_rates[to]; // Taxa de conversão para a moeda alvo

  if (!rate) {
    throw new Error("Moeda não encontrada."); // Erro se a moeda alvo não for encontrada
  }

  const result = amount * rate; // Calcula o valor convertido

  return {
    result,
    rate,
    base: from,
    target: to,
    lastUpdate: rates.time_last_update_utc
  }; // Retorna o resultado da conversão e informações adicionais
}
