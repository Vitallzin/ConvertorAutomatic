# Conversor Automático de Moedas 💱

Um aplicativo React moderno para conversão de moedas em tempo real com interface intuitiva e suporte a múltiplas moedas.

## 🎯 Funcionalidades

- ✅ **Conversão de moedas em tempo real** - Acesso a taxas de câmbio atualizadas via API
- ✅ **Múltiplas moedas suportadas** - USD, EUR, BRL, GBP, JPY, CNY, AUD, CAD, e mais
- ✅ **Bandeiras dos países** - Exibição visual das bandeiras para cada moeda
- ✅ **Swap de moedas** - Botão para inverter as moedas origem/destino
- ✅ **Formatação localizada** - BRL com 0 casas decimais, outras moedas com 2
- ✅ **Data/hora de atualização** - Mostra quando a taxa foi atualizada (fuso horário São Paulo)
- ✅ **Tratamento de erros robusto** - ErrorBoundary e handlers globais
- ✅ **Responsivo** - Interface adaptável para diferentes tamanhos de tela

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ e npm

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/Vitallzin/ConvertorAutomatic.git
cd ConvertorAutomatic

# Instalar dependências
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Converter/           # Componente principal
│   │   ├── Converter/       # Orquestrador de lógica
│   │   ├── AmountInput/     # Input de valor
│   │   ├── ConvertButton/   # Botão de conversão
│   │   ├── SwapButton/      # Botão de inversão
│   │   ├── ResultBox/       # Exibição de resultado
│   │   ├── CurrencySelectorFrom/  # Seletor origem
│   │   └── CurrencySelectorTo/    # Seletor destino
│   ├── Flag/                # Componente de bandeira
│   ├── ErrorBoundary/       # Tratamento de erros
│   └── ...outros
├── services/
│   └── api.js               # Integração com API de câmbio
├── utils/
│   ├── currencyToCountry.js # Mapeamento moeda→país
│   └── initErrorHandlers.js # Handlers globais de erro
└── main.jsx                 # Entry point
```

## 🔧 Componentes Principais

### Converter (`src/components/Converter/Converter/index.jsx`)
Gerencia todo o fluxo da conversão:
- Estado das moedas selecionadas
- Valor a converter
- Chamadas à API
- Exibição de resultados

### Flag (`src/components/Flag/index.jsx`)
Exibe a bandeira do país associado à moeda:
- Usa API `flagcdn.com` para imagens
- Fallback para código de moeda se bandeira não carregar
- Tratamento de erros de carregamento

### ErrorBoundary (`src/components/ErrorBoundary/index.jsx`)
Captura erros de render e exibe interface amigável ao usuário

## 📡 API Utilizada

- **Base**: open.er-api.com
- **Endpoint**: `/v1/latest/{moeda}`
- **Bandeiras**: flagcdn.com

## 💰 Moedas Suportadas

USD, EUR, BRL, GBP, ARS, AUD, CAD, CHF, CNY, JPY, KRW, NZD, SEK, NOK, DKK, RUB, INR, MXN, ZAR, TRY, HKD, SGD, AED, SAR, CLP, COP, PEN, BOB, UYU, PYG, PLN, CZK, HUF, THB, MYR, PHP, IDR, ILS, EGP, VND, BHD, QAR, KWD

## 🎨 Personalização

### Alterar formato de decimais
Edite `src/components/Converter/ResultBox/index.jsx` - função `formatConvertedAmount()`

### Adicionar novas moedas
1. Atualize `src/utils/currencyToCountry.js`
2. A bandeira será carregada automaticamente

## ⚠️ Tratamento de Erros

- **ErrorBoundary**: Captura erros de render
- **Global Error Handlers**: Suprime overlay do Vite para erros da aplicação
- **Try/Catch**: Proteção em operações críticas (formatação, API)

## 🐛 Debug

Abra o DevTools (F12) e verifique:
- Console para logs de erro
- Network para requisições à API
- Application para verificar estado

## 📦 Dependências

- React 18+
- Vite (dev)
- ESLint (dev)

## 🤝 Contribuições

Sinta-se livre para abrir issues e pull requests!

## 📝 Licença

Este projeto está aberto para uso pessoal e educacional.

---

**Desenvolvido com ❤️ usando React + Vite**
