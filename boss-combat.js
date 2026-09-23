// =========================================================
// BOSS SYSTEM — COMBATE
//
// Responsável por:
// - Receber dano
// - Derrotar Boss
// - Regeneração de MP/EST por rodada
// - Avançar rodada
// - Fúria de Skoll & Hati
// - Restaurar batalha
// - Zerar batalha
//
// NÃO controla:
// - HTML
// - Botões
// - Seleção de Boss
// - Dados dos Bosses
// - Execução de habilidades
// =========================================================


// =========================================================
// DANO — BOSS ÚNICO
// =========================================================

function receberDanoSingle(valor) {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "single" ||
        estado.abatido
    ) {

        return;

    }


    valor =
        Math.max(
            0,
            Number(valor) || 0
        );


    if (valor <= 0) {
        return;
    }


    estado.hp =
        Math.max(
            0,
            estado.hp - valor
        );


    // =====================================================
    // DERROTA
    // =====================================================

    if (
        estado.hp <= 0
    ) {

        estado.hp = 0;

        estado.abatido = true;

    }


    BossRender.renderizarBoss();

}


// =========================================================
// DANO — BOSS DUPLO
// =========================================================
//
// Para o botão de teste:
//
// 1. Primeiro ataca Skoll.
// 2. Se Skoll estiver derrotado, passa para Hati.
//
// O sistema de combate real poderá escolher o alvo
// diretamente depois.
// =========================================================

function receberDanoDual(valor) {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return;

    }


    valor =
        Math.max(
            0,
            Number(valor) || 0
        );


    if (valor <= 0) {
        return;
    }


    // =====================================================
    // SKOLL
    // =====================================================

    if (
        !estado.skoll.abatido
    ) {

        aplicarDanoMembro(
            estado.skoll,
            valor
        );


        if (
            estado.skoll.abatido
        ) {

            ativarFuriaSobrevivente();

        }


        BossRender.renderizarBoss();

        return;

    }


    // =====================================================
    // HATI
    // =====================================================

    if (
        !estado.hati.abatido
    ) {

        aplicarDanoMembro(
            estado.hati,
            valor
        );

    }


    BossRender.renderizarBoss();

}


// =========================================================
// APLICAR DANO A UM MEMBRO
// =========================================================

function aplicarDanoMembro(
    membro,
    valor
) {

    membro.hpAtual =
        Math.max(
            0,
            membro.hpAtual - valor
        );


    if (
        membro.hpAtual <= 0
    ) {

        membro.hpAtual = 0;

        membro.abatido = true;

    }

}


// =========================================================
// DANO DIRETO — FUTURO SISTEMA DE COMBATE
// =========================================================
//
// Permite escolher diretamente quem recebe o dano.
//
// Exemplo:
//
// receberDanoNoMembro("skoll", 500);
//
// receberDanoNoMembro("hati", 500);
// =========================================================

function receberDanoNoMembro(
    membroId,
    valor
) {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return false;

    }


    const membro =
        estado[membroId];


    if (
        !membro ||
        membro.abatido
    ) {

        return false;

    }


    valor =
        Math.max(
            0,
            Number(valor) || 0
        );


    if (valor <= 0) {
        return false;
    }


    aplicarDanoMembro(
        membro,
        valor
    );


    if (
        membro.abatido
    ) {

        ativarFuriaSobrevivente();

    }


    BossRender.renderizarBoss();

    return true;

}


// =========================================================
// FÚRIA DE SKOLL & HATI
// =========================================================
//
// Quando um irmão cai:
//
// +2 ATK
// +2 ATK MGC
// +2 AGI
//
// A ativação acontece apenas uma vez.
// =========================================================

function ativarFuriaSobrevivente() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return;

    }


    if (
        estado.furia
    ) {

        return;

    }


    const skoll =
        estado.skoll;

    const hati =
        estado.hati;


    // =====================================================
    // ENCONTRAR SOBREVIVENTE
    // =====================================================

    let sobrevivente = null;


    if (
        !skoll.abatido
    ) {

        sobrevivente =
            skoll;

    }
    else if (
        !hati.abatido
    ) {

        sobrevivente =
            hati;

    }


    // =====================================================
    // OS DOIS FORAM DERROTADOS
    // =====================================================

    if (!sobrevivente) {

        return;

    }


    // =====================================================
    // ATIVAR FÚRIA
    // =====================================================

    estado.furia = true;

    estado.irmaoDerrotado = true;


    sobrevivente.agi += 2;

    sobrevivente.atk += 2;

    sobrevivente.atkMgc += 2;


    console.log(
        "🔥 IRMÃOS PRA SEMPRE — FÚRIA ATIVADA"
    );


    BossRender.renderizarBoss();

}


// =========================================================
// RESTAURAR RECURSOS — SINGLE
// =========================================================

function restaurarRecursosSingle() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "single"
    ) {

        return;

    }


    estado.mp =
        estado.mpMax;


    estado.est =
        estado.estMax;

}


// =========================================================
// RESTAURAR RECURSOS — DUAL
// =========================================================

function restaurarRecursosDual() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return;

    }


    estado.skoll.mpAtual =
        estado.skoll.mpMax;


    estado.skoll.estAtual =
        estado.skoll.estMax;


    estado.hati.mpAtual =
        estado.hati.mpMax;


    estado.hati.estAtual =
        estado.hati.estMax;

}


