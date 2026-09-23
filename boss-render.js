// =========================================================
// BOSS SYSTEM — RENDER
//
// Responsável EXCLUSIVAMENTE por atualizar o HTML.
//
// Não controla:
// - dano
// - habilidades
// - rodada
// - botões
// - seleção de Boss
//
// Ele apenas lê BossState e renderiza.
// =========================================================


// =========================================================
// ATALHO DOM
// =========================================================

const boss$ = id =>
    document.getElementById(id);


// =========================================================
// RENDERIZAÇÃO COMPLETA
// =========================================================

function renderizarBoss() {

    const boss =
        BossState.obterBoss();

    const dados =
        BossState.obterNivel();

    const estado =
        BossState.obterEstado();


    if (
        !boss ||
        !dados ||
        !estado
    ) {

        console.error(
            "Não foi possível renderizar o Boss."
        );

        return;

    }


    atualizarCard(boss);

    atualizarCabecalho(boss);

    atualizarImagem(boss);

    atualizarPaineis(estado);

    atualizarRecursos(estado);

    atualizarAtributos(estado);

    atualizarPassiva(dados);

    atualizarHabilidades(dados);

    atualizarEstadoBatalha(estado);

    atualizarSeletores();

}


// =========================================================
// CARD
// =========================================================

function atualizarCard(boss) {

    const card =
        boss$("boss-card");


    if (!card) {
        return;
    }


    // =====================================================
    // AFINIDADES
    // =====================================================

    card.classList.remove(
        "affinity-vento",
        "affinity-fogo",
        "affinity-trevas",
        "affinity-terra",
        "affinity-luz",
        "affinity-agua",
        "affinity-dual"
    );


    if (
        boss.classeAfinidade
    ) {

        card.classList.add(
            boss.classeAfinidade
        );

    }


    // =====================================================
    // NÍVEL
    // =====================================================

    card.dataset.level =
        BossState.nivelAtual;

}


// =========================================================
// CABEÇALHO
// =========================================================

function atualizarCabecalho(boss) {

    setTexto(
        "boss-name",
        boss.nome
    );


    setTexto(
        "boss-level",
        `NÍVEL ${BossState.nivelAtual}`
    );


    setTexto(
        "boss-affinity",
        boss.afinidade
    );

}


// =========================================================
// IMAGEM
// =========================================================

function atualizarImagem(boss) {

    const imagem =
        boss$("boss-image");


    if (!imagem) {
        return;
    }


    imagem.src =
        BossState.obterImagemBoss();


    imagem.alt =
        boss.nome;

}


// =========================================================
// PAINÉIS SINGLE / DUAL
// =========================================================

function atualizarPaineis(estado) {

    const singleResources =
        boss$("boss-single-resources");

    const dualResources =
        boss$("boss-dual-resources");

    const singleStats =
        boss$("boss-single-stats");

    const dualStats =
        boss$("boss-dual-stats");


    const dual =
        estado.tipo === "dual";


    if (singleResources) {

        singleResources.style.display =
            dual
                ? "none"
                : "";

    }


    if (dualResources) {

        dualResources.style.display =
            dual
                ? ""
                : "none";

    }


    if (singleStats) {

        singleStats.style.display =
            dual
                ? "none"
                : "";

    }


    if (dualStats) {

        dualStats.style.display =
            dual
                ? ""
                : "none";

    }

}


// =========================================================
// RECURSOS
// =========================================================

function atualizarRecursos(estado) {

    if (
        estado.tipo === "single"
    ) {

        renderizarRecursosSingle(
            estado
        );

        return;

    }


    if (
        estado.tipo === "dual"
    ) {

        renderizarRecursosDual(
            estado
        );

    }

}


// =========================================================
// RECURSOS — BOSS ÚNICO
// =========================================================

function renderizarRecursosSingle(estado) {

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

}


// =========================================================
// RECURSOS — SKOLL & HATI
// =========================================================

function renderizarRecursosDual(estado) {

    const skoll =
        estado.skoll;

    const hati =
        estado.hati;


    if (!skoll || !hati) {
        return;
    }


    // =====================================================
    // SKOLL
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
    // HATI
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


    atualizarEstadoIrmao(
        "skoll-state",
        skoll,
        estado
    );


    atualizarEstadoIrmao(
        "hati-state",
        hati,
        estado
    );

}


// =========================================================
// BARRA — BOSS ÚNICO
// =========================================================

