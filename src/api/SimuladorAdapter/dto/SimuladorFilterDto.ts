import { Region } from "@/types/Region";

export interface SimuladorFilterDto {
    TipoDemanda: string;
    Ponto: string;
    Posto: string;
    Ano: string;
    TipoContrato?: string;
    Empresa: Region;
}