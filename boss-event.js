// =========================================================
// BOSS SYSTEM — EVENTOS
//
// Responsável por:
// - Cliques dos Bosses
// - Cliques dos níveis
// - Botões de combate
// - Botões de habilidades
// - Atualização da interface
//
// NÃO contém:
// - Dados dos Bosses
// - Regras de combate
// - Cálculos de dano
// - Custos de habilidades
// =========================================================


// =========================================================
// INICIALIZAÇÃO
// =========================================================

function inicializarEventosBoss() {

    configurarSelecaoBoss();

    configurarSelecaoNivel();

    configurarBotoesCombate();

    configurarBotoesHabilidades();

}


// =========================================================
// SELEÇÃO DE BOSS
// =========================================================

function configurarSelecaoBoss() {

    const botoes =
        document.querySelectorAll(
            ".boss-selector button"
        );


    botoes.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const bossId =
                        botao.dataset.bossId;


                    if (!bossId) {
                        return;
                    }


                    const sucesso =
                        BossState.definirBoss(
                            bossId
                        );


                    if (!sucesso) {

                        console.warn(
                            "Boss inválido:",
                            bossId
                        );

                        return;

                    }


                    BossRender.renderizarBoss();

                }
            );

        }
    );

}


// =========================================================
// SELEÇÃO DE NÍVEL
// =========================================================

function configurarSelecaoNivel() {

    const botoes =
        document.querySelectorAll(
            ".boss-level-selector button"
        );


    botoes.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const nivel =
                        Number(
                            botao.dataset.level
                        );


                    if (!nivel) {
                        return;
                    }


                    const sucesso =
                        BossState.definirNivel(
                            nivel
                        );


                    if (!sucesso) {

                        console.warn(
                            "Nível inválido:",
                            nivel
                        );

                        return;

                    }


                    BossRender.renderizarBoss();

                }
            );

        }
    );

}


// =========================================================
// BOTÕES DE COMBATE
// =========================================================

function configurarBotoesCombate() {

    // =====================================================
    // DANO RECEBIDO
    // =====================================================

    const btnDano =
        document.getElementById(
            "btn-dano-recebido"
        );


    if (btnDano) {

        btnDano.addEventListener(
            "click",
            () => {

                const estado =
                    BossState.obterEstado();


                if (!estado) {
                    return;
                }


                // -----------------------------------------
                // BOSS ÚNICO
                // -----------------------------------------

                if (
                    estado.tipo === "single"
                ) {

                    BossCombat.receberDanoSingle(
                        50
                    );

                }


                // -----------------------------------------
                // BOSS DUPLO
                // -----------------------------------------

                else if (
                    estado.tipo === "dual"
                ) {

                    BossCombat.receberDanoDual(
                        50
                    );

                }

            }
        );

    }


    // =====================================================
    // RESTAURAR
    // =====================================================

    const btnRestaurar =
        document.getElementById(
            "btn-restaurar"
        );


    if (btnRestaurar) {

        btnRestaurar.addEventListener(
            "click",
            () => {

                BossCombat.restaurarBatalha();

            }
        );

    }


    // =====================================================
    // AVANÇAR RODADA
    // =====================================================

    const btnRodada =
        document.getElementById(
            "btn-rodada-passou"
        );


    if (btnRodada) {

        btnRodada.addEventListener(
            "click",
            () => {

                BossCombat.avancarRodada();

            }
        );

    }


    // =====================================================
    // ZERAR BOSS
    // =====================================================

    const btnZerar =
        document.getElementById(
            "btn-zerar"
        );


    if (btnZerar) {

        btnZerar.addEventListener(
            "click",
            () => {

                BossCombat.zerarBatalha();

            }
        );

    }

}


// =========================================================
// BOTÕES DE HABILIDADES
// =========================================================
//
// Os cinco containers existentes no HTML:
//
// skill-container-1
// skill-container-2
// skill-container-3
// skill-container-4
// skill-container-5
//
// Cada um possui:
//
// .boss-skill-button
//
// O índice interno começa em 0.
// =========================================================

function configurarBotoesHabilidades() {

    const botoes =
        document.querySelectorAll(
            ".boss-skill-button"
        );


    botoes.forEach(
        (botao, indice) => {

            botao.addEventListener(
                "click",
                () => {

                    usarHabilidadePeloBotao(
                        indice
                    );

                }
            );

        }
    );

}


