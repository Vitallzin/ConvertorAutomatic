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
  // Estado para controlar o carregamento inicial, baseado no carregamento real da página
  const [isLoading, setIsLoading] = useState(() => document.readyState !== 'complete');

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => setIsLoading(false);
    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
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
