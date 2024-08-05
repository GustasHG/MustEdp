import { CreateManyConfiabilidadeDto } from "./dto/CreateManyConfiabilidadeDto";
import { GetConfiabilidadeDto } from "./dto/GetConfiabilidadeDto";
import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";

export interface ConfiabilidadeAdapterInterface {
    createMany: (payload: CreateManyConfiabilidadeDto) => Promise<GetConfiabilidadeDto>
    deleteAll: () => Promise<GetConfiabilidadeDto>
}

export class ConfiabilidadeAdapter implements ConfiabilidadeAdapterInterface {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async createMany(payload: CreateManyConfiabilidadeDto): Promise<GetConfiabilidadeDto> {
        return await this._adapter.fetch(
            "/confiabilidade/many",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(payload)
            }
        );
    }

    public async deleteAll(): Promise<GetConfiabilidadeDto> {
        return await this._adapter.fetch(
            "/confiabilidade/delete/all",
            { method: "DELETE" }
        );
    }
}