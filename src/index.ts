export { WasmLoader, WasmModuleFactory } from './loader/WasmLoader';

import { ArrayStatisticsModule } from './types/array-statistics-module.interface';
import { WasmModuleFactory, WasmLoader } from "./loader/wasm-loader";

export const statisticsFactory: WasmModuleFactory = () =>
    import('../wasm-modules/array/statistics.js').then(m => m.default());


export async function loadStatisticsModule(loader: WasmLoader): Promise<ArrayStatisticsModule> {
    return loader.loadFromFactory<ArrayStatisticsModule>('statistics', statisticsFactory);
}