import { Region } from "@/types/Region";

export interface Simulador {
    Id: number;
    Data: Date;
    Ponto: string;
    Posto: string;
    TipoDemanda: string;
    Demanda: number;
    TipoContrato: string;
    Contrato: number;
    TarifaDra: number;
    TarifaDrp: number;
    Confiabilidade: number;
    Piu: number;
    Add: number;
    Pis: number;
    Eust: number;
    Dra: number;
    Drp: number;
    Empresa: Region;
}