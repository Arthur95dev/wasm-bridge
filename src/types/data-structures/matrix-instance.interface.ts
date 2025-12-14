export interface MatrixInstanceCpp<T = number> {
    rows(): number;
    cols(): number;

    get(row: number, col: number): T;
    set(row: number, col: number, value: T): void;

    pushRow(values?: T[]): void;  // добавить строку
    pushCol(values?: T[]): void;  // добавить колонку

    row(rowIndex: number): T[];   // получить всю строку
    col(colIndex: number): T[];   // получить всю колонку

    transpose(): void;            // транспонирование на месте (если реализовано в C++)

    delete(): void;
}
