# Ongehoord Quiz 2026

A content-driven quiz platform built with **Nuxt 4** and **Nuxt Content v3**. Quizzes are authored as plain Markdown and YAML files — no CMS required.

## Tech Stack

- **[Nuxt 4](https://nuxt.com)** — Vue 3 full-stack framework
- **[Nuxt Content v3](https://content.nuxt.com)** — file-based CMS with typed collections
- **[Nuxt UI v4](https://ui.nuxt.com)** — component library
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **TypeScript**
- **pnpm** — package manager

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm**

### Install & Run

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate
```

## Content Structure

Each quiz lives in its own folder under `content/quizzes/`:

```
content/quizzes/{slug}/
├── index.md            # Quiz metadata & intro (title, description, timeLimit)
├── questions/
│   ├── q-001.yml       # One file per question
│   ├── q-002.yml
│   └── ...
└── score.yml           # Scoring ranges
```

Collections and schemas are defined in `content.config.ts`.

## Adding a New Quiz

1. Create a folder: `content/quizzes/my-quiz/`
2. Add an `index.md` with frontmatter:

   ```md
   ---
   title: My Quiz
   description: A short description of the quiz.
   timeLimit: 120
   ---

   ## intro

   Introductory text shown before the quiz starts.
   ```

3. Add question files in `questions/` (e.g. `q-001.yml`):

   ```yaml
   id: q-001
   question: What is the answer?
   answers:
     - Option A
     - Option B
     - Option C
   correct: 0
   difficulty: easy
   points: 1
   type: multiple-choice
   explanation:
     text: Option A is correct because…
   ```

4. Add a `score.yml`:

   ```yaml
   ranges:
     - min: 0
       max: 3
       title: Beginner
       text: Keep learning!
     - min: 4
       max: 6
       title: Expert
       text: Well done!
   ```

## Question Schema

| Field          | Type                                       | Required |
| -------------- | ------------------------------------------ | -------- |
| `id`           | `string`                                   | ✅        |
| `question`     | `string`                                   | ✅        |
| `answers`      | `string[]`                                 | ✅        |
| `correct`      | `number` (0-based index)                   | ✅        |
| `image`        | `string` (path)                            | optional |
| `type`         | `multiple-choice` · `boolean` · `image`    | optional |
| `difficulty`   | `easy` · `medium` · `hard`                 | optional |
| `points`       | `number`                                   | optional |
| `explanation`  | `{ text: string, video?: string }`         | optional |

## Score Schema

Each `score.yml` contains a `ranges` array:

| Field   | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| `min`   | `number` | Minimum score (inclusive)          |
| `max`   | `number` | Maximum score (inclusive)          |
| `title` | `string` | Label shown to the user            |
| `text`  | `string` | Feedback message for this range    |

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start development server             |
| `pnpm dev:pwa`       | Start dev server with PWA plugin     |
| `pnpm build`         | Build for production (SSR)           |
| `pnpm generate`      | Generate static site                 |
| `pnpm preview`       | Preview production build             |
| `pnpm start`         | Start production server              |
| `pnpm start:generate`| Serve the generated static site      |
| `pnpm lint`          | Run ESLint                           |
| `pnpm typecheck`     | Run type checking                    |

## License

All rights reserved.
