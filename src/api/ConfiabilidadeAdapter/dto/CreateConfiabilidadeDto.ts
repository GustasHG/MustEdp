import { Region } from "@/types/Region";

export interface CreateConfiabilidadeDto {
    Ponto: string;
    Posto: string;
    Data: Date;
    Confiabilidade: number;
    Empresa: Region;
}