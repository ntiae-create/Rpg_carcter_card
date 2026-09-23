// =========================================================
// BOSS SYSTEM — ESTADO
//
// Responsável por:
// - Boss atual
// - Nível atual
// - Estado da batalha
// - Rodada
// - Inicialização dos dados de combate
//
// NÃO controla HTML.
// NÃO controla botões.
// NÃO executa habilidades.
// NÃO calcula dano.
// =========================================================


// =========================================================
// ESTADO GLOBAL
// =========================================================

let bossAtual = "hraesvelgr";

let nivelAtual = 12;

let estado = {};

let rodada = 0;


// =========================================================
// BANCO DE BOSS
// =========================================================
//
// Os arquivos individuais dos Bosses são carregados
// antes deste arquivo:
//
// bosses/hraesvelgr.js
// bosses/skoll-hati.js
//
// Depois adicionaremos os demais.
// =========================================================

const BOSS_DATABASE = {

    hraesvelgr: HRAESVELGR,

    "skoll-hati": SKOLL_HATI

};


// =========================================================
// OBTER BOSS ATUAL
// =========================================================

function obterBoss() {

    return BOSS_DATABASE[bossAtual];

}


// =========================================================
// OBTER DADOS DO NÍVEL ATUAL
// =========================================================

function obterNivel() {

    const boss = obterBoss();

    if (!boss) {
        return null;
    }

    return boss.niveis?.[nivelAtual] || null;

}


// =========================================================
// VERIFICAR SE O BOSS EXISTE
// =========================================================

function bossExiste(id) {

    return Boolean(
        BOSS_DATABASE[id]
    );

}


// =========================================================
// VERIFICAR SE O NÍVEL EXISTE
// =========================================================

function nivelExiste(nivel) {

    const boss = obterBoss();

    if (!boss) {
        return false;
    }

    return Boolean(
        boss.niveis?.[Number(nivel)]
    );

}


// =========================================================
// OBTER IMAGEM DO BOSS
// =========================================================

function obterImagemBoss() {

    const boss = obterBoss();

    if (
        !boss ||
        !boss.imagens
    ) {

        return "";

    }


    // =====================================================
    // NÍVEL 400
    // =====================================================

    if (
        nivelAtual >= 400 &&
        boss.imagens.ultimate
    ) {

        return boss.imagens.ultimate;

    }


    // =====================================================
    // NÍVEL 300
    // =====================================================

    if (
        nivelAtual >= 300 &&
        boss.imagens.evolucao
    ) {

        return boss.imagens.evolucao;

    }


    // =====================================================
    // NÍVEL 12 / 100 / 200
    // =====================================================

    return boss.imagens.base || "";

}


// =========================================================
// INICIALIZAR ESTADO
// =========================================================

function inicializarEstado() {

    const boss =
        obterBoss();

    const dados =
        obterNivel();


    if (
        !boss ||
        !dados
    ) {

        console.error(
            "Não foi possível inicializar o estado do Boss."
        );

        estado = {};

        return;

    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (
        !(dados.skoll && dados.hati)
    ) {

        estado = {

            tipo: "single",

            id: bossAtual,

            hp: dados.hp,
            mp: dados.mp,
            est: dados.est,

            hpMax: dados.hp,
            mpMax: dados.mp,
            estMax: dados.est,

            atk: dados.atk,
            atkMgc: dados.atkMgc,

            agi: dados.agi,

            def: dados.def,
            res: dados.res,
            int: dados.int,

            // Valores originais
            agiBase: dados.agi,
            defBase: dados.def,

            // Estados
            abatido: false,
            enfurecido: false,
            reflexo: false

        };

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    else if (
        true
    ) {

        estado = {

            tipo: "dual",

            id: bossAtual,


            // =================================================
            // SKOLL
            // =================================================

            skoll: {

                ...dados.skoll,

                hpMax: dados.skoll.hp,
                mpMax: dados.skoll.mp,
                estMax: dados.skoll.est,

                hpAtual: dados.skoll.hp,
                mpAtual: dados.skoll.mp,
                estAtual: dados.skoll.est,

                abatido: false

            },


            // =================================================
            // HATI
            // =================================================

            hati: {

                ...dados.hati,

                hpMax: dados.hati.hp,
                mpMax: dados.hati.mp,
                estMax: dados.hati.est,

                hpAtual: dados.hati.hp,
                mpAtual: dados.hati.mp,
                estAtual: dados.hati.est,

                abatido: false

            },


            // =================================================
            // MECÂNICA DOS IRMÃOS
            // =================================================

            furia: false,

            irmaoDerrotado: false

        };

    }


    // =====================================================
    // RODADA
    // =====================================================

    rodada = 0;

}


// =========================================================
// TROCAR BOSS
// =========================================================

function definirBoss(id) {

    if (
        !bossExiste(id)
    ) {

        console.error(
            "Boss não encontrado:",
            id
        );

        return false;

    }


    bossAtual = id;

    inicializarEstado();

    return true;

}


// =========================================================
// TROCAR NÍVEL
// =========================================================

function definirNivel(nivel) {

    nivel = Number(nivel);


    if (
        !nivelExiste(nivel)
    ) {

        console.error(
            `O Boss ${obterBoss()?.nome || "atual"} não possui o nível ${nivel}.`
        );

        return false;

    }


    nivelAtual = nivel;

    inicializarEstado();

    return true;

}


// =========================================================
// RESETAR BATALHA
// =========================================================
//
// Mantém Boss e nível atuais.
// Apenas cria novamente o estado inicial.
// =========================================================

function resetarEstado() {

    inicializarEstado();

}


// =========================================================
// OBTER ESTADO ATUAL
// =========================================================
//
// Retorna o objeto atual.
//
// Futuramente o sistema de combate poderá usar:
// BossState.estado()
// =========================================================

function obterEstado() {

    return estado;

}


// =========================================================
// OBTER RODADA
// =========================================================

function obterRodada() {

    return rodada;

}


// =========================================================
// ALTERAR RODADA
// =========================================================
//
// O sistema de combate será responsável por decidir
// quando chamar esta função.
// =========================================================

function incrementarRodada() {

    rodada++;

    return rodada;

}


// =========================================================
// DEFINIR RODADA
// =========================================================

function definirRodada(valor) {

    rodada =
        Math.max(
            0,
            Number(valor) || 0
        );

}


// =========================================================
// EXPOSIÇÃO GLOBAL
// =========================================================
//
// Mantemos algumas funções agrupadas para facilitar
// o uso pelos outros arquivos.
// =========================================================

window.BossState = {

    get bossAtual() {
        return bossAtual;
    },

    get nivelAtual() {
        return nivelAtual;
    },

    get estado() {
        return estado;
    },

    get rodada() {
        return rodada;
    },

    banco: BOSS_DATABASE,

    obterBoss,
    obterNivel,
    obterEstado,
    obterRodada,

    obterImagemBoss,

    bossExiste,
    nivelExiste,

    definirBoss,
    definirNivel,

    resetarEstado,

    incrementarRodada,
    definirRodada

};
