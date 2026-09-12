// ==========================================
// RPG CHARACTER CARDS
// ==========================================


// ==========================================
// CARTA / FLIP
// ==========================================

const card = document.querySelector(".character-card");

if (card) {

    card.addEventListener("click", function (evento) {

        if (
            evento.target.closest(
                ".master-controls, .master-toggle, button, input, select"
            )
        ) {
            return;
        }

        card.classList.toggle("flipped");

    });

}


// ==========================================
// DADOS DAS RAÇAS
// ==========================================

const racas = {

    "Humano": {
        hp: 25,
        mp: 15,
        est: 30,
        sanidade: 100,
        atk: 4,
        atkMgc: 4,
        def: 8,
        res: 8,
        agi: 8,
        int: 15
    },

    "Meio-elfo": {
        hp: 23,
        mp: 22,
        est: 25,
        sanidade: 100,
        atk: 3,
        atkMgc: 7,
        def: 6,
        res: 9,
        agi: 10,
        int: 15
    },

    "Elfo": {
        hp: 22,
        mp: 25,
        est: 25,
        sanidade: 100,
        atk: 3,
        atkMgc: 8,
        def: 5,
        res: 9,
        agi: 12,
        int: 16
    },

    "Semi-besta": {
        hp: 30,
        mp: 10,
        est: 35,
        sanidade: 90,
        atk: 9,
        atkMgc: 3,
        def: 7,
        res: 6,
        agi: 10,
        int: 10
    },

    "Besta": {
        hp: 35,
        mp: 8,
        est: 40,
        sanidade: 80,
        atk: 11,
        atkMgc: 2,
        def: 6,
        res: 5,
        agi: 9,
        int: 6
    }

};


// ==========================================
// CORES DAS RAÇAS
// ==========================================

const coresRacas = {

    "Humano": {
        main: "#60a5fa",
        light: "#dbeafe",
        dark: "#10233d",
        glow: "rgba(96, 165, 250, 0.25)"
    },

    "Meio-elfo": {
        main: "#2dd4bf",
        light: "#ccfbf1",
        dark: "#0c2927",
        glow: "rgba(45, 212, 191, 0.25)"
    },

    "Elfo": {
        main: "#34d399",
        light: "#d1fae5",
        dark: "#0d2d20",
        glow: "rgba(52, 211, 153, 0.25)"
    },

    "Semi-besta": {
        main: "#f59e0b",
        light: "#fef3c7",
        dark: "#3a2308",
        glow: "rgba(245, 158, 11, 0.25)"
    },

    "Besta": {
        main: "#ef4444",
        light: "#fee2e2",
        dark: "#3a1010",
        glow: "rgba(239, 68, 68, 0.25)"
    }

};


// ==========================================
// CORES DAS AFINIDADES
// ==========================================

const coresAfinidades = {

    agua: {
        main: "#22d3ee",
        light: "#a5f3fc"
    },

    luz: {
        main: "#facc15",
        light: "#fef9c3"
    },

    terra: {
        main: "#84cc16",
        light: "#ecfccb"
    },

    trevas: {
        main: "#a855f7",
        light: "#e9d5ff"
    },

    vento: {
        main: "#60a5fa",
        light: "#dbeafe"
    },

    fogo: {
        main: "#f97316",
        light: "#fed7aa"
    }

};


// ==========================================
// ATUALIZAR CORES VISUAIS
// ==========================================

function atualizarCores() {

    if (!card) {
        return;
    }

    const corRaca =
        coresRacas[racaAtual] ||
        coresRacas["Humano"];

    const corAfinidade =
        coresAfinidades[afinidadeAtual] ||
        coresAfinidades["agua"];


    // --------------------------------------
    // CORES DA RAÇA
    // --------------------------------------

    card.style.setProperty(
        "--race-main",
        corRaca.main
    );

    card.style.setProperty(
        "--race-light",
        corRaca.light
    );

    card.style.setProperty(
        "--race-dark",
        corRaca.dark
    );

    card.style.setProperty(
        "--card-border",
        corRaca.main
    );

    card.style.setProperty(
        "--card-glow",
        corRaca.glow
    );


    // --------------------------------------
    // CORES DA AFINIDADE
    // --------------------------------------

    card.style.setProperty(
        "--element-main",
        corAfinidade.main
    );

    card.style.setProperty(
        "--element-light",
        corAfinidade.light
    );

}


