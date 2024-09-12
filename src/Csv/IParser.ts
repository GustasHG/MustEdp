export type CsvRow = any;

export interface IParser {
    /**
     * @param {string} data 
     * @param {string} separator 
     * @param {string} decimal 
     * @returns {T[]}
     */
    parse<T>(data: string, separator: string, decimal: string): T[];
}

export class Parser {
    public parse<T>(data: string, separator: string, decimal: string): T[] {
        let tmpData = data.replaceAll('\r', "");
        tmpData = tmpData.replaceAll(decimal, ".");
        const lines = tmpData.split("\n");
        if (lines) {
            const header = lines[0];
            const headerColumns = header.split(separator);
            const data = lines.slice(1);
            const arrayData: T[] = [];

            data.forEach((line: string) => {
                const lineColumns = line.split(separator);
                const rowObject: CsvRow = {};
                for (let columnIndex = 0; columnIndex < headerColumns.length; columnIndex++) {
                    const key = headerColumns[columnIndex];
                    rowObject[key] = lineColumns[columnIndex];
                }
                arrayData.push(rowObject);
            });
            return arrayData;
        }
        return [];
    }
}