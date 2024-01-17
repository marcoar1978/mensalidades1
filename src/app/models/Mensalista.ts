import { Pgto } from "./Pgto";
import { Mensalidade } from "./Mensalidade";

export interface Mensalista {
    id: string;
    nomeCompleto: string;
    nomeSimp: string;
    whatsapp: string;
    fardado: boolean;
    ativo: boolean;
    pgtos: Pgto[];
    mensalidades: Mensalidade[];
}