// ==========================================
// AFINIDADES
// ==========================================

const afinidades = {

    agua: {
        nome: "ÁGUA",
        simbolo: "💧"
    },

    luz: {
        nome: "LUZ",
        simbolo: "💡"
    },

    terra: {
        nome: "TERRA",
        simbolo: "🌍"
    },

    trevas: {
        nome: "TREVAS",
        simbolo: "🌑"
    },

    vento: {
        nome: "VENTO",
        simbolo: "🌪️"
    },

    fogo: {
        nome: "FOGO",
        simbolo: "🔥"
    }

};


// ==========================================
// ESTÁGIOS DOS BRASÕES
// ==========================================

const estagiosBrasao = [

    {
        nome: "INICIAL",
        xp: 0,
        tamanho: 1,
        brilho: 1
    },

    {
        nome: "LEVE",
        xp: 3000,
        tamanho: 1.08,
        brilho: 1.2
    },

    {
        nome: "PEQUENO",
        xp: 6000,
        tamanho: 1.16,
        brilho: 1.4
    },

    {
        nome: "MÉDIO",
        xp: 9000,
        tamanho: 1.25,
        brilho: 1.7
    },

    {
        nome: "GRANDE",
        xp: 12000,
        tamanho: 1.35,
        brilho: 2
    },

    {
        nome: "PESADO",
        xp: 15000,
        tamanho: 1.45,
        brilho: 2.4
    },

    {
        nome: "ARCANO",
        xp: 20000,
        tamanho: 1.6,
        brilho: 3
    },

    {
        nome: "ARCANO EVOLUÍDO",
        xp: 25000,
        tamanho: 1.7,
        brilho: 3.5
    },

    {
        nome: "EXTRA",
        xp: 50000,
        tamanho: 1.85,
        brilho: 4
    }

];


// ==========================================
// ESTADO DO PERSONAGEM
// ==========================================

let nomeAtual = "Nome do Personagem";

let racaAtual = "Humano";

let classeAtual = "Saber";

let afinidadeAtual = "agua";


let hp = 25;

let mp = 15;

let est = 30;

let sanidade = 100;


let xp = 0;

let nivel = 1;

let pontosAtributo = 0;


// ==========================================
// XP DO BRASÃO
// ==========================================

let xpBrasao = 0;

let marcosBrasaoRecebidos = 0;


// ==========================================
// ATRIBUTOS
// ==========================================

let atributos = {

    atk: 4,

    atkMgc: 4,

    def: 8,

    res: 8,

    agi: 8,

    int: 15

};


// ==========================================
// LOCAL STORAGE
// ==========================================

const STORAGE_KEY =
    "rpg_character_card";


function salvarDados() {

    const dados = {

        nomeAtual,

        racaAtual,

        classeAtual,

        afinidadeAtual,

        hp,

        mp,

        est,

        sanidade,

        xp,

        nivel,

        pontosAtributo,

        xpBrasao,

        marcosBrasaoRecebidos,

        atributos

    };


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dados)
    );

}


// ==========================================
// CARREGAR DADOS
// ==========================================

