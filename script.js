// ==========================================
// RPG CHARACTER CARDS
// ==========================================

// ---------- CARTA / FLIP ----------

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


// ---------- DADOS DAS RAÇAS ----------

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


// ---------- AFINIDADES ----------

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


// ---------- ESTÁGIOS DOS BRASÕES ----------
//
// O valor representa o XP TOTAL necessário
// para alcançar aquele estágio.

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
        nome: "EXTRA",
        xp: 50000,
        tamanho: 1.8,
        brilho: 4
    }
];


// ---------- ESTADO DO PERSONAGEM ----------

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


// ---------- XP DO BRASÃO ----------

let xpBrasao = 0;

// Quantos marcos de nível já foram contabilizados.
// Exemplo:
// nível 5  = 1 marco
// nível 10 = 2 marcos
// nível 15 = 3 marcos

let marcosBrasaoRecebidos = 0;


// ---------- ATRIBUTOS ----------

let atributos = {
    atk: 4,
    atkMgc: 4,
    def: 8,
    res: 8,
    agi: 8,
    int: 15
};


// ---------- SALVAMENTO ----------

const STORAGE_KEY = "rpg_character_card";

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


// ---------- CARREGAMENTO ----------

function carregarDados() {
    const salvo = localStorage.getItem(STORAGE_KEY);

    if (!salvo) {
        return;
    }

    try {
        const dados = JSON.parse(salvo);

        if (typeof dados.nomeAtual === "string") {
            nomeAtual = dados.nomeAtual;
        }

        if (racas[dados.racaAtual]) {
            racaAtual = dados.racaAtual;
        }

        if (typeof dados.classeAtual === "string") {
            classeAtual = dados.classeAtual;
        }

        if (afinidades[dados.afinidadeAtual]) {
            afinidadeAtual = dados.afinidadeAtual;
        }

        if (typeof dados.hp === "number") hp = dados.hp;
        if (typeof dados.mp === "number") mp = dados.mp;
        if (typeof dados.est === "number") est = dados.est;
        if (typeof dados.sanidade === "number") {
            sanidade = dados.sanidade;
        }

        if (typeof dados.xp === "number") xp = dados.xp;
        if (typeof dados.nivel === "number") nivel = dados.nivel;
        if (typeof dados.pontosAtributo === "number") {
            pontosAtributo = dados.pontosAtributo;
        }

        if (typeof dados.xpBrasao === "number") {
            xpBrasao = dados.xpBrasao;
        }

        if (typeof dados.marcosBrasaoRecebidos === "number") {
            marcosBrasaoRecebidos = dados.marcosBrasaoRecebidos;
        }

        if (dados.atributos) {
            atributos = {
                ...atributos,
                ...dados.atributos
            };
        }

    } catch (erro) {
        console.error(
            "Não foi possível carregar os dados:",
            erro
        );
    }
}


// ---------- ELEMENTOS DA INTERFACE ----------

const nameInput =
    document.getElementById("name-input");

const raceSelect =
    document.getElementById("race-select");

const classSelect =
    document.getElementById("class-select");

const affinitySelect =
    document.getElementById("affinity-select");


// ---------- NOME ----------

function atualizarNome() {
    const elemento =
        document.getElementById("character-name");

    if (elemento) {
        elemento.textContent =
            nomeAtual || "Nome do Personagem";
    }

    if (nameInput) {
        nameInput.value =
            nomeAtual === "Nome do Personagem"
                ? ""
                : nomeAtual;
    }
}

if (nameInput) {
    nameInput.addEventListener("input", function () {
        nomeAtual = this.value.trim();

        atualizarNome();
        salvarDados();
    });
}


// ---------- RAÇA ----------

function atualizarRaca() {
    const elemento =
        document.getElementById("character-race");

    if (elemento) {
        elemento.textContent = racaAtual;
    }

    if (raceSelect) {
        raceSelect.value = racaAtual;
    }

    atualizarAtributos();

    const dadosRaca = racas[racaAtual];

    if (dadosRaca) {
        hp = dadosRaca.hp;
        mp = dadosRaca.mp;
        est = dadosRaca.est;
        sanidade = dadosRaca.sanidade;
    }

    atualizarRecursos();
    salvarDados();
}

