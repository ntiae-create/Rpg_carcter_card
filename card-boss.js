/* =========================================================
BOSS CARD — INTERFACE PRINCIPAL

Responsabilidade deste arquivo:

• Controlar a interface da carta
• Interação com a carta
• Virar / desvirar a carta
• Atualizar elementos visuais da interface
• Sincronizar a interface com BossState
• Sincronizar efeitos com a afinidade/nível
• Controlar estados visuais
• Gerenciar interação das habilidades
• Suportar Boss único e Boss duplo
• Atualizar a interface quando o Boss mudar

NÃO substitui:

boss-state.js
boss-render.js
boss-combat.js
boss-skills.js
boss-events.js
effects.js

========================================================= */

(function () {

"use strict";


/* =====================================================
   ESTADO DA INTERFACE
===================================================== */

const CardBoss = {

    card: null,

    inicializado: false,

    virada: false,

    elementos: {},

    ultimoBoss: null,

    ultimoNivel: null,

    ultimaAfinidade: null,

    ultimoEstado: null

};


/* =====================================================
   LOCALIZAR ELEMENTOS
===================================================== */

function localizarElementos() {

    CardBoss.card =
        document.querySelector(".boss-card") ||
        document.querySelector("#boss-card");

    if (!CardBoss.card) {

        console.warn(
            "[CardBoss] Boss Card não encontrado."
        );

        return false;
    }


    const q = (seletor) =>
        CardBoss.card.querySelector(seletor);


    CardBoss.elementos = {

        card: CardBoss.card,

        nome:
            q("#boss-name"),

        nivel:
            q("#boss-level"),

        afinidade:
            q("#boss-affinity"),

        imagem:
            q("#boss-image"),

        status:
            q("#boss-status"),

        statusDot:
            q(".boss-state-dot"),

        /* Recursos */

        singleResources:
            q("#boss-single-resources"),

        dualResources:
            q("#boss-dual-resources"),

        /* Atributos */

        singleStats:
            q("#boss-single-stats"),

        dualStats:
            q("#boss-dual-stats"),

        /* Passiva */

        passiveName:
            q("#passive-name"),

        passiveDescription:
            q("#passive-desc"),

        passiveState:
            q("#passive-state"),

        /* Habilidades */

        skills:
            CardBoss.card.querySelectorAll(
                ".boss-skill"
            ),

        skillContainers:
            CardBoss.card.querySelectorAll(
                ".skill-container"
            ),

        skillButtons:
            CardBoss.card.querySelectorAll(
                ".boss-skill-button"
            )

    };


    return true;
}


/* =====================================================
   OBTER DADOS DO BOSS
===================================================== */

function obterBoss() {

    if (
        !window.BossState ||
        typeof BossState.obterBoss !== "function"
    ) {
        return null;
    }

    return BossState.obterBoss();

}


function obterNivel() {

    if (
        !window.BossState ||
        typeof BossState.obterNivel !== "function"
    ) {
        return null;
    }

    return BossState.obterNivel();

}


function obterEstado() {

    if (
        !window.BossState ||
        typeof BossState.obterEstado !== "function"
    ) {
        return null;
    }

    return BossState.obterEstado();

}


/* =====================================================
   INTERAÇÃO DA CARTA
===================================================== */

function configurarInteracao() {

    if (!CardBoss.card) return;

    CardBoss.card.addEventListener(
        "click",
        tratarCliqueCarta
    );

}


function tratarCliqueCarta(evento) {

    /*
     * Elementos interativos não devem
     * virar a carta.
     */

    const elementoInterativo =
        evento.target.closest(
            [
                "button",
                "input",
                "select",
                "textarea",
                "a",

                ".boss-selector",
                ".boss-level-selector",
                ".boss-test-buttons",

                ".boss-skill-button",

                ".master-controls",
                ".master-toggle"

            ].join(",")
        );


    if (elementoInterativo) {
        return;
    }


    alternarCarta();

}


function virarCarta() {

    if (!CardBoss.card) return;

    CardBoss.card.classList.add("flipped");

    CardBoss.virada = true;

}


function desvirarCarta() {

    if (!CardBoss.card) return;

    CardBoss.card.classList.remove("flipped");

    CardBoss.virada = false;

}


function alternarCarta() {

    if (!CardBoss.card) return;

    CardBoss.card.classList.toggle("flipped");

    CardBoss.virada =
        CardBoss.card.classList.contains(
            "flipped"
        );

}


/* =====================================================
   ATUALIZAÇÃO DO CABEÇALHO
===================================================== */

function atualizarCabecalho() {

    const boss = obterBoss();
    const nivel = obterNivel();

    if (!boss || !nivel) return;


    const nome =
        boss.nome ||
        boss.name ||
        "Boss";


    const nivelNumerico =
        nivel.nivel ??
        nivel.level ??
        BossState.obterNivel?.();


    const afinidade =
        boss.afinidade ||
        boss.affinity ||
        "—";


    if (CardBoss.elementos.nome) {

        CardBoss.elementos.nome.textContent =
            nome;

    }


    if (CardBoss.elementos.nivel) {

        CardBoss.elementos.nivel.textContent =
            `NÍVEL ${nivelNumerico} · ${String(
                afinidade
            ).toUpperCase()}`;

    }


    if (CardBoss.elementos.afinidade) {

        CardBoss.elementos.afinidade.textContent =
            String(
                afinidade
            ).toUpperCase();

    }

}


/* =====================================================
   IMAGEM
===================================================== */

function atualizarImagem() {

    const boss = obterBoss();

    if (
        !boss ||
        !CardBoss.elementos.imagem
    ) {
        return;
    }


    let imagem = null;


    /*
     * Prioridade:
     *
     * BossState.obterImagemBoss()
     * ↓
     * boss.imagem
     * ↓
     * boss.imagens.base
     */

    if (
        window.BossState &&
        typeof BossState.obterImagemBoss === "function"
    ) {

        imagem =
            BossState.obterImagemBoss();

    }


    if (!imagem) {

        imagem =
            boss.imagem ||
            boss.image ||
            boss.imagens?.base ||
            null;

    }


    if (!imagem) return;


    if (
        CardBoss.elementos.imagem.src !==
        new URL(
            imagem,
            window.location.href
        ).href
    ) {

        CardBoss.elementos.imagem.src =
            imagem;

    }


    CardBoss.elementos.imagem.alt =
        boss.nome ||
        "Boss";

}


/* =====================================================
   AFINIDADE / TEMA
===================================================== */

function atualizarAfinidade() {

    const boss = obterBoss();

    if (!boss || !CardBoss.card) {
        return;
    }


    const afinidade =
        String(
            boss.afinidade ||
            boss.affinity ||
            ""
        )
        .toLowerCase();


    /*
     * Remove classes antigas
     */

    CardBoss.card.classList.remove(
        "affinity-agua",
        "affinity-vento",
        "affinity-fogo",
        "affinity-gelo",
        "affinity-raio",
        "affinity-eletric",
        "affinity-trevas",
        "affinity-sombra",
        "affinity-luz",
        "affinity-terra",
        "affinity-fisico",
        "affinity-magico",
        "affinity-dual"
    );


    let classe = "";


    if (
        afinidade.includes("/") ||
        (
            afinidade.includes("luz") &&
            afinidade.includes("trevas")
        )
    ) {

        classe =
            "affinity-dual";

    }

    else if (afinidade.includes("vento")) {

        classe =
            "affinity-vento";

    }

    else if (afinidade.includes("fogo")) {

        classe =
            "affinity-fogo";

    }

    else if (afinidade.includes("água") ||
             afinidade.includes("agua")) {

        classe =
            "affinity-agua";

    }

    else if (afinidade.includes("gelo")) {

        classe =
            "affinity-gelo";

    }

    else if (
        afinidade.includes("raio") ||
        afinidade.includes("elétr") ||
        afinidade.includes("eletr")
    ) {

        classe =
            "affinity-raio";

    }

    else if (
        afinidade.includes("trevas") ||
        afinidade.includes("sombra")
    ) {

        classe =
            "affinity-trevas";

    }

    else if (afinidade.includes("luz")) {

        classe =
            "affinity-luz";

    }

    else if (afinidade.includes("terra")) {

        classe =
            "affinity-terra";

    }

    else if (afinidade.includes("físico") ||
             afinidade.includes("fisico")) {

        classe =
            "affinity-fisico";

    }

    else if (afinidade.includes("mágico") ||
             afinidade.includes("magico")) {

        classe =
            "affinity-magico";

    }


    if (classe) {

        CardBoss.card.classList.add(
            classe
        );

    }


    /*
     * Atualiza também o sistema Canvas.
     */

    if (
        window.BossEffects &&
        typeof BossEffects.definirAfinidade ===
            "function"
    ) {

        BossEffects.definirAfinidade(
            boss.afinidade ||
            boss.affinity
        );

    }

}


/* =====================================================
   NÍVEL
===================================================== */

function atualizarNivelVisual() {

    const nivel = obterNivel();

    if (!nivel || !CardBoss.card) {
        return;
    }


    const valor =
        Number(
            nivel.nivel ??
            nivel.level ??
            0
        );


    /*
     * Classes especiais de nível.
     */

    CardBoss.card.classList.remove(
        "boss-level-12",
        "boss-level-100",
        "boss-level-200",
        "boss-level-300",
        "boss-level-400"
    );


    if (
        [12, 100, 200, 300, 400]
        .includes(valor)
    ) {

        CardBoss.card.classList.add(
            `boss-level-${valor}`
        );

    }


    /*
     * Canvas
     */

    if (
        window.BossEffects &&
        typeof BossEffects.definirNivel ===
            "function"
    ) {

        BossEffects.definirNivel(
            valor
        );

    }

}


/* =====================================================
   ESTADO DE BATALHA
===================================================== */

function atualizarEstadoBatalha() {

    const estado =
        obterEstado();

    if (!estado) return;


    let texto =
        estado.status ||
        estado.mensagem ||
        estado.estado ||
        null;


    if (
        !texto &&
        estado.derrotado === true
    ) {

        texto =
            "Boss derrotado.";

    }


    if (!texto) {

        texto =
            "Aguardando batalha...";

    }


    if (CardBoss.elementos.status) {

        CardBoss.elementos.status.textContent =
            texto;

    }


    atualizarEstadoVisual(
        estado
    );

}


function atualizarEstadoVisual(
    estado
) {

    if (!CardBoss.card) return;


    CardBoss.card.classList.remove(
        "boss-vivo",
        "boss-derrotado",
        "boss-ativo",
        "boss-morto",
        "boss-combate"
    );


    if (
        estado.derrotado === true ||
        estado.morto === true
    ) {

        CardBoss.card.classList.add(
            "boss-derrotado"
        );

        return;

    }


    CardBoss.card.classList.add(
        "boss-vivo"
    );


    if (
        estado.emCombate === true ||
        estado.emBatalha === true
    ) {

        CardBoss.card.classList.add(
            "boss-combate"
        );

    }

}


/* =====================================================
   HABILIDADES
===================================================== */

function configurarHabilidades() {

    if (!CardBoss.elementos.skillButtons) {
        return;
    }


    CardBoss.elementos.skillButtons.forEach(
        function (botao) {

            if (
                botao.dataset.cardBossConfigured ===
                "true"
            ) {
                return;
            }


            botao.dataset.cardBossConfigured =
                "true";


            botao.addEventListener(
                "click",
                function (evento) {

                    evento.stopPropagation();


                    const indice =
                        Number(
                            botao.dataset.skillIndex
                        );


                    if (
                        !Number.isInteger(
                            indice
                        )
                    ) {
                        return;
                    }


                    /*
                     * O sistema oficial de habilidades
                     * continua sendo BossSkills.
                     */

                    if (
                        window.BossSkills &&
                        typeof BossSkills.usarHabilidade ===
                            "function"
                    ) {

                        BossSkills.usarHabilidade(
                            indice
                        );

                    }

                }
            );

        }
    );

}


/* =====================================================
   ATUALIZAR HABILIDADES
===================================================== */

function atualizarHabilidades() {

    const nivel =
        obterNivel();

    if (!nivel) return;


    /*
     * boss-render.js já é responsável
     * por montar os dados das habilidades.
     *
     * Aqui cuidamos apenas da interface.
     */

    const botoes =
        CardBoss.card.querySelectorAll(
            ".boss-skill-button"
        );


    botoes.forEach(
        function (botao) {

            const indice =
                Number(
                    botao.dataset.skillIndex
                );


            if (
                !Number.isInteger(indice)
            ) {
                botao.disabled = true;
                return;
            }


            /*
             * O BossSkills decide se a habilidade
             * pode realmente ser usada.
             */

            if (
                window.BossSkills &&
                typeof BossSkills.podeUsarHabilidade ===
                    "function"
            ) {

                try {

                    const pode =
                        BossSkills.podeUsarHabilidade(
                            indice
                        );


                    botao.classList.toggle(
                        "skill-unavailable",
                        !pode
                    );

                }

                catch (erro) {

                    console.warn(
                        "[CardBoss] Erro ao verificar habilidade:",
                        erro
                    );

                }

            }

        }
    );

}


/* =====================================================
   OBSERVAR MUDANÇAS DE ESTADO
===================================================== */

function detectarMudancas() {

    const boss =
        obterBoss();

    const nivel =
        obterNivel();

    const estado =
        obterEstado();


    if (!boss || !nivel) {
        return;
    }


    const idBoss =
        boss.id ||
        boss.nome;


    const nivelAtual =
        nivel.nivel ??
        nivel.level;


    const afinidadeAtual =
        boss.afinidade ||
        boss.affinity;


    /*
     * Boss mudou
     */

    if (
        CardBoss.ultimoBoss !==
        idBoss
    ) {

        atualizarCabecalho();
        atualizarImagem();
        atualizarAfinidade();

        CardBoss.ultimoBoss =
            idBoss;

    }


    /*
     * Nível mudou
     */

    if (
        CardBoss.ultimoNivel !==
        nivelAtual
    ) {

        atualizarCabecalho();
        atualizarImagem();
        atualizarNivelVisual();

        CardBoss.ultimoNivel =
            nivelAtual;

    }


    /*
     * Afinidade mudou
     */

    if (
        CardBoss.ultimaAfinidade !==
        afinidadeAtual
    ) {

        atualizarAfinidade();

        CardBoss.ultimaAfinidade =
            afinidadeAtual;

    }


    /*
     * Estado mudou
     */

    if (
        CardBoss.ultimoEstado !==
        estado
    ) {

        atualizarEstadoBatalha();
        atualizarHabilidades();

        CardBoss.ultimoEstado =
            estado;

    }

}


/* =====================================================
   ATUALIZAÇÃO COMPLETA
===================================================== */

function atualizarTudo() {

    if (!CardBoss.card) {

        if (!localizarElementos()) {
            return;
        }

    }


    atualizarCabecalho();

    atualizarImagem();

    atualizarAfinidade();

    atualizarNivelVisual();

    atualizarEstadoBatalha();

    atualizarHabilidades();

}


/* =====================================================
   INTEGRAÇÃO COM O SISTEMA EXISTENTE
===================================================== */

function conectarSistema() {

    /*
     * Se BossEvents possuir atualização própria,
     * usamos a interface deste arquivo como camada
     * adicional sem substituir BossEvents.
     */

    if (
        window.BossEvents &&
        typeof BossEvents.atualizarEventosInterface ===
            "function"
    ) {

        try {

            BossEvents.atualizarEventosInterface();

        }

        catch (erro) {

            console.warn(
                "[CardBoss] Não foi possível atualizar BossEvents:",
                erro
            );

        }

    }


    /*
     * Inicializa efeitos visuais.
     */

    if (
        window.BossEffects &&
        typeof BossEffects.iniciar ===
            "function"
    ) {

        try {

            BossEffects.iniciar();

        }

        catch (erro) {

            console.warn(
                "[CardBoss] Erro ao iniciar efeitos:",
                erro
            );

        }

    }

}


/* =====================================================
   LOOP DE SINCRONIZAÇÃO
===================================================== */

let intervalo = null;


function iniciarSincronizacao() {

    if (intervalo) {
        clearInterval(intervalo);
    }


    intervalo =
        setInterval(
            detectarMudancas,
            150
        );

}


function pararSincronizacao() {

    if (!intervalo) return;

    clearInterval(intervalo);

    intervalo = null;

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

function inicializar() {

    if (CardBoss.inicializado) {
        return;
    }


    if (!localizarElementos()) {
        return;
    }


    configurarInteracao();

    configurarHabilidades();

    atualizarTudo();

    conectarSistema();

    iniciarSincronizacao();


    CardBoss.inicializado =
        true;


    console.log(
        "[CardBoss] Interface do Boss Card inicializada."
    );

}


/* =====================================================
   API PÚBLICA
===================================================== */

window.CardBoss = {

    inicializar,

    atualizar:
        atualizarTudo,

    atualizarCabecalho,

    atualizarImagem,

    atualizarAfinidade,

    atualizarNivel:
        atualizarNivelVisual,

    atualizarEstado:
        atualizarEstadoBatalha,

    atualizarHabilidades,

    virar:
        virarCarta,

    desvirar:
        desvirarCarta,

    alternar:
        alternarCarta,

    estaVirada:
        function () {

            return CardBoss.virada;

        },

    sincronizar:
        detectarMudancas,

    parar:
        pararSincronizacao

};


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            /*
             * O BossSystem também inicializa
             * os sistemas do Boss. Aqui apenas
             * inicializamos a camada da interface.
             */

            inicializar();

        }
    );

}

else {

    inicializar();

}

})();