function carregarDados() {

    const salvo =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!salvo) {
        return;
    }


    try {

        const dados =
            JSON.parse(salvo);


        if (
            typeof dados.nomeAtual === "string"
        ) {
            nomeAtual =
                dados.nomeAtual;
        }


        if (
            racas[dados.racaAtual]
        ) {
            racaAtual =
                dados.racaAtual;
        }


        if (
            typeof dados.classeAtual === "string"
        ) {
            classeAtual =
                dados.classeAtual;
        }


        if (
            afinidades[dados.afinidadeAtual]
        ) {
            afinidadeAtual =
                dados.afinidadeAtual;
        }


        if (
            typeof dados.hp === "number"
        ) {
            hp = dados.hp;
        }


        if (
            typeof dados.mp === "number"
        ) {
            mp = dados.mp;
        }


        if (
            typeof dados.est === "number"
        ) {
            est = dados.est;
        }


        if (
            typeof dados.sanidade === "number"
        ) {
            sanidade =
                dados.sanidade;
        }


        if (
            typeof dados.xp === "number"
        ) {
            xp = dados.xp;
        }


        if (
            typeof dados.nivel === "number"
        ) {
            nivel = dados.nivel;
        }


        if (
            typeof dados.pontosAtributo === "number"
        ) {
            pontosAtributo =
                dados.pontosAtributo;
        }


        if (
            typeof dados.xpBrasao === "number"
        ) {
            xpBrasao =
                dados.xpBrasao;
        }


        if (
            typeof dados.marcosBrasaoRecebidos === "number"
        ) {
            marcosBrasaoRecebidos =
                dados.marcosBrasaoRecebidos;
        }


        if (dados.atributos) {

            atributos = {

                ...atributos,

                ...dados.atributos

            };

        }


    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

    }

}


// ==========================================
// ELEMENTOS DA INTERFACE
// ==========================================

const nameInput =
    document.getElementById(
        "name-input"
    );

const raceSelect =
    document.getElementById(
        "race-select"
    );

const classSelect =
    document.getElementById(
        "class-select"
    );

const affinitySelect =
    document.getElementById(
        "affinity-select"
    );


// ==========================================
// NOME
// ==========================================

function atualizarNome() {

    const elemento =
        document.getElementById(
            "character-name"
        );


    if (elemento) {

        elemento.textContent =
            nomeAtual ||
            "Nome do Personagem";

    }


    if (nameInput) {

        nameInput.value =
            nomeAtual ===
            "Nome do Personagem"
                ? ""
                : nomeAtual;

    }

}


if (nameInput) {

    nameInput.addEventListener(
        "input",
        function () {

            nomeAtual =
                this.value.trim();

            atualizarNome();

            salvarDados();

        }
    );

}


// ==========================================
// RAÇA
// ==========================================

function atualizarRaca() {

    const elemento =
        document.getElementById(
            "character-race"
        );


    if (elemento) {

        elemento.textContent =
            racaAtual;

    }


    if (raceSelect) {

        raceSelect.value =
            racaAtual;

    }


    const dadosRaca =
        racas[racaAtual];


    if (!dadosRaca) {
        return;
    }


    hp = dadosRaca.hp;

    mp = dadosRaca.mp;

    est = dadosRaca.est;

    sanidade =
        dadosRaca.sanidade;


    atributos.atk =
        dadosRaca.atk;

    atributos.atkMgc =
        dadosRaca.atkMgc;

    atributos.def =
        dadosRaca.def;

    atributos.res =
        dadosRaca.res;

    atributos.agi =
        dadosRaca.agi;

    atributos.int =
        dadosRaca.int;


    atualizarCores();

    atualizarRecursos();

    atualizarAtributos();

    salvarDados();

}


if (raceSelect) {

    raceSelect.addEventListener(
        "change",
        function () {

            racaAtual =
                this.value;

            atualizarRaca();

        }
    );

}


// ==========================================
// CLASSE
// ==========================================

function atualizarClasse() {

    const elemento =
        document.getElementById(
            "character-class"
        );


    if (elemento) {

        elemento.textContent =
            classeAtual;

    }


    if (classSelect) {

        classSelect.value =
            classeAtual;

    }

}


