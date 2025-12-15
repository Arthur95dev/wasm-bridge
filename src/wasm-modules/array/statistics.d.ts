import { ArrayStatisticsModule } from '../../types/array/array-statistics-module.interface';
import { WasmModule } from "../../types/emscripten-module.interface";

declare const factory: () => Promise<WasmModule<ArrayStatisticsModule>>;

export default factory;
