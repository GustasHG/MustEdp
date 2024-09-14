import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { SimuladorFilterDto } from "./dto/SimuladorFilterDto";
import { GetSimuladorDto } from "./dto/GetSimuladorDto";
import { Simulador } from "./Simulador";

export interface ISimuladorAdapter {
    /**
     * @async
     * @param {SimuladorFilterDto} filter 
     * @returns {Promise<Simulador[]>}
     * @throws {Error}
     */
    get(filter: SimuladorFilterDto): Promise<Simulador[]>;

    /**
     * @async
     * @returns {Promise<void>}
     * @throws {Error}
     */
    generate(): Promise<void>;

    /**
     * @async
     * @returns {Promise<void>}
     * @throws {Error}
     */
    deleteAll(): Promise<void>;
}


export class SimuladorAdapter implements ISimuladorAdapter {
    public constructor(
        private readonly _adapter: ApiAdapterInterface
    ) {
        this._adapter = _adapter;
    }

    public async get(filter: SimuladorFilterDto): Promise<Simulador[]> {
        const data: GetSimuladorDto = await this._adapter.fetch(
            "/simulador",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...filter })
            }
        );
        return data.data;
    }

    public async generate(): Promise<void> {
        await this._adapter.fetch(
            "/simulador/generate",
            { method: "POST" }
        );
    }

    public async deleteAll(): Promise<void> {
        await this._adapter.fetch(
            "/simulador",
            { method: "DELETE" }
        );
    }
}