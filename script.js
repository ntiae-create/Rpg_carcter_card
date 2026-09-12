const racas = {

    humano: {
        nome: "Humano",
        hp: 25,
        mp: 15,
        est: 30,
        sanidade: 100,
        atk: 4,
        atkMgc: 4,
        def: 8,
        res: 8,
        agi: 8,
        int: 15,
        passiva: "Raça adaptativa. Recebe bônus progressivo de XP enquanto estiver em grupo."
    },

    meioElfo: {
        nome: "Meio-elfo",
        hp: 23,
        mp: 22,
        est: 25,
        sanidade: 100,
        atk: 3,
        atkMgc: 7,
        def: 6,
        res: 9,
        agi: 10,
        int: 15,
        passiva: "Harmonia. +5% ATK MGC de Vento. Projéteis mágicos possuem 40% de chance de atordoar por 1 turno."
    },

    elfo: {
        nome: "Elfo",
        hp: 22,
        mp: 25,
        est: 25,
        sanidade: 100,
        atk: 3,
        atkMgc: 8,
        def: 5,
        res: 9,
        agi: 12,
        int: 16,
        passiva: "Orgulho Élfico. +10% ATK MGC de Vento."
    },

    semiBesta: {
        nome: "Semi-besta",
        hp: 30,
        mp: 10,
        est: 35,
        sanidade: 90,
        atk: 9,
        atkMgc: 3,
        def: 7,
        res: 6,
        agi: 10,
        int: 10,
        passiva: "Frenesi. Pode ser ativado pelo jogador por 2 turnos. +5% ATK."
    },

    besta: {
        nome: "Besta",
        hp: 35,
        mp: 8,
        est: 40,
        sanidade: 80,
        atk: 11,
        atkMgc: 2,
        def: 6,
        res: 5,
        agi: 9,
        int: 6,
        passiva: "Frenesi. Ativado automaticamente com 20% de HP ou menos."
    }

};


// ==========================
// VALORES ATUAIS
// ==========================

let hpAtual = racas.humano.hp;
let mpAtual = racas.humano.mp;
let estAtual = racas.humano.est;
let sanidadeAtual = racas.humano.sanidade;


// ==========================
// ATUALIZAR RAÇA
// ==========================

const seletorRaca = document.getElementById("race-select");

seletorRaca.addEventListener("change", function () {

    const racaSelecionada = racas[this.value];

    hpAtual = racaSelecionada.hp;
    mpAtual = racaSelecionada.mp;
    estAtual = racaSelecionada.est;
    sanidadeAtual = racaSelecionada.sanidade;

    document.getElementById("stat-hp").textContent =
        hpAtual + " / " + racaSelecionada.hp;

    document.getElementById("stat-mp").textContent =
        mpAtual + " / " + racaSelecionada.mp;

    document.getElementById("stat-est").textContent =
        estAtual + " / " + racaSelecionada.est;

    document.getElementById("stat-sanidade").textContent =
        sanidadeAtual + " / " + racaSelecionada.sanidade;

    document.getElementById("stat-atk").textContent =
        racaSelecionada.atk;

    document.getElementById("stat-atkMgc").textContent =
        racaSelecionada.atkMgc;

    document.getElementById("stat-def").textContent =
        racaSelecionada.def;

    document.getElementById("stat-res").textContent =
        racaSelecionada.res;

    document.getElementById("stat-agi").textContent =
        racaSelecionada.agi;

    document.getElementById("stat-int").textContent =
        racaSelecionada.int;

});


// ==========================
// MODO MESTRE
// ==========================

function alternarModoMestre() {

    const painel = document.querySelector(".master-controls");

    if (painel.style.display === "block") {
        painel.style.display = "none";
    } else {
        painel.style.display = "block";
    }

}


// ==========================
// ALTERAR HP
// ==========================

function alterarHP(valor) {

    const raca = racas[seletorRaca.value];

    hpAtual += valor;

    if (hpAtual < 0) {
        hpAtual = 0;
    }

    if (hpAtual > raca.hp) {
        hpAtual = raca.hp;
    }

    document.getElementById("stat-hp").textContent =
        hpAtual + " / " + raca.hp;
}


// ==========================
// ALTERAR MP
// ==========================

function alterarMP(valor) {

    const raca = racas[seletorRaca.value];

    mpAtual += valor;

    if (mpAtual < 0) {
        mpAtual = 0;
    }

    if (mpAtual > raca.mp) {
        mpAtual = raca.mp;
    }

    document.getElementById("stat-mp").textContent =
        mpAtual + " / " + raca.mp;
}


// ==========================
// ALTERAR EST
// ==========================

function alterarEST(valor) {

    const raca = racas[seletorRaca.value];

    estAtual += valor;

    if (estAtual < 0) {
        estAtual = 0;
    }

    if (estAtual > raca.est) {
        estAtual = raca.est;
    }

    document.getElementById("stat-est").textContent =
        estAtual + " / " + raca.est;
}


// ==========================
// ALTERAR SANIDADE
// ==========================

function alterarSanidade(valor) {

    const raca = racas[seletorRaca.value];

    sanidadeAtual += valor;

    if (sanidadeAtual < 0) {
        sanidadeAtual = 0;
    }

    if (sanidadeAtual > raca.sanidade) {
        sanidadeAtual = raca.sanidade;
    }

    document.getElementById("stat-sanidade").textContent =
        sanidadeAtual + " / " + raca.sanidade;
}
  let xpAtual = 0;
let nivelAtual = 1;

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


function atualizarXP() {

    const xpNecessario = xpPorNivel[nivelAtual] || 999999;

    document.getElementById("xp-text").textContent =
        xpAtual + " XP";

    document.getElementById("xp-next").textContent =
        xpNecessario + " XP";

    const porcentagem =
        Math.min((xpAtual / xpNecessario) * 100, 100);

    document.getElementById("xp-progress").style.width =
        porcentagem + "%";
}


function atualizarNivel() {

    while (
        xpPorNivel[nivelAtual] &&
        xpAtual >= xpPorNivel[nivelAtual]
    ) {

        xpAtual -= xpPorNivel[nivelAtual];

        nivelAtual++;

    }

    atualizarXP();

    document.querySelector(".level").textContent =
        "LV. " + String(nivelAtual).padStart(2, "0");
}


function adicionarXP() {

    const campo = document.getElementById("xp-amount");
    const quantidade = Number(campo.value);

    if (quantidade <= 0) {
        return;
    }

    xpAtual += quantidade;

    campo.value = "";

    atualizarNivel();
}


function removerXP() {

    const campo = document.getElementById("xp-amount");
    const quantidade = Number(campo.value);

    if (quantidade <= 0) {
        return;
    }

    xpAtual -= quantidade;

    if (xpAtual < 0) {
        xpAtual = 0;
    }

    campo.value = "";

    atualizarXP();
}


atualizarXP();

    const campo = document.getElementById("xp-amount");
    const quantidade = Number(campo.value);

    if (quantidade <= 0) {
        return;
    }

    xpAtual -= quantidade;

    if (xpAtual < 0) {
        xpAtual = 0;
    }

    atualizarXP();

    campo.value = "";
}
