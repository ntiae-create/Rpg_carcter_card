/* =========================================================
   BOSS CARD — INTERAÇÃO / FLIP
   Baseado na lógica de interação do Character Card

   Responsabilidades:
   - Clique no Boss Card
   - Toque no celular
   - Flip frente / verso
   - Impedir flip ao interagir com controles
   - API pública para outros módulos
========================================================= */

(function () {
    "use strict";

    let bossCard = null;
    let inicializado = false;

    /*
     * Elementos que NÃO devem virar o card quando clicados.
     *
     * Isso permite que o usuário:
     * - use habilidades
     * - troque o Boss
     * - troque o nível
     * - use controles do Mestre
     * - interaja com inputs
     * sem disparar o flip.
     */
    const SELETORES_INTERATIVOS = [
        "button",
        "input",
        "select",
        "textarea",
        "option",
        "a",
        "label",

        ".boss-skill-button",
        ".boss-selector",
        ".boss-level-selector",
        ".boss-control",
        ".boss-controls",
        ".master-controls",
        ".master-toggle",

        "[data-no-flip]",
        "[data-prevent-flip]"
    ];

    /*
     * -------------------------------------------------------
     * Verifica se o elemento clicado está dentro de uma área
     * que não deve causar o flip.
     * -------------------------------------------------------
     */
    function deveImpedirFlip(target) {

        if (!target) {
            return false;
        }

        if (!(target instanceof Element)) {
            return false;
        }

        return SELETORES_INTERATIVOS.some(function (seletor) {

            try {
                return Boolean(target.closest(seletor));
            } catch (erro) {
                console.warn(
                    "[BossInteraction] Seletor inválido:",
                    seletor,
                    erro
                );

                return false;
            }

        });
    }

    /*
     * -------------------------------------------------------
     * Alterna a classe visual do flip.
     *
     * O CSS deve possuir algo semelhante a:
     *
     * .boss-card.flipped { ... }
     *
     * -------------------------------------------------------
     */
    function alternarFlip() {

        if (!bossCard) {
            return;
        }

        bossCard.classList.toggle("flipped");

        atualizarEstadoFlip();

    }

    /*
     * -------------------------------------------------------
     * Atualiza informações auxiliares depois do flip.
     * -------------------------------------------------------
     */
    function atualizarEstadoFlip() {

        if (!bossCard) {
            return;
        }

        const virou = bossCard.classList.contains("flipped");

        bossCard.setAttribute(
            "data-flipped",
            virou ? "true" : "false"
        );

        /*
         * Permite que outros sistemas saibam qual face
         * está atualmente visível.
         */
        if (typeof window.BossEffects !== "undefined") {

            if (
                typeof window.BossEffects.definirFace === "function"
            ) {
                window.BossEffects.definirFace(
                    virou ? "verso" : "frente"
                );
            }

        }

        /*
         * Evento personalizado para outros módulos.
         *
         * Exemplo:
         *
         * document.addEventListener(
         *     "bosscardflip",
         *     function(event) {
         *         console.log(event.detail.flipped);
         *     }
         * );
         */
        try {

            document.dispatchEvent(
                new CustomEvent("bosscardflip", {
                    detail: {
                        flipped: virou,
                        face: virou ? "verso" : "frente",
                        card: bossCard
                    }
                })
            );

        } catch (erro) {

            console.warn(
                "[BossInteraction] Não foi possível disparar evento de flip.",
                erro
            );

        }
    }

    /*
     * -------------------------------------------------------
     * Clique / toque
     * -------------------------------------------------------
     *
     * O clique é suficiente para mouse e toque em celular.
     *
     * Não usamos touchstart + click ao mesmo tempo porque isso
     * poderia causar DOIS flips no celular.
     */
    function tratarClique(evento) {

        if (!bossCard) {
            return;
        }

        /*
         * Se o usuário clicou em um botão, habilidade,
         * seletor etc., não fazemos nada.
         */
        if (deveImpedirFlip(evento.target)) {
            return;
        }

        alternarFlip();
    }

    /*
     * -------------------------------------------------------
     * Teclado
     * -------------------------------------------------------
     *
     * Permite acessibilidade:
     *
     * Enter / Espaço = flip
     *
     * O card recebe tabindex automaticamente.
     * -------------------------------------------------------
     */
    function tratarTeclado(evento) {

        if (!bossCard) {
            return;
        }

        /*
         * Não interferir em campos de formulário.
         */
        if (deveImpedirFlip(evento.target)) {
            return;
        }

        if (
            evento.key === "Enter" ||
            evento.key === " "
        ) {

            evento.preventDefault();

            alternarFlip();
        }
    }

    /*
     * -------------------------------------------------------
     * Inicialização
     * -------------------------------------------------------
     */
    function inicializar() {

        if (inicializado) {
            return;
        }

        bossCard = document.querySelector(".boss-card");

        /*
         * Também aceita #boss-card caso a classe ainda não
         * esteja presente por algum motivo.
         */
        if (!bossCard) {
            bossCard = document.getElementById("boss-card");
        }

        if (!bossCard) {

            console.warn(
                "[BossInteraction] Boss Card não encontrado."
            );

            return;
        }

        inicializado = true;

        /*
         * O mesmo conceito utilizado no Character Card:
         * o próprio card recebe a interação.
         */
        bossCard.addEventListener(
            "click",
            tratarClique
        );

        bossCard.addEventListener(
            "keydown",
            tratarTeclado
        );

        /*
         * Permite foco por teclado.
         */
        if (!bossCard.hasAttribute("tabindex")) {
            bossCard.setAttribute("tabindex", "0");
        }

        /*
         * Estado inicial.
         */
        bossCard.classList.remove("flipped");

        bossCard.setAttribute(
            "data-flipped",
            "false"
        );

        atualizarEstadoFlip();

        console.log(
            "[BossInteraction] Boss Card inicializado."
        );
    }

    /*
     * -------------------------------------------------------
     * Controle manual
     * -------------------------------------------------------
     */

    function virar() {

        if (!bossCard) {
            return;
        }

        if (!bossCard.classList.contains("flipped")) {
            alternarFlip();
        }
    }

    function desvirar() {

        if (!bossCard) {
            return;
        }

        if (bossCard.classList.contains("flipped")) {
            alternarFlip();
        }
    }

    function definirFace(face) {

        if (!bossCard) {
            return;
        }

        const verso =
            face === "verso" ||
            face === "back" ||
            face === "traseira";

        const frente =
            face === "frente" ||
            face === "front" ||
            face === "dianteira";

        if (verso) {

            bossCard.classList.add("flipped");

        } else if (frente) {

            bossCard.classList.remove("flipped");

        } else {

            console.warn(
                "[BossInteraction] Face inválida:",
                face
            );

            return;
        }

        atualizarEstadoFlip();
    }

    function estaVirado() {

        if (!bossCard) {
            return false;
        }

        return bossCard.classList.contains("flipped");
    }

    function obterFace() {

        return estaVirado()
            ? "verso"
            : "frente";
    }

    /*
     * -------------------------------------------------------
     * Reinicialização
     * -------------------------------------------------------
     *
     * Útil caso o Boss Card seja recriado dinamicamente.
     * -------------------------------------------------------
     */
    function reinicializar() {

        if (bossCard) {

            bossCard.removeEventListener(
                "click",
                tratarClique
            );

            bossCard.removeEventListener(
                "keydown",
                tratarTeclado
            );
        }

        bossCard = null;
        inicializado = false;

        inicializar();
    }

    /*
     * -------------------------------------------------------
     * API GLOBAL
     * -------------------------------------------------------
     */
    window.BossInteraction = {

        inicializar: inicializar,

        flip: alternarFlip,

        virar: virar,

        desvirar: desvirar,

        definirFace: definirFace,

        estaVirado: estaVirado,

        obterFace: obterFace,

        reinicializar: reinicializar

    };

    /*
     * -------------------------------------------------------
     * Inicialização automática
     * -------------------------------------------------------
     */
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            inicializar,
            { once: true }
        );

    } else {

        inicializar();

    }

})();

Como ele fica no Boss

A interação principal fica exatamente na ideia do Character Card:

TOQUE / CLIQUE NO CARD
        ↓
   .flipped
        ↓
┌───────────────┐
│     FRENTE    │
└───────────────┘
        ↕
┌───────────────┐
│     VERSO     │
└───────────────┘

Mas com uma proteção importante: clicar em uma habilidade, botão, seletor de Boss, seletor de nível ou controle não vira o card.

E deixei uma API que os outros sistemas podem usar:

BossInteraction.virar();
BossInteraction.desvirar();

BossInteraction.definirFace("frente");
BossInteraction.definirFace("verso");

BossInteraction.estaVirado();
BossInteraction.obterFace();

Também deixei o evento "bosscardflip", então depois podemos fazer o "effects.js" reagir à troca de face sem misturar a lógica do Canvas com a interação do card.

Esse arquivo é somente a camada de interação. Não substitui "script.js", "boss.js", "boss-render.js" ou "boss-events.js".
