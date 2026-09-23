/* =========================================================
BOSS CARD — INTERFACE DA CARTA

Responsável por:

- interação da carta
- virar / desvirar
- frente e verso
- sincronização visual
- interação das habilidades
- integração com BossState / BossEffects

NÃO controla:

- dados do Boss
- combate
- cálculo de habilidades
- renderização dos atributos

========================================================= */

(function () {

"use strict";


/* =====================================================
   REFERÊNCIAS
===================================================== */

let card = null;
let inner = null;

let inicializado = false;


/* =====================================================
   LOCALIZAR CARTA
===================================================== */

function localizarCarta() {

    card =
        document.getElementById("boss-card") ||
        document.querySelector(".boss-card");

    if (!card) {

        console.warn(
            "[CardBoss] #boss-card não encontrado."
        );

        return false;
    }


    inner =
        card.querySelector(".boss-card-inner");


    if (!inner) {

        console.warn(
            "[CardBoss] .boss-card-inner não encontrado."
        );

        return false;
    }


    return true;
}


/* =====================================================
   VIRAR CARTA
===================================================== */

function virar() {

    if (!inner) return;

    inner.classList.add("flipped");

}


/* =====================================================
   DESVIRAR CARTA
===================================================== */

function desvirar() {

    if (!inner) return;

    inner.classList.remove("flipped");

}


/* =====================================================
   ALTERNAR
===================================================== */

function alternar() {

    if (!inner) return;

    inner.classList.toggle("flipped");

}


/* =====================================================
   VERIFICAR SE ESTÁ VIRADA
===================================================== */

function estaVirada() {

    if (!inner) return false;

    return inner.classList.contains("flipped");

}


/* =====================================================
   CLIQUE NA CARTA
===================================================== */

function configurarClique() {

    if (!card) return;


    card.addEventListener(
        "click",
        function (evento) {

            /*
             * Não virar quando clicar em controles.
             */

            const controle =
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


            if (controle) {
                return;
            }


            alternar();

        }
    );

}


/* =====================================================
   EFEITOS
===================================================== */

function sincronizarEfeitos() {

    if (
        !window.BossEffects ||
        !window.BossState
    ) {
        return;
    }


    try {

        const boss =
            BossState.obterBoss();


        const nivel =
            BossState.obterNivel();


        if (boss) {

            if (
                typeof BossEffects.definirAfinidade ===
                "function"
            ) {

                BossEffects.definirAfinidade(
                    boss.afinidade ||
                    boss.affinity ||
                    ""
                );

            }

        }


        if (nivel) {

            const valor =
                Number(
                    nivel.nivel ??
                    nivel.level ??
                    0
                );


            if (
                typeof BossEffects.definirNivel ===
                "function"
            ) {

                BossEffects.definirNivel(
                    valor
                );

            }

        }

    }

    catch (erro) {

        console.warn(
            "[CardBoss] Erro ao sincronizar efeitos:",
            erro
        );

    }

}


/* =====================================================
   ATUALIZAR INTERFACE
===================================================== */

function atualizar() {

    sincronizarEfeitos();


    /*
     * O boss-render.js continua sendo o responsável
     * por preencher os dados da carta.
     *
     * Aqui apenas garantimos que a interface
     * permaneça sincronizada.
     */

    if (
        window.BossRender &&
        typeof BossRender.renderizarBoss ===
        "function"
    ) {

        try {

            BossRender.renderizarBoss();

        }

        catch (erro) {

            console.warn(
                "[CardBoss] Erro ao atualizar BossRender:",
                erro
            );

        }

    }

}


/* =====================================================
   HABILIDADES
===================================================== */

function configurarHabilidades() {

    if (!card) return;


    const botoes =
        card.querySelectorAll(
            ".boss-skill-button"
        );


    botoes.forEach(
        function (botao) {

            /*
             * Não duplicar eventos.
             */

            if (
                botao.dataset.cardBossReady ===
                "true"
            ) {

                return;

            }


            botao.dataset.cardBossReady =
                "true";


            botao.addEventListener(
                "click",
                function (evento) {

                    /*
                     * Impede que o clique
                     * seja interpretado como
                     * clique na carta.
                     */

                    evento.stopPropagation();

                }
            );

        }
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

function inicializar() {

    if (inicializado) {
        return;
    }


    if (!localizarCarta()) {
        return;
    }


    configurarClique();

    configurarHabilidades();

    sincronizarEfeitos();


    inicializado = true;


    console.log(
        "[CardBoss] Interface do Boss Card pronta."
    );

}


/* =====================================================
   API PÚBLICA
===================================================== */

window.CardBoss = {

    inicializar,

    atualizar,

    virar,

    desvirar,

    alternar,

    estaVirada

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
        inicializar
    );

} else {

    inicializar();

}

})();
