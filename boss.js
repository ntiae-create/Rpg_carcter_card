// =========================================================
// BOSS SYSTEM — CONTROLADOR CENTRAL
// Hræsvelgr + Skoll & Hati
//
// Dados dos Bosses:
// bosses/hraesvelgr.js
// bosses/skoll-hati.js
// =========================================================


// =========================================================
// BANCO DE BOSS
// =========================================================

const BOSS_DATABASE = {

    hraesvelgr: HRAESVELGR,

    "skoll-hati": SKOLL_HATI

};


// =========================================================
// ESTADO ATUAL
// =========================================================

let bossAtual = "hraesvelgr";

let nivelAtual = 12;

let estado = {};

let rodada = 0;


// =========================================================
// ELEMENTOS DO DOM
// =========================================================

const $ = id => document.getElementById(id);


// =========================================================
// OBTÉM BOSS
// =========================================================

function obterBoss() {

    return BOSS_DATABASE[bossAtual];

}


// =========================================================
// OBTÉM NÍVEL
// =========================================================

function obterNivel() {

    const boss = obterBoss();

    return boss?.niveis?.[nivelAtual];

}


// =========================================================
// OBTÉM IMAGEM
// =========================================================

function obterImagemBoss() {

    const boss = obterBoss();

    if (!boss || !boss.imagens) {
        return "";
    }


    if (
        nivelAtual >= 400 &&
        boss.imagens.ultimate
    ) {

        return boss.imagens.ultimate;

    }


    if (
        nivelAtual >= 300 &&
        boss.imagens.evolucao
    ) {

        return boss.imagens.evolucao;

    }


    return boss.imagens.base || "";

}


// =========================================================
// INICIALIZAR ESTADO
// =========================================================

function inicializarEstado() {

    const boss = obterBoss();

    const dados = obterNivel();


    if (!boss || !dados) {

        console.error(
            "Não foi possível inicializar o Boss."
        );

        return;

    }


    // =====================================================
    // HRÆSVELGR
    // =====================================================

    if (bossAtual === "hraesvelgr") {

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

            agiBase: dados.agi,
            defBase: dados.def,

            abatido: false,
            enfurecido: false,
            reflexo: false

        };

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    if (bossAtual === "skoll-hati") {

        estado = {

            tipo: "dual",

            id: bossAtual,


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


            furia: false,

            irmaoDerrotado: false

        };

    }


    rodada = 0;

}


// =========================================================
// CARREGAR BOSS
// =========================================================

function carregarBoss(id) {

    if (!BOSS_DATABASE[id]) {

        console.error(
            "Boss não encontrado:",
            id
        );

        return;

    }


    bossAtual = id;

    inicializarEstado();

    atualizarInterface();

    atualizarSeletorBoss();

    atualizarSeletorNivel();

    atualizarStatusGeral();

}


// =========================================================
// CARREGAR NÍVEL
// =========================================================

function carregarNivel(nivel) {

    nivel = Number(nivel);


    const boss = obterBoss();


    if (!boss?.niveis?.[nivel]) {

        console.error(
            `O Boss ${boss?.nome || "desconhecido"} não possui o nível ${nivel}.`
        );

        return;

    }


    nivelAtual = nivel;

    inicializarEstado();

    atualizarInterface();

    atualizarSeletorNivel();

    atualizarStatusGeral();

}


// =========================================================
// ATUALIZAR INTERFACE
// =========================================================