// =========================================================
// USAR HABILIDADE PELO BOTÃO
// =========================================================

function usarHabilidadePeloBotao(
    indice
) {

    const estado =
        BossState.obterEstado();


    if (!estado) {
        return;
    }


    // =====================================================
    // BOSS ÚNICO
    // =====================================================

    if (
        estado.tipo === "single"
    ) {

        const resultado =
            BossSkills.usarHabilidade(
                indice
            );


        processarResultadoHabilidade(
            resultado
        );


        return;

    }


    // =====================================================
    // BOSS DUPLO
    // =====================================================
    //
    // Para o sistema atual de teste:
    //
    // - Se Skoll estiver vivo, usa com Skoll.
    // - Caso contrário, usa com Hati.
    //
    // Depois podemos trocar isso por seleção explícita
    // do membro.
    // =====================================================

    if (
        estado.tipo === "dual"
    ) {

        let membro = null;


        if (
            !estado.skoll.abatido
        ) {

            membro = "skoll";

        }
        else if (
            !estado.hati.abatido
        ) {

            membro = "hati";

        }


        if (!membro) {

            return;

        }


        const resultado =
            BossSkills.usarHabilidade(
                indice,
                membro
            );


        processarResultadoHabilidade(
            resultado
        );

    }

}


// =========================================================
// PROCESSAR RESULTADO DA HABILIDADE
// =========================================================
//
// Por enquanto não usamos alert.
//
// O resultado fica disponível no console para testes.
//
// Mais tarde podemos colocar:
// - animação
// - texto de combate
// - log da batalha
// - efeitos
// - números de dano
// =========================================================

function processarResultadoHabilidade(
    resultado
) {

    if (!resultado) {
        return;
    }


    if (
        !resultado.sucesso
    ) {

        console.warn(
            "Habilidade não executada:",
            resultado.motivo
        );


        return;

    }


    console.log(
        "⚔️ Habilidade utilizada:",
        resultado.habilidade?.nome
    );


    if (
        resultado.resultado
    ) {

        console.log(
            "Resultado:",
            resultado.resultado
        );

    }

}


// =========================================================
// ATUALIZAÇÃO DINÂMICA DOS BOTÕES
// =========================================================
//
// Desativa o botão quando:
//
// - Boss derrotado
// - habilidade sem MP
// - habilidade sem EST
// - membro derrotado
//
// Isso é apenas interface.
// A validação real continua dentro de boss-skills.js.
// =========================================================

function atualizarBotoesHabilidades() {

    const botoes =
        document.querySelectorAll(
            ".boss-skill-button"
        );


    botoes.forEach(
        (botao, indice) => {

            const podeUsar =
                verificarHabilidadeParaInterface(
                    indice
                );


            botao.disabled =
                !podeUsar;


            botao.classList.toggle(
                "indisponivel",
                !podeUsar
            );

        }
    );

}


// =========================================================
// VERIFICAR HABILIDADE PARA INTERFACE
// =========================================================

function verificarHabilidadeParaInterface(
    indice
) {

    const estado =
        BossState.obterEstado();


    if (!estado) {
        return false;
    }


    if (
        estado.tipo === "single"
    ) {

        return BossSkills.podeUsarHabilidade(
            indice
        );

    }


    if (
        estado.tipo === "dual"
    ) {

        let membro = null;


        if (
            !estado.skoll.abatido
        ) {

            membro = "skoll";

        }
        else if (
            !estado.hati.abatido
        ) {

            membro = "hati";

        }


        if (!membro) {
            return false;
        }


        return BossSkills.podeUsarHabilidade(
            indice,
            membro
        );

    }


    return false;

}


// =========================================================
// OBSERVADOR DE RENDER
// =========================================================
//
// Como o BossRender atualiza o HTML inteiro quando necessário,
// essa função pode ser chamada manualmente pelo núcleo.
//
// Mantemos separada para evitar misturar renderização
// com eventos.
// =========================================================

function atualizarEventosInterface() {

    atualizarBotoesHabilidades();

}


// =========================================================
// API GLOBAL
// =========================================================

window.BossEvents = {

    inicializarEventosBoss,

    configurarSelecaoBoss,

    configurarSelecaoNivel,

    configurarBotoesCombate,

    configurarBotoesHabilidades,

    atualizarBotoesHabilidades,

    atualizarEventosInterface

};
