# wasm-bridge

> **Framework-agnostic, strongly-typed WebAssembly loader and SDK for Emscripten / embind modules**

`wasm-bridge` — это универсальная TypeScript-библиотека для безопасной и типизированной работы с WebAssembly-модулями, собранными через **Emscripten + embind**.

Библиотека:
- не привязана к Angular / React / Vue
- корректно работает с любым сборщиком
- решает проблему конкурентной загрузки wasm
- предоставляет строгую типизацию C++ API в TypeScript

## ✨ Features

- 🚀 **Framework-agnostic** — работает в любом JS/TS окружении
- 🔒 **Concurrency-safe loading** — защита от повторных и параллельных загрузок
- 🧠 **Strong typing** — полная типизация embind API
- ♻️ **Memory-safe helpers** — безопасная работа с C++ объектами
- 📦 **Modular architecture** — подключай только нужные wasm-модули
- ⚡ **ESM + tree-shaking friendly**

## 📦 Installation

```bash
npm install wasm-bridge
