import { CreateManyContratoDto } from "./dto/CreateManyContratoDto";
import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { GetContratoDto } from "./dto/GetContratoDto";

export interface ContratoAdapterInterface {
    createMany: (payload: CreateManyContratoDto) => Promise<GetContratoDto>
    deleteAll: () => Promise<GetContratoDto>
}

export class ContratoAdapter implements ContratoAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async createMany(payload: CreateManyContratoDto): Promise<GetContratoDto> {
        return await this._adapter.fetch(
            "/contrato/many",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }

    public async deleteAll(): Promise<GetContratoDto> {
        return await this._adapter.fetch(
            "/contrato/delete/all",
            { method: "DELETE" }
        );
    }
}