import { ArraySortModule } from "../../types/array/array-sort-module.interface";
import { WasmModule } from "../../types/emscripten-module.interface";

declare const factory: () => Promise<WasmModule<ArraySortModule>>;

export default factory;
