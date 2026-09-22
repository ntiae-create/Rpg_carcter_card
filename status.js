/* =========================================================
   RPG BOSS CARD
   MÓDULO: STATUS
========================================================= */

"use strict";


const StatusModule = (() => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const ELEMENTS = {

        agua: {
            name: "Água",
            symbol: "💧"
        },

        luz: {
            name: "Luz",
            symbol: "☀️"
        },

        terra: {
            name: "Terra",
            symbol: "🪨"
        },

        trevas: {
            name: "Trevas",
            symbol: "🌑"
        },

        vento: {
            name: "Vento",
            symbol: "🌪️"
        },

        fogo: {
            name: "Fogo",
            symbol: "🔥"
        },

        fisico: {
            name: "Físico",
            symbol: "💪"
        },

        magico: {
            name: "Mágico",
            symbol: "✨"
        }

    };


    /* =====================================================
       PEGAR BOSS
    ===================================================== */

    function obterBoss() {

        if (
            typeof window.BossSystem ===
            "undefined"
        ) {
            return null;
        }

        return window.BossSystem.boss || null;

    }


    /* =====================================================
       ATUALIZAR TEXTO
    ===================================================== */

    function definirTexto(id, valor) {

        const elemento =
            document.getElementById(id);

        if (!elemento) {
            return;
        }

        elemento.textContent = valor;

    }


    /* =====================================================
       ATUALIZAR STATUS
    ===================================================== */

    function atualizarStatus() {

        const boss = obterBoss();

        if (!boss) {
            return;
        }


        /* =================================================
           RECURSOS
        ================================================= */

        definirTexto(
            "stat-hp",
            boss.hp
        );

        definirTexto(
            "stat-mp",
            boss.mp
        );

        definirTexto(
            "stat-est",
            boss.est
        );


        /* =================================================
           ATRIBUTOS
        ================================================= */

        definirTexto(
            "stat-atk",
            boss.atk
        );

        definirTexto(
            "stat-atkMgc",
            boss.atkMgc
        );

        definirTexto(
            "stat-def",
            boss.def
        );

        definirTexto(
            "stat-res",
            boss.res
        );

        definirTexto(
            "stat-agi",
            boss.agi
        );

        definirTexto(
            "stat-int",
            boss.int
        );


        /* =================================================
           NÍVEL
        ================================================= */

        definirTexto(
            "stat-level",
            boss.nivel
        );


        /* =================================================
           AFINIDADE
        ================================================= */

        const affinity =
            ELEMENTS[
                boss.afinidade
            ];


        if (affinity) {

            definirTexto(
                "character-affinity",
                affinity.name
            );

            definirTexto(
                "character-affinity-symbol",
                affinity.symbol
            );

        } else {

            definirTexto(
                "character-affinity",
                "Nenhuma"
            );

            definirTexto(
                "character-affinity-symbol",
                "?"
            );

        }

    }


    /* =====================================================
       ATUALIZAÇÃO AUTOMÁTICA
    ===================================================== */

    function iniciarAtualizacao() {

        atualizarStatus();


        /*
           Atualiza periodicamente para acompanhar
           dano, cura, habilidades, MP e EST.
        */

        setInterval(
            atualizarStatus,
            100
        );

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    function iniciar() {

        /*
           O BossSystem pode carregar depois do módulo.
           Por isso fazemos uma pequena espera.
        */

        if (
            typeof window.BossSystem ===
            "undefined"
        ) {

            setTimeout(
                iniciar,
                50
            );

            return;

        }


        atualizarStatus();

        iniciarAtualizacao();

    }


    /* =====================================================
       API
    ===================================================== */

    return {

        ELEMENTS,

        iniciar,

        atualizarStatus

    };

})();


/* =========================================================
   DISPONIBILIZAR GLOBALMENTE
========================================================= */

window.StatusModule =
    StatusModule;


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        StatusModule.iniciar();

    }
);
