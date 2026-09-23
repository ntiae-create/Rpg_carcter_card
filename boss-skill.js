// =========================================================
// BOSS SYSTEM — HABILIDADES
//
// Responsável por:
// - Encontrar habilidades
// - Verificar custos
// - Consumir MP
// - Consumir EST
// - Executar habilidade
// - Preparar sistema para efeitos especiais
//
// NÃO controla:
// - Botões
// - Seletores
// - HTML
// - Dados base dos Bosses
// - Rodadas
// - Dano direto
// =========================================================


// =========================================================
// OBTER HABILIDADE
// =========================================================

function obterHabilidade(indice) {

    const boss =
        BossState.obterBoss();

    const nivel =
        BossState.obterNivel();


    if (!boss) {
        return null;
    }


    const dadosNivel =
        boss.niveis?.[nivel];


    if (!dadosNivel) {
        return null;
    }


    const habilidades =
        dadosNivel.habilidades || [];


    return habilidades[indice] || null;

}


// =========================================================
// LISTAR HABILIDADES
// =========================================================

function obterHabilidades() {

    const boss =
        BossState.obterBoss();

    const nivel =
        BossState.obterNivel();


    if (!boss) {
        return [];
    }


    const dadosNivel =
        boss.niveis?.[nivel];


    if (!dadosNivel) {
        return [];
    }


    return dadosNivel.habilidades || [];

}


// =========================================================
// NORMALIZAR CUSTO
// =========================================================
//
// Aceita diferentes formatos:
//
// mp
// est
//
// ou:
//
// custo: {
//     mp: 50,
//     est: 30
// }
// =========================================================

function obterCustoHabilidade(habilidade) {

    if (!habilidade) {

        return {
            mp: 0,
            est: 0
        };

    }


    const custo =
        habilidade.custo || {};


    return {

        mp:
            Number(
                custo.mp ??
                habilidade.mp ??
                0
            ),

        est:
            Number(
                custo.est ??
                habilidade.est ??
                0
            )

    };

}


// =========================================================
// VERIFICAR CUSTO — SINGLE
// =========================================================

function podeUsarHabilidadeSingle(
    estado,
    habilidade
) {

    const custo =
        obterCustoHabilidade(
            habilidade
        );


    if (
        estado.mp < custo.mp
    ) {

        return false;

    }


    if (
        estado.est < custo.est
    ) {

        return false;

    }


    return true;

}


// =========================================================
// VERIFICAR CUSTO — DUAL
// =========================================================
//
// membro deve ser:
// "skoll"
// "hati"
// =========================================================

function podeUsarHabilidadeDual(
    estado,
    membro,
    habilidade
) {

    const personagem =
        estado[membro];


    if (!personagem) {
        return false;
    }


    if (
        personagem.abatido
    ) {

        return false;

    }


    const custo =
        obterCustoHabilidade(
            habilidade
        );


    if (
        personagem.mpAtual < custo.mp
    ) {

        return false;

    }


    if (
        personagem.estAtual < custo.est
    ) {

        return false;

    }


    return true;

}


// =========================================================
// CONSUMIR CUSTO — SINGLE
// =========================================================

function consumirCustoSingle(
    estado,
    habilidade
) {

    const custo =
        obterCustoHabilidade(
            habilidade
        );


    if (
        !podeUsarHabilidadeSingle(
            estado,
            habilidade
        )
    ) {

        return false;

    }


    estado.mp -= custo.mp;

    estado.est -= custo.est;


    estado.mp =
        Math.max(
            0,
            estado.mp
        );


    estado.est =
        Math.max(
            0,
            estado.est
        );


    return true;

}


// =========================================================
// CONSUMIR CUSTO — DUAL
// =========================================================

function consumirCustoDual(
    estado,
    membro,
    habilidade
) {

    const personagem =
        estado[membro];


    if (!personagem) {
        return false;
    }


    if (
        !podeUsarHabilidadeDual(
            estado,
            membro,
            habilidade
        )
    ) {

        return false;

    }


    const custo =
        obterCustoHabilidade(
            habilidade
        );


    personagem.mpAtual -= custo.mp;

    personagem.estAtual -= custo.est;


    personagem.mpAtual =
        Math.max(
            0,
            personagem.mpAtual
        );


    personagem.estAtual =
        Math.max(
            0,
            personagem.estAtual
        );


    return true;

}


// =========================================================
// EXECUTAR HABILIDADE — SINGLE
// =========================================================
//
// O efeito da habilidade pode ser:
//
// 1. uma função
// 2. um objeto de configuração
//
// Isso permite que cada Boss tenha mecânicas próprias
// sem transformar boss-skills.js em um arquivo gigante.
// =========================================================

