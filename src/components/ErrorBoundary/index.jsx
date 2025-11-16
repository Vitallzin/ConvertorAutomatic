import React from 'react';

// Componente ErrorBoundary para capturar erros em componentes filhos
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza estado para renderizar fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Você pode enviar logs para um serviço externo aqui
    console.error('ErrorBoundary capturou um erro:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // UI de fallback simples
      return (
        <div style={{ padding: 20, background: '#2b2b2b', color: '#fff', borderRadius: 8 }}>
          <h3>Ocorreu um erro no componente.</h3>
          <p>Recarregue a página ou tente novamente. Verifique o console para detalhes.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
