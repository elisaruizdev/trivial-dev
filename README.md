# Trivial Dev

Entrevista técnica. Se elige tema y nivel, y las preguntas llegan como en una entrevista: opción múltiple, respuesta escrita o, en senior, voz.

La estructura y el mapa desde Angular están en [docs/estructura.md](docs/estructura.md).

```bash
npm install
copy .env.example .env
npm run dev
```

Sin `OPENAI_API_KEY` la partida usa el banco de ejemplo. Con la clave, cada partida pide 30 preguntas. `npm test` comprueba el flujo sin llamar al modelo. La app de Android está en `mobile/` y se explica en [docs/estructura.md](docs/estructura.md).