function atualizarInterface() {

    const boss = obterBoss();

    const dados = obterNivel();


    if (!boss || !dados || !estado) {
        return;
    }


    // =====================================================
    // CARD
    // =====================================================

    const card = $("boss-card");


    if (card) {

        card.classList.remove(
            "affinity-vento",
            "affinity-fogo",
            "affinity-trevas",
            "affinity-terra",
            "affinity-luz",
            "affinity-agua",
            "affinity-dual"
        );


        if (boss.classeAfinidade) {

            card.classList.add(
                boss.classeAfinidade
            );

        }


        // Importante para os efeitos
        // de nível do card.

        card.dataset.level =
            nivelAtual;

    }


    // =====================================================
    // NOME
    // =====================================================

    atualizarTexto(
        "boss-name",
        boss.nome
    );


    // =====================================================
    // NÍVEL
    // =====================================================

    atualizarTexto(
        "boss-level",
        `NÍVEL ${nivelAtual}`
    );


    // =====================================================
    // AFINIDADE
    // =====================================================

    atualizarTexto(
        "boss-affinity",
        boss.afinidade
    );


    // =====================================================
    // IMAGEM
    // =====================================================

    const imagem = $("boss-image");


    if (imagem) {

        imagem.src =
            obterImagemBoss();

        imagem.alt =
            boss.nome;

    }


    // =====================================================
    // PAINÉIS
    // =====================================================

    atualizarVisibilidadePaineis();


    // =====================================================
    // DADOS
    // =====================================================

    if (estado.tipo === "single") {

        atualizarBossUnico();

    }


    if (estado.tipo === "dual") {

        atualizarBossDuplo();

    }


    // =====================================================
    // PASSIVA
    // =====================================================

    atualizarPassiva(dados);


    // =====================================================
    // HABILIDADES
    // =====================================================

    atualizarHabilidades(dados);

}


// =========================================================
// VISIBILIDADE DOS PAINÉIS
// =========================================================

function atualizarVisibilidadePaineis() {

    const singleResources =
        $("boss-single-resources");

    const dualResources =
        $("boss-dual-resources");

    const singleStats =
        $("boss-single-stats");

    const dualStats =
        $("boss-dual-stats");


    const isDual =
        estado.tipo === "dual";


    if (singleResources) {

        singleResources.style.display =
            isDual ? "none" : "";

    }


    if (dualResources) {

        dualResources.style.display =
            isDual ? "" : "none";

    }


    if (singleStats) {

        singleStats.style.display =
            isDual ? "none" : "";

    }


    if (dualStats) {

        dualStats.style.display =
            isDual ? "" : "none";

    }

}


// =========================================================
// BOSS ÚNICO
// =========================================================

function atualizarBossUnico() {

    atualizarBarra(
        "hp",
        estado.hp,
        estado.hpMax
    );


    atualizarBarra(
        "mp",
        estado.mp,
        estado.mpMax
    );


    atualizarBarra(
        "est",
        estado.est,
        estado.estMax
    );


    atualizarTexto(
        "boss-atk",
        estado.atk
    );


    atualizarTexto(
        "boss-atk-mgc",
        estado.atkMgc
    );


    atualizarTexto(
        "boss-agi",
        estado.agi
    );


    atualizarTexto(
        "boss-def",
        estado.def
    );


    atualizarTexto(
        "boss-res",
        estado.res
    );


    atualizarTexto(
        "boss-int",
        estado.int
    );

}


// =========================================================
// BOSS DUPLO
// =========================================================

function atualizarBossDuplo() {

    const skoll =
        estado.skoll;

    const hati =
        estado.hati;


    // =====================================================
    // SKOLL — RECURSOS
    // =====================================================

    atualizarBarraDual(
        "skoll",
        "hp",
        skoll.hpAtual,
        skoll.hpMax
    );


    atualizarBarraDual(
        "skoll",
        "mp",
        skoll.mpAtual,
        skoll.mpMax
    );


    atualizarBarraDual(
        "skoll",
        "est",
        skoll.estAtual,
        skoll.estMax
    );


    // =====================================================
    // HATI — RECURSOS
    // =====================================================

    atualizarBarraDual(
        "hati",
        "hp",
        hati.hpAtual,
        hati.hpMax
    );


    atualizarBarraDual(
        "hati",
        "mp",
        hati.mpAtual,
        hati.mpMax
    );


    atualizarBarraDual(
        "hati",
        "est",
        hati.estAtual,
        hati.estMax
    );


    // =====================================================
    // SKOLL — ATRIBUTOS
    // =====================================================

    atualizarTexto(
        "skoll-atk",
        skoll.atk
    );

    atualizarTexto(
        "skoll-atk-mgc",
        skoll.atkMgc
    );

    atualizarTexto(
        "skoll-agi",
        skoll.agi
    );

    atualizarTexto(
        "skoll-def",
        skoll.def
    );

    atualizarTexto(
        "skoll-res",
        skoll.res
    );

    atualizarTexto(
        "skoll-int",
        skoll.int
    );


    // =====================================================
    // HATI — ATRIBUTOS
    // =====================================================

    atualizarTexto(
        "hati-atk",
        hati.atk
    );

    atualizarTexto(
        "hati-atk-mgc",
        hati.atkMgc
    );

    atualizarTexto(
        "hati-agi",
        hati.agi
    );

    atualizarTexto(
        "hati-def",
        hati.def
    );

    atualizarTexto(
        "hati-res",
        hati.res
    );

    atualizarTexto(
        "hati-int",
        hati.int
    );


    // =====================================================
    // ESTADO DOS IRMÃOS
    // =====================================================

    atualizarEstadoIrmao(
        "skoll-state",
        skoll
    );


    atualizarEstadoIrmao(
        "hati-state",
        hati
    );

}