// =========================================================
// RECURSOS POR RODADA — SINGLE
// =========================================================
//
// Atualmente:
//
// +5 MP
// +8 EST
//
// Hræsvelgr também recebe:
//
// +1 AGI por rodada.
//
// Isso pode ser alterado quando fecharmos a mecânica
// definitiva do Boss.
// =========================================================

function recuperarRecursosSingle() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "single" ||
        estado.abatido
    ) {

        return;

    }


    estado.mp =
        Math.min(
            estado.mpMax,
            estado.mp + 5
        );


    estado.est =
        Math.min(
            estado.estMax,
            estado.est + 8
        );


    // =====================================================
    // HRÆSVELGR
    // =====================================================

    if (
        BossState.bossAtual === "hraesvelgr"
    ) {

        estado.agi++;


        // =================================================
        // FÚRIA POR VIDA BAIXA
        // =================================================

        if (
            estado.hpMax > 0 &&
            estado.hp / estado.hpMax <= 0.4
        ) {

            estado.enfurecido = true;

        }

    }

}


// =========================================================
// RECURSOS POR RODADA — DUAL
// =========================================================

function recuperarRecursosDual() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return;

    }


    // =====================================================
    // SKOLL
    // =====================================================

    if (
        !estado.skoll.abatido
    ) {

        estado.skoll.mpAtual =
            Math.min(
                estado.skoll.mpMax,
                estado.skoll.mpAtual + 5
            );


        estado.skoll.estAtual =
            Math.min(
                estado.skoll.estMax,
                estado.skoll.estAtual + 8
            );

    }


    // =====================================================
    // HATI
    // =====================================================

    if (
        !estado.hati.abatido
    ) {

        estado.hati.mpAtual =
            Math.min(
                estado.hati.mpMax,
                estado.hati.mpAtual + 5
            );


        estado.hati.estAtual =
            Math.min(
                estado.hati.estMax,
                estado.hati.estAtual + 8
            );

    }

}


// =========================================================
// AVANÇAR RODADA
// =========================================================

function avancarRodada() {

    const estado =
        BossState.obterEstado();


    if (
        !estado ||
        !estado.tipo
    ) {

        return;

    }


    // =====================================================
    // NOVA RODADA
    // =====================================================

    BossState.incrementarRodada();


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (
        estado.tipo === "single"
    ) {

        recuperarRecursosSingle();

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================

    if (
        estado.tipo === "dual"
    ) {

        recuperarRecursosDual();

    }


    BossRender.renderizarBoss();

}


// =========================================================
// RESTAURAR BATALHA
// =========================================================
//
// Volta o Boss para o estado inicial do nível atual.
// =========================================================

function restaurarBatalha() {

    BossState.resetarEstado();

    BossRender.renderizarBoss();

}


// =========================================================
// ZERAR BATALHA
// =========================================================
//
// Coloca o HP em zero sem alterar o nível ou Boss.
// =========================================================

function zerarBatalha() {

    const estado =
        BossState.obterEstado();


    if (
        !estado ||
        !estado.tipo
    ) {

        return;

    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (
        estado.tipo === "single"
    ) {

        estado.hp = 0;

        estado.abatido = true;

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================

    if (
        estado.tipo === "dual"
    ) {

        estado.skoll.hpAtual = 0;

        estado.hati.hpAtual = 0;

        estado.skoll.abatido = true;

        estado.hati.abatido = true;

        estado.furia = false;

        estado.irmaoDerrotado = true;

    }


    BossRender.renderizarBoss();

}


// =========================================================
// RESTAURAR HP COMPLETO — FUTURO COMBATE
// =========================================================
//
// Não reseta atributos ou rodada.
// Útil futuramente para habilidades de cura,
// eventos ou efeitos especiais.
// =========================================================

function restaurarHpCompleto() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo === "single"
    ) {

        estado.hp =
            estado.hpMax;

        estado.abatido = false;

    }


    if (
        estado.tipo === "dual"
    ) {

        estado.skoll.hpAtual =
            estado.skoll.hpMax;

        estado.hati.hpAtual =
            estado.hati.hpMax;

        estado.skoll.abatido =
            false;

        estado.hati.abatido =
            false;

    }


    BossRender.renderizarBoss();

}


// =========================================================
// VERIFICAR DERROTA
// =========================================================

function bossDerrotado() {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo === "single"
    ) {

        return estado.abatido;

    }


    if (
        estado.tipo === "dual"
    ) {

        return (
            estado.skoll.abatido &&
            estado.hati.abatido
        );

    }


    return false;

}


// =========================================================
// VERIFICAR SE MEMBRO ESTÁ VIVO
// =========================================================

function membroVivo(
    membroId
) {

    const estado =
        BossState.obterEstado();


    if (
        estado.tipo !== "dual"
    ) {

        return false;

    }


    const membro =
        estado[membroId];


    if (!membro) {
        return false;
    }


    return !membro.abatido;

}


// =========================================================
// API GLOBAL
// =========================================================

window.BossCombat = {

    receberDanoSingle,

    receberDanoDual,

    receberDanoNoMembro,

    ativarFuriaSobrevivente,

    avancarRodada,

    restaurarBatalha,

    restaurarHpCompleto,

    zerarBatalha,

    bossDerrotado,

    membroVivo

};
