// =========================================
// CARD — GIRAR
// =========================================

const card = document.querySelector(".character-card");

card.addEventListener("click", function (evento) {

    // Impede que controles façam o card girar
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
// DADOS DO PERSONAGEM
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
// ESTADO ATUAL
// =========================================

let racaAtual = "Humano";

let hpAtual = racas[racaAtual].hp;
let mpAtual = racas[racaAtual].mp;
let estAtual = racas[racaAtual].est;
let sanidadeAtual = racas[racaAtual].sanidade;

let xpAtual = 0;
let nivelAtual = 1;


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

    const xpNecessario = xpPorNivel[nivelAtual];

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

    const campo = document.getElementById("xp-amount");

    const quantidade = Number(campo.value);

    if (!quantidade || quantidade <= 0) {
        return;
    }

    xpAtual += quantidade;

    verificarNivel();

    campo.value = "";

    atualizarXP();
}


// =========================================
// REMOVER XP
// =========================================

function removerXP() {

    const campo = document.getElementById("xp-amount");

    const quantidade = Number(campo.value);

    if (!quantidade || quantidade <= 0) {
        return;
    }

    xpAtual = Math.max(
        0,
        xpAtual - quantidade
    );

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

        console.log(
            `Personagem subiu para o nível ${nivelAtual}!`
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

atualizarXP();
