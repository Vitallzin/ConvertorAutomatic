import React from "react";
import FeatureItem from "../FeatureItem";
import "./FeatureCards.css";
import { FiRefreshCw, FiZap, FiShield } from "react-icons/fi";

export default function FeatureCards() {
  const items = [
    {
      icon: <FiRefreshCw size={40} aria-label="ícone de setas" />,
      title1: "Conversão Instantânea",
      description: "Converta qualquer moeda em milissegundos usando nossa API."
    },
    {
      icon: <FiShield size={40} aria-label="ícone de escudo" />,
      title2: "Mais de 160 Moedas",
      description: "Suporte global para todas as principais moedas do mundo."
    },
    {
      icon: <FiZap size={40} aria-label="ícone de raio" />,
      title3: "Atualização em Tempo Real",
      description: "Valores atualizados constantemente para maior precisão."
    }
  ];

  return (
    <>
    <h1>Conversão de Moedas Simples e Rápida</h1>
    <p>Converta entre diferentes moedas com taxas de câmbio atualizadas em tempo real. Sistema<br></br> 
    desenvolvido para fins educativos com dados precisos e confiáveis.</p>
    <section className="feature-cards-container">
      {items.map((item, index) => (
        <FeatureItem
        key={index} // Garantir uma chave única para cada item
        icon={item.icon}
        title1={item.title1}
        title2={item.title2}
        title3={item.title3}
        description={item.description}
        />

      ))}
    </section>
    </>
  );
}
