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
        int: 15
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
        int: 15
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
        int: 16
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
        int: 10
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
        int: 6
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
// XP E NÍVEL
// ==========================

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


// ==========================
// SELETOR DE RAÇA
// ==========================

const seletorRaca = document.getElementById("race-select");

seletorRaca.addEventListener("change", function () {

    const racaSelecionada = racas[this.value];

    hpAtual = racaSelecionada.hp;
    mpAtual = racaSelecionada.mp;
    estAtual = racaSelecionada.est;
    sanidadeAtual = racaSelecionada.sanidade;

    atualizarRecursos();

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
// RECURSOS
// ==========================

function atualizarRecursos() {

    const raca = racas[seletorRaca.value];

    document.getElementById("stat-hp").textContent =
        hpAtual + " / " + raca.hp;

    document.getElementById("stat-mp").textContent =
        mpAtual + " / " + raca.mp;

    document.getElementById("stat-est").textContent =
        estAtual + " / " + raca.est;

    document.getElementById("stat-sanidade").textContent =
        sanidadeAtual + " / " + raca.sanidade;
}


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

    atualizarRecursos();
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

    atualizarRecursos();
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

    atualizarRecursos();
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

    atualizarRecursos();
}


// ==========================
// XP
// ==========================

function atualizarXP() {

    const xpNecessario = xpPorNivel[nivelAtual] || 999999;

    document.getElementById("xp-text").textContent =
        xpAtual + " XP";

    const porcentagem =
        Math.min((xpAtual / xpNecessario) * 100, 100);

    document.getElementById("xp-progress").style.width =
        porcentagem + "%";
}


// ==========================
// SUBIR DE NÍVEL
// ==========================

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


// ==========================
// ADICIONAR XP
// ==========================

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


// ==========================
// REMOVER XP
// ==========================

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


// ==========================
// INICIALIZAÇÃO
// ==========================

atualizarRecursos();
atualizarXP();
