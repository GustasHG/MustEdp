import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { CreateContratoDto } from "./dto/create-contrato.dto";
import { UpdateContratoDto } from "./dto/update-contrato.dto";
import { Contrato } from "./contrato.entity";


export class ContratoAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async save(input: CreateContratoDto): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async update(id: number, input: UpdateContratoDto): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/${id}`,
            {
                method: "PATCH",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async remove(id: number): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/${id}`,
            { method: "DELETE" }
        );
    }
}