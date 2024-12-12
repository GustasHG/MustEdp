import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { CreateParamDto } from "./dto/create-param.dto";
import { GetParamDto } from "./dto/get-param.dto";
import { Param } from "./param.entity";


export class ParamAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findAll(): Promise<GetParamDto> {
        return await this.adapter.fetch(`/param`);
    }

    public async findById(id: number): Promise<Param> {
        return await this.adapter.fetch(`/param/${id}`);
    }

    public async save(input: CreateParamDto): Promise<Param> {
        return await this.adapter.fetch(
            `/param`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async update(id: number, input: Partial<CreateParamDto>): Promise<Param> {
        return await this.adapter.fetch(
            `/param/${id}`,
            {
                method: "PATCH",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(input)
            }
        );
    }

    public async remove(id: number): Promise<Param> {
        return await this.adapter.fetch(
            `/param/${id}`,
            { method: "DELETE" }
        );
    }
}