if (raceSelect) {
    raceSelect.addEventListener("change", function () {
        racaAtual = this.value;

        atualizarRaca();
    });
}


// ---------- CLASSE ----------

function atualizarClasse() {
    const elemento =
        document.getElementById("character-class");

    if (elemento) {
        elemento.textContent = classeAtual;
    }

    if (classSelect) {
        classSelect.value = classeAtual;
    }
}

if (classSelect) {
    classSelect.addEventListener("change", function () {
        classeAtual = this.value;

        atualizarClasse();
        salvarDados();
    });
}


// ---------- AFINIDADE ----------

function atualizarAfinidade() {
    const dados =
        afinidades[afinidadeAtual];

    if (!dados) {
        return;
    }

    const emblema =
        document.getElementById("affinity-emblem");

    const nome =
        document.getElementById("affinity-name");

    if (emblema) {
        emblema.textContent = dados.simbolo;
    }

    if (nome) {
        nome.textContent = dados.nome;
    }

    if (affinitySelect) {
        affinitySelect.value = afinidadeAtual;
    }
}

if (affinitySelect) {
    affinitySelect.addEventListener("change", function () {
        afinidadeAtual = this.value;

        atualizarAfinidade();
        salvarDados();
    });
}


// ---------- RECURSOS ----------

