import { LinearAlgebraModule } from "../../types/linear-algebra/linear-algebra-module.interface";
import { WasmModule } from "../../types/emscripten-module.interface";

declare const factory: () => Promise<WasmModule<LinearAlgebraModule>>;

export default factory;
