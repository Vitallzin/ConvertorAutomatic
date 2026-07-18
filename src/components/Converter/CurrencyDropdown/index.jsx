import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Flag from "../../Flag";
import { currencyData } from "../../../utils/CurrencData";
import "./CurrencyDropdown.css";

const allCurrencyCodes = Object.keys(currencyData);

// Dropdown de moedas customizado (com bandeira e busca), no lugar do <select> nativo do navegador.
// Por padrão lista todas as moedas conhecidas; passe `currencies` para restringir a uma lista específica
// (ex: apenas as moedas que a API de taxas realmente retornou).
function CurrencyDropdown({ value, onChange, currencies = allCurrencyCodes, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  // Fecha o painel ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ao abrir, limpa a busca anterior e foca o campo de pesquisa
  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    const timeout = setTimeout(() => searchRef.current?.focus(), 0);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const filteredCodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return currencies;

    return currencies.filter((code) => {
      const name = (currencyData[code]?.namecomplete || "").toLowerCase();
      return code.toLowerCase().includes(normalizedQuery) || name.includes(normalizedQuery);
    });
  }, [query, currencies]);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="currency-dropdown" ref={containerRef}>
      <button
        type="button"
        className="currency-dropdown-trigger"
        onClick={() => setIsOpen((open) => !open)}
        disabled={disabled}
      >
        <Flag currency={value} size={22} loading="eager" />
        <span className="currency-dropdown-code">{value}</span>
        <FiChevronDown className={`currency-dropdown-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="currency-dropdown-panel"
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
        >
          <input
            ref={searchRef}
            type="text"
            className="currency-dropdown-search"
            placeholder="Buscar moeda..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />

          <ul className="currency-dropdown-list">
            {filteredCodes.length === 0 && (
              <li className="currency-dropdown-empty">Nenhuma moeda encontrada</li>
            )}
            {filteredCodes.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  className={`currency-dropdown-option ${code === value ? "selected" : ""}`}
                  onClick={() => handleSelect(code)}
                >
                  <Flag currency={code} size={20} />
                  <span className="currency-dropdown-option-code">{code}</span>
                  <span className="currency-dropdown-option-name">
                    {currencyData[code]?.namecomplete || code}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CurrencyDropdown;
