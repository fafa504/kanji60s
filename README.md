# Kanji60s

A complete React + Vite rebuild of **kanji60s.com** — an English-only Kanji learning web app focused on visual mindmaps, flashcards and exercises.

Inspiration came from the original site's HTML (kanji60s.com): the way it presents the
problem of rote kanji memorization, the "visual mindmap" method (components like `人` + `木` → `休`),
the pricing plans and the FAQ content.

## Features

- **Landing page** — hero, method explanation, how it works, pricing, FAQ.
- **JLPT Kanji browser** — searchable/filterable grid of the Joyo kanji list
  (JLPT level, stroke count range, keyword search) with a detail modal.
- **Kanji mindmap** — interactive D3.js force-directed graph with zoom/pan,
  JLPT-colored nodes and click-to-inspect details.
- **Flashcard** — 3D flip card deck per JLPT level with prev/next navigation.
- **Exercises** — quizzes in both directions (kanji → meaning, meaning → kanji) with scoring.
- **Vocabulary & Grammar** — curated content per JLPT level.
- **Products, Documents, Guide** — pricing plans, terms/privacy, getting-started steps.

## Tech stack

- React 19 + Vite 8
- react-router-dom (routing)
- d3 (mindmap graph)
- Plain CSS (design tokens in `src/index.css`)

## Kanji data

The full JLPT Joyo kanji dataset (2,140 entries with meanings, readings, stroke counts,
Heisig English) is fetched from [kanjiapi.dev](https://kanjiapi.dev) and stored as
`public/kanji-data.json`. The app loads it at runtime from `/kanji-data.json`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & preview

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Layout, Navbar, Footer, MindmapGraph, KanjiModal
  data/         vocabulary.js, grammar.js, products.js
  lib/          kanji.js (dataset helpers)
  pages/        Home, Kanji, Mindmap, Flashcard, Exercises, Vocabulary, Grammar, Products, Documents, Guide
  App.jsx       routes
  index.css     global styles / design tokens
public/
  kanji-data.json   generated kanji dataset (from kanjiapi.dev)
```

## License

All rights reserved. Kanji60s content is the property of J-V DESIGN LLC.