// =========================================================
// BARRA DO BOSS ÚNICO
// =========================================================

function atualizarBarra(tipo, atual, max) {

    const texto =
        $(`${tipo}-text`);

    const barra =
        $(`boss-${tipo}`);


    const valorAtual =
        Math.max(
            0,
            Number(atual) || 0
        );


    const valorMax =
        Math.max(
            1,
            Number(max) || 1
        );


    if (texto) {

        texto.textContent =
            `${valorAtual} / ${valorMax}`;

    }


    if (barra) {

        const porcentagem =
            Math.max(
                0,
                Math.min(
                    100,
                    (valorAtual / valorMax) * 100
                )
            );


        barra.style.width =
            `${porcentagem}%`;

    }

}


// =========================================================
// BARRAS SKOLL / HATI
// =========================================================

function atualizarBarraDual(
    membro,
    tipo,
    atual,
    max
) {

    const texto =
        $(`${membro}-${tipo}-text`);

    const barra =
        $(`${membro}-${tipo}`);


    const valorAtual =
        Math.max(
            0,
            Number(atual) || 0
        );


    const valorMax =
        Math.max(
            1,
            Number(max) || 1
        );


    if (texto) {

        texto.textContent =
            `${valorAtual} / ${valorMax}`;

    }


    if (barra) {

        const porcentagem =
            Math.max(
                0,
                Math.min(
                    100,
                    (valorAtual / valorMax) * 100
                )
            );


        barra.style.width =
            `${porcentagem}%`;

    }

}


// =========================================================
// ESTADO DO IRMÃO
// =========================================================

function atualizarEstadoIrmao(
    id,
    membro
) {

    const elemento =
        $(id);


    if (!elemento) {
        return;
    }


    if (membro.abatido) {

        elemento.textContent =
            "DERROTADO";

        elemento.classList.add(
            "derrotado"
        );

        elemento.classList.remove(
            "ativo"
        );

        return;

    }


    elemento.textContent =
        estado.furia &&
        estado.irmaoDerrotado
            ? "FÚRIA"
            : "ATIVO";


    elemento.classList.remove(
        "derrotado"
    );

    elemento.classList.add(
        estado.furia &&
        estado.irmaoDerrotado
            ? "furia"
            : "ativo"
    );

}


// =========================================================
// TEXTO
// =========================================================

function atualizarTexto(
    id,
    valor
) {

    const elemento =
        $(id);


    if (elemento) {

        elemento.textContent =
            valor ?? "";

    }

}


// =========================================================
// PASSIVA
// =========================================================

function atualizarPassiva(dados) {

    const passiva =
        dados?.passiva;


    if (!passiva) {

        atualizarTexto(
            "passive-name",
            ""
        );

        atualizarTexto(
            "passive-desc",
            ""
        );

        atualizarTexto(
            "passive-state",
            ""
        );

        return;

    }


    atualizarTexto(
        "passive-name",
        passiva.nome
    );


    atualizarTexto(
        "passive-desc",
        passiva.descricao
    );


    atualizarTexto(
        "passive-state",
        passiva.estado || ""
    );

}


// =========================================================
// HABILIDADES
// =========================================================

