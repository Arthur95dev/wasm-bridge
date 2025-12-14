import { VectorInstanceCpp } from '../data-structures/vector-instance.interface';

export interface ArrayStatisticsModule {
    VectorInt: { new (): VectorInstanceCpp<number> };
    VectorFloat: { new (): VectorInstanceCpp<number> };
    VectorDouble: { new (): VectorInstanceCpp<number> };

    sumArrayInt(array: VectorInstanceCpp<number>): number;
    averageArrayInt(array: VectorInstanceCpp<number>): number;
    minArrayInt(array: VectorInstanceCpp<number>): number;
    maxArrayInt(array: VectorInstanceCpp<number>): number;

    sumArrayFloat(array: VectorInstanceCpp<number>): number;
    averageArrayFloat(array: VectorInstanceCpp<number>): number;
    minArrayFloat(array: VectorInstanceCpp<number>): number;
    maxArrayFloat(array: VectorInstanceCpp<number>): number;

    sumArrayDouble(array: VectorInstanceCpp<number>): number;
    averageArrayDouble(array: VectorInstanceCpp<number>): number;
    minArrayDouble(array: VectorInstanceCpp<number>): number;
    maxArrayDouble(array: VectorInstanceCpp<number>): number;
}

export interface AdvancedStatisticsModule extends ArrayStatisticsModule {
    medianInt(array: VectorInstanceCpp<number>): number;
    stdDevFloat(array: VectorInstanceCpp<number>): number;
    percentileDouble(array: VectorInstanceCpp<number>, p: number): number;
    linearRegressionFloat(
        x: VectorInstanceCpp<number>,
        y: VectorInstanceCpp<number>
    ): { slope: number; intercept: number };
}