if (classSelect) {

    classSelect.addEventListener(
        "change",
        function () {

            classeAtual =
                this.value;

            atualizarClasse();

            salvarDados();

        }
    );

}


// ==========================================
// AFINIDADE
// ==========================================

function atualizarAfinidade() {

    const dados =
        afinidades[afinidadeAtual];


    if (!dados) {
        return;
    }


    const emblema =
        document.getElementById(
            "affinity-emblem"
        );


    const nome =
        document.getElementById(
            "affinity-name"
        );


    if (emblema) {

        emblema.textContent =
            dados.simbolo;

    }


    if (nome) {

        nome.textContent =
            dados.nome;

    }


    if (affinitySelect) {

        affinitySelect.value =
            afinidadeAtual;

    }


    atualizarCores();

    atualizarBrasao();

}


if (affinitySelect) {

    affinitySelect.addEventListener(
        "change",
        function () {

            afinidadeAtual =
                this.value;

            atualizarAfinidade();

            salvarDados();

        }
    );

}


// ==========================================
// RECURSOS
// ==========================================

function atualizarRecursos() {

    const dadosRaca =
        racas[racaAtual];


    if (!dadosRaca) {
        return;
    }


    const hpElement =
        document.getElementById(
            "stat-hp"
        );


    const mpElement =
        document.getElementById(
            "stat-mp"
        );


    const estElement =
        document.getElementById(
            "stat-est"
        );


    const sanidadeElement =
        document.getElementById(
            "stat-sanidade"
        );


    if (hpElement) {

        hpElement.textContent =
            `${hp} / ${dadosRaca.hp}`;

    }


    if (mpElement) {

        mpElement.textContent =
            `${mp} / ${dadosRaca.mp}`;

    }


    if (estElement) {

        estElement.textContent =
            `${est} / ${dadosRaca.est}`;

    }


    if (sanidadeElement) {

        sanidadeElement.textContent =
            `${sanidade} / ${dadosRaca.sanidade}`;

    }

}


// ==========================================
// HP
// ==========================================

function alterarHP(valor) {

    const max =
        racas[racaAtual].hp;


    hp += valor;


    hp =
        Math.max(
            0,
            Math.min(hp, max)
        );


    atualizarRecursos();

    salvarDados();

}


// ==========================================
// MP
// ==========================================

function alterarMP(valor) {

    const max =
        racas[racaAtual].mp;


    mp += valor;


    mp =
        Math.max(
            0,
            Math.min(mp, max)
        );


    atualizarRecursos();

    salvarDados();

}


// ==========================================
// EST
// ==========================================

function alterarEST(valor) {

    const max =
        racas[racaAtual].est;


    est += valor;


    est =
        Math.max(
            0,
            Math.min(est, max)
        );


    atualizarRecursos();

    salvarDados();

}


// ==========================================
// SANIDADE
// ==========================================

function alterarSanidade(valor) {

    const max =
        racas[racaAtual].sanidade;


    sanidade += valor;


    sanidade =
        Math.max(
            0,
            Math.min(
                sanidade,
                max
            )
        );


    atualizarRecursos();

    salvarDados();

}


// ==========================================
// ATRIBUTOS
// ==========================================

function atualizarAtributos() {

    const elementos = {

        atk:
            document.getElementById(
                "stat-atk"
            ),

        atkMgc:
            document.getElementById(
                "stat-atkMgc"
            ),

        def:
            document.getElementById(
                "stat-def"
            ),

        res:
            document.getElementById(
                "stat-res"
            ),

        agi:
            document.getElementById(
                "stat-agi"
            ),

        int:
            document.getElementById(
                "stat-int"
            )

    };


    for (
        const atributo in elementos
    ) {

        if (
            elementos[atributo]
        ) {

            elementos[atributo]
                .textContent =
                atributos[atributo];

        }

    }


    const pontos =
        document.getElementById(
            "attribute-points"
        );


    if (pontos) {

        pontos.textContent =
            pontosAtributo;

    }


    atualizarBotoesAtributo();

}


