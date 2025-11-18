import React from "react";
import FeatureItem from "../FeatureItem";
import "./FeatureCards.css";
import setas from "../../../../public/setas.png";
import raio from "../../../../public/raio.png";
import escudo from "../../../../public/escudo.png";

export default function FeatureCards() {
  const items = [
    {
      icon: <img src={setas} alt="ícone de setas" width="40" height="40" />,
      title1: "Conversão Instantânea",
      description: "Converta qualquer moeda em milissegundos usando nossa API."
    },
    {
      icon: <img src={escudo} alt="ícone de escudo" width="40" height="40" />,
      title2: "Mais de 160 Moedas",
      description: "Suporte global para todas as principais moedas do mundo."
    },
    {
      icon: <img src={raio} alt="ícone de raio" width="40" height="40" />,
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
        key={index}
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
