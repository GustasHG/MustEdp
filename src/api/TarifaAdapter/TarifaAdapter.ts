import { CreateManyTarifaDto } from "./dto/CreateManyTarifaDto";
import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { GetTarifaDto } from "./dto/GetTarifaDto";

export interface TarifaAdapterInterface {
    createMany: (payload: CreateManyTarifaDto) => Promise<GetTarifaDto>
    deleteAll: () => Promise<GetTarifaDto>
}

export class TarifaAdapter implements TarifaAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async createMany(payload: CreateManyTarifaDto): Promise<GetTarifaDto> {
        return await this._adapter.fetch(
            "/tarifa/many",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }

    public async deleteAll(): Promise<GetTarifaDto> {
        return await this._adapter.fetch(
            "/tarifa/delete/all",
            { method: "DELETE" }
        );
    }
}