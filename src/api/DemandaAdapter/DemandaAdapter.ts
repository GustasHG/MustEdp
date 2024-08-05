import { CreateManyDemandaDto } from "./dto/CreateManyDemandaDto";
import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { GetDemandaDto } from "./dto/GetDemandaDto";

export interface DemandaAdapterInterface {
    createMany: (payload: CreateManyDemandaDto) => Promise<GetDemandaDto>
    deleteAll: () => Promise<GetDemandaDto>
}

export class DemandaAdapter implements DemandaAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async createMany(payload: CreateManyDemandaDto): Promise<GetDemandaDto> {
        return await this._adapter.fetch(
            "/demanda/many",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }

    public async deleteAll(): Promise<GetDemandaDto> {
        return await this._adapter.fetch(
            "/demanda/delete/all",
            { method: "DELETE" }
        );
    }
}