function atualizarRecursos() {
    const hpElement =
        document.getElementById("stat-hp");

    const mpElement =
        document.getElementById("stat-mp");

    const estElement =
        document.getElementById("stat-est");

    const sanidadeElement =
        document.getElementById("stat-sanidade");

    const dadosRaca =
        racas[racaAtual];

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


// ---------- HP ----------

function alterarHP(valor) {
    const max =
        racas[racaAtual].hp;

    hp += valor;

    hp = Math.max(
        0,
        Math.min(hp, max)
    );

    atualizarRecursos();
    salvarDados();
}


// ---------- MP ----------

function alterarMP(valor) {
    const max =
        racas[racaAtual].mp;

    mp += valor;

    mp = Math.max(
        0,
        Math.min(mp, max)
    );

    atualizarRecursos();
    salvarDados();
}


// ---------- EST ----------

function alterarEST(valor) {
    const max =
        racas[racaAtual].est;

    est += valor;

    est = Math.max(
        0,
        Math.min(est, max)
    );

    atualizarRecursos();
    salvarDados();
}


// ---------- SANIDADE ----------

function alterarSanidade(valor) {
    const max =
        racas[racaAtual].sanidade;

    sanidade += valor;

    sanidade = Math.max(
        0,
        Math.min(sanidade, max)
    );

    atualizarRecursos();
    salvarDados();
}


// ---------- ATRIBUTOS ----------

function atualizarAtributos() {
    document.getElementById("stat-atk").textContent =
        atributos.atk;

    document.getElementById("stat-atkMgc").textContent =
        atributos.atkMgc;

    document.getElementById("stat-def").textContent =
        atributos.def;

    document.getElementById("stat-res").textContent =
        atributos.res;

    document.getElementById("stat-agi").textContent =
        atributos.agi;

    document.getElementById("stat-int").textContent =
        atributos.int;

    const pontos =
        document.getElementById("attribute-points");

    if (pontos) {
        pontos.textContent =
            pontosAtributo;
    }

    atualizarBotoesAtributo();
}


// ---------- BOTÕES DE ATRIBUTO ----------

function atualizarBotoesAtributo() {
    const botoes =
        document.querySelectorAll(".attribute-plus");

    botoes.forEach(function (botao) {
        botao.style.display =
            pontosAtributo > 0
                ? "block"
                : "none";
    });

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


// ---------- AUMENTAR ATRIBUTO ----------

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
    salvarDados();
}


// ---------- XP DO PERSONAGEM ----------
//
// Até o nível 10 usamos a progressão original.
// A partir do nível 10:
// 10 → 11 = 1200
// 11 → 12 = 1350
// 12 → 13 = 1500
// 13 → 14 = 1650
// etc.

function xpNecessarioParaProximoNivel() {

    if (nivel < 2) {
        return 100;
    }

    if (nivel === 2) {
        return 150;
    }

    if (nivel === 3) {
        return 225;
    }

    if (nivel === 4) {
        return 325;
    }

    if (nivel === 5) {
        return 450;
    }

    if (nivel === 6) {
        return 600;
    }

    if (nivel === 7) {
        return 775;
    }

    if (nivel === 8) {
        return 975;
    }

    if (nivel === 9) {
        return 1200;
    }

    // A partir do nível 10
    return 1200 + ((nivel - 10) * 150);
}


// ---------- XP / BARRA ----------

function atualizarXP() {
    const xpNecessario =
        xpNecessarioParaProximoNivel();

    const xpAnterior =
        nivel === 1
            ? 0
            : xpParaNivel(nivel);

    const xpNoNivel =
        xp - xpAnterior;

    const progresso =
        Math.max(
            0,
            Math.min(
                100,
                (xpNoNivel / xpNecessario) * 100
            )
        );

    const xpText =
        document.getElementById("xp-text");

    const xpProgress =
        document.getElementById("xp-progress");

    if (xpText) {
        xpText.textContent =
            `${xp} XP`;
    }

    if (xpProgress) {
        xpProgress.style.width =
            `${progresso}%`;
    }

    document
        .querySelectorAll(".level")
        .forEach(function (elemento) {
            elemento.textContent =
                `LV. ${String(nivel).padStart(2, "0")}`;
        });
}


// ---------- XP ACUMULADO NECESSÁRIO PARA UM NÍVEL ----------

function xpParaNivel(nivelAlvo) {

    if (nivelAlvo <= 1) {
        return 0;
    }

    let total = 0;

    for (
        let nivelAtual = 1;
        nivelAtual < nivelAlvo;
        nivelAtual++
    ) {
        total += xpNecessarioPorNivel(nivelAtual);
    }

    return total;
}


// ---------- XP NECESSÁRIO USANDO UM NÍVEL ESPECÍFICO ----------

function xpNecessarioPorNivel(nivelAtual) {

    if (nivelAtual === 1) return 100;
    if (nivelAtual === 2) return 150;
    if (nivelAtual === 3) return 225;
    if (nivelAtual === 4) return 325;
    if (nivelAtual === 5) return 450;
    if (nivelAtual === 6) return 600;
    if (nivelAtual === 7) return 775;
    if (nivelAtual === 8) return 975;
    if (nivelAtual === 9) return 1200;

    // 10 → 11 = 1200
    // 11 → 12 = 1350
    // 12 → 13 = 1500
    // ...

    return 1200 + ((nivelAtual - 10) * 150);
}


// ---------- ADICIONAR XP ----------

function adicionarXP() {

    const input =
        document.getElementById("xp-amount");

    if (!input) {
        return;
    }

    const quantidade =
        Number(input.value);

    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {
        return;
    }

    const nivelAnterior = nivel;

    xp += Math.floor(quantidade);

    // Sobe quantos níveis forem necessários.
    while (
        xp >= xpParaNivel(nivel + 1)
    ) {
        nivel++;

        // +3 pontos por nível
        pontosAtributo += 3;
    }

    // Verifica todos os marcos de 5 níveis
    // alcançados durante esse ganho de XP.
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


// ---------- REMOVER XP ----------

function removerXP() {

    const input =
        document.getElementById("xp-amount");

    if (!input) {
        return;
    }

    const quantidade =
        Number(input.value);

    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {
        return;
    }

    xp -= Math.floor(quantidade);

    xp = Math.max(0, xp);

    // Recalcula o nível de acordo com o XP.
    const nivelAnterior = nivel;

    nivel = 1;

    while (
        xp >= xpParaNivel(nivel + 1)
    ) {
        nivel++;
    }

    // Se o XP foi removido e o personagem
    // voltou de nível, recalculamos os pontos
    // de atributo disponíveis.
    const niveisGanhos =
        Math.max(0, nivel - 1);

    pontosAtributo =
        calcularPontosDisponiveis(niveisGanhos);

    atualizarXP();
    atualizarAtributos();

    input.value = "";

    salvarDados();
}


// ---------- PONTOS DE ATRIBUTO DISPONÍVEIS ----------

function calcularPontosDisponiveis(
    niveisGanhos
) {
    const pontosGanhos =
        niveisGanhos * 3;

    let pontosDistribuidos = 0;

    for (const atributo in atributos) {
        // Aqui usamos os valores atuais.
        // Atributos raciais são recalculados
        // quando a raça muda, então essa função
        // apenas preserva o sistema de pontos.
    }

    return Math.max(
        0,
        pontosGanhos - pontosDistribuidos
    );
}


// ==================================================
//                 XP DOS BRASÕES
// ==================================================


// ---------- MARCOS DE NÍVEL ----------
//
// Cada múltiplo de 5 concede +500 XP de Brasão.

function atualizarMarcosBrasao(
    nivelAnterior,
    nivelNovo
) {

    const marcoAnterior =
        Math.floor(nivelAnterior / 5);

    const marcoNovo =
        Math.floor(nivelNovo / 5);

    const novosMarcos =
        marcoNovo - marcoAnterior;

    if (novosMarcos <= 0) {
        return;
    }

    xpBrasao += novosMarcos * 500;

    marcosBrasaoRecebidos += novosMarcos;
}


// ---------- ADICIONAR XP DE BRASÃO ----------

function adicionarXPBrasao(quantidade) {

    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {
        return;
    }

    xpBrasao += Math.floor(quantidade);

    atualizarBrasao();
    salvarDados();
}


// ---------- REMOVER XP DE BRASÃO ----------

function removerXPBrasao(quantidade) {

    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {
        return;
    }

    xpBrasao -= Math.floor(quantidade);

    xpBrasao = Math.max(
        0,
        xpBrasao
    );

    atualizarBrasao();
    salvarDados();
}


// ---------- ESTÁGIO ATUAL DO BRASÃO ----------

function obterEstagioBrasao() {

    let estagio =
        estagiosBrasao[0];

    for (
        const candidato of estagiosBrasao
    ) {
        if (xpBrasao >= candidato.xp) {
            estagio = candidato;
        }
    }

    return estagio;
}


// ---------- ATUALIZAR BRASÃO ----------

function atualizarBrasao() {

    const estagio =
        obterEstagioBrasao();

    const emblema =
        document.getElementById(
            "affinity-emblem"
        );

    if (!emblema) {
        return;
    }

    // O tamanho e o brilho aumentam
    // conforme o estágio.

    emblema.style.transform =
        `scale(${estagio.tamanho})`;

    emblema.style.textShadow =
        `0 0 ${8 * estagio.brilho}px rgba(168, 85, 247, 0.9),
         0 0 ${18 * estagio.brilho}px rgba(124, 58, 237, 0.7),
         0 0 ${30 * estagio.brilho}px rgba(192, 132, 252, 0.45)`;

    emblema.dataset.brasao =
        estagio.nome;

    // Mostra o estágio no título do elemento.
    emblema.title =
        `Brasão ${estagio.nome} — ${xpBrasao.toLocaleString("pt-BR")} XP`;
}


// ---------- ALTERAR XP DO BRASÃO PELO MODO MESTRE ----------
//
// Essas funções ficam disponíveis para o HTML
// caso adicionemos os controles depois.

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

    adicionarXPBrasao(quantidade);

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

    removerXPBrasao(quantidade);

    input.value = "";
}


// ---------- ATUALIZAR ATRIBUTOS DA RAÇA ----------

function atualizarAtributosPorRaca() {

    const dados =
        racas[racaAtual];

    if (!dados) {
        return;
    }

    atributos = {
        atk: dados.atk,
        atkMgc: dados.atkMgc,
        def: dados.def,
        res: dados.res,
        agi: dados.agi,
        int: dados.int
    };

    atualizarAtributos();
}


// Mantemos o nome antigo da função para
// compatibilidade com o restante do código.
function atualizarAtributosIniciais() {
    atualizarAtributosPorRaca();
}


// ---------- INICIALIZAÇÃO ----------

carregarDados();

atualizarNome();
atualizarRaca();
atualizarClasse();
atualizarAfinidade();
atualizarRecursos();
atualizarAtributos();
atualizarXP();
atualizarBrasao();


// ---------- GARANTIA DOS MARCOS DO BRASÃO ----------
//
// Caso um personagem antigo já esteja, por exemplo,
// no nível 20 antes desta atualização, garantimos
// que os 4 marcos correspondentes sejam aplicados.

const marcosEsperados =
    Math.floor(nivel / 5);

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
