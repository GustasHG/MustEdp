export const getContratoPath = (
    regiao: string | null,
    ponto: string | null,
    posto: string | null,
    ano: string | null
) => {
    return `/contrato?regiao=${regiao}&ponto=${ponto}&posto=${posto}&ano=${ano}`;
}