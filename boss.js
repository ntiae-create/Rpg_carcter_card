// =========================================================
// BOSS SYSTEM — Hræsvelgr · Skoll · Hati · MÓRDRAX
// =========================================================

const DADOS_BOSS = {
  hraesvelgr: {
    nome: "Hræsvelgr",
    nivel: 15,
    afinidade: "VENTO",
    classeAfinidade: "affinity-vento",
    imagem: "hraesvelgr.png",
    hpMax: 120,
    mpMax: 80,
    estMax: 50,
    atk: 8,
    def: 4,
    spdBase: 12,
    passiva: {
      nome: "Asas do Mundo",
      descricao: "A cada rodada, ganha +1 de Velocidade acumulável. Se a Vida cair abaixo de 40%, os ventos se enfurecem: todos os ataques ganham dano extra igual à metade da sua Velocidade.",
      estado: "Acumulando ventos..."
    },
    habilidades: [
      { id: "rajada", nome: "Rajada Cortante", custoMp: 15, custoEst: 0, dano: 10, efeito: "ignora 2 DEF" },
      { id: "tempestade", nome: "Tempestade Nascente", custoMp: 30, custoEst: 15, dano: 8, efeito: "todos -1 SPD" },
      { id: "mergulho", nome: "Queda do Céu", custoMp: 50, custoEst: 25, dano: 18, efeito: "×2 se enfurecido" }
    ]
  },

  skoll: {
    nome: "Skoll",
    nivel: 11,
    afinidade: "FOGO",
    classeAfinidade: "affinity-fogo",
    imagem: "skoll.png",
    hpMax: 100,
    mpMax: 60,
    estMax: 55,
    atk: 9,
    def: 3,
    spdBase: 10,
    passiva: {
      nome: "Fúria do Sol",
      descricao: "A cada rodada, acumula 1 Fogo. Com 3 Fogo, entra em Fúria: Ataque +4, mas recebe +2 de dano. Se a Vida cair abaixo de 30%, a Fúria é permanente.",
      estado: "Chamas crescentes..."
    },
    habilidades: [
      { id: "mordida_sol", nome: "Mordida Solar", custoMp: 12, custoEst: 8, dano: 12, efeito: "queima 2 rodadas" },
      { id: "labareda", nome: "Labareda Crescente", custoMp: 25, custoEst: 12, dano: 7, efeito: "todos os alvos" },
      { id: "explosao", nome: "Coroa Ardente", custoMp: 40, custoEst: 20, dano: 22, efeito: "consome Fogo acumulado" }
    ]
  },

  hati: {
    nome: "Hati",
    nivel: 11,
    afinidade: "TREVAS",
    classeAfinidade: "affinity-trevas",
    imagem: "hati.png",
    hpMax: 90,
    mpMax: 70,
    estMax: 50,
    atk: 11,
    def: 2,
    spdBase: 11,
    passiva: {
      nome: "Fome da Lua",
      descricao: "Cada dano causado cura 1 PV. Se um inimigo cair, ganha +2 ATK permanentemente. Abaixo de 40% de Vida, a fome aumenta: cura o dobro de dano causado.",
      estado: "A lua observa..."
    },
    habilidades: [
      { id: "garra_lua", nome: "Garra Penumbral", custoMp: 10, custoEst: 5, dano: 11, efeito: "cura igual ao dano" },
      { id: "sombra", nome: "Passo Sombrio", custoMp: 18, custoEst: 10, dano: 8, efeito: "não pode ser alvo na próxima rodada" },
      { id: "devorar", nome: "Devorar a Luz", custoMp: 35, custoEst: 22, dano: 18, efeito: "cura o dobro" }
    ]
  },

  mordrax: {
    nome: "Mórdrax",
    nivel: 12,
    afinidade: "TERRA",
    classeAfinidade: "affinity-terra",
    imagem: "mordrax.png",
    hpMax: 150,
    mpMax: 40,
    estMax: 70,
    atk: 10,
    def: 8,
    spdBase: 4,
    passiva: {
      nome: "Casca Profunda",
      descricao: "Recebe -2 de dano de todas as fontes (mínimo 1). Abaixo de 50% → Defesa dobra, Velocidade -50%. Abaixo de 25% → reflete 3 de dano ao atacante.",
      estado: "Adormecido sob a pedra..."
    },
    habilidades: [
      { id: "mao_rocha", nome: "Mão da Rocha", custoMp: 0, custoEst: 12, dano: 12, efeito: "alvo age por último" },
      { id: "fenda", nome: "Fenda Profunda", custoMp: 20, custoEst: 20, dano: 6, efeito: "todos -1 DEF permanente" },
      { id: "firmamento", nome: "Queda do Firmamento", custoMp: 35, custoEst: 40, dano: 25, efeito: "ignora 5 DEF; +15 se <25% Vida" }
    ]
  }
};

