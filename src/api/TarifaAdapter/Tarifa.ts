import { Region } from "@/types/Region";

export interface Tarifa {
    Ponto: string;
    Posto: string;
    Data: Date;
    Tarifa: number;
    Empresa: Region;
}