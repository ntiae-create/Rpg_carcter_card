// =========================================
// CARD — GIRAR
// =========================================

const card = document.querySelector(".character-card");

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


// =========================================
// DADOS DAS RAÇAS
// =========================================

const racas = {

    Humano: {
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

    Elfo: {
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

    Besta: {
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


// =========================================
// ESTADO DO PERSONAGEM
// =========================================

let racaAtual = "Humano";

let hpAtual = racas[racaAtual].hp;
let mpAtual = racas[racaAtual].mp;
let estAtual = racas[racaAtual].est;
let sanidadeAtual = racas[racaAtual].sanidade;

let xpAtual = 0;
let nivelAtual = 1;


// =========================================
// PONTOS DE ATRIBUTO
// =========================================

let pontosAtributo = 0;

const atributos = {

    atk: 0,
    atkMgc: 0,
    def: 0,
    res: 0,
    agi: 0,
    int: 0

};


// =========================================
// ATUALIZAR RECURSOS
// =========================================

function atualizarRecursos() {

    document.getElementById("stat-hp").textContent =
        `${hpAtual} / ${racas[racaAtual].hp}`;

    document.getElementById("stat-mp").textContent =
        `${mpAtual} / ${racas[racaAtual].mp}`;

    document.getElementById("stat-est").textContent =
        `${estAtual} / ${racas[racaAtual].est}`;

    document.getElementById("stat-sanidade").textContent =
        `${sanidadeAtual} / ${racas[racaAtual].sanidade}`;
}


// =========================================
// ATUALIZAR ATRIBUTOS
// =========================================

function atualizarAtributos() {

    const base = racas[racaAtual];

    document.getElementById("stat-atk").textContent =
        base.atk + atributos.atk;

    document.getElementById("stat-atkMgc").textContent =
        base.atkMgc + atributos.atkMgc;

    document.getElementById("stat-def").textContent =
        base.def + atributos.def;

    document.getElementById("stat-res").textContent =
        base.res + atributos.res;

    document.getElementById("stat-agi").textContent =
        base.agi + atributos.agi;

    document.getElementById("stat-int").textContent =
        base.int + atributos.int;

    document.getElementById("attribute-points").textContent =
        pontosAtributo;

    atualizarBotoesAtributo();
}


// =========================================
// BOTÕES +
// =========================================

function atualizarBotoesAtributo() {

    const botoes =
        document.querySelectorAll(".attribute-plus");

    botoes.forEach(botao => {

        if (pontosAtributo > 0) {

            botao.style.display = "block";

        } else {

            botao.style.display = "none";

        }

    });


    const caixa =
        document.getElementById("attribute-points-box");

    if (pontosAtributo > 0) {

        caixa.classList.add("points-available");

    } else {

        caixa.classList.remove("points-available");

    }
}


// =========================================
// AUMENTAR ATRIBUTO
// =========================================

function aumentarAtributo(atributo) {

    if (pontosAtributo <= 0) {
        return;
    }

    if (!(atributo in atributos)) {
        return;
    }

    atributos[atributo]++;

    pontosAtributo--;

    atualizarAtributos();
}


// =========================================
// HP
// =========================================

function alterarHP(valor) {

    hpAtual += valor;

    hpAtual = Math.max(
        0,
        Math.min(hpAtual, racas[racaAtual].hp)
    );

    atualizarRecursos();
}


// =========================================
// MP
// =========================================

function alterarMP(valor) {

    mpAtual += valor;

    mpAtual = Math.max(
        0,
        Math.min(mpAtual, racas[racaAtual].mp)
    );

    atualizarRecursos();
}


// =========================================
// EST
// =========================================

function alterarEST(valor) {

    estAtual += valor;

    estAtual = Math.max(
        0,
        Math.min(estAtual, racas[racaAtual].est)
    );

    atualizarRecursos();
}


// =========================================
// SANIDADE
// =========================================

function alterarSanidade(valor) {

    sanidadeAtual += valor;

    sanidadeAtual = Math.max(
        0,
        Math.min(sanidadeAtual, racas[racaAtual].sanidade)
    );

    atualizarRecursos();
}


// =========================================
// XP POR NÍVEL
// =========================================

const xpPorNivel = {

    1: 100,
    2: 150,
    3: 225,
    4: 325,
    5: 450,
    6: 600,
    7: 775,
    8: 975,
    9: 1200,
    10: 1500

};


// =========================================
// ATUALIZAR XP
// =========================================

function atualizarXP() {

    const xpNecessario =
        xpPorNivel[nivelAtual];

    const porcentagem =
        xpNecessario
            ? (xpAtual / xpNecessario) * 100
            : 100;

    document.getElementById("xp-text").textContent =
        `${xpAtual} XP`;

    document.getElementById("xp-progress").style.width =
        `${Math.min(porcentagem, 100)}%`;

    document.querySelectorAll(".level").forEach(elemento => {

        elemento.textContent =
            `LV. ${String(nivelAtual).padStart(2, "0")}`;

    });
}


// =========================================
// ADICIONAR XP
// =========================================

function adicionarXP() {

    const campo =
        document.getElementById("xp-amount");

    const quantidade =
        Number(campo.value);

    if (!quantidade || quantidade <= 0) {
        return;
    }

    xpAtual += quantidade;

    verificarNivel();

    campo.value = "";

    atualizarXP();
    atualizarAtributos();
}


// =========================================
// REMOVER XP
// =========================================

function removerXP() {

    const campo =
        document.getElementById("xp-amount");

    const quantidade =
        Number(campo.value);

    if (!quantidade || quantidade <= 0) {
        return;
    }

    xpAtual =
        Math.max(0, xpAtual - quantidade);

    atualizarXP();

    campo.value = "";
}


// =========================================
// VERIFICAR NÍVEL
// =========================================

function verificarNivel() {

    while (
        xpPorNivel[nivelAtual] &&
        xpAtual >= xpPorNivel[nivelAtual]
    ) {

        xpAtual -= xpPorNivel[nivelAtual];

        nivelAtual++;

        // Cada nível concede +3 pontos
        pontosAtributo += 3;

        console.log(
            `Nível ${nivelAtual}! +3 pontos de atributo.`
        );
    }
}


// =========================================
// MODO MESTRE
// =========================================

function alternarModoMestre() {

    const controles =
        document.querySelector(".master-controls");

    if (!controles) {
        return;
    }

    if (controles.style.display === "block") {

        controles.style.display = "none";

    } else {

        controles.style.display = "block";

    }
}


// =========================================
// INICIALIZAÇÃO
// =========================================

atualizarRecursos();

atualizarAtributos();

atualizarXP();
