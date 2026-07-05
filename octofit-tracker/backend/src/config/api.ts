export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  // It builds the URL using CODESPACE_NAME and the -8000.app.github.dev suffix
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}
