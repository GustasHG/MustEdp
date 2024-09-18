import { Region } from "@/types/Region";

export interface Ciclo {
    Empresa: Region;
    Ciclo: number;
    TipoDemanda: string;
    TipoContrato: string;
    ParcelaA: number;
    ParcelaB: number;
    CustoTotal: number;
    Total: number;
}