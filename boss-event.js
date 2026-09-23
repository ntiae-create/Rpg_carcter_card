/* =========================================================
   BOSS EVENTS
   EVENTOS E INTERAÇÃO DA INTERFACE

   Responsabilidades:
   - Seleção de Boss
   - Seleção de nível
   - Botões de combate
   - Botões de habilidades
   - Atualização dos eventos da interface

   IMPORTANTE:
   Este arquivo NÃO decide qual membro executa
   uma habilidade de Boss duplo.

   Essa responsabilidade pertence ao BossSkills.
========================================================= */


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function inicializarEventosBoss() {

    configurarSelecaoBoss();
    configurarSelecaoNivel();
    configurarBotoesCombate();
    configurarBotoesHabilidades();

    atualizarEventosInterface();
}


/* =========================================================
   SELEÇÃO DE BOSS
========================================================= */

function configurarSelecaoBoss() {

    const botoes =
        document.querySelectorAll(
            ".boss-selector button"
        );

    botoes.forEach(botao => {

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
                    return;
                }

                /*
                   O Boss mudou.

                   O estado precisa ser reinicializado
                   antes de atualizar a interface.
                */

                BossState.inicializarEstado();

                BossRender.renderizarBoss();

                atualizarEventosInterface();
            }
        );
    });
}


/* =========================================================
   SELEÇÃO DE NÍVEL
========================================================= */

function configurarSelecaoNivel() {

    const botoes =
        document.querySelectorAll(
            ".boss-level-selector button"
        );

    botoes.forEach(botao => {

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
                    return;
                }

                /*
                   Ao trocar de nível,
                   reinicializa o estado da batalha.
                */

                BossState.inicializarEstado();

                BossRender.renderizarBoss();

                atualizarEventosInterface();
            }
        );
    });
}


/* =========================================================
   BOTÕES DE COMBATE
========================================================= */

function configurarBotoesCombate() {

    const botaoDano =
        document.getElementById(
            "btn-dano-recebido"
        );

    const botaoRestaurar =
        document.getElementById(
            "btn-restaurar"
        );

    const botaoRodada =
        document.getElementById(
            "btn-rodada-passou"
        );

    const botaoZerar =
        document.getElementById(
            "btn-zerar"
        );


    /* -----------------------------------------------------
       DANO DE TESTE
    ----------------------------------------------------- */

    if (botaoDano) {

        botaoDano.addEventListener(
            "click",
            () => {

                const boss =
                    BossState.obterBoss();

                if (!boss) {
                    return;
                }

                if (boss.tipo === "Boss Duplo") {

                    BossCombat.receberDanoDual(
                        50
                    );

                } else {

                    BossCombat.receberDanoSingle(
                        50
                    );
                }

                atualizarEventosInterface();
            }
        );
    }


    /* -----------------------------------------------------
       RESTAURAR BATALHA
    ----------------------------------------------------- */

    if (botaoRestaurar) {

        botaoRestaurar.addEventListener(
            "click",
            () => {

                BossCombat.restaurarBatalha();

                atualizarEventosInterface();
            }
        );
    }


    /* -----------------------------------------------------
       PASSAR RODADA
    ----------------------------------------------------- */

    if (botaoRodada) {

        botaoRodada.addEventListener(
            "click",
            () => {

                BossCombat.avancarRodada();

                atualizarEventosInterface();
            }
        );
    }


    /* -----------------------------------------------------
       ZERAR BATALHA
    ----------------------------------------------------- */

    if (botaoZerar) {

        botaoZerar.addEventListener(
            "click",
            () => {

                BossCombat.zerarBatalha();

                atualizarEventosInterface();
            }
        );
    }
}


/* =========================================================
   BOTÕES DE HABILIDADES
========================================================= */

