"use strict";

/* ============================================================
   BOSS CARD SYSTEM
   HASVREJK FILHOTE
============================================================ */

const BossSystem = {

    /* ========================================================
       DADOS DO BOSS
    ======================================================== */

    boss: {

        id: "hasvrejk_filhote",

        nome: "Hasvrejk Filhote",

        nivel: 13,

        afinidade: "vento",

        hpMax: 150,
        hp: 150,

        mpMax: 120,
        mp: 120,

        estMax: 200,
        est: 200,

        atk: 10,
        atkMgc: 8,
        def: 12,
        res: 42,
        agi: 9,
        int: 10,

        passiva: {
            nome: "Rei dos Ares",

            descricao:
                "Enquanto estiver no ar, torna-se imune a ataques corpo a corpo."
        },

        habilidades: [

            {
                id: "rajada_vento",

                nome: "Rajada de Vento",

                descricao:
                    "Cria uma pequena área de vento cortante.",

                area:
                    "Até 3 jogadores",

                custoMP: 12,

                custoEST: 15,

                atributoDano:
                    "atkMgc",

                tipo:
                    "vento"
            },

            {
                id: "garras_vida",

                nome: "Garras da Vida",

                descricao:
                    "Rouba 50% do dano causado.",

                area:
                    "Alvo atingido",

                custoMP: 20,

                custoEST: 15,

                atributoDano:
                    "atk",

                rouboVida:
                    0.50,

                tipo:
                    "fisico"
            },

            {
                id: "bater_asas",

                nome: "Bater de Asas",

                descricao:
                    "Manda todos os jogadores para longe.",

                area:
                    "Todos os jogadores",

                custoMP: 30,

                custoEST: 10,

                atributoDano:
                    "atkMgc",

                tipo:
                    "vento"
            }

        ],

        noAr: false
    },


    /* ========================================================
       IMAGEM
    ======================================================== */

    imagem: {

        storageKey:
            "rpg_boss_card_image",

        imagemPadrao:
            "assets/bosses/hasvrejk-filhote.png"
    },


    /* ========================================================
       DANO RECEBIDO
    ======================================================== */

    receberDano(valor, tipo = "normal") {

        valor =
            Number(valor);

        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return 0;
        }


        /* ----------------------------------------------------
           PASSIVA REI DOS ARES
        ---------------------------------------------------- */

        if (
            tipo === "corpo-a-corpo" &&
            this.boss.noAr
        ) {

            console.log(
                "[Boss] Rei dos Ares: ataque corpo a corpo bloqueado."
            );

            this.atualizarCard();

            return 0;
        }


        const danoAplicado =
            Math.min(
                valor,
                this.boss.hp
            );


        this.boss.hp -=
            danoAplicado;


        if (this.boss.hp < 0)
            this.boss.hp = 0;


        this.atualizarCard();


        console.log(
            `[Boss] Recebeu ${danoAplicado} de dano. HP: ${this.boss.hp}/${this.boss.hpMax}`
        );


        return danoAplicado;
    },


    /* ========================================================
       DANO MANUAL
    ======================================================== */

    aplicarDanoManual() {

        const input =
            document.getElementById(
                "boss-damage-input"
            );

        if (!input)
            return;


        const dano =
            Number(input.value);


        if (
            !Number.isFinite(dano) ||
            dano <= 0
        ) {

            console.warn(
                "[Boss] Dano inválido."
            );

            return;
        }


        this.receberDano(
            dano,
            "normal"
        );


        input.value = "";
    },


    /* ========================================================
       DANO CORPO A CORPO
    ======================================================== */

    aplicarDanoCorpoACorpo() {

        const input =
            document.getElementById(
                "boss-damage-input"
            );

        if (!input)
            return;


        const dano =
            Number(input.value);


        if (
            !Number.isFinite(dano) ||
            dano <= 0
        ) {

            console.warn(
                "[Boss] Dano inválido."
            );

            return;
        }


        this.receberDano(
            dano,
            "corpo-a-corpo"
        );


        input.value = "";
    },


    /* ========================================================
       MP
    ======================================================== */

    gastarMP(valor) {

        valor =
            Number(valor);


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return true;
        }


        if (
            this.boss.mp < valor
        ) {

            console.warn(
                "[Boss] MP insuficiente."
            );

            return false;
        }


        this.boss.mp -=
            valor;


        this.atualizarCard();


        return true;
    },


    recuperarMP(valor) {

        valor =
            Number(valor);


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return;
        }


        this.boss.mp =
            Math.min(
                this.boss.mpMax,
                this.boss.mp + valor
            );


        this.atualizarCard();
    },


    /* ========================================================
       ESTAMINA
    ======================================================== */

    gastarEstamina(valor) {

        valor =
            Number(valor);


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return true;
        }


        if (
            this.boss.est < valor
        ) {

            console.warn(
                "[Boss] Estamina insuficiente."
            );

            return false;
        }


        this.boss.est -=
            valor;


        this.atualizarCard();


        return true;
    },


    recuperarEstamina(valor) {

        valor =
            Number(valor);


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return;
        }


        this.boss.est =
            Math.min(
                this.boss.estMax,
                this.boss.est + valor
            );


        this.atualizarCard();
    },


    /* ========================================================
       USAR HABILIDADE
    ======================================================== */

    usarHabilidade(id) {

        const habilidade =
            this.boss.habilidades.find(
                habilidade =>
                    habilidade.id === id
            );


        if (!habilidade) {

            console.warn(
                "[Boss] Habilidade não encontrada:",
                id
            );

            return null;
        }


        /* ----------------------------------------------------
           VERIFICAR MP
        ---------------------------------------------------- */

        if (
            habilidade.custoMP > 0 &&
            this.boss.mp <
            habilidade.custoMP
        ) {

            console.warn(
                `[Boss] MP insuficiente para ${habilidade.nome}.`
            );

            return null;
        }


        /* ----------------------------------------------------
           VERIFICAR ESTAMINA
        ---------------------------------------------------- */

        if (
            habilidade.custoEST > 0 &&
            this.boss.est <
            habilidade.custoEST
        ) {

            console.warn(
                `[Boss] Estamina insuficiente para ${habilidade.nome}.`
            );

            return null;
        }


        /* ----------------------------------------------------
           GASTAR RECURSOS
        ---------------------------------------------------- */

        this.boss.mp -=
            habilidade.custoMP;


        this.boss.est -=
            habilidade.custoEST;


        /* ----------------------------------------------------
           CALCULAR DANO
        ---------------------------------------------------- */

        const atributo =
            habilidade.atributoDano;


        const dano =
            Number(
                this.boss[atributo]
            ) || 0;


        /* ----------------------------------------------------
           CURA DA GARRAS DA VIDA
        ---------------------------------------------------- */

        let cura = 0;


        if (
            habilidade.rouboVida &&
            dano > 0
        ) {

            cura =
                dano *
                habilidade.rouboVida;
        }


        if (cura > 0) {

            this.boss.hp =
                Math.min(
                    this.boss.hpMax,
                    this.boss.hp + cura
                );
        }


        /* ----------------------------------------------------
           ATUALIZAR
        ---------------------------------------------------- */

        this.atualizarCard();


        console.log(
            `[Boss] ${habilidade.nome} utilizada.`
        );

        console.log(
            `[Boss] Dano: ${dano}`
        );

        if (cura > 0) {

            console.log(
                `[Boss] Roubo de vida: +${cura} HP`
            );
        }


        return {

            sucesso: true,

            habilidade:
                habilidade,

            dano:
                dano,

            cura:
                cura,

            tipo:
                habilidade.tipo || "normal",

            atributo:
                atributo,

            custoMP:
                habilidade.custoMP,

            custoEST:
                habilidade.custoEST
        };
    },


    /* ========================================================
       PASSIVA — VOO
    ======================================================== */

    ativarVoo() {

        this.boss.noAr =
            true;


        this.atualizarCard();


        console.log(
            "[Boss] Hasvrejk está no ar."
        );
    },


    desativarVoo() {

        this.boss.noAr =
            false;


        this.atualizarCard();


        console.log(
            "[Boss] Hasvrejk voltou ao solo."
        );
    },


    /* ========================================================
       CURA
    ======================================================== */

    curar(valor) {

        valor =
            Number(valor);


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {
            return 0;
        }


        const curaAplicada =
            Math.min(
                valor,
                this.boss.hpMax -
                this.boss.hp
            );


        this.boss.hp +=
            curaAplicada;


        this.atualizarCard();


        return curaAplicada;
    },


    aplicarCuraManual() {

        const input =
            document.getElementById(
                "boss-heal-input"
            );

        if (!input)
            return;


        const cura =
            Number(input.value);


        if (
            !Number.isFinite(cura) ||
            cura <= 0
        ) {

            console.warn(
                "[Boss] Cura inválida."
            );

            return;
        }


        this.curar(cura);


        input.value = "";
    },


    /* ========================================================
       IMAGEM
    ======================================================== */

    carregarImagem() {

        const imagem =
            document.getElementById(
                "boss-image"
            );

        if (!imagem)
            return;


        let imagemSalva =
            null;


        try {

            imagemSalva =
                localStorage.getItem(
                    this.imagem.storageKey
                );

        } catch (erro) {

            console.warn(
                "[Boss] Não foi possível acessar a imagem salva.",
                erro
            );
        }


        imagem.src =
            imagemSalva ||
            this.imagem.imagemPadrao;
    },


    selecionarImagem(event) {

        const arquivo =
            event.target.files?.[0];


        if (!arquivo)
            return;


        if (
            !arquivo.type ||
            !arquivo.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Selecione uma imagem válida."
            );

            event.target.value =
                "";

            return;
        }


        const leitor =
            new FileReader();


        leitor.onload =
            () => {

                const imagemBase64 =
                    leitor.result;


                const imagem =
                    document.getElementById(
                        "boss-image"
                    );


                if (imagem)
                    imagem.src =
                        imagemBase64;


                try {

                    localStorage.setItem(
                        this.imagem.storageKey,
                        imagemBase64
                    );

                } catch (erro) {

                    console.error(
                        "[Boss] Não foi possível salvar a imagem:",
                        erro
                    );

                    alert(
                        "A imagem é muito grande para ser salva. Escolha uma imagem menor."
                    );
                }
            };


        leitor.onerror =
            () => {

                alert(
                    "Não foi possível carregar a imagem."
                );
            };


        leitor.readAsDataURL(
            arquivo
        );
    },


    configurarImagem() {

        const input =
            document.getElementById(
                "boss-image-input"
            );


        if (!input)
            return;


        input.addEventListener(
            "change",
            event => {

                this.selecionarImagem(
                    event
                );
            }
        );
    },


    /* ========================================================
       ATUALIZAR CARD
    ======================================================== */

    atualizarCard() {

        this.atualizarBarra(
            "boss-hp",
            this.boss.hp,
            this.boss.hpMax
        );


        this.atualizarBarra(
            "boss-mp",
            this.boss.mp,
            this.boss.mpMax
        );


        this.atualizarBarra(
            "boss-est",
            this.boss.est,
            this.boss.estMax
        );


        this.atualizarTexto(
            "boss-hp-value",
            `${this.boss.hp} / ${this.boss.hpMax}`
        );


        this.atualizarTexto(
            "boss-mp-value",
            `${this.boss.mp} / ${this.boss.mpMax}`
        );


        this.atualizarTexto(
            "boss-est-value",
            `${this.boss.est} / ${this.boss.estMax}`
        );


        this.atualizarTexto(
            "boss-level",
            `Nível ${this.boss.nivel}`
        );


        this.atualizarTexto(
            "boss-name",
            this.boss.nome
        );


        this.atualizarTexto(
            "boss-affinity",
            this.boss.afinidade
        );


        this.atualizarTexto(
            "boss-atk",
            this.boss.atk
        );


        this.atualizarTexto(
            "boss-atk-mgc",
            this.boss.atkMgc
        );


        this.atualizarTexto(
            "boss-def",
            this.boss.def
        );


        this.atualizarTexto(
            "boss-res",
            this.boss.res
        );


        this.atualizarTexto(
            "boss-agi",
            this.boss.agi
        );


        this.atualizarTexto(
            "boss-int",
            this.boss.int
        );


        this.atualizarTexto(
            "boss-passive-state",

            this.boss.noAr
                ? "ATIVA — NO AR"
                : "INATIVA — NO SOLO"
        );


        /* ----------------------------------------------------
           DANOS DAS HABILIDADES
        ---------------------------------------------------- */

        this.atualizarTexto(
            "skill-rajada-dano",
            this.boss.atkMgc
        );

        this.atualizarTexto(
            "skill-garras-dano",
            this.boss.atk
        );

        this.atualizarTexto(
            "skill-bater-dano",
            this.boss.atkMgc
        );


        this.atualizarTexto(
            "combat-rajada-dano",
            this.boss.atkMgc
        );

        this.atualizarTexto(
            "combat-garras-dano",
            this.boss.atk
        );

        this.atualizarTexto(
            "combat-bater-dano",
            this.boss.atkMgc
        );


        /* ----------------------------------------------------
           RECURSOS DA ABA STATUS
        ---------------------------------------------------- */

        this.atualizarTexto(
            "boss-status-hp",
            this.boss.hp
        );

        this.atualizarTexto(
            "boss-status-mp",
            this.boss.mp
        );

        this.atualizarTexto(
            "boss-status-est",
            this.boss.est
        );


        /* ----------------------------------------------------
           RECURSOS DA ABA COMBATE
        ---------------------------------------------------- */

        this.atualizarTexto(
            "combat-mp",
            this.boss.mp
        );

        this.atualizarTexto(
            "combat-est",
            this.boss.est
        );
    },


    atualizarBarra(
        id,
        atual,
        maximo
    ) {

        const elemento =
            document.getElementById(
                id
            );


        if (!elemento)
            return;


        const porcentagem =
            maximo > 0
                ? (atual / maximo) * 100
                : 0;


        elemento.style.width =
            `${Math.max(
                0,
                Math.min(
                    100,
                    porcentagem
                )
            )}%`;
    },


    atualizarTexto(
        id,
        texto
    ) {

        const elemento =
            document.getElementById(
                id
            );


        if (!elemento)
            return;


        elemento.textContent =
            texto;
    },


    /* ========================================================
       LOG DE COMBATE
    ======================================================== */

    adicionarLog(
        mensagem
    ) {

        const log =
            document.getElementById(
                "combat-log"
            );


        if (!log)
            return;


        const linha =
            document.createElement(
                "div"
            );


        linha.textContent =
            mensagem;


        log.appendChild(
            linha
        );


        log.scrollTop =
            log.scrollHeight;
    },


    /* ========================================================
       EXECUTAR HABILIDADE
    ======================================================== */

    executarHabilidade(
        id
    ) {

        const resultado =
            this.usarHabilidade(
                id
            );


        if (!resultado) {

            this.adicionarLog(
                "Não foi possível usar essa habilidade."
            );

            return;
        }


        const habilidade =
            resultado.habilidade;


        let mensagem =
            `${habilidade.nome}: ${resultado.dano} de dano`;


        if (
            resultado.cura > 0
        ) {

            mensagem +=
                ` | +${resultado.cura} HP`;
        }


        this.adicionarLog(
            mensagem
        );
    },


    /* ========================================================
       CONFIGURAR BOTÕES
    ======================================================== */

    configurarBotoes() {

        /* ----------------------------------------------------
           HABILIDADES PRINCIPAIS
        ---------------------------------------------------- */

        const botoesHabilidades = {

            "skill-rajada-vento":
                "rajada_vento",

            "skill-garras-vida":
                "garras_vida",

            "skill-bater-asas":
                "bater_asas",

            "combat-rajada-vento":
                "rajada_vento",

            "combat-garras-vida":
                "garras_vida",

            "combat-bater-asas":
                "bater_asas"
        };


        Object.entries(
            botoesHabilidades
        ).forEach(
            ([botaoId, habilidadeId]) => {

                const botao =
                    document.getElementById(
                        botaoId
                    );


                if (!botao) {

                    console.warn(
                        `[Boss] Botão não encontrado: #${botaoId}`
                    );

                    return;
                }


                /* Evita que outro comportamento
                   padrão do botão interfira. */

                botao.type =
                    "button";


                botao.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();


                        console.log(
                            `[Boss] Clique: ${botaoId}`
                        );


                        this.executarHabilidade(
                            habilidadeId
                        );
                    }
                );
            }
        );


        /* ----------------------------------------------------
           DANO MANUAL
        ---------------------------------------------------- */

        const danoButton =
            document.getElementById(
                "boss-damage-button"
            );


        if (danoButton) {

            danoButton.type =
                "button";


            danoButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.aplicarDanoManual();
                }
            );
        }


        /* ----------------------------------------------------
           DANO CORPO A CORPO
        ---------------------------------------------------- */

        const meleeButton =
            document.getElementById(
                "boss-melee-button"
            );


        if (meleeButton) {

            meleeButton.type =
                "button";


            meleeButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.aplicarDanoCorpoACorpo();
                }
            );
        }


        /* ----------------------------------------------------
           CURA
        ---------------------------------------------------- */

        const healButton =
            document.getElementById(
                "boss-heal-button"
            );


        if (healButton) {

            healButton.type =
                "button";


            healButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.aplicarCuraManual();
                }
            );
        }


        /* ----------------------------------------------------
           VOAR
        ---------------------------------------------------- */

        const flyButton =
            document.getElementById(
                "boss-fly-button"
            );


        if (flyButton) {

            flyButton.type =
                "button";


            flyButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.ativarVoo();
                }
            );
        }


        /* ----------------------------------------------------
           VOLTAR AO SOLO
        ---------------------------------------------------- */

        const groundButton =
            document.getElementById(
                "boss-ground-button"
            );


        if (groundButton) {

            groundButton.type =
                "button";


            groundButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.desativarVoo();
                }
            );
        }


        /* ----------------------------------------------------
           RESET
        ---------------------------------------------------- */

        const resetButton =
            document.getElementById(
                "boss-reset-button"
            );


        if (resetButton) {

            resetButton.type =
                "button";


            resetButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();


                    this.resetar();
                }
            );
        }


        console.log(
            "[Boss] Botões configurados."
        );
    },


    /* ========================================================
       RESET
    ======================================================== */

    resetar() {

        this.boss.hp =
            this.boss.hpMax;

        this.boss.mp =
            this.boss.mpMax;

        this.boss.est =
            this.boss.estMax;

        this.boss.noAr =
            false;


        const log =
            document.getElementById(
                "combat-log"
            );


        if (log)
            log.innerHTML =
                "";


        this.atualizarCard();


        console.log(
            "[Boss] Hasvrejk Filhote resetado."
        );
    }
};


/* ============================================================
   EXPOR SISTEMA
============================================================ */

window.BossSystem =
    BossSystem;


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "[Boss] Inicializando sistema..."
        );


        BossSystem.atualizarCard();


        BossSystem.carregarImagem();


        BossSystem.configurarImagem();


        BossSystem.configurarBotoes();


        BossSystem.atualizarCard();


        console.log(
            "[Boss] Hasvrejk Filhote carregado."
        );
    }
);
