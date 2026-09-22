"use strict";

/* ============================================================
   BOSS CARD SYSTEM
   Hasvrejk Filhote + Skoll & Hati (Lvl 11)
============================================================ */

const BossSystem = {
    /* ========================================================
       SELEÇÃO DE BOSS ATIVO
    ======================================================== */
    bossAtivo: "hasvrejk", // padrão

    /* ========================================================
       DADOS DE TODOS OS BOSSES
    ======================================================== */
    bosses: {

        // ==============================================
        // HASVREJK FILHOTE
        // ==============================================
        hasvrejk: {
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
                descricao: "Enquanto estiver no ar, torna-se imune a ataques corpo a corpo."
            },

            habilidades: [
                {
                    id: "rajada_vento",
                    nome: "Rajada de Vento",
                    descricao: "Cria uma pequena área de vento cortante.",
                    area: "Até 3 jogadores",
                    custoMP: 12,
                    custoEST: 15,
                    atributoDano: "atkMgc",
                    tipo: "vento"
                },
                {
                    id: "garras_vida",
                    nome: "Garras da Vida",
                    descricao: "Rouba 50% do dano causado.",
                    area: "Alvo atingido",
                    custoMP: 20,
                    custoEST: 15,
                    atributoDano: "atk",
                    rouboVida: 0.50,
                    tipo: "fisico"
                },
                {
                    id: "bater_asas",
                    nome: "Bater de Asas",
                    descricao: "Manda todos os jogadores para longe.",
                    area: "Todos os jogadores",
                    custoMP: 30,
                    custoEST: 10,
                    atributoDano: "atkMgc",
                    tipo: "vento"
                }
            ],

            noAr: false,
            fraqueza: null,
            emFuria: false
        },

        // ==============================================
        // SKOLL — Lobo da Luz
        // ==============================================
        skoll: {
            id: "skoll",
            nome: "Skoll — Lobo da Luz",
            titulo: "O Caçador do Sol",
            nivel: 11,
            afinidade: "luz/fogo",

            hpMax: 100,
            hp: 100,
            mpMax: 210,
            mp: 210,
            estMax: 300,
            est: 300,

            atk: 8,
            atkMgc: 12,
            def: 4,
            res: 46,
            agi: 16,
            int: 32,

            passiva: {
                nome: "Irmãos Para Sempre",
                descricao: "Quando Hati cai, entra em FÚRIA: +2 AGI, +2 ATK, +2 ATK MGC."
            },

            habilidades: [
                {
                    id: "feicao_luminosa",
                    nome: "Feição Luminosa",
                    descricao: "Raio de luz dourada que queima até 3 alvos. Causa Queimadura por 3 turnos.",
                    area: "Até 3 jogadores",
                    custoMP: 35,
                    custoEST: 20,
                    atributoDano: "atkMgc",
                    tipo: "luz/fogo",
                    efeito: "Queimadura"
                },
                {
                    id: "uivo_sagrado",
                    nome: "Uivo Sagrado",
                    descricao: "Bênção sagrada: +1 em TODOS os atributos de 1 aliado por 4 turnos.",
                    area: "1 aliado",
                    custoMP: 45,
                    custoEST: 25,
                    atributoDano: null,
                    tipo: "apoio",
                    buff: { atk: 1, atkMgc: 1, agi: 1, def: 1, res: 1, duracao: 4 }
                },
                {
                    id: "odor_de_sangue",
                    nome: "Odor de Sangue",
                    descricao: "Aroma pungente: inimigos em até 2 blocos perdem -1 ATK, ATK MGC e AGI por 3 turnos.",
                    area: "Raio de 2 blocos",
                    custoMP: 50,
                    custoEST: 30,
                    atributoDano: null,
                    tipo: "debuff",
                    debuff: { atk: -1, atkMgc: -1, agi: -1, duracao: 3 }
                }
            ],

            parceiro: "hati",
            fraqueza: ["trevas", "gelo"],
            resistencia: ["luz", "fogo"],
            emFuria: false
        },

        // ==============================================
        // HATI — Lobo das Sombras
        // ==============================================
        hati: {
            id: "hati",
            nome: "Hati — Lobo das Sombras",
            titulo: "O Caçador da Lua",
            nivel: 11,
            afinidade: "trevas",

            hpMax: 120,
            hp: 120,
            mpMax: 160,
            mp: 160,
            estMax: 300,
            est: 300,

            atk: 12,
            atkMgc: 8,
            def: 9,
            res: 30,
            agi: 14,
            int: 21,

            passiva: {
                nome: "Irmãos Para Sempre",
                descricao: "Quando Skoll cai, entra em FÚRIA: +2 AGI, +2 ATK, +2 ATK MGC."
            },

            habilidades: [
                {
                    id: "hate_cure",
                    nome: "Hate Cure",
                    descricao: "Maldição: causa Sangramento + Infecção — alvo NÃO PODE se curar por 3 turnos.",
                    area: "Alvo único",
                    custoMP: 30,
                    custoEST: 20,
                    atributoDano: "atk",
                    tipo: "trevas",
                    efeito: "Infecção + Sangramento | Cura Bloqueada"
                },
                {
                    id: "sombra_odiosa",
                    nome: "Sombra Odiosa",
                    descricao: "Garras surgem das trevas sob o inimigo.",
                    area: "Alvo único",
                    custoMP: 25,
                    custoEST: 15,
                    atributoDano: "atk",
                    tipo: "trevas"
                },
                {
                    id: "uivo_grotesco",
                    nome: "Uivo Grotesco",
                    descricao: "Grito que atordoa: todos em até 2 blocos perdem a próxima ação.",
                    area: "Raio de 2 blocos",
                    custoMP: 55,
                    custoEST: 35,
                    atributoDano: null,
                    tipo: "mental",
                    efeito: "Atordoamento (Stun) — 1 turno"
                }
            ],

            parceiro: "skoll",
            fraqueza: ["luz", "fogo"],
            resistencia: ["trevas", "veneno"],
            emFuria: false
        }
    },

    /* ========================================================
       ATALHO PARA O BOSS ATUAL
    ======================================================== */
    get boss() {
        return this.bosses[this.bossAtivo];
    },

    /* ========================================================
       TROCAR BOSS ATIVO
    ======================================================== */
    selecionarBoss(id) {
        if (!this.bosses[id]) {
            console.warn("[Boss] Boss não encontrado:", id);
            return;
        }
        this.bossAtivo = id;
        this.atualizarCard();
        console.log(`[Boss] Ativo: ${this.boss.nome} (Lv.${this.boss.nivel})`);
    },

    /* ========================================================
       VERIFICAR FÚRIA DOS IRMÃOS
    ======================================================== */
    verificarFuriaGemeos() {
        const skoll = this.bosses.skoll;
        const hati = this.bosses.hati;

        // Skoll vivo, Hati morto → Skoll em fúria
        if (skoll.hp > 0 && skoll.hp < skoll.hpMax && hati.hp <= 0 && !skoll.emFuria) {
            skoll.emFuria = true;
            skoll.agi += 2;
            skoll.atk += 2;
            skoll.atkMgc += 2;
            this.adicionarLog("🔥 SKOLL ENTROU EM FÚRIA! AGI+2 | ATK+2 | ATK MGC+2");
            console.log("[Boss] Skoll — Fúria ativada!");
        }

        // Hati vivo, Skoll morto → Hati em fúria
        if (hati.hp > 0 && hati.hp < hati.hpMax && skoll.hp <= 0 && !hati.emFuria) {
            hati.emFuria = true;
            hati.agi += 2;
            hati.atk += 2;
            hati.atkMgc += 2;
            this.adicionarLog("🌑 HATI ENTROU EM FÚRIA! AGI+2 | ATK+2 | ATK MGC+2");
            console.log("[Boss] Hati — Fúria ativada!");
        }
    },

    /* ========================================================
       DANO RECEBIDO
    ======================================================== */
    receberDano(valor, tipo = "normal") {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return 0;

        // Bloqueio de voo (só Hasvrejk)
        if (this.bossAtivo === "hasvrejk" && tipo === "corpo-a-corpo" && this.boss.noAr) {
            console.log("[Boss] Rei dos Ares: ataque corpo a corpo bloqueado.");
            this.atualizarCard();
            return 0;
        }

        const danoAplicado = Math.min(valor, this.boss.hp);
        this.boss.hp = Math.max(0, this.boss.hp - danoAplicado);

        // Verifica fúria sempre que algum dos irmãos tomar dano
        if (this.bossAtivo === "skoll" || this.bossAtivo === "hati") {
            this.verificarFuriaGemeos();
        }

        this.atualizarCard();
        console.log(`[Boss] ${this.boss.nome}: -${danoAplicado} HP | ${this.boss.hp}/${this.boss.hpMax}`);
        return danoAplicado;
    },

    /* ========================================================
       DANO MANUAL / CORPO A CORPO
    ======================================================== */
    aplicarDanoManual() {
        const input = document.getElementById("boss-damage-input");
        const dano = Number(input?.value);
        if (!Number.isFinite(dano) || dano <= 0) return console.warn("[Boss] Dano inválido.");
        this.receberDano(dano, "normal");
        if (input) input.value = "";
    },

    aplicarDanoCorpoACorpo() {
        const input = document.getElementById("boss-damage-input");
        const dano = Number(input?.value);
        if (!Number.isFinite(dano) || dano <= 0) return console.warn("[Boss] Dano inválido.");
        this.receberDano(dano, "corpo-a-corpo");
        if (input) input.value = "";
    },

    /* ========================================================
       MP / ESTAMINA
    ======================================================== */
    gastarMP(valor) {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return true;
        if (this.boss.mp < valor) return console.warn("[Boss] MP insuficiente."), false;
        this.boss.mp -= valor;
        this.atualizarCard();
        return true;
    },

    recuperarMP(valor) {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return;
        this.boss.mp = Math.min(this.boss.mpMax, this.boss.mp + valor);
        this.atualizarCard();
    },

    gastarEstamina(valor) {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return true;
        if (this.boss.est < valor) return console.warn("[Boss] Estamina insuficiente."), false;
        this.boss.est -= valor;
        this.atualizarCard();
        return true;
    },

    recuperarEstamina(valor) {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return;
        this.boss.est = Math.min(this.boss.estMax, this.boss.est + valor);
        this.atualizarCard();
    },

    /* ========================================================
       USAR HABILIDADE
    ======================================================== */
    usarHabilidade(id) {
        const habilidade = this.boss.habilidades.find(h => h.id === id);
        if (!habilidade) return console.warn("[Boss] Habilidade não encontrada:", id), null;

        if (habilidade.custoMP > 0 && !this.gastarMP(habilidade.custoMP)) return null;
        if (habilidade.custoEST > 0 && !this.gastarEstamina(habilidade.custoEST)) return null;

        const dano = habilidade.atributoDano ? Number(this.boss[habilidade.atributoDano]) || 0 : 0;
        let cura = 0;
        if (habilidade.rouboVida && dano > 0) {
            cura = dano * habilidade.rouboVida;
            this.boss.hp = Math.min(this.boss.hpMax, this.boss.hp + cura);
        }

        this.atualizarCard();
        console.log(`[Boss] ${habilidade.nome} | Dano: ${dano}${cura ? ` | Cura: +${cura}` : ""}`);
        return { sucesso: true, habilidade, dano, cura, tipo: habilidade.tipo };
    },

    executarHabilidade(id) {
        const res = this.usarHabilidade(id);
        if (!res) return this.adicionarLog("Não foi possível usar essa habilidade.");
        let msg = `${res.habilidade.nome}: ${res.dano} de dano`;
        if (res.cura > 0) msg += ` | +${res.cura} HP`;
        if (res.habilidade.efeito) msg += ` | Efeito: ${res.habilidade.efeito}`;
        this.adicionarLog(msg);
    },

    /* ========================================================
       VOAR / SOLO — só Hasvrejk
    ======================================================== */
    ativarVoo() {
        if (this.bossAtivo !== "hasvrejk") return;
        this.boss.noAr = true;
        this.atualizarCard();
        console.log("[Boss] No ar.");
    },

    desativarVoo() {
        if (this.bossAtivo !== "hasvrejk") return;
        this.boss.noAr = false;
        this.atualizarCard();
        console.log("[Boss] No solo.");
    },

    /* ========================================================
       CURA
    ======================================================== */
    curar(valor) {
        valor = Number(valor);
        if (!Number.isFinite(valor) || valor <= 0) return 0;
        const cura = Math.min(valor, this.boss.hpMax - this.boss.hp);
        this.boss.hp += cura;
        this.atualizarCard();
        return cura;
    },

    aplicarCuraManual() {
        const input = document.getElementById("boss-heal-input");
        const cura = this.curar(Number(input?.value));
        if (!cura) return console.warn("[Boss] Cura inválida.");
        if (input) input.value = "";
    },

    /* ========================================================
       IMAGEM
    ======================================================== */
    carregarImagem() {
        const img = document.getElementById("boss-image");
        if (!img) return;
        const chave = `rpg_boss_${this.bossAtivo}_image`;
        const salva = localStorage.getItem(chave);
        img.src = salva || `assets/bosses/${this.bossAtivo}.png`;
    },

    selecionarImagem(e) {
        const arq = e.target.files?.[0];
        if (!arq?.type.startsWith("image/")) return alert("Selecione uma imagem válida."), e.target.value = "";
        const leitor = new FileReader();
        leitor.onload = () => {
            document.getElementById("boss-image").src = leitor.result;
            try { localStorage.setItem(`rpg_boss_${this.bossAtivo}_image`, leitor.result); }
            catch { alert("Imagem muito grande. Escolha uma menor."); }
        };
        leitor.readAsDataURL(arq);
    },

    configurarImagem() {
        document.getElementById("boss-image-input")?.addEventListener("change", e => this.selecionarImagem(e));
    },

    /* ========================================================
       ATUALIZAR CARD
    ======================================================== */
    atualizarCard() {
        this.atualizarBarra("boss-hp", this.boss.hp, this.boss.hpMax);
        this.atualizarBarra("boss-mp", this.boss.mp, this.boss.mpMax);
        this.atualizarBarra("boss-est", this.boss.est, this.boss.estMax);

        this.atualizarTexto("boss-hp-value", `${this.boss.hp} / ${this.boss.hpMax}`);
        this.atualizarTexto("boss-mp-value", `${this.boss.mp} / ${this.boss.mpMax}`);
        this.atualizarTexto("boss-est-value", `${this.boss.est} / ${this.boss.estMax}`);
        this.atualizarTexto("boss-level", `Nível ${this.boss.nivel}`);
        this.atualizarTexto("boss-name", this.boss.nome);
        this.atualizarTexto("boss-affinity", this.boss.afinidade);
        this.atualizarTexto("boss-atk", this.boss.atk);
        this.atualizarTexto("boss-atk-mgc", this.boss.atkMgc);
        this.atualizarTexto("boss-def", this.boss.def);
        this.atualizarTexto("boss-res", this.boss.res);
        this.atualizarTexto("boss-agi", this.boss.agi);
        this.atualizarTexto("boss-int", this.boss.int);

        // Estado passiva / Fúria
        let estadoPassiva = this.boss.emFuria ? "🔥 FÚRIA ATIVA" : "INATIVA";
        if (this.bossAtivo === "hasvrejk") {
            estadoPassiva = this.boss.noAr ? "ATIVA — NO AR" : "INATIVA — NO SOLO";
        }
        this.atualizarTexto("boss-passive-state", estadoPassiva);

        // Dano das habilidades
        const danoAtk = this.boss.atk;
        const danoMag = this.boss.atkMgc;
        ["skill-rajada-dano","combat-rajada-dano"].forEach(id => this.atualizarTexto(id, danoMag));
        ["skill-garras-dano","combat-garras-dano"].forEach(id => this.atualizarTexto(id, danoAtk));
        ["skill-bater-dano","combat-bater-dano"].forEach(id => this.atualizarTexto(id, danoMag));

        this.atualizarTexto("boss-status-hp", this.boss.hp);
        this.atualizarTexto("boss-status-mp", this.boss.mp);
        this.atualizarTexto("boss-status-est", this.boss.est);
        this.atualizarTexto("combat-mp", this.boss.mp);
        this.atualizarTexto("combat-est", this.boss.est);

        // Marca o boss ativo na interface
        document.querySelectorAll("[data-boss-id]").forEach(btn => {
            btn.classList.toggle("ativo", btn.dataset.bossId === this.bossAtivo);
        });
    },

    atualizarBarra(id, at, max) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.width = `${Math.max(0, Math.min(100, (at/max)*100 || 0))}%`;
    },

    atualizarTexto(id, txt) {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    },

    adicionarLog(msg) {
        const log = document.getElementById("combat-log");
        if (!log) return;
        const linha = document.createElement("div");
        linha.textContent = msg;
        log.appendChild(linha);
        log.scrollTop = log.scrollHeight;
    },

    /* ========================================================
       RESET — reseta o boss atual OU os dois irmãos
    ======================================================== */
    resetar() {
        if (this.bossAtivo === "skoll" || this.bossAtivo === "hati") {
            // Reseta AMBOS os irmãos
            ["skoll","hati"].forEach(id => {
                const b = this.bosses[id];
                b.hp = b.hpMax;
                b.mp = b.mpMax;
                b.est = b.estMax;
                b.emFuria = false;
                // Restaura atributos base
                if (id === "skoll") { b.atk=8; b.atkMgc=12; b.agi=16; }
                if (id === "hati") { b.atk=12; b.atkMgc=8; b.agi=14; }
            });
            this.adicionarLog("🔄 Skoll & Hati — Batalha reiniciada!");
        } else {
            this.boss.hp = this.boss.hpMax;
            this.boss.mp = this.boss.mpMax;
            this.boss.est = this.boss.estMax;
            if (this.bossAtivo === "hasvrejk") this.boss.noAr = false;
        }

        document.getElementById("combat-log").innerHTML = "";
        this.atualizarCard();
        console.log("[Boss] Resetado.");
    },

    /* ========================================================
       CONFIGURAR BOTÕES
    ======================================================== */
    configurarBotoes() {
        // Seleção de Boss
        document.querySelectorAll("[data-boss-id]").forEach(btn => {
            btn.type = "button";
            btn.addEventListener("click", e => {
                e.preventDefault(); e.stopPropagation();
                this.selecionarBoss(btn.dataset.bossId);
            });
        });

        // Habilidades
        const mapaHabilidades = {
            "skill-rajada-vento": "feicao_luminosa",
            "skill-garras-vida": "sombra_odiosa",
            "skill-bater-asas": "uivo_grotesco",
            "combat-rajada-vento": "feicao_luminosa",
            "combat-garras-vida": "hate_cure",
            "combat-bater-asas": "uivo_sagrado"
        };
        Object.entries(mapaHabilidades).forEach(([botaoId, habId]) => {
            const btn = document.getElementById(botaoId);
            if (!btn) return;
            btn.type = "button";
            btn.addEventListener("click", e => {
                e.preventDefault(); e.stopPropagation();
                this.executarHabilidade(habId);
            });
        });

        // Dano / Cura / Reset
        const botoes = {
            "boss-damage-button": () => this.aplicarDanoManual(),
            "boss-melee-button": () => this.aplicarDanoCorpoACorpo(),
            "boss-heal-button": () => this.aplicarCuraManual(),
            "boss-fly-button": () => this.ativarVoo(),
            "boss-ground-button": () => this.desativarVoo(),
            "boss-reset-button": () => this.resetar()
        };
        Object.entries(botoes).forEach(([id, fn]) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.type = "button";
            btn.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); fn(); });
        });

        console.log("[Boss] Botões configurados.");
    }
};

window.BossSystem = BossSystem;

document.addEventListener("DOMContentLoaded", () => {
    console.log("[Boss] Inicializando sistema...");
    BossSystem.atualizarCard();
    BossSystem.carregarImagem();
    BossSystem.configurarImagem();
    BossSystem.configurarBotoes();
    console.log("[Boss] Sistema carregado!");
});
