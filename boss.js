"use strict";

/* ============================================================
   BOSS CARD SYSTEM
   HASVREJK FILHOTE
============================================================ */

const BossSystem = {

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
                custoMP: 15,
                custoEST: 20,
                dano: 25,
                tipo: "vento"
            },

            {
                id: "garras_vida",
                nome: "Garras da Vida",
                descricao:
                    "Rouba 50% do dano causado.",
                area:
                    "Alvo atingido",
                tipo: "fisico",
                rouboVida:
                    0.50
            },

            {
                id: "bater_asas",
                nome: "Bater de Asas",
                descricao:
                    "Manda os jogadores para longe.",
                area:
                    "Todos os jogadores",
                tipo: "vento"
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
       DANO
    ======================================================== */

    receberDano(valor, tipo = "normal") {

        valor = Number(valor) || 0;

        if (valor <= 0)
            return 0;

        if (
            tipo === "corpo-a-corpo" &&
            this.boss.noAr
        ) {

            console.log(
                "[Boss] Ataque corpo a corpo bloqueado pela passiva."
            );

            this.atualizarCard();

            return 0;
        }

        const danoAplicado =
            Math.min(valor, this.boss.hp);

        this.boss.hp -= danoAplicado;

        if (this.boss.hp < 0)
            this.boss.hp = 0;

        this.atualizarCard();

        return danoAplicado;
    },


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
        )
            return;

        this.receberDano(dano);

        input.value = "";
    },


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
        )
            return;

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

        valor = Number(valor) || 0;

        if (valor <= 0)
            return true;

        if (this.boss.mp < valor) {

            console.warn(
                "[Boss] MP insuficiente."
            );

            return false;
        }

        this.boss.mp -= valor;

        this.atualizarCard();

        return true;
    },


    recuperarMP(valor) {

        valor = Number(valor) || 0;

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

        valor = Number(valor) || 0;

        if (valor <= 0)
            return true;

        if (this.boss.est < valor) {

            console.warn(
                "[Boss] Estamina insuficiente."
            );

            return false;
        }

        this.boss.est -= valor;

        this.atualizarCard();

        return true;
    },


    recuperarEstamina(valor) {

        valor = Number(valor) || 0;

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

            return false;
        }


        /* Habilidades sem custo definido
           não gastam recurso por enquanto. */

        if (
            habilidade.custoMP &&
            this.boss.mp < habilidade.custoMP
        ) {

            console.warn(
                "[Boss] MP insuficiente."
            );

            return false;
        }


        if (
            habilidade.custoEST &&
            this.boss.est < habilidade.custoEST
        ) {

            console.warn(
                "[Boss] Estamina insuficiente."
            );

            return false;
        }


        if (habilidade.custoMP)
            this.boss.mp -= habilidade.custoMP;


        if (habilidade.custoEST)
            this.boss.est -= habilidade.custoEST;


        console.log(
            `[Boss] ${habilidade.nome} utilizada.`
        );


        this.atualizarCard();


        return {

            sucesso: true,

            habilidade: habilidade,

            dano:
                habilidade.dano || 0,

            tipo:
                habilidade.tipo || "normal"

        };
    },


    /* ========================================================
       PASSIVA — VOO
    ======================================================== */

    ativarVoo() {

        this.boss.noAr = true;

        this.atualizarCard();

        console.log(
            "[Boss] Hasvrejk está no ar."
        );
    },


    desativarVoo() {

        this.boss.noAr = false;

        this.atualizarCard();

        console.log(
            "[Boss] Hasvrejk voltou ao solo."
        );
    },


    /* ========================================================
       CURA
    ======================================================== */

    curar(valor) {

        valor = Number(valor) || 0;

        this.boss.hp =
            Math.min(
                this.boss.hpMax,
                this.boss.hp + valor
            );

        this.atualizarCard();
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
        )
            return;

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

        let imagemSalva = null;

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
            !arquivo.type.startsWith("image/")
        ) {

            alert(
                "Selecione uma imagem válida."
            );

            event.target.value = "";

            return;
        }


        const leitor =
            new FileReader();


        leitor.onload = () => {

            const imagemBase64 =
                leitor.result;

            const imagem =
                document.getElementById(
                    "boss-image"
                );

            if (imagem)
                imagem.src = imagemBase64;


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


        leitor.onerror = () => {

            alert(
                "Não foi possível carregar a imagem."
            );
        };


        leitor.readAsDataURL(arquivo);
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

                this.selecionarImagem(event);

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
    },


    atualizarBarra(
        id,
        atual,
        maximo
    ) {

        const elemento =
            document.getElementById(id);

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


    atualizarTexto(id, texto) {

        const elemento =
            document.getElementById(id);

        if (!elemento)
            return;

        elemento.textContent =
            texto;
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

        this.atualizarCard();
    }
};


window.BossSystem = BossSystem;


document.addEventListener(
    "DOMContentLoaded",
    () => {

        BossSystem.atualizarCard();

        BossSystem.carregarImagem();

        BossSystem.configurarImagem();

        console.log(
            "[Boss] Hasvrejk Filhote carregado."
        );
    }
);
