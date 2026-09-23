// =========================================================
// BOSS SYSTEM — NÚCLEO
//
// Este arquivo é o inicializador do sistema.
//
// Responsável somente por:
// - Inicializar o estado
// - Fazer o primeiro render
// - Registrar os eventos
//
// NÃO contém:
// - Dados dos Bosses
// - Regras de combate
// - Habilidades
// - Renderização detalhada
// - Cálculos de atributos
// =========================================================


// =========================================================
// INICIALIZAÇÃO DO SISTEMA
// =========================================================

function iniciarBossSystem() {

    // -----------------------------------------------------
    // 1. Verificar módulos
    // -----------------------------------------------------

    if (
        typeof BossState === "undefined"
    ) {

        console.error(
            "BossState não foi carregado."
        );

        return;

    }


    if (
        typeof BossRender === "undefined"
    ) {

        console.error(
            "BossRender não foi carregado."
        );

        return;

    }


    if (
        typeof BossCombat === "undefined"
    ) {

        console.error(
            "BossCombat não foi carregado."
        );

        return;

    }


    if (
        typeof BossSkills === "undefined"
    ) {

        console.error(
            "BossSkills não foi carregado."
        );

        return;

    }


    if (
        typeof BossEvents === "undefined"
    ) {

        console.error(
            "BossEvents não foi carregado."
        );

        return;

    }


    // -----------------------------------------------------
    // 2. Inicializar estado
    // -----------------------------------------------------

    BossState.inicializarEstado();


    // -----------------------------------------------------
    // 3. Renderizar Boss inicial
    // -----------------------------------------------------

    BossRender.renderizarBoss();


    // -----------------------------------------------------
    // 4. Registrar eventos
    // -----------------------------------------------------

    BossEvents.inicializarEventosBoss();


    // -----------------------------------------------------
    // 5. Atualizar estado visual dos botões
    // -----------------------------------------------------

    BossEvents.atualizarEventosInterface();


    // -----------------------------------------------------
    // 6. Sistema iniciado
    // -----------------------------------------------------

    console.log(
        "⚔️ BOSS SYSTEM ONLINE"
    );

}


// =========================================================
// DOM READY
// =========================================================
//
// Garante que o HTML já exista antes da inicialização.
// =========================================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarBossSystem
    );

}
else {

    iniciarBossSystem();

}


// =========================================================
// API GLOBAL
// =========================================================

window.BossSystem = {

    iniciar:
        iniciarBossSystem

};