// ==========================================
// BOTÕES DE ATRIBUTO
// ==========================================

function atualizarBotoesAtributo() {

    const botoes =
        document.querySelectorAll(
            ".attribute-plus"
        );


    botoes.forEach(
        function (botao) {

            botao.style.display =
                pontosAtributo > 0
                    ? "block"
                    : "none";

        }
    );


    const caixa =
        document.getElementById(
            "attribute-points-box"
        );


    if (caixa) {

        caixa.classList.toggle(
            "available",
            pontosAtributo > 0
        );

    }

}


// ==========================================
// AUMENTAR ATRIBUTO
// ==========================================

function aumentarAtributo(
    atributo
) {

    if (
        pontosAtributo <= 0
    ) {
        return;
    }


    if (
        !(atributo in atributos)
    ) {
        return;
    }


    atributos[atributo]++;

    pontosAtributo--;

    atualizarAtributos();

    salvarDados();

}


// ==========================================
// XP — PROGRESSÃO
// ==========================================

function xpNecessarioPorNivel(
    nivelAtual
) {

    if (nivelAtual === 1)
        return 100;

    if (nivelAtual === 2)
        return 150;

    if (nivelAtual === 3)
        return 225;

    if (nivelAtual === 4)
        return 325;

    if (nivelAtual === 5)
        return 450;

    if (nivelAtual === 6)
        return 600;

    if (nivelAtual === 7)
        return 775;

    if (nivelAtual === 8)
        return 975;

    if (nivelAtual === 9)
        return 1200;


    return 1200 +
        ((nivelAtual - 10) * 150);

}


// ==========================================
// XP TOTAL PARA CHEGAR A UM NÍVEL
// ==========================================

function xpParaNivel(
    nivelAlvo
) {

    if (
        nivelAlvo <= 1
    ) {
        return 0;
    }


    let total = 0;


    for (
        let i = 1;
        i < nivelAlvo;
        i++
    ) {

        total +=
            xpNecessarioPorNivel(i);

    }


    return total;

}


// ==========================================
// ATUALIZAR XP
// ==========================================

function atualizarXP() {

    const inicioNivel =
        xpParaNivel(nivel);


    const necessario =
        xpNecessarioPorNivel(
            nivel
        );


    const xpNoNivel =
        Math.max(
            0,
            xp - inicioNivel
        );


    const progresso =
        Math.max(
            0,
            Math.min(
                100,
                (xpNoNivel /
                    necessario) *
                100
            )
        );


    const xpText =
        document.getElementById(
            "xp-text"
        );


    const xpProgress =
        document.getElementById(
            "xp-progress"
        );


    if (xpText) {

        xpText.textContent =
            `${xp} XP`;

    }


    if (xpProgress) {

        xpProgress.style.width =
            `${progresso}%`;

    }


    document
        .querySelectorAll(
            ".level"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    `LV. ${String(nivel).padStart(2, "0")}`;

            }
        );

}


// ==========================================
// ADICIONAR XP
// ==========================================

function adicionarXP() {

    const input =
        document.getElementById(
            "xp-amount"
        );


    if (!input) {
        return;
    }


    const quantidade =
        Number(input.value);


    if (
        !Number.isFinite(
            quantidade
        ) ||
        quantidade <= 0
    ) {
        return;
    }


    const nivelAnterior =
        nivel;


    xp +=
        Math.floor(
            quantidade
        );


    while (
        xp >=
        xpParaNivel(
            nivel + 1
        )
    ) {

        nivel++;

        pontosAtributo += 3;

    }


    atualizarMarcosBrasao(
        nivelAnterior,
        nivel
    );


    atualizarXP();

    atualizarAtributos();

    atualizarBrasao();


    input.value = "";

    salvarDados();

}


// ==========================================
// REMOVER XP
// ==========================================

