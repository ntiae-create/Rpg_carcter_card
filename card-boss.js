/* =========================================================
BOSS CARD — INTERFACE DA CARTA

Responsável pela interação visual/interativa do card.

NÃO controla:

- Banco de dados
- Status do Boss
- Combate
- Habilidades
- Renderização dos dados do Boss

Essas funções continuam nos respectivos arquivos.
========================================================= */

(function () {

"use strict";

let bossCard = null;


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

function inicializar() {

    bossCard = document.querySelector(".boss-card");

    if (!bossCard) {
        console.warn(
            "[CardBoss] .boss-card não encontrado."
        );
        return;
    }

    configurarInteracao();

    console.log(
        "[CardBoss] Interface da carta inicializada."
    );
}


/* =====================================================
   CLIQUE / TOQUE NA CARTA
===================================================== */

function configurarInteracao() {

    bossCard.addEventListener("click", function (evento) {

        /*
         * Não vira a carta quando o usuário
         * está interagindo com algum controle.
         */

        if (
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
                ].join(", ")
            )
        ) {
            return;
        }


        alternarCarta();

    });

}


/* =====================================================
   VIRAR CARTA
===================================================== */

function virarCarta() {

    if (!bossCard) return;

    bossCard.classList.add("flipped");

}


/* =====================================================
   DESVIRAR CARTA
===================================================== */

function desvirarCarta() {

    if (!bossCard) return;

    bossCard.classList.remove("flipped");

}


/* =====================================================
   ALTERNAR CARTA
===================================================== */

function alternarCarta() {

    if (!bossCard) return;

    bossCard.classList.toggle("flipped");

}


/* =====================================================
   VERIFICAR ESTADO
===================================================== */

function estaVirada() {

    if (!bossCard) return false;

    return bossCard.classList.contains("flipped");

}


/* =====================================================
   API PÚBLICA
   Outros arquivos podem controlar a carta através dela.
===================================================== */

window.CardBoss = {

    inicializar,

    virar: virarCarta,

    desvirar: desvirarCarta,

    alternar: alternarCarta,

    estaVirada

};


/* =====================================================
   INICIALIZAÇÃO AUTOMÁTICA
===================================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        inicializar
    );

} else {

    inicializar();

}

})();
