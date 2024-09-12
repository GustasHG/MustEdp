import { CsvRow } from "./IParser";

export class ExcelTemplateAdapter {
    private readonly months: Record<string, string> = {
        jan: "01",
        fev: "02",
        mar: "03",
        abr: "04",
        mai: "05",
        jun: "06",
        jul: "07",
        ago: "08",
        set: "09",
        out: "10",
        nov: "11",
        dez: "12",
    }
    public convert<T extends object, U>(data: T[], fixedColumns: string[], columnValue: string="Valor"): U[] {
        const array: U[] = [];

        data.forEach((value: T) => {
            const line: CsvRow = {};
            Object.keys(value).forEach((key: string) => {
                if (fixedColumns.includes(key)) {
                    line[key] = value[key as keyof T];
                }
            });

            Object.keys(value).forEach((key: string) => {
                if (!fixedColumns.includes(key) && /\d{2}\/\d{2}\/\d{4}/.test(key)) {
                    line['Data'] = `${key.slice(6, 10)}-${key.slice(3, 5)}-${key.slice(0, 2)}`;
                    line[columnValue] = value[key as keyof T];
                    array.push({ ...line });
                }

                if (!fixedColumns.includes(key) && /jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|dez\/\d{4}/.test(key)) {
                    line['Data'] = `20${key.slice(4, 6)}-${this.months[key.slice(0, 3)]}-01`;
                    let cellValue: CsvRow = value[key as keyof T];
                    if (['NaN', 'null', null].includes(cellValue)) {
                        cellValue = null
                    }
                    line[columnValue] = cellValue;
                    array.push({ ...line });
                }
            });
        });

        return array;
    }
}