function removerXP() {

    const input =
        document.getElementById(
            "xp-amount"
        );


    if (!input) {
        return;
    }


    const quantidade =
        Number(input.value);


    if (
        !Number.isFinite(
            quantidade
        ) ||
        quantidade <= 0
    ) {
        return;
    }


    xp -=
        Math.floor(
            quantidade
        );


    xp =
        Math.max(
            0,
            xp
        );


    nivel = 1;


    while (
        xp >=
        xpParaNivel(
            nivel + 1
        )
    ) {

        nivel++;

    }


    const pontosTotais =
        (nivel - 1) * 3;


    if (
        pontosAtributo >
        pontosTotais
    ) {

        pontosAtributo =
            pontosTotais;

    }


    const marcosAtuais =
        Math.floor(
            nivel / 5
        );


    if (
        marcosBrasaoRecebidos >
        marcosAtuais
    ) {

        const marcosRemovidos =
            marcosBrasaoRecebidos -
            marcosAtuais;


        xpBrasao =
            Math.max(
                0,
                xpBrasao -
                (
                    marcosRemovidos *
                    500
                )
            );


        marcosBrasaoRecebidos =
            marcosAtuais;

    }


    atualizarXP();

    atualizarAtributos();

    atualizarBrasao();


    input.value = "";

    salvarDados();

}


// ==========================================
// MARCOS DE BRASÃO
// ==========================================

function atualizarMarcosBrasao(
    nivelAnterior,
    nivelNovo
) {

    const marcoAnterior =
        Math.floor(
            nivelAnterior / 5
        );


    const marcoNovo =
        Math.floor(
            nivelNovo / 5
        );


    const novosMarcos =
        marcoNovo -
        marcoAnterior;


    if (
        novosMarcos <= 0
    ) {
        return;
    }


    xpBrasao +=
        novosMarcos * 500;


    marcosBrasaoRecebidos +=
        novosMarcos;

}


// ==========================================
// ESTÁGIO DO BRASÃO
// ==========================================

function obterEstagioBrasao() {

    let estagio =
        estagiosBrasao[0];


    for (
        const candidato
        of estagiosBrasao
    ) {

        if (
            xpBrasao >=
            candidato.xp
        ) {

            estagio =
                candidato;

        }

    }


    return estagio;

}


// ==========================================
// ATUALIZAR BRASÃO
// ==========================================

function atualizarBrasao() {

    const estagio =
        obterEstagioBrasao();


    const emblema =
        document.getElementById(
            "affinity-emblem"
        );


    const stageFront =
        document.getElementById(
            "badge-stage"
        );


    const stageName =
        document.getElementById(
            "badge-stage-name"
        );


    const xpText =
        document.getElementById(
            "badge-xp-text"
        );


    const xpProgress =
        document.getElementById(
            "badge-xp-progress"
        );


    const nextStage =
        document.getElementById(
            "badge-next-stage"
        );


    const remaining =
        document.getElementById(
            "badge-xp-remaining"
        );


    // --------------------------------------
    // FRENTE
    // --------------------------------------

    if (emblema) {

        emblema.style.transform =
            `scale(${estagio.tamanho})`;


        // O CSS já recebe a cor da afinidade
        // através da variável --element-main.
        emblema.style.textShadow =
            `0 0 ${8 * estagio.brilho}px var(--element-main),
             0 0 ${18 * estagio.brilho}px var(--element-main),
             0 0 ${30 * estagio.brilho}px var(--element-light)`;


        emblema.dataset.brasao =
            estagio.nome;


        emblema.title =
            `Brasão ${estagio.nome} — ${xpBrasao.toLocaleString("pt-BR")} XP`;

    }


    if (stageFront) {

        stageFront.textContent =
            `BRASÃO ${estagio.nome}`;

    }


    // --------------------------------------
    // VERSO
    // --------------------------------------

    if (stageName) {

        stageName.textContent =
            estagio.nome;

    }


    const indice =
        estagiosBrasao.indexOf(
            estagio
        );


    const proximo =
        estagiosBrasao[
            indice + 1
        ];


    if (proximo) {

        const xpAtual =
            estagio.xp;


        const xpProximo =
            proximo.xp;


        const distancia =
            xpProximo -
            xpAtual;


        const progresso =
            Math.max(
                0,
                Math.min(
                    100,
                    (
                        (xpBrasao -
                            xpAtual) /
                        distancia
                    ) * 100
                )
            );


        if (xpText) {

            xpText.textContent =
                `${xpBrasao.toLocaleString("pt-BR")} / ${xpProximo.toLocaleString("pt-BR")} XP`;

        }


        if (xpProgress) {

            xpProgress.style.width =
                `${progresso}%`;

        }


        if (nextStage) {

            nextStage.textContent =
                proximo.nome;

        }


        if (remaining) {

            const falta =
                Math.max(
                    0,
                    xpProximo -
                    xpBrasao
                );


            remaining.textContent =
                `${falta.toLocaleString("pt-BR")} XP restantes`;

        }

    } else {

        if (xpText) {

            xpText.textContent =
                `${xpBrasao.toLocaleString("pt-BR")} XP`;

        }


        if (xpProgress) {

            xpProgress.style.width =
                "100%";

        }


        if (nextStage) {

            nextStage.textContent =
                "MÁXIMO";

        }


        if (remaining) {

            remaining.textContent =
                "Brasão EXTRA alcançado";

        }

    }

}


