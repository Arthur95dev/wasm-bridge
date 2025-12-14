import { VectorInstanceCpp } from "../data-structures/vector-instance.interface";
import { MatrixInstanceCpp } from "../data-structures/matrix-instance.interface";

export interface LinearAlgebraModule {
    VectorFloat: { new (): VectorInstanceCpp<number> };
    VectorDouble: { new (): VectorInstanceCpp<number> };
    MatrixFloat: { new (rows: number, cols: number): MatrixInstanceCpp<number> };
    MatrixDouble: { new (rows: number, cols: number): MatrixInstanceCpp<number> };

    dotFloat(a: VectorInstanceCpp<number>, b: VectorInstanceCpp<number>): number;
    crossFloat(a: VectorInstanceCpp<number>, b: VectorInstanceCpp<number>): VectorInstanceCpp<number>;
    normalizeFloat(v: VectorInstanceCpp<number>): void;

    matrixMultiplyFloat(a: MatrixInstanceCpp<number>, b: MatrixInstanceCpp<number>): MatrixInstanceCpp<number>;
    transposeFloat(m: MatrixInstanceCpp<number>): MatrixInstanceCpp<number>;
}
