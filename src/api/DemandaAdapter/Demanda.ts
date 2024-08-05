import { Region } from "@/types/Region";

export interface Demanda {
    Ponto: string;
    Posto: string;
    Data: Date;
    TipoDemanda: string;
    Demanda: number;
    Empresa: Region;
}