// =========================================================
// ESTADO DO BOSS
// =========================================================

let bossAtual = "mordrax";
let estado = {};
let rodada = 0;

function inicializarEstado(id) {
  const b = DADOS_BOSS[id];
  estado = {
    id,
    hp: b.hpMax,
    mp: b.mpMax,
    est: b.estMax,
    atk: b.atk,
    def: b.def,
    spd: b.spdBase,
    spdBase: b.spdBase,
    defBase: b.def,
    enfurecido: false,
    abatido: false,
    reflexo: false
  };
  rodada = 0;
}

// =========================================================
// RENDERIZAÇÃO
// =========================================================

function carregarBoss(id) {
  bossAtual = id;
  inicializarEstado(id);
  const b = DADOS_BOSS[id];
  const card = document.getElementById("boss-card");

  // Troca afinidade
  card.classList.remove("affinity-vento", "affinity-fogo", "affinity-trevas", "affinity-terra");
  card.classList.add(b.classeAfinidade);

  // Dados básicos
  document.getElementById("boss-name").textContent = b.nome;
  document.getElementById("boss-level").textContent = `NÍVEL ${b.nivel} · ${b.afinidade}`;
  document.getElementById("boss-affinity").textContent = b.afinidade;
  document.getElementById("boss-image").src = b.imagem;
  document.getElementById("boss-image").alt = b.nome;

  // Passiva
  document.getElementById("passive-name").textContent = b.passiva.nome;
  document.getElementById("passive-desc").textContent = b.passiva.descricao;
  document.getElementById("passive-state").textContent = b.passiva.estado;

  atualizarInterface();
  atualizarBotoesSeletor();
}

function atualizarInterface() {
  const b = DADOS_BOSS[estado.id];

  // Recursos
  document.getElementById("hp-text").textContent = `${estado.hp} / ${b.hpMax}`;
  document.getElementById("boss-hp").style.width = `${(estado.hp / b.hpMax) * 100}%`;

  document.getElementById("mp-text").textContent = `${estado.mp} / ${b.mpMax}`;
  document.getElementById("boss-mp").style.width = `${(estado.mp / b.mpMax) * 100}%`;

  document.getElementById("est-text").textContent = `${estado.est} / ${b.estMax}`;
  document.getElementById("boss-est").style.width = `${(estado.est / b.estMax) * 100}%`;

  // Atributos
  document.getElementById("boss-atk").textContent = estado.atk;
  document.getElementById("boss-def").textContent = estado.def;
  document.getElementById("boss-spd").textContent = estado.spd;

  // Estado da passiva
  const pctVida = estado.hp / b.hpMax;
  const estadoEl = document.getElementById("passive-state");
  const card = document.getElementById("boss-card");

  if (estado.id === "mordrax") {
    if (pctVida <= 0.25) {
      estadoEl.textContent = "A montanha desperta e reflete! (+3 dano ao atacante)";
      estadoEl.classList.add("furia");
      estado.reflexo = true;
    } else if (pctVida <= 0.5) {
      estadoEl.textContent = "Casca endurecida — Defesa dobrada!";
      estadoEl.classList.remove("furia");
      estado.reflexo = false;
    } else {
      estadoEl.textContent = b.passiva.estado;
      estadoEl.classList.remove("furia");
      estado.reflexo = false;
    }
  }
}

