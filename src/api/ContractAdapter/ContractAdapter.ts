import { ApiAdapterInterface } from "../ApiAdapter/ApiAdapter";
import { Region } from "@/types/Region";
import { Contract } from "./Contract";
import { Data } from "./Data";

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
        return Data;
    }
}