function atualizarHabilidades(dados) {

    const habilidades =
        Array.isArray(dados?.habilidades)
            ? dados.habilidades
            : [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const habilidade =
            habilidades[i];


        const container =
            $(`skill-container-${i + 1}`);


        const nome =
            $(`skill-name-${i + 1}`);


        const descricao =
            $(`skill-desc-${i + 1}`);


        const mp =
            $(`skill-mp-${i + 1}`);


        const est =
            $(`skill-est-${i + 1}`);


        const botao =
            container?.querySelector(
                ".boss-skill-button"
            );


        // =================================================
        // SEM HABILIDADE
        // =================================================

        if (!habilidade) {

            if (container) {

                container.style.display =
                    "none";

            }

            continue;

        }


        // =================================================
        // MOSTRAR
        // =================================================

        if (container) {

            container.style.display =
                "";

        }


        // =================================================
        // NOME
        // =================================================

        if (nome) {

            const usuario =
                habilidade.usuario
                    ? `${habilidade.usuario} · `
                    : "";


            nome.textContent =
                `${usuario}${habilidade.nome || "Habilidade"}`;

        }


        // =================================================
        // DESCRIÇÃO
        // =================================================

        if (descricao) {

            descricao.textContent =
                habilidade.efeito ||
                habilidade.descricao ||
                "";

        }


        // =================================================
        // CUSTO MP
        // =================================================

        if (mp) {

            const custoMp =
                Number(
                    habilidade.custoMp || 0
                );


            mp.textContent =
                custoMp > 0
                    ? `${custoMp} ALMA`
                    : "—";

        }


        // =================================================
        // CUSTO EST
        // =================================================

        if (est) {

            const custoEst =
                Number(
                    habilidade.custoEst || 0
                );


            est.textContent =
                custoEst > 0
                    ? `${custoEst} FORÇA`
                    : "—";

        }


        // =================================================
        // BOTÃO
        // =================================================

        if (botao) {

            botao.dataset.skill =
                habilidade.id || "";


            botao.disabled =
                false;

        }

    }

}


// =========================================================
// SELETOR DE BOSS
// =========================================================

function atualizarSeletorBoss() {

    document
        .querySelectorAll(
            ".boss-selector button"
        )
        .forEach(btn => {

            btn.classList.toggle(
                "ativo",
                btn.dataset.bossId === bossAtual
            );

        });

}


// =========================================================
// SELETOR DE NÍVEL
// =========================================================

function atualizarSeletorNivel() {

    document
        .querySelectorAll(
            ".boss-level-selector button"
        )
        .forEach(btn => {

            btn.classList.toggle(
                "ativo",
                Number(btn.dataset.level) === nivelAtual
            );

        });

}


// =========================================================
// DANO
// =========================================================

