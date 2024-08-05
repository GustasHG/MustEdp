export const getConfiabilidadePath = (
    regiao: string | null,
    ponto: string | null,
    posto: string | null,
    ano: string | null
) => {
    return `/confiabilidade?regiao=${regiao}&ponto=${ponto}&posto=${posto}&ano=${ano}`;
}