import { Region } from "@/types/Region";

export interface Confiabilidade {
    Ponto: string;
    Posto: string;
    Data: Date;
    Confiabilidade: number;
    Empresa: Region;
}