function atualizarBotoesSeletor() {
  document.querySelectorAll(".boss-selector button").forEach(btn => {
    btn.classList.toggle("ativo", btn.dataset.bossId === bossAtual);
  });
}

// =========================================================
// AÇÕES
// =========================================================

function receberDano(valorBruto) {
  const b = DADOS_BOSS[estado.id];
  let dano = valorBruto;

  // Redução de Mórdrax
  if (estado.id === "mordrax") {
    dano = Math.max(1, dano - 2);
  }

  estado.hp = Math.max(0, estado.hp - dano);

  // Reflexo de dano
  if (estado.reflexo) {
    console.log("💥 Reflexo: 3 de dano retornado ao atacante!");
  }

  // Fases de Mórdrax
  const pctVida = estado.hp / b.hpMax;
  if (estado.id === "mordrax" && !estado.abatido) {
    if (pctVida <= 0.5 && estado.def === estado.defBase) {
      estado.def = estado.defBase * 2;
      estado.spd = Math.floor(estado.spdBase / 2);
      console.log("⛰️ A montanha se endurece! DEF ×2, SPD /2");
    }
    if (pctVida <= 0.25 && !estado.enfurecido) {
      estado.enfurecido = true;
      console.log("💀 A terra treme! Reflexo ativado!");
    }
  }

  if (estado.hp === 0) {
    estado.abatido = true;
    document.getElementById("boss-status").textContent = "Derrotado... A montanha repousa.";
  }

  atualizarInterface();
}

function avancarRodada() {
  rodada++;
  const b = DADOS_BOSS[estado.id];

  // Recupera recursos
  estado.mp = Math.min(b.mpMax, estado.mp + 5);
  estado.est = Math.min(b.estMax, estado.est + 8);

  // Hræsvelgr ganha SPD
  if (estado.id === "hraesvelgr") {
    estado.spd++;
    if (estado.hp / b.hpMax <= 0.4) {
      estado.enfurecido = true;
    }
  }

  document.getElementById("boss-status").textContent = `Rodada ${rodada} — A terra se move...`;
  atualizarInterface();
}

function restaurar() {
  carregarBoss(bossAtual);
  document.getElementById("boss-status").textContent = "A terra repousa...";
}

// =========================================================
// EVENTOS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Seletor de Boss
  document.querySelectorAll(".boss-selector button").forEach(btn => {
    btn.addEventListener("click", () => {
      carregarBoss(btn.dataset.bossId);
    });
  });

  // Botões de teste
  document.getElementById("btn-dano-recebido").addEventListener("click", () => receberDano(10));
  document.getElementById("btn-restaurar").addEventListener("click", restaurar);
  document.getElementById("btn-rodada-passou").addEventListener("click", avancarRodada);
  document.getElementById("btn-zerar").addEventListener("click", () => {
    estado.hp = 0;
    estado.abatido = true;
    atualizarInterface();
  });

  // Botões de habilidade
  document.querySelectorAll(".boss-skill-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idHabilidade = btn.dataset.skill;
      const b = DADOS_BOSS[estado.id];
      const hab = b.habilidades.find(h => h.id === idHabilidade);
      if (!hab) return;

      if (estado.mp >= hab.custoMp && estado.est >= hab.custoEst) {
        estado.mp -= hab.custoMp;
        estado.est -= hab.custoEst;
        console.log(`⚔️ ${b.nome} usa ${hab.nome}!`);
        alert(`${b.nome} lançou:\n"${hab.nome}"\n💥 Dano base: ${hab.dano}\n📌 Efeito: ${hab.efeito}`);
        atualizarInterface();
      } else {
        alert("Recursos insuficientes!");
      }
    });
  });

  // Inicializa
  carregarBoss("mordrax");
});
