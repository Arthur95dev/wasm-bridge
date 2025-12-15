import { BasicMathModule } from "../../types/basic-math/basic-math-module.interface";
import { WasmModule } from "../../types/emscripten-module.interface";

declare const factory: () => Promise<WasmModule<BasicMathModule>>;

export default factory;
