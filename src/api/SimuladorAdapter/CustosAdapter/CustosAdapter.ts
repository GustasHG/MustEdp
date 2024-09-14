import { ApiAdapterInterface } from "@/api/ApiAdapter/ApiAdapter";
import { SimuladorFilterDto } from "../dto/SimuladorFilterDto";
import { GetCustoChartData } from "./dto/GetCustoChartData";
import { CustosChart } from "./CustosChart";

export interface ICustosAdapter {
    /**
     * @async
     * @param {SimuladorFilterDto} filter 
     * @returns {Promise<CustosChart[]>}
     * @throws {Error}
     */
    get(filter: SimuladorFilterDto): Promise<CustosChart[]>;
}


export class CustosAdapter implements ICustosAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SimuladorFilterDto): Promise<CustosChart[]> {
        console.log(filter);
        const data: GetCustoChartData = await this._adapter.fetch(
            "/custo",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ 
                    "TipoDemanda": "Escolha um Cenario",
                    "Ponto": "Todos",
                    "Posto": "Todos",
                    "Ano": "Todos",
                    "Empresa": "SP"
                })
            }
        );
        return data.data;
    }
}