function atualizarBarra(
    tipo,
    atual,
    max
) {

    const texto =
        boss$(`${tipo}-text`);

    const barra =
        boss$(`boss-${tipo}`);


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
// BARRA — BOSS DUPLO
// =========================================================

function atualizarBarraDual(
    membro,
    tipo,
    atual,
    max
) {

    const texto =
        boss$(`${membro}-${tipo}-text`);

    const barra =
        boss$(`${membro}-${tipo}`);


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
// ATRIBUTOS
// =========================================================

function atualizarAtributos(estado) {

    if (
        estado.tipo === "single"
    ) {

        atualizarAtributosSingle(
            estado
        );

        return;

    }


    if (
        estado.tipo === "dual"
    ) {

        atualizarAtributosDual(
            estado
        );

    }

}


// =========================================================
// ATRIBUTOS — BOSS ÚNICO
// =========================================================

function atualizarAtributosSingle(estado) {

    setTexto(
        "boss-atk",
        estado.atk
    );


    setTexto(
        "boss-atk-mgc",
        estado.atkMgc
    );


    setTexto(
        "boss-agi",
        estado.agi
    );


    setTexto(
        "boss-def",
        estado.def
    );


    setTexto(
        "boss-res",
        estado.res
    );


    setTexto(
        "boss-int",
        estado.int
    );

}


// =========================================================
// ATRIBUTOS — SKOLL & HATI
// =========================================================

function atualizarAtributosDual(estado) {

    const skoll =
        estado.skoll;

    const hati =
        estado.hati;


    if (!skoll || !hati) {
        return;
    }


    // =====================================================
    // SKOLL
    // =====================================================

    setTexto(
        "skoll-atk",
        skoll.atk
    );


    setTexto(
        "skoll-atk-mgc",
        skoll.atkMgc
    );


    setTexto(
        "skoll-agi",
        skoll.agi
    );


    setTexto(
        "skoll-def",
        skoll.def
    );


    setTexto(
        "skoll-res",
        skoll.res
    );


    setTexto(
        "skoll-int",
        skoll.int
    );


    // =====================================================
    // HATI
    // =====================================================

    setTexto(
        "hati-atk",
        hati.atk
    );


    setTexto(
        "hati-atk-mgc",
        hati.atkMgc
    );


    setTexto(
        "hati-agi",
        hati.agi
    );


    setTexto(
        "hati-def",
        hati.def
    );


    setTexto(
        "hati-res",
        hati.res
    );


    setTexto(
        "hati-int",
        hati.int
    );

}


// =========================================================
// PASSIVA
// =========================================================

function atualizarPassiva(dados) {

    const passiva =
        dados?.passiva;


    if (!passiva) {

        setTexto(
            "passive-name",
            ""
        );

        setTexto(
            "passive-desc",
            ""
        );

        setTexto(
            "passive-state",
            ""
        );

        return;

    }


    setTexto(
        "passive-name",
        passiva.nome
    );


    setTexto(
        "passive-desc",
        passiva.descricao
    );


    setTexto(
        "passive-state",
        passiva.estado || ""
    );

}


// =========================================================
// HABILIDADES
// =========================================================
//
// Suporta até 6 habilidades.
//
// O índice usado pelo motor é:
//
// 0 → habilidade 1
// 1 → habilidade 2
// 2 → habilidade 3
// 3 → habilidade 4
// 4 → habilidade 5
// 5 → habilidade 6
//
// O data-skill-index é colocado diretamente no botão
// para o BossEvents não precisar descobrir o índice
// pela posição do elemento no DOM.
// =========================================================

function atualizarHabilidades(dados) {

    const habilidades =
        Array.isArray(
            dados?.habilidades
        )
            ? dados.habilidades
            : [];


    const TOTAL_SLOTS =
        6;


    for (
        let i = 0;
        i < TOTAL_SLOTS;
        i++
    ) {

        const numero =
            i + 1;


        const habilidade =
            habilidades[i];


        const container =
            boss$(
                `skill-container-${numero}`
            );


        const nome =
            boss$(
                `skill-name-${numero}`
            );


        const descricao =
            boss$(
                `skill-desc-${numero}`
            );


        const mp =
            boss$(
                `skill-mp-${numero}`
            );


        const est =
            boss$(
                `skill-est-${numero}`
            );


        const botao =
            container?.querySelector(
                ".boss-skill-button"
            );


        // =================================================
        // SLOT VAZIO
        // =================================================

        if (!habilidade) {

            if (container) {

                container.style.display =
                    "none";

            }

            if (botao) {

                botao.disabled =
                    true;

                botao.dataset.skillIndex =
                    "";

                botao.dataset.skill =
                    "";

            }

            continue;

        }


        // =================================================
        // SLOT OCUPADO
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
        // CUSTO
        // =================================================
        //
        // Compatível com:
        //
        // custo: {
        //     mp: 100,
        //     est: 50
        // }
        //
        // e também com o formato antigo:
        //
        // custoMp
        // custoEst
        // =================================================

        const custo =
            habilidade.custo || {};


        const custoMp =
            Number(
                custo.mp ??
                habilidade.custoMp ??
                habilidade.mp ??
                0
            );


        const custoEst =
            Number(
                custo.est ??
                habilidade.custoEst ??
                habilidade.est ??
                0
            );


        // =================================================
        // CUSTO MP
        // =================================================

        if (mp) {

            mp.textContent =
                custoMp > 0
                    ? `${custoMp} MP`
                    : "—";

        }


        // =================================================
        // CUSTO EST
        // =================================================

        if (est) {

            est.textContent =
                custoEst > 0
                    ? `${custoEst} EST`
                    : "—";

        }


        // =================================================
        // BOTÃO
        // =================================================

        if (botao) {

            /*
               Índice usado pelo BossSkills.

               Habilidade 1 = 0
               Habilidade 6 = 5
            */

            botao.dataset.skillIndex =
                String(i);


            /*
               Mantém também o ID da habilidade,
               caso seja útil no futuro.
            */

            botao.dataset.skill =
                habilidade.id || "";


            /*
               O BossEvents vai decidir
               se o botão pode ser usado.
            */

            botao.disabled =
                false;

        }

    }

}


// =========================================================
// ESTADO DOS IRMÃOS
// =========================================================

function atualizarEstadoIrmao(
    id,
    membro,
    estado
) {

    const elemento =
        boss$(id);


    if (!elemento) {
        return;
    }


    elemento.classList.remove(
        "ativo",
        "furia",
        "derrotado"
    );


    // =====================================================
    // DERROTADO
    // =====================================================

    if (
        membro.abatido
    ) {

        elemento.textContent =
            "DERROTADO";

        elemento.classList.add(
            "derrotado"
        );

        return;

    }


    // =====================================================
    // FÚRIA
    // =====================================================

    if (
        estado.furia
    ) {

        elemento.textContent =
            "FÚRIA";

        elemento.classList.add(
            "furia"
        );

        return;

    }


    // =====================================================
    // ATIVO
    // =====================================================

    elemento.textContent =
        "ATIVO";

    elemento.classList.add(
        "ativo"
    );

}


// =========================================================
// STATUS DA BATALHA
// =========================================================

function atualizarEstadoBatalha(estado) {

    const elemento =
        boss$("boss-status");


    if (!elemento) {
        return;
    }


    const rodada =
        BossState.obterRodada();


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (
        estado.tipo === "single"
    ) {

        if (
            estado.abatido
        ) {

            elemento.textContent =
                "Derrotado.";

            return;

        }


        if (
            estado.enfurecido
        ) {

            elemento.textContent =
                `Rodada ${rodada} — O Boss entrou em fúria!`;

            return;

        }


        elemento.textContent =
            rodada > 0
                ? `Rodada ${rodada} — O Boss aguarda sua próxima ação.`
                : "Aguardando batalha...";

        return;

    }


    // =====================================================
    // SKOLL & HATI
    // =====================================================

    if (
        estado.tipo === "dual"
    ) {

        if (
            estado.skoll.abatido &&
            estado.hati.abatido
        ) {

            elemento.textContent =
                "Skoll e Hati foram derrotados.";

            return;

        }


        if (
            estado.furia
        ) {

            const sobrevivente =
                !estado.skoll.abatido
                    ? "Skoll"
                    : "Hati";


            elemento.textContent =
                `🔥 ${sobrevivente} entrou em Fúria!`;

            return;

        }


        elemento.textContent =
            rodada > 0
                ? `Rodada ${rodada} — Skoll e Hati continuam caçando.`
                : "☀️🌑 Skoll e Hati aguardam...";

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
        .forEach(botao => {

            botao.classList.toggle(
                "ativo",
                botao.dataset.bossId ===
                    BossState.bossAtual
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
        .forEach(botao => {

            botao.classList.toggle(
                "ativo",
                Number(
                    botao.dataset.level
                ) ===
                    BossState.nivelAtual
            );

        });

}


// =========================================================
// SELETORES
// =========================================================

function atualizarSeletores() {

    atualizarSeletorBoss();

    atualizarSeletorNivel();

}


// =========================================================
// UTILITÁRIO DE TEXTO
// =========================================================

function setTexto(
    id,
    valor
) {

    const elemento =
        boss$(id);


    if (!elemento) {
        return;
    }


    elemento.textContent =
        valor ?? "";

}


// =========================================================
// API GLOBAL DO RENDER
// =========================================================

window.BossRender = {

    renderizarBoss,

    atualizarCard,
    atualizarCabecalho,
    atualizarImagem,

    atualizarPaineis,

    atualizarRecursos,
    atualizarAtributos,

    atualizarPassiva,
    atualizarHabilidades,

    atualizarEstadoBatalha,

    atualizarSeletores

};
