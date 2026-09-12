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

        passiva: "Frenesi. Pode ser ativado pelo jogador por 2 turnos. +5% ATK. Ao ativar, HP cai para 20% do máximo. Ao terminar, -5 AGI."
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

        passiva: "Frenesi. Ativado automaticamente com 20% de HP ou menos. +10% ATK por 3 turnos. Ataca todos próximos e depois fica incapacitada pelo restante da luta."
    }

};
const seletorRaca = document.getElementById("race-select");

seletorRaca.addEventListener("change", function () {

    const racaSelecionada = racas[this.value];

    document.getElementById("stat-atk").textContent = racaSelecionada.atk;
    document.getElementById("stat-def").textContent = racaSelecionada.def;
    document.getElementById("stat-agi").textContent = racaSelecionada.agi;
    document.getElementById("stat-int").textContent = racaSelecionada.int;
    document.getElementById("stat-hp").textContent = racaSelecionada.hp;
    document.getElementById("stat-mp").textContent = racaSelecionada.mp;
    document.getElementById("stat-est").textContent = racaSelecionada.est;
    document.getElementById("stat-sanidade").textContent = racaSelecionada.sanidade;
    document.getElementById("stat-atkMgc").textContent = racaSelecionada.atkMgc;
    document.getElementById("stat-res").textContent = racaSelecionada.res;
});
function alternarModoMestre() {
let hpAtual = 25;
let hpMaximo = 25;

function alterarHP(valor) {

    hpAtual += valor;

    if (hpAtual < 0) {
        hpAtual = 0;
    }

    if (hpAtual > hpMaximo) {
        hpAtual = hpMaximo;
    }

    document.getElementById("stat-hp").textContent =
        hpAtual + " / " + hpMaximo;
}
    const painel = document.querySelector(".master-controls");

    if (painel.style.display === "block") {
        painel.style.display = "none";
    } else {
        painel.style.display = "block";
    }

}