function configurarBotoesHabilidades() {

    const botoes =
        document.querySelectorAll(
            ".boss-skill-button"
        );

    botoes.forEach(
        (botao, indice) => {

            /*
               Evita múltiplos listeners
               caso a interface seja atualizada.
            */

            if (
                botao.dataset.skillEventConfigured ===
                "true"
            ) {
                return;
            }

            botao.dataset.skillEventConfigured =
                "true";

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


/* =========================================================
   USAR HABILIDADE PELO BOTÃO
========================================================= */

function usarHabilidadePeloBotao(
    indice
) {

    /*
       IMPORTANTE:

       Não escolhemos mais Skoll ou Hati aqui.

       O BossSkills consulta a habilidade atual
       e descobre automaticamente o membro através
       de:

           habilidade.membro

       Exemplo:

           Hate Cure
           membro: "hati"

       Resultado:
           Hati executa.

       Outro exemplo:

           Feição Luminosa
           membro: "skoll"

       Resultado:
           Skoll executa.
    */

    const resultado =
        BossSkills.usarHabilidade(
            indice
        );

    processarResultadoHabilidade(
        resultado
    );

    atualizarEventosInterface();
}


/* =========================================================
   PROCESSAR RESULTADO DA HABILIDADE
========================================================= */

function processarResultadoHabilidade(
    resultado
) {

    if (!resultado) {
        return;
    }


    /* -----------------------------------------------------
       HABILIDADE NÃO EXECUTADA
    ----------------------------------------------------- */

    if (!resultado.sucesso) {

        console.warn(
            "[BossEvents] Habilidade não executada:",
            resultado.motivo
        );

        atualizarStatusInterface(
            resultado.motivo ||
            "Não foi possível usar a habilidade."
        );

        return;
    }


    /* -----------------------------------------------------
       HABILIDADE EXECUTADA
    ----------------------------------------------------- */

    const habilidade =
        resultado.habilidade;

    let mensagem =
        `${habilidade?.nome || "Habilidade"} usada.`;


    /*
       Boss duplo
    */

    if (resultado.tipo === "dual") {

        mensagem =
            `${resultado.membro} usou ${habilidade.nome}.`;
    }


    /*
       Boss único
    */

    else if (resultado.tipo === "single") {

        mensagem =
            `${resultado.boss} usou ${habilidade.nome}.`;
    }


    atualizarStatusInterface(
        mensagem
    );
}


/* =========================================================
   STATUS DA INTERFACE
========================================================= */

function atualizarStatusInterface(
    mensagem
) {

    const elemento =
        document.getElementById(
            "boss-status"
        );

    if (!elemento) {
        return;
    }

    elemento.textContent =
        mensagem;
}


/* =========================================================
   VERIFICAR HABILIDADE PARA INTERFACE
========================================================= */

function verificarHabilidadeParaInterface(
    indice
) {

    const habilidade =
        BossSkills.obterHabilidade(
            indice
        );

    if (!habilidade) {
        return false;
    }


    /*
       Boss duplo:

       BossSkills resolve automaticamente
       o membro através de habilidade.membro.
    */

    return BossSkills.podeUsarHabilidade(
        indice
    );
}


/* =========================================================
   ATUALIZAR BOTÕES DE HABILIDADES
========================================================= */

function atualizarBotoesHabilidades() {

    const botoes =
        document.querySelectorAll(
            ".boss-skill-button"
        );

    botoes.forEach(
        (botao, indice) => {

            const habilidade =
                BossSkills.obterHabilidade(
                    indice
                );

            /*
               Slot sem habilidade.
            */

            if (!habilidade) {

                botao.disabled = true;

                botao.title =
                    "Habilidade indisponível.";

                return;
            }


            /*
               Verifica se pode usar.
            */

            const podeUsar =
                verificarHabilidadeParaInterface(
                    indice
                );

            botao.disabled =
                !podeUsar;


            /*
               Informações extras.
            */

            if (habilidade.membro) {

                botao.title =
                    `Habilidade de ${habilidade.membro}.`;
            }

            else {

                botao.title =
                    "Usar habilidade.";
            }
        }
    );
}


/* =========================================================
   ATUALIZAR EVENTOS DA INTERFACE
========================================================= */

function atualizarEventosInterface() {

    atualizarBotoesHabilidades();
}


/* =========================================================
   EXPOSIÇÃO GLOBAL
========================================================= */

window.BossEvents = {

    inicializarEventosBoss,

    configurarSelecaoBoss,
    configurarSelecaoNivel,

    configurarBotoesCombate,
    configurarBotoesHabilidades,

    usarHabilidadePeloBotao,

    processarResultadoHabilidade,

    verificarHabilidadeParaInterface,

    atualizarBotoesHabilidades,

    atualizarEventosInterface
};
