import { IParser } from "./IParser";

interface ICsv {
    /**
     * @param {IParser} parser
     * @returns {T[]}
     */
    parse<T>(parser: IParser): T[];
}

class Csv implements ICsv {
    private data: string;
    private separator: string;
    private decimal: string;
    public constructor(data: string, separator: string, decimal: string) {
        this.data = data;
        this.separator = separator;
        this.decimal = decimal;
    }

    public parse<T>(parser: IParser): T[] {
        return parser.parse(this.data, this.separator, this.decimal);
    }
}



export interface ICsvFactory {
    /**
     * 
     * @param {string} data
     * @param {string} separator
     * @returns {ICsv}
     */
    instance(data: string, separator?: string, decimal?: string): ICsv;  
}

export class CsvFactory implements ICsvFactory {
    public instance(data: string, separator: string = ";", decimal = ","): ICsv {
        return new Csv(data, separator, decimal);
    }
}