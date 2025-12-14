// ====== Экспорт WasmLoader ======
export { WasmLoader, WasmModuleFactory } from './loader/WasmLoader';

// ====== Предзагруженные фабрики для твоих модулей ======
import { ArrayStatisticsModule } from './types/array-statistics-module.interface';
import { WasmModuleFactory, WasmLoader } from "./loader/wasm-loader";

// Фабрика для statistics.js
export const statisticsFactory: WasmModuleFactory = () =>
    import('../wasm-modules/array/statistics.js').then(m => m.default());

// Удобные функции для быстрого использования модулей
export async function loadStatisticsModule(loader: WasmLoader): Promise<ArrayStatisticsModule> {
    return loader.loadFromFactory<ArrayStatisticsModule>('statistics', statisticsFactory);
}

export async function loadAdvancedStatisticsModule(loader: WasmLoader): Promise<ArrayStatisticsModule> {
    return loader.loadFromFactory<ArrayStatisticsModule>('advanced_statistics', advancedStatisticsFactory);
}
