import { Region } from "@/types/Region";

export interface SummaryFilterDto {
    TipoContrato: string;
    TipoDemanda: string;
    Empresa: Region;
}