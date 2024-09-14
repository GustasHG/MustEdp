import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { SimuladorFilterDto } from "../dto/SimuladorFilterDto";
import { GetDemandaChartDto } from "./dto/GetDemandaChartDto";
import { DemandaChart } from "./DemandaChart";

export interface IDemandaChartAdapter {
    /**
     * @async
     * @param {SimuladorFilterDto} filter 
     * @returns {Promise<DemandaChart[]>}
     * @throws {Error}
     */
    get(filter: SimuladorFilterDto): Promise<DemandaChart[]>;
}


export class DemandaChartAdapter implements IDemandaChartAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SimuladorFilterDto): Promise<DemandaChart[]> {
        const data: GetDemandaChartDto = await this._adapter.fetch(
            "/demanda-chart",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...filter })
            }
        );
        return data.data;
    }
}