function executarHabilidadeSingle(
    indice
) {

    const boss =
        BossState.obterBoss();

    const estado =
        BossState.obterEstado();


    if (
        !boss ||
        !estado ||
        estado.tipo !== "single"
    ) {

        return {
            sucesso: false,
            motivo: "Batalha inválida."
        };

    }


    if (
        estado.abatido
    ) {

        return {
            sucesso: false,
            motivo: "O Boss está derrotado."
        };

    }


    const habilidade =
        obterHabilidade(indice);


    if (!habilidade) {

        return {
            sucesso: false,
            motivo: "Habilidade não encontrada."
        };

    }


    // =====================================================
    // VERIFICAR CUSTO
    // =====================================================

    if (
        !consumirCustoSingle(
            estado,
            habilidade
        )
    ) {

        return {
            sucesso: false,
            motivo: "Recursos insuficientes."
        };

    }


    // =====================================================
    // EXECUTAR EFEITO
    // =====================================================

    let resultado = null;


    if (
        typeof habilidade.executar === "function"
    ) {

        resultado =
            habilidade.executar({
                estado,
                boss,
                nivel:
                    BossState.obterNivel(),
                rodada:
                    BossState.obterRodada()
            });

    }


    BossRender.renderizarBoss();


    return {

        sucesso: true,

        habilidade,

        resultado

    };

}


// =========================================================
// EXECUTAR HABILIDADE — DUAL
// =========================================================

function executarHabilidadeDual(
    membro,
    indice
) {

    const boss =
        BossState.obterBoss();

    const estado =
        BossState.obterEstado();


    if (
        !boss ||
        !estado ||
        estado.tipo !== "dual"
    ) {

        return {
            sucesso: false,
            motivo: "Batalha inválida."
        };

    }


    const membroEstado =
        estado[membro];


    if (!membroEstado) {

        return {
            sucesso: false,
            motivo: "Membro inválido."
        };

    }


    if (
        membroEstado.abatido
    ) {

        return {
            sucesso: false,
            motivo:
                `${membro} está derrotado.`
        };

    }


    const habilidade =
        obterHabilidade(indice);


    if (!habilidade) {

        return {
            sucesso: false,
            motivo: "Habilidade não encontrada."
        };

    }


    // =====================================================
    // VERIFICAR / CONSUMIR CUSTO
    // =====================================================

    if (
        !consumirCustoDual(
            estado,
            membro,
            habilidade
        )
    ) {

        return {
            sucesso: false,
            motivo: "Recursos insuficientes."
        };

    }


    // =====================================================
    // EXECUTAR EFEITO
    // =====================================================

    let resultado = null;


    if (
        typeof habilidade.executar === "function"
    ) {

        resultado =
            habilidade.executar({

                estado,

                boss,

                membro,

                membroEstado,

                nivel:
                    BossState.obterNivel(),

                rodada:
                    BossState.obterRodada()

            });

    }


    BossRender.renderizarBoss();


    return {

        sucesso: true,

        habilidade,

        resultado

    };

}


// =========================================================
// EXECUTOR GENÉRICO
// =========================================================
//
// Permite futuramente fazer:
//
// BossSkills.usar(0)
//
// sem precisar saber se o Boss é único ou duplo.
//
// Para Boss duplo:
//
// BossSkills.usar(0, "skoll")
// =========================================================

function usarHabilidade(
    indice,
    membro = null
) {

    const estado =
        BossState.obterEstado();


    if (!estado) {

        return {
            sucesso: false,
            motivo: "Estado inexistente."
        };

    }


    if (
        estado.tipo === "single"
    ) {

        return executarHabilidadeSingle(
            indice
        );

    }


    if (
        estado.tipo === "dual"
    ) {

        if (!membro) {

            return {
                sucesso: false,
                motivo:
                    "É necessário informar o membro."
            };

        }


        return executarHabilidadeDual(
            membro,
            indice
        );

    }


    return {

        sucesso: false,

        motivo:
            "Tipo de Boss desconhecido."

    };

}


// =========================================================
// VERIFICAR SE HABILIDADE PODE SER USADA
// =========================================================

function podeUsarHabilidade(
    indice,
    membro = null
) {

    const estado =
        BossState.obterEstado();


    const habilidade =
        obterHabilidade(indice);


    if (
        !estado ||
        !habilidade
    ) {

        return false;

    }


    if (
        estado.tipo === "single"
    ) {

        if (
            estado.abatido
        ) {

            return false;

        }


        return podeUsarHabilidadeSingle(
            estado,
            habilidade
        );

    }


    if (
        estado.tipo === "dual"
    ) {

        if (!membro) {
            return false;
        }


        return podeUsarHabilidadeDual(
            estado,
            membro,
            habilidade
        );

    }


    return false;

}


// =========================================================
// FORMATAR CUSTO
// =========================================================
//
// Retorna algo como:
//
// "50 MP / 30 EST"
//
// ou:
//
// "100 MP"
//
// ou:
//
// "40 EST"
// =========================================================

function formatarCustoHabilidade(
    habilidade
) {

    const custo =
        obterCustoHabilidade(
            habilidade
        );


    const partes = [];


    if (
        custo.mp > 0
    ) {

        partes.push(
            `${custo.mp} MP`
        );

    }


    if (
        custo.est > 0
    ) {

        partes.push(
            `${custo.est} EST`
        );

    }


    if (
        partes.length === 0
    ) {

        return "SEM CUSTO";

    }


    return partes.join(" / ");

}


// =========================================================
// API GLOBAL
// =========================================================

window.BossSkills = {

    obterHabilidade,

    obterHabilidades,

    obterCustoHabilidade,

    podeUsarHabilidade,

    usarHabilidade,

    executarHabilidadeSingle,

    executarHabilidadeDual,

    formatarCustoHabilidade

};
