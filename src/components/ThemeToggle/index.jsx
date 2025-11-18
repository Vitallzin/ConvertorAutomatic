import React, { useEffect, useState } from "react";
// REVERTER PARA OS IMPORTS ORIGINAIS DE IMAGEM
import lua from "../../../public/lua.png";
import sol from "../../../public/sol.png";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  
  // ... (Seu useEffect e toggle)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);

    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <button
      // Use a classe 'is-active' quando o tema for dark
      className={`theme-toggle ${theme === "dark" ? "is-active" : ""}`}
      onClick={toggle}
    >
      {/* REVERTER PARA A TAG <img> */}
      <img
        src={theme === "dark" ? sol : lua}
        width="20"
        height="20"
        alt="ícone de tema"
      />
    </button>
  );
}
