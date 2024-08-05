import { Region } from "@/types/Region";

export interface DemandaDto {
    Ponto: string;
    Posto: string;
    Data: Date;
    TipoDemanda: string;
    Demanda: number;
    Empresa: Region;
}