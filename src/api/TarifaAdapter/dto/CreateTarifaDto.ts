import { Region } from "@/types/Region";

export interface CreateTarifaDto {
    Ponto: string;
    Posto: string;
    Data: Date;
    Tarifa: number;
    Empresa: Region;
}