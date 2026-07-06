import express from 'express';
import './config/database';
import routes from './routes';

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME?.trim();
const publicBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl: publicBaseUrl });
});

app.listen(port, host, () => {
  console.log(`OctoFit backend listening on http://${host}:${port}`);
  console.log(`API base URL: ${publicBaseUrl}`);
});
