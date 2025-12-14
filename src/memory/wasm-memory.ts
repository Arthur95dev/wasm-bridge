import { VectorInstanceCpp } from "../types/types";

/**
 * RAII helper для одного VectorInstanceCpp
 *
 * Автоматически вызывает delete() после использования
 *
 * @param factory Фабрика вектора (например, statsModule.VectorInt)
 * @param callback Функция, которая использует вектор
 */
export async function withVector<T = number>(
    factory: { new(): VectorInstanceCpp<T> },
    callback: (vector: VectorInstanceCpp<T>) => void | Promise<void>
): Promise<void> {
    const vector = new factory();

    try {
        await callback(vector);
    } finally {
        vector.delete(); // гарантированное освобождение памяти
    }
}

/**
 * RAII helper для нескольких VectorInstanceCpp
 *
 * Автоматически вызывает delete() для каждого вектора после использования
 *
 * @param factories Массив фабрик векторов
 * @param callback Функция, которая использует массив векторов
 */
export async function withVectors<T = number>(
    factories: Array<{ new(): VectorInstanceCpp<T> }>,
    callback: (vectors: VectorInstanceCpp<T>[]) => void | Promise<void>
): Promise<void> {
    const vectors = factories.map(f => new f());

    try {
        await callback(vectors);
    } finally {
        vectors.forEach(v => v.delete());
    }
}
