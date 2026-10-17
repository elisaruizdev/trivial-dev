# Trivial Dev

**A technical interview simulator for developers.** Pick a technology and a seniority level, and Trivial Dev runs a mock interview: questions arrive one at a time, the way a recruiter or tech lead would ask them. You answer by choosing an option, typing an explanation or speaking out loud. Each answer gets a grade and an explanation.

It ships as a **web app** (React + Vite) and an **Android app** (React Native + Expo). Both use the same domain and application code.

---

## Features

- **AI-generated interviews.** Each round asks for 30 fresh questions from an OpenAI-compatible model, tailored to the topic and level you chose.
- **Three answer formats.**
  - *Multiple choice*: graded by exact match, so the score never depends on the model.
  - *Written*: the model grades your explanation.
  - *Voice*: dictate your answer through the browser's Web Speech API or Android's speech recognition, then edit the transcript before you send it. Voice questions are mostly asked at senior level.
- **Code snippets you can run.** When a question includes code, you can edit it in an embedded editor. JavaScript runs in a sandboxed Web Worker and its `console.log` output appears in a console panel. HTML and CSS render in a preview frame with scripts disabled.
- **Coding practice.** A separate screen with exercises to write code, sorted by level.
- **Your own questions.** Write questions of your own and mix them into a round. Each one can link a source (`https://…`) to check when you answer.
- **Always playable offline.** If there is no API key, or the model returns malformed data, the round falls back to a built-in question bank and tells you so. Open answers then get an approximate score based on keyword matching.
- **Android extras.** Practice reminders, interview history, per-level statistics with progress between sessions, and an "About this app" screen.

### Topics

HTML · CSS · SCSS · JavaScript · TypeScript · Angular · React · Vue · AI · PHP / Laravel · Kotlin · Swift

Each topic has three levels: **junior**, **mid** and **senior**.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Web UI | React 19, React Router 7, TypeScript |
| Build & dev server | Vite 8 |
| Mobile | React Native 0.86, Expo 57 |
| AI | OpenAI Chat Completions API, or any compatible endpoint |
| Testing | Vitest, Testing Library, jsdom |
| Linting | oxlint |

---

## Architecture

The code follows a layered, ports-and-adapters design, which is why the Android app can reuse most of the web code:

```
src/
├── domain/          Pure types: topics, levels, questions, grades. No React.
├── application/     Use cases, the interview reducer and port interfaces.
├── infrastructure/  Adapters: HTTP client, question bank, evaluators, speech, storage.
└── ui/              React components and screens. Never imports infrastructure.

server/              Dev proxy that holds the API key and calls the model.
mobile/              React Native app that reuses src/domain and src/application.
```

- **`QuestionSource`** loads questions. `ResilientQuestionSource` tries the HTTP source first and falls back to the local bank.
- **`AnswerEvaluator`** grades answers. Multiple choice uses an exact evaluator. Open answers use the model and fall back to a heuristic.
- **`SpeechTranscriber`** handles voice input, with one implementation per platform.
- **`createServices()`** is the composition root: the only place where concrete adapters are created.

A test (`src/application/ui-boundary.test.ts`) fails if the UI layer imports infrastructure.

To add a new topic, add one entry to `src/domain/topic.ts`. The setup screen, the interview flow and the server pick it up without other changes.

See [docs/estructura.md](docs/estructura.md) for a full walkthrough (in Spanish), including a mapping from Angular concepts to their React equivalents.

---

## Getting started

### Requirements

- Node.js 20 or newer
- An OpenAI API key (optional: without one the app runs on the built-in bank)

### Web app

```bash
npm install
cp .env.example .env      # on Windows: copy .env.example .env
npm run dev
```

Open the URL Vite prints. The dev server listens on your local network (`vite --host`), so the Android app can reach it too.

### Configuration

| Variable | Description | Default |
| --- | --- | --- |
| `OPENAI_API_KEY` | Key used by the server-side proxy. Never sent to the browser. | none |
| `OPENAI_MODEL` | Model used to generate and grade questions. | `gpt-4o-mini` |
| `OPENAI_BASE_URL` | Optional. Any OpenAI-compatible endpoint. | `https://api.openai.com/v1` |

The key lives only in `.env`, which is git-ignored. The browser talks to `/api/questions` and `/api/grade`, and the proxy in `server/interview-api.ts` calls the model.

### Android app

```bash
cd mobile
npm install
npx expo run:android      # native build: needs the Android SDK
```

The app talks to the same Vite proxy over your local network, so start `npm run dev` on your computer first and keep the phone on the same Wi-Fi. You can also open the project in **Expo Go** with `npx expo start`. Voice input and the code console need the native build.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with the AI proxy. |
| `npm run build` | Type-check and build for production. |
| `npm run preview` | Serve the production build locally, with the proxy. |
| `npm test` | Run the test suite (no network calls). |
| `npm run lint` | Lint the project with oxlint. |

The tests cover the question parser, the interview reducer, the question bank, the code runner and full screen flows, such as picking a topic, answering and reaching the results.

---

## Author

Built by **Elisa Ruiz** · [GitHub](https://github.com/elisaruizdev)
