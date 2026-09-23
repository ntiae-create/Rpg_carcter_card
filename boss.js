// =========================================================
// BOSS SYSTEM — CONTROLADOR CENTRAL
// Hræsvelgr + Skoll & Hati
//
// Os dados ficam em:
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
// OBTÉM DADOS DO BOSS
// =========================================================

function obterBoss() {

    return BOSS_DATABASE[bossAtual];

}


// =========================================================
// OBTÉM DADOS DO NÍVEL
// =========================================================

function obterNivel() {

    const boss = obterBoss();

    return boss.niveis[nivelAtual];

}


// =========================================================
// IMAGEM DO BOSS
// =========================================================

function obterImagemBoss() {

    const boss = obterBoss();

    if (nivelAtual >= 400) {

        return boss.imagens.ultimate;

    }

    if (nivelAtual >= 300) {

        return boss.imagens.evolucao;

    }

    return boss.imagens.base;

}


// =========================================================
// INICIALIZA ESTADO
// =========================================================

function inicializarEstado() {

    const boss = obterBoss();

    const dados = obterNivel();


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

        console.error("Boss não encontrado:", id);

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
// TROCAR NÍVEL
// =========================================================

function carregarNivel(nivel) {

    nivel = Number(nivel);


    const boss = obterBoss();

    if (!boss.niveis[nivel]) {

        console.error(
            `O Boss ${boss.nome} não possui o nível ${nivel}.`
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
// ATUALIZA INTERFACE
// =========================================================

function atualizarInterface() {

    const boss = obterBoss();

    const dados = obterNivel();


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
            "affinity-dual"
        );


        if (boss.classeAfinidade) {

            card.classList.add(
                boss.classeAfinidade
            );

        }

    }


    // =====================================================
    // NOME
    // =====================================================

    if ($("boss-name")) {

        $("boss-name").textContent =
            boss.nome;

    }


    // =====================================================
    // NÍVEL
    // =====================================================

    if ($("boss-level")) {

        $("boss-level").textContent =
            `NÍVEL ${nivelAtual} · ${boss.afinidade}`;

    }


    // =====================================================
    // AFINIDADE
    // =====================================================

    if ($("boss-affinity")) {

        $("boss-affinity").textContent =
            boss.afinidade;

    }


    // =====================================================
    // IMAGEM
    // =====================================================

    if ($("boss-image")) {

        $("boss-image").src =
            obterImagemBoss();

        $("boss-image").alt =
            boss.nome;

    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (estado.tipo === "single") {

        atualizarBossUnico(dados);

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================

    if (estado.tipo === "dual") {

        atualizarBossDuplo(dados);

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
// BOSS ÚNICO
// =========================================================

function atualizarBossUnico(dados) {

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

function atualizarBossDuplo(dados) {

    /*
       Aqui o card poderá futuramente possuir
       dois painéis separados:

       SKOLL
       HATI

       Por enquanto mantemos os dados no estado
       para o sistema central.
    */


    console.log(
        "SKOLL:",
        estado.skoll
    );

    console.log(
        "HATI:",
        estado.hati
    );


    /*
       Se o HTML possuir os elementos abaixo,
       eles serão atualizados automaticamente.
    */

    atualizarTexto(
        "skoll-atk",
        estado.skoll.atk
    );

    atualizarTexto(
        "skoll-atk-mgc",
        estado.skoll.atkMgc
    );

    atualizarTexto(
        "skoll-agi",
        estado.skoll.agi
    );

    atualizarTexto(
        "skoll-def",
        estado.skoll.def
    );

    atualizarTexto(
        "skoll-res",
        estado.skoll.res
    );

    atualizarTexto(
        "skoll-int",
        estado.skoll.int
    );


    atualizarTexto(
        "hati-atk",
        estado.hati.atk
    );

    atualizarTexto(
        "hati-atk-mgc",
        estado.hati.atkMgc
    );

    atualizarTexto(
        "hati-agi",
        estado.hati.agi
    );

    atualizarTexto(
        "hati-def",
        estado.hati.def
    );

    atualizarTexto(
        "hati-res",
        estado.hati.res
    );

    atualizarTexto(
        "hati-int",
        estado.hati.int
    );

}


// =========================================================
// BARRAS
// =========================================================

function atualizarBarra(tipo, atual, max) {

    const texto =
        $(`${tipo}-text`);

    const barra =
        $(`boss-${tipo}`);


    if (texto) {

        texto.textContent =
            `${Math.max(0, atual)} / ${max}`;

    }


    if (barra) {

        const porcentagem =
            Math.max(
                0,
                Math.min(
                    100,
                    (atual / max) * 100
                )
            );

        barra.style.width =
            `${porcentagem}%`;

    }

}


// =========================================================
// TEXTO
// =========================================================

function atualizarTexto(id, valor) {

    const elemento = $(id);

    if (elemento) {

        elemento.textContent = valor;

    }

}


// =========================================================
// PASSIVA
// =========================================================

function atualizarPassiva(dados) {

    if (!dados.passiva) return;


    atualizarTexto(
        "passive-name",
        dados.passiva.nome
    );


    atualizarTexto(
        "passive-desc",
        dados.passiva.descricao
    );


    atualizarTexto(
        "passive-state",
        dados.passiva.estado
    );

}


// =========================================================
// HABILIDADES
// =========================================================

function atualizarHabilidades(dados) {

    const habilidades =
        dados.habilidades || [];


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


        if (!habilidade) {

            if (container) {

                container.style.display =
                    "none";

            }

            continue;

        }


        if (container) {

            container.style.display =
                "";

        }


        if (nome) {

            let titulo =
                habilidade.nome;


            if (habilidade.usuario) {

                titulo =
                    `${habilidade.usuario} · ${habilidade.nome}`;

            }


            nome.textContent =
                titulo;

        }


        if (descricao) {

            descricao.textContent =
                habilidade.efeito || "";

        }


        if (mp) {

            mp.textContent =
                habilidade.custoMp > 0
                    ? `${habilidade.custoMp} ALMA`
                    : "";

        }


        if (est) {

            est.textContent =
                habilidade.custoEst > 0
                    ? `${habilidade.custoEst} FORÇA`
                    : "";

        }


        const botao =
            container?.querySelector(
                ".boss-skill-button"
            );


        if (botao) {

            botao.dataset.skill =
                habilidade.id;

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

    if (estado.tipo === "single") {

        estado.hp =
            Math.max(
                0,
                estado.hp - valor
            );


        if (estado.hp === 0) {

            estado.abatido = true;

            atualizarStatusGeral();

        }

    }


    if (estado.tipo === "dual") {

        receberDanoDuplo(valor);

    }


    atualizarInterface();

}


// =========================================================
// DANO BOSS DUPLO
// =========================================================

function receberDanoDuplo(valor) {

    /*
       Por padrão, o dano de teste será aplicado
       ao Skoll.

       Mais tarde o sistema de combate poderá
       escolher exatamente qual irmão será atingido.
    */


    if (!estado.skoll.abatido) {

        estado.skoll.hpAtual =
            Math.max(
                0,
                estado.skoll.hpAtual - valor
            );


        if (estado.skoll.hpAtual === 0) {

            estado.skoll.abatido = true;

            ativarFuriaSobrevivente();

        }

    }

}


// =========================================================
// FÚRIA DO SOBREVIVENTE
// =========================================================

function ativarFuriaSobrevivente() {

    if (estado.furia) return;


    estado.furia = true;

    estado.irmaoDerrotado = true;


    const sobrevivente =
        !estado.skoll.abatido
            ? estado.skoll
            : estado.hati;


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

    rodada++;


    // =====================================================
    // RECURSOS
    // =====================================================

    if (estado.tipo === "single") {

        const dados =
            obterNivel();


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


        // Hræsvelgr
        if (bossAtual === "hraesvelgr") {

            estado.agi++;


            if (
                estado.hp /
                estado.hpMax <= 0.4
            ) {

                estado.enfurecido =
                    true;

            }

        }

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    if (estado.tipo === "dual") {

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


    atualizarStatusGeral();

    atualizarInterface();

}


// =========================================================
// RESTAURAR
// =========================================================

function restaurar() {

    inicializarEstado();

    atualizarInterface();

    atualizarStatusGeral();

}


// =========================================================
// STATUS GERAL
// =========================================================

function atualizarStatusGeral() {

    const status =
        $("boss-status");


    if (!status) return;


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

    }


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

            status.textContent =
                "🔥 Um dos irmãos caiu — o sobrevivente entrou em Fúria!";

            return;

        }


        status.textContent =
            rodada > 0
                ? `Rodada ${rodada} — Skoll e Hati continuam caçando.`
                : "☀️🌑 Skoll e Hati aguardam...";

    }

}


// =========================================================
// EXECUTAR HABILIDADE
// =========================================================

function executarHabilidade(id) {

    const dados =
        obterNivel();


    const habilidade =
        dados.habilidades?.find(
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


    /*
       Por enquanto o sistema apenas consome
       recursos e registra a ação.

       O sistema de combate real poderá assumir
       essa função posteriormente.
    */


    if (estado.tipo === "single") {

        if (
            estado.mp < habilidade.custoMp ||
            estado.est < habilidade.custoEst
        ) {

            alert(
                "Recursos insuficientes!"
            );

            return;

        }


        estado.mp -=
            habilidade.custoMp;


        estado.est -=
            habilidade.custoEst;

    }


    console.log(
        `⚔️ ${obterBoss().nome} usa ${habilidade.nome}!`
    );


    atualizarInterface();

}


// =========================================================
// EVENTOS
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =================================================
        // BOSS
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
        // NÍVEL
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
                () => {

                    if (
                        estado.tipo === "single"
                    ) {

                        estado.hp = 0;

                        estado.abatido = true;

                    }


                    if (
                        estado.tipo === "dual"
                    ) {

                        estado.skoll.hpAtual = 0;

                        estado.hati.hpAtual = 0;

                        estado.skoll.abatido = true;

                        estado.hati.abatido = true;

                    }


                    atualizarInterface();

                    atualizarStatusGeral();

                }
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
