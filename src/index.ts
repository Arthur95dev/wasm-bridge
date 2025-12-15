export { WasmLoader, WasmModuleFactory } from './loader/wasm-loader';

import { ArrayStatisticsModule } from "./types/array/array-statistics-module.interface";
import { ArraySortModule } from "./types/array/array-sort-module.interface";
import { BasicMathModule } from "./types/basic-math/basic-math-module.interface";
import { LinearAlgebraModule } from "./types/linear-algebra/linear-algebra-module.interface";
import { WasmModuleFactory, WasmLoader } from "./loader/wasm-loader";
import { WasmModule } from "./types/emscripten-module.interface";

export const arrayStatisticsFactory: WasmModuleFactory<ArrayStatisticsModule> = () =>
    import('./wasm-modules/array/statistics.js').then(m => m.default());

export const arraySortFactory: WasmModuleFactory<ArraySortModule> = () =>
    import('./wasm-modules/array/sort.js').then(m => m.default());

export const baseMathFactory: WasmModuleFactory<BasicMathModule> = () =>
    import('./wasm-modules/basic-math/basic-math').then(m => m.default());

export const linearAlgebraFactory: WasmModuleFactory<LinearAlgebraModule> = () =>
    import('./wasm-modules/linear-algebra/linear-algebra').then(m => m.default());

export async function loadArrayStatisticsModule(loader: WasmLoader): Promise<WasmModule<ArrayStatisticsModule>> {
    return loader.loadFromFactory<ArrayStatisticsModule>('arrayStatistics', arrayStatisticsFactory);
}

export async function loadArraySortModule(loader: WasmLoader): Promise<WasmModule<ArraySortModule>> {
    return loader.loadFromFactory<ArraySortModule>('arraySort', arraySortFactory);
}

export async function loadBaseMathModule(loader: WasmLoader): Promise<WasmModule<BasicMathModule>> {
    return loader.loadFromFactory<BasicMathModule>('baseMath', baseMathFactory);
}

export async function loadLinearAlgebraModule(loader: WasmLoader): Promise<WasmModule<LinearAlgebraModule>> {
    return loader.loadFromFactory<LinearAlgebraModule>('linearAlgebra', linearAlgebraFactory);
}