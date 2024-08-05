import { Region } from "@/types/Region";

export interface CreateContratoDto {
    Ponto: string;
    Posto: string;
    Data: Date;
    TipoContrato: string;
    Contrato: number;
    Empresa: Region;
}