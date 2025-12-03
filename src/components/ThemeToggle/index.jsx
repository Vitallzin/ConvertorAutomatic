import React, { useEffect, useState } from "react";
// REVERTER PARA OS IMPORTS ORIGINAIS DE IMAGEM
import lua from "../../../public/lua.png";
import sol from "../../../public/sol.png";
import "./ThemeToggle.css";

export default function ThemeToggle() { // Componente funcional
  const [theme, setTheme] = useState("light"); // Valor inicial padrão
  
  
  useEffect(() => { // Verifica o tema salvo ou a preferência do sistema
    const saved = localStorage.getItem("theme"); // Pega o tema salvo no localStorage
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // Verifica preferência do sistema
    const initial = saved || (prefersDark ? "dark" : "light"); // Define o tema inicial
    setTheme(initial); // Atualiza o estado do tema

    document.documentElement.classList.toggle("dark", initial === "dark"); // Aplica a classe 'dark' se o tema for dark
  }, []);

  const toggle = () => { // Alterna entre os temas
    const next = theme === "dark" ? "light" : "dark"; // Define o próximo tema
    setTheme(next); // Atualiza o estado do tema
    localStorage.setItem("theme", next); // Salva o tema no localStorage
    document.documentElement.classList.toggle("dark", next === "dark"); // Atualiza a classe 'dark' no elemento raiz
  };

  return (
    <button
      // Use a classe 'is-active' quando o tema for dark
      className="theme-toggle"  // Botão de alternância de tema
      onClick={toggle} // Chama a função toggle ao clicar
    >
      {/* REVERTER PARA A TAG <img> verdade */}
      <img 
        src={theme === "dark" ? sol : lua} // Mostra o ícone baseado no tema atual
        width="20"
        height="20"
        alt="ícone de tema"
      />
    </button>
  );
}
