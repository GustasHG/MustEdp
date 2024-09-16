import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { SimuladorFilterDto } from "../dto/SimuladorFilterDto";
import { GetCustoChartData } from "./dto/GetCustoChartData";
import { CustosChart } from "./CustosChart";

export interface ICustosAdapter {
    /**
     * @async
     * @param {SimuladorFilterDto} filter 
     * @param {string} penalidade 
     * @returns {Promise<CustosChart[]>}
     * @throws {Error}
     */
    get(filter: SimuladorFilterDto, penalidade: string): Promise<CustosChart[]>;
}


export class CustosAdapter implements ICustosAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SimuladorFilterDto, penalidade: string): Promise<CustosChart[]> {
        console.log(filter);
        const data: GetCustoChartData = await this._adapter.fetch(
            `/custo?penalidade=${penalidade}`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(filter)
            }
        );
        return data.data;
    }
}