function receberDano(valor) {

    valor =
        Math.max(
            0,
            Number(valor) || 0
        );


    if (valor <= 0) {
        return;
    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (estado.tipo === "single") {

        estado.hp =
            Math.max(
                0,
                estado.hp - valor
            );


        if (estado.hp <= 0) {

            estado.hp = 0;

            estado.abatido = true;

        }

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================

    if (estado.tipo === "dual") {

        receberDanoDuplo(valor);

    }


    atualizarInterface();

    atualizarStatusGeral();

}


// =========================================================
// DANO SKOLL & HATI
// =========================================================

function receberDanoDuplo(valor) {

    /*
       TESTE:

       O botão de dano atinge primeiro o Skoll.

       O sistema de combate real poderá escolher
       posteriormente qual irmão recebe o ataque.
    */


    if (
        !estado.skoll.abatido
    ) {

        estado.skoll.hpAtual =
            Math.max(
                0,
                estado.skoll.hpAtual - valor
            );


        if (
            estado.skoll.hpAtual <= 0
        ) {

            estado.skoll.hpAtual = 0;

            estado.skoll.abatido = true;

            ativarFuriaSobrevivente();

        }


        return;

    }


    // =====================================================
    // SE SKOLL JÁ CAIU → HATI
    // =====================================================

    if (
        !estado.hati.abatido
    ) {

        estado.hati.hpAtual =
            Math.max(
                0,
                estado.hati.hpAtual - valor
            );


        if (
            estado.hati.hpAtual <= 0
        ) {

            estado.hati.hpAtual = 0;

            estado.hati.abatido = true;

        }

    }

}


// =========================================================
// FÚRIA DO SOBREVIVENTE
// =========================================================

function ativarFuriaSobrevivente() {

    if (
        estado.furia ||
        estado.tipo !== "dual"
    ) {

        return;

    }


    const sobrevivente =
        !estado.skoll.abatido
            ? estado.skoll
            : !estado.hati.abatido
                ? estado.hati
                : null;


    if (!sobrevivente) {
        return;
    }


    estado.furia = true;

    estado.irmaoDerrotado = true;


    sobrevivente.agi += 2;

    sobrevivente.atk += 2;

    sobrevivente.atkMgc += 2;


    console.log(
        "🔥 IRMÃOS PRA SEMPRE — FÚRIA ATIVADA"
    );

}


// =========================================================
// AVANÇAR RODADA
// =========================================================

function avancarRodada() {

    if (
        estado.tipo !== "single" &&
        estado.tipo !== "dual"
    ) {

        return;

    }


    rodada++;


    // =====================================================
    // HRÆSVELGR
    // =====================================================

    if (estado.tipo === "single") {

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


        if (
            bossAtual === "hraesvelgr" &&
            !estado.abatido
        ) {

            estado.agi++;


            if (
                estado.hp /
                estado.hpMax <= 0.4
            ) {

                estado.enfurecido = true;

            }

        }

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    if (estado.tipo === "dual") {

        if (!estado.skoll.abatido) {

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


        if (!estado.hati.abatido) {

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


    atualizarInterface();

    atualizarStatusGeral();

}


// =========================================================
// RESTAURAR
// =========================================================

function restaurar() {

    inicializarEstado();

    atualizarInterface();

    atualizarSeletorNivel();

    atualizarStatusGeral();

}


// =========================================================
// ZERAR BATALHA
// =========================================================

function zerarBoss() {

    if (estado.tipo === "single") {

        estado.hp = 0;

        estado.abatido = true;

    }


    if (estado.tipo === "dual") {

        estado.skoll.hpAtual = 0;
        estado.hati.hpAtual = 0;

        estado.skoll.abatido = true;
        estado.hati.abatido = true;

        estado.furia = false;
        estado.irmaoDerrotado = true;

    }


    atualizarInterface();

    atualizarStatusGeral();

}


// =========================================================
// STATUS GERAL
// =========================================================

function atualizarStatusGeral() {

    const status =
        $("boss-status");


    if (!status) {
        return;
    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (estado.tipo === "single") {

        if (estado.abatido) {

            status.textContent =
                "Derrotado.";

            return;

        }


        if (estado.enfurecido) {

            status.textContent =
                `Rodada ${rodada} — O Boss entrou em fúria!`;

            return;

        }


        status.textContent =
            rodada > 0
                ? `Rodada ${rodada} — O Boss aguarda sua próxima ação.`
                : "Aguardando batalha...";


        return;

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    if (estado.tipo === "dual") {

        if (
            estado.skoll.abatido &&
            estado.hati.abatido
        ) {

            status.textContent =
                "Skoll e Hati foram derrotados.";

            return;

        }


        if (estado.furia) {

            const sobrevivente =
                !estado.skoll.abatido
                    ? "Skoll"
                    : "Hati";


            status.textContent =
                `🔥 ${sobrevivente} entrou em Fúria!`;

            return;

        }


        status.textContent =
            rodada > 0
                ? `Rodada ${rodada} — Skoll e Hati continuam caçando.`
                : "☀️🌑 Skoll e Hati aguardam...";

    }

}


// =========================================================
// ENCONTRAR DONO DA HABILIDADE
// =========================================================

function obterDonoHabilidade(habilidade) {

    if (
        estado.tipo !== "dual"
    ) {

        return null;

    }


    const usuario =
        String(
            habilidade.usuario || ""
        ).toLowerCase();


    if (
        usuario.includes("skoll")
    ) {

        return estado.skoll;

    }


    if (
        usuario.includes("hati")
    ) {

        return estado.hati;

    }


    return null;

}


// =========================================================
// EXECUTAR HABILIDADE
// =========================================================

function executarHabilidade(id) {

    const dados =
        obterNivel();


    const habilidade =
        dados?.habilidades?.find(
            habilidade =>
                habilidade.id === id
        );


    if (!habilidade) {

        console.warn(
            "Habilidade não encontrada:",
            id
        );

        return;

    }


    const custoMp =
        Number(
            habilidade.custoMp || 0
        );


    const custoEst =
        Number(
            habilidade.custoEst || 0
        );


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (estado.tipo === "single") {

        if (
            estado.mp < custoMp ||
            estado.est < custoEst
        ) {

            console.warn(
                "Recursos insuficientes."
            );

            atualizarStatusRecursos();

            return;

        }


        estado.mp -=
            custoMp;


        estado.est -=
            custoEst;


        console.log(
            `⚔️ ${obterBoss().nome} usa ${habilidade.nome}!`
        );

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================

    if (estado.tipo === "dual") {

        const usuario =
            obterDonoHabilidade(
                habilidade
            );


        if (!usuario) {

            console.warn(
                "Não foi possível identificar o dono da habilidade:",
                habilidade.nome
            );

            return;

        }


        if (usuario.abatido) {

            console.warn(
                `${habilidade.usuario} está derrotado.`
            );

            return;

        }


        if (
            usuario.mpAtual < custoMp ||
            usuario.estAtual < custoEst
        ) {

            console.warn(
                "Recursos insuficientes."
            );

            return;

        }


        usuario.mpAtual -=
            custoMp;


        usuario.estAtual -=
            custoEst;


        console.log(
            `⚔️ ${habilidade.usuario} usa ${habilidade.nome}!`
        );

    }


    atualizarInterface();

    atualizarStatusGeral();

}


// =========================================================
// STATUS DE RECURSOS
// =========================================================

function atualizarStatusRecursos() {

    const status =
        $("boss-status");


    if (!status) {
        return;
    }


    status.textContent =
        "Recursos insuficientes para usar essa habilidade.";

}


// =========================================================
// EVENTOS
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =================================================
        // SELETOR DE BOSS
        // =================================================

        document
            .querySelectorAll(
                ".boss-selector button"
            )
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        carregarBoss(
                            btn.dataset.bossId
                        );

                    }
                );

            });


        // =================================================
        // SELETOR DE NÍVEL
        // =================================================

        document
            .querySelectorAll(
                ".boss-level-selector button"
            )
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        carregarNivel(
                            btn.dataset.level
                        );

                    }
                );

            });


        // =================================================
        // DANO
        // =================================================

        const dano =
            $("btn-dano-recebido");


        if (dano) {

            dano.addEventListener(
                "click",
                () => {

                    receberDano(10);

                }
            );

        }


        // =================================================
        // RESTAURAR
        // =================================================

        const restaurarBtn =
            $("btn-restaurar");


        if (restaurarBtn) {

            restaurarBtn.addEventListener(
                "click",
                restaurar
            );

        }


        // =================================================
        // RODADA
        // =================================================

        const rodadaBtn =
            $("btn-rodada-passou");


        if (rodadaBtn) {

            rodadaBtn.addEventListener(
                "click",
                avancarRodada
            );

        }


        // =================================================
        // ZERAR
        // =================================================

        const zerar =
            $("btn-zerar");


        if (zerar) {

            zerar.addEventListener(
                "click",
                zerarBoss
            );

        }


        // =================================================
        // HABILIDADES
        // =================================================

        document
            .querySelectorAll(
                ".boss-skill-button"
            )
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        executarHabilidade(
                            btn.dataset.skill
                        );

                    }
                );

            });


        // =================================================
        // INICIALIZAÇÃO
        // =================================================

        carregarBoss(
            "hraesvelgr"
        );

    }
);


// =========================================================
// DEBUG / ACESSO GLOBAL
// =========================================================

window.BossSystem = {

    carregarBoss,
    carregarNivel,

    receberDano,
    avancarRodada,
    restaurar,
    zerarBoss,

    executarHabilidade,

    obterBoss,
    obterNivel,

    getEstado: () =>
        estado

};