// ==========================================
// XP DO BRASÃO — MODO MESTRE
// ==========================================

function adicionarXPDoBrasao() {

    const input =
        document.getElementById(
            "xp-brasao-amount"
        );


    if (!input) {
        return;
    }


    const quantidade =
        Number(input.value);


    if (
        !Number.isFinite(
            quantidade
        ) ||
        quantidade <= 0
    ) {
        return;
    }


    xpBrasao +=
        Math.floor(
            quantidade
        );


    atualizarBrasao();

    salvarDados();


    input.value = "";

}


function removerXPDoBrasao() {

    const input =
        document.getElementById(
            "xp-brasao-amount"
        );


    if (!input) {
        return;
    }


    const quantidade =
        Number(input.value);


    if (
        !Number.isFinite(
            quantidade
        ) ||
        quantidade <= 0
    ) {
        return;
    }


    xpBrasao -=
        Math.floor(
            quantidade
        );


    xpBrasao =
        Math.max(
            0,
            xpBrasao
        );


    atualizarBrasao();

    salvarDados();


    input.value = "";

}


// ==========================================
// ⭐ MODO MESTRE
// ==========================================

function alternarModoMestre() {

    const controles =
        document.querySelector(
            ".master-controls"
        );


    if (!controles) {

        console.error(
            "Não encontrei .master-controls"
        );

        return;

    }


    controles.classList.toggle(
        "active"
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarDados();


// Aplica as cores salvas
// antes de atualizar a interface.

atualizarCores();


const dadosRacaInicial =
    racas[racaAtual];


if (dadosRacaInicial) {

    const raceElement =
        document.getElementById(
            "character-race"
        );


    if (raceElement) {

        raceElement.textContent =
            racaAtual;

    }

}


atualizarNome();

atualizarClasse();

atualizarAfinidade();

atualizarRecursos();

atualizarAtributos();

atualizarXP();

atualizarBrasao();


// ==========================================
// GARANTIA DOS MARCOS
// ==========================================

const marcosEsperados =
    Math.floor(
        nivel / 5
    );


if (
    marcosBrasaoRecebidos <
    marcosEsperados
) {

    const diferenca =
        marcosEsperados -
        marcosBrasaoRecebidos;


    xpBrasao +=
        diferenca * 500;


    marcosBrasaoRecebidos =
        marcosEsperados;


    atualizarBrasao();

    salvarDados();

}
