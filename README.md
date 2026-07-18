# ConvertorAutomatic 💱

Conversor de moedas em tempo real, construído em React + Vite. Projeto acadêmico criado para colocar em prática consumo de APIs, componentização e boas práticas de front-end.

## Funcionalidades

- **Conversão em tempo real** entre mais de 160 moedas, com taxas atualizadas via API.
- **Seletor de moeda com busca** — dropdown customizado com bandeira, sigla e filtro por código ou nome (ex: `brl`, `real`), no lugar do `<select>` nativo do navegador.
- **Inversão inteligente** — o botão de swap troca as moedas mantendo os valores já calculados (o resultado vira o novo valor editável, e vice-versa).
- **Tabela de taxas de câmbio** em um modal, com o mesmo seletor pesquisável para trocar a moeda base.
- **Tema claro/escuro** com preferência salva localmente.
- **Layout responsivo**, sem overflow horizontal em telas pequenas.
- **Tratamento de erros** com `ErrorBoundary` e handlers globais.

## Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [react-icons](https://react-icons.github.io/react-icons/) para os ícones da interface
- CSS puro, com variáveis de tema (light/dark) em [`src/styles/global.css`](src/styles/global.css)

## Como rodar localmente

Pré-requisitos: Node.js 18+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/Vitallzin/ConvertorAutomatic.git
cd ConvertorAutomatic

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Outros scripts disponíveis:

```bash
npm run build    # build de produção
npm run preview  # serve o build de produção localmente
npm run lint     # roda o ESLint
```

## Estrutura do projeto

```
src/
├── components/
│   ├── Header/                   # Barra superior (logo, links, tema)
│   ├── FeatureCards/              # Cards de destaque na home
│   ├── Converter/
│   │   ├── Converter/             # Orquestra o fluxo de conversão
│   │   ├── AmountInput/           # Campo de valor com símbolo da moeda
│   │   ├── CurrencyDropdown/      # Seletor de moeda com busca e bandeira
│   │   ├── CurrencySelectorFrom/  # Wrapper do CurrencyDropdown (moeda de origem)
│   │   ├── CurrencySelectorTo/    # Wrapper do CurrencyDropdown (moeda de destino)
│   │   ├── SwapButton/            # Botão de inverter moedas
│   │   └── ResultBox/             # Exibição do valor convertido
│   ├── RatesTable/
│   │   └── RatesTableModal/       # Modal com a tabela de taxas de câmbio
│   ├── Flag/                      # Bandeira do país (FlagCDN, com fallback local para EUR)
│   ├── ThemeToggle/                # Alternância de tema claro/escuro
│   ├── Loader/                     # Tela de carregamento inicial (real, baseada no load da página)
│   ├── ErrorBoundary/               # Captura erros de render
│   └── Footer/                      # Rodapé (sobre, APIs usadas, desenvolvedor)
├── services/
│   └── Api.js                     # Integração com a API de câmbio
├── utils/
│   ├── CurrencData.js             # Dados estáticos das moedas (símbolo, país, nome)
│   └── initErrorHandlers.js       # Handlers globais de erro
├── assets/                        # Imagens importadas pelo código (ex: bandeira da UE)
└── main.jsx                       # Entry point
```

## APIs utilizadas

| API | Uso |
|---|---|
| [Exchange Rate API](https://www.exchangerate-api.com/) | Cotações de câmbio em tempo real |
| [FlagCDN](https://flagcdn.com/) | Bandeiras dos países |

## Desenvolvido por

[Vitallzin](https://github.com/Vitallzin)

## Licença

Projeto aberto para uso pessoal e educacional.
