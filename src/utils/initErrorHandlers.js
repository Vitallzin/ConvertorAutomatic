// Inicializa handlers globais para capturar erros e evitar o overlay que deixa a tela preta
// apenas suprime o overlay para erros originados no código fonte da aplicação (pasta /src/)

function isAppError(stackOrFilename) {
  if (!stackOrFilename) return false;
  return String(stackOrFilename).includes('/src/') || String(stackOrFilename).includes('src\\');
}

// adiciona listener para erros não capturados
window.addEventListener('error', (event) => {
  try {
    const filename = event.filename || (event.error && event.error.fileName);
    if (isAppError(filename) || isAppError(event.message) || (event.error && isAppError(event.error.stack))) {
      // impede o overlay do Vite e evita que a tela fique toda preta
      event.preventDefault();
      event.stopImmediatePropagation();
      console.error('Erro capturado (suprimido overlay):', event.error || event.message, filename);
      return;
    }
  } catch (e) {
    // se o handler falhar, não faz nada
    console.error('initErrorHandlers error:', e);
  }
});

// listener para promises rejeitadas não tratadas
window.addEventListener('unhandledrejection', (event) => {
  try {
    const reason = event.reason;
    if (isAppError(reason && reason.stack) || isAppError(reason && reason.message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.error('UnhandledRejection capturada (suprimido overlay):', reason);
      return;
    }
  } catch (e) {
    console.error('initErrorHandlers unhandledrejection error:', e);
  }
});

export default function initErrorHandlers() {
  // função de inicialização (já rodada quando importada)
}
