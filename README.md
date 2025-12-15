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



## 🧪 Full Example: Using wasm-bridge Modules

```ts
import { WasmLoader, loadArrayStatisticsModule } from 'wasm-bridge';

// 1️⃣ Создаём лоадер
const loader = new WasmLoader();

async function runExample() {
  // 2️⃣ Загружаем модуль статистики
  const statisticsModule = await loadArrayStatisticsModule(loader);

  // 3️⃣ Создаём C++ вектор и работаем с ним
  await statisticsModule.withVector(statisticsModule.VectorInt, async (vector) => {
    vector.push_back(10);
    vector.push_back(20);
    vector.push_back(30);
    vector.push_back(40);

    // 4️⃣ Вычисляем статистику
    const sum = statisticsModule.sumArrayInt(vector);
    const average = statisticsModule.averageArrayInt(vector);
    const min = statisticsModule.minArrayInt(vector);
    const max = statisticsModule.maxArrayInt(vector);

    console.log('Vector values: [10, 20, 30, 40]');
    console.log('Sum:', sum);          // Sum: 100
    console.log('Average:', average);  // Average: 25
    console.log('Min:', min);          // Min: 10
    console.log('Max:', max);          // Max: 40
  });

  // 5️⃣ Используем расширенные функции (например, медиану)
  await statisticsModule.withVector(statisticsModule.VectorFloat, async (vector) => {
    vector.push_back(1.5);
    vector.push_back(2.5);
    vector.push_back(3.5);

    const median = statisticsModule.medianInt(vector); // пример для int, кастуем float в int
    console.log('Median of [1.5, 2.5, 3.5]:', median); // 2
  });

  // 6️⃣ Завершаем работу с модулями
  loader.dispose(); // освобождаем все загруженные WASM модули и память
}

// Запускаем пример
runExample().catch(console.error);

## 📦 Installation

```bash
npm install wasm-bridge

