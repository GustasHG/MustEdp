import { SummaryFilterDto } from "../SummaryAdapter/dto/SummaryFilterDto";
import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { GetCicloDto } from "./dto/GetCicloDto";
import { Ciclo } from "./Ciclo";



export interface ICicloAdapter {
    /**
     * @async
     * @param {SummaryFilterDto} filter 
     * @returns {Promise<Ciclo[]>}
     * @throws {Error}
     */
    get(filter: SummaryFilterDto): Promise<Ciclo[]>;
}


export class CicloAdapter implements ICicloAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SummaryFilterDto): Promise<Ciclo[]> {
        const data: GetCicloDto = await this._adapter.fetch(
            "/ciclo",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...filter })
            }
        );
        return data.data;
    }
}


