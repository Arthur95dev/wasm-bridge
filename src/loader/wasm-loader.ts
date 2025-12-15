import { EmscriptenModule, WasmModule } from "../types/emscripten-module.interface";

export type WasmModuleFactory<T> = () => Promise<WasmModule<T>>;

export class WasmLoader {

    private modulesPromises: Map<string, Promise<EmscriptenModule>> = new Map();
    private modules: Map<string, EmscriptenModule> = new Map();

    async loadFromFactory<T>(id: string, factory: WasmModuleFactory<T>): Promise<WasmModule<T>> {
        const cached = this.modules.get(id);

        if (cached) {
            return cached as WasmModule<T>;
        }

        const pending = this.modulesPromises.get(id);
        if (pending) {
            return pending as Promise<WasmModule<T>>;
        }

        const promise = this.instantiate(id, factory);
        this.modulesPromises.set(id, promise);

        return promise as Promise<WasmModule<T>>;
    }

    getModule<T>(id: string): WasmModule<T> | null {
        return this.modules.get(id) as WasmModule<T> || null;
    }

    dispose(id?: string) {
        if (!id) {
            this.modules.clear();
            this.modulesPromises.clear();
            return;
        }

        this.modules.delete(id);
        this.modulesPromises.delete(id);
    }


    private async instantiate<T>(id: string, factory: WasmModuleFactory<T>): Promise<WasmModule<T>> {
        try {
            const module = await factory();

            this.modules.set(id, module);

            return module as WasmModule<T>;
        } finally {
            this.modulesPromises.delete(id);
        }
    }

}
