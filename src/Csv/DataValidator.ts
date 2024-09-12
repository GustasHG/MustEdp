export class DataValidationError extends Error {
    public constructor(error: string) {
        super(error);
    }
}

export interface IDataValidator {
    validate<T extends object>(data: T[], schema: string[]): boolean;
}

export class DataValidator implements IDataValidator {
    validate<T extends object>(data: T[], schema: string[]): boolean {
        if (data) {
            const receivedColumns = Object.keys(data[0]);
            receivedColumns.forEach((element: string) => {
                if (!schema.includes(element)) {
                    throw new DataValidationError(`${element} não deve estar no schema.`);
                }
            });
            schema.forEach((column: string) => {
                if (!receivedColumns.includes(column)) {
                    throw new DataValidationError(`${column} deve estar no schema.`);
                }
            })
        }
        return true;
    }
}