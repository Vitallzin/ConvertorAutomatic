// App.jsx (Modificado)

import React, { useState, useEffect } from 'react'; // Importar useState e useEffect
import './App.css';
import Header from './components/Header';
import Converter from './components/Converter/Converter';
import Footer from './components/Footer';
import FeatureCards from './components/FeatureCards/FeatureCards';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader'; // Importar o Loader (assumindo o caminho)

function App() {
  // Estado para controlar o carregamento inicial
  const [isLoading, setIsLoading] = useState(true);

  // Simula o tempo de carregamento da aplicação ou dados iniciais
  useEffect(() => {
    // Substitua este setTimeout pela sua lógica real de carregamento de dados iniciais (ex: chamar API)
    const timer = setTimeout(() => {
      setIsLoading(false); // O carregamento terminou após 2 segundos
    }, 2000); 

    // Função de limpeza
    return () => clearTimeout(timer);
  }, []); // Executa apenas uma vez ao montar

  // Se estiver carregando, exibe apenas o Loader
  if (isLoading) {
    // Você pode precisar ajustar o caminho de importação do Loader
    return <Loader />; 
  }

  // Se o carregamento terminou, exibe o conteúdo completo da aplicação
  return (
    <>
      <Header />
      <FeatureCards/>
      <Converter />
      <ErrorBoundary/>
      <Footer /> 
    </>
  );
}

export default App;
