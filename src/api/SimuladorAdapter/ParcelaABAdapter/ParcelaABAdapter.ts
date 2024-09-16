import { SummaryFilterDto } from "../SummaryAdapter/dto/SummaryFilterDto";
import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { GetParcelaABDto } from "./dto/GetParcelaABDto";
import { ParcelaAB } from "./ParcelaAB";


export interface IParcelaABAdapter {
    /**
     * @async
     * @param {SummaryFilterDto} filter 
     * @returns {Promise<ParcelaAB[]>}
     * @throws {Error}
     */
    get(filter: SummaryFilterDto): Promise<ParcelaAB[]>;
}


export class ParcelaABAdapter implements IParcelaABAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SummaryFilterDto): Promise<ParcelaAB[]> {
        const data: GetParcelaABDto = await this._adapter.fetch(
            "/parcelaab",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...filter })
            }
        );
        return data.data;
    }
}


