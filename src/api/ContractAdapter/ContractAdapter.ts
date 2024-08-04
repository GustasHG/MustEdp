import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { GetSimuladorDto } from "./dto/GetSimuladorDto";
import { Region } from "@/types/Region";
import { Contract } from "./Contract";

export interface ContractAdapterInterface {
    get: (demanda: string, ponto: string, posto: string, ano: string, region: Region) => Promise<Contract[]>
}

export class ContractAdapter implements ContractAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(demanda: string, ponto: string, posto: string, ano: string, region: Region): Promise<Contract[]> {
        console.log(posto);
        const data: GetSimuladorDto = await this._adapter.fetch(
            "/simulador",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    TipoDemanda: demanda,
                    Ponto: ponto,
                    Posto: posto,
                    Ano: ano
                })
            }
        );
        return data.data;
    }

    public async getDemandaChartData(demanda: string, contrato: string, ponto: string, posto: string, ano: string, region: Region): Promise<Contract[]> {
        const data: GetSimuladorDto = await this._adapter.fetch(
            "/simulador/demanda-data",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    TipoDemanda: demanda,
                    TipoContrato: contrato,
                    Ponto: ponto,
                    Posto: posto,
                    Ano: ano
                })
            }
        );
        return data.data;
    }

    public async getPenalidadeChartData(demanda: string, ponto: string, posto: string, ano: string, region: Region, penalidade: string): Promise<Contract[]> {
        const data: GetSimuladorDto = await this._adapter.fetch(
            `/simulador/penalidade-data?penalidade=${penalidade}`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    TipoDemanda: demanda,
                    Ponto: ponto,
                    Posto: posto,
                    Ano: ano
                })
            }
        );
        return data.data;
    }
}