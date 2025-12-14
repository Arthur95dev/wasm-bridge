import { EmscriptenModule, TypedModule } from "../types/emscripten-module.interface";

export type WasmModuleFactory = () => Promise<EmscriptenModule>;

export class WasmLoader {

    private modulesPromises: Map<string, Promise<EmscriptenModule>> = new Map();
    private modules: Map<string, EmscriptenModule> = new Map();

    async loadFromFactory<T>(id: string, factory: WasmModuleFactory): Promise<TypedModule<T>> {
        const cached = this.modules.get(id);

        if (cached) {
            return cached as TypedModule<T>;
        }

        const pending = this.modulesPromises.get(id);
        if (pending) {
            return pending as Promise<TypedModule<T>>;
        }

        const promise = this.instantiate(id, factory);
        this.modulesPromises.set(id, promise);

        return promise as Promise<TypedModule<T>>;
    }

    getModule<T>(id: string): TypedModule<T> | null {
        return this.modules.get(id) as TypedModule<T> || null;
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


    private async instantiate<T>(id: string, factory: WasmModuleFactory): Promise<TypedModule<T>> {
        try {
            const module = await factory();

            this.modules.set(id, module);

            return module as TypedModule<T>;
        } finally {
            this.modulesPromises.delete(id);
        }
    }

}
