// =========================================================
// BOSS — SKOLL & HATI
// SISTEMA DE NÍVEIS
// 12 / 100 / 200 / 300 / 400
// =========================================================

const SKOLL_HATI = {

    id: "skoll-hati",

    nome: "Skoll & Hati",

    afinidade: "LUZ / TREVAS",

    classeAfinidade: "affinity-dual",

    tipo: "Boss Duplo",

    // =====================================================
    // IMAGENS
    // =====================================================
    imagens: {

        // Lv.12 / 100 / 200
        base: "skoll-hati.png",

        // Lv.300
        evolucao: "skoll-hati-evolucao.png",

        // Lv.400
        ultimate: "skoll-hati-ultimate.png"
    },


    // =====================================================
    // NÍVEIS
    // =====================================================
    niveis: {

        // =================================================
        // LV.12
        // =================================================
        12: {

            nivel: 12,

            skoll: {

                hp: 100,
                mp: 210,
                est: 300,

                atk: 8,
                atkMgc: 12,
                agi: 16,
                def: 4,
                res: 46,
                int: 32
            },

            hati: {

                hp: 120,
                mp: 160,
                est: 300,

                atk: 12,
                atkMgc: 8,
                agi: 14,
                def: 9,
                res: 30,
                int: 21
            },


            // =============================================
            // PASSIVA
            // =============================================
            passiva: {

                nome: "Irmãos pra Sempre",

                descricao:
                    "Skoll e Hati estão ligados por um pacto ancestral. " +
                    "Enquanto os dois estiverem vivos, ambos lutam normalmente. " +
                    "Quando um dos irmãos é derrotado, o outro entra em Fúria.",

                efeito:
                    "O irmão sobrevivente recebe +2 AGI, +2 ATK e +2 ATK MGC.",

                estado:
                    "Os irmãos caçam juntos..."
            },


            // =============================================
            // HABILIDADES
            // =============================================
            habilidades: [

                {
                    id: "skoll-feicao-luminosa",

                    usuario: "Skoll",

                    nome: "Feição Luminosa",

                    custoMp: 25,
                    custoEst: 20,

                    dano: 18,

                    alvo: "Área — até 3 jogadores",

                    efeito:
                        "Dispara um poderoso raio de luz. " +
                        "Os alvos atingidos ficam queimados."
                },

                {
                    id: "hati-hate-cure",

                    usuario: "Hati",

                    nome: "Hate Cure",

                    custoMp: 20,
                    custoEst: 20,

                    dano: 20,

                    alvo: "1 alvo",

                    efeito:
                        "Ataque sombrio que infecta o alvo e causa sangramento. " +
                        "Enquanto Infectado, o alvo não pode receber efeitos de cura ou recuperação."
                },

                {
                    id: "skoll-uivo-sagrado",

                    usuario: "Skoll",

                    nome: "Uivo Sagrado",

                    custoMp: 30,
                    custoEst: 15,

                    dano: 0,

                    alvo: "1 aliado",

                    efeito:
                        "O uivo fortalece um aliado. " +
                        "O alvo recebe +1 em todos os status."
                },

                {
                    id: "hati-sombra-odiosa",

                    usuario: "Hati",

                    nome: "Sombra Odiosa",

                    custoMp: 25,
                    custoEst: 15,

                    dano: 24,

                    alvo: "1 alvo",

                    efeito:
                        "Hati cria garras de sombra e desfere um ataque concentrado."
                },

                {
                    id: "skoll-odor-sangue",

                    usuario: "Skoll",

                    nome: "Odor de Sangue",

                    custoMp: 35,
                    custoEst: 30,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Inimigos dentro da área sofrem -1 ATK, -1 ATK MGC e -1 AGI."
                },

                {
                    id: "hati-uivo-grotesco",

                    usuario: "Hati",

                    nome: "Uivo Grotesco",

                    custoMp: 40,
                    custoEst: 35,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Hati libera um uivo sobrenatural que atordoa todos os inimigos dentro da área."
                }
            ]
        },


        // =================================================
        // LV.100
        // =================================================
        100: {

            nivel: 100,

            skoll: {

                hp: 6500,
                mp: 9000,
                est: 12000,

                atk: 85,
                atkMgc: 120,
                agi: 105,
                def: 55,
                res: 240,
                int: 180
            },

            hati: {

                hp: 7800,
                mp: 7000,
                est: 12000,

                atk: 120,
                atkMgc: 85,
                agi: 95,
                def: 90,
                res: 160,
                int: 125
            },

            passiva: {

                nome: "Irmãos pra Sempre — Pacto Lunar",

                descricao:
                    "A ligação entre os irmãos se fortalece. " +
                    "Quando um deles é derrotado, o sobrevivente entra imediatamente em Fúria.",

                efeito:
                    "O sobrevivente recebe +3 AGI, +3 ATK e +3 ATK MGC. " +
                    "Além disso, recebe resistência aumentada contra efeitos negativos.",

                estado:
                    "A caça está apenas começando..."
            },

            habilidades: [

                {
                    id: "skoll-feicao-luminosa",

                    usuario: "Skoll",

                    nome: "Feição Luminosa",

                    custoMp: 600,
                    custoEst: 450,

                    dano: 280,

                    alvo: "Área — até 3 jogadores",

                    efeito:
                        "Um raio solar atravessa a área e causa queimadura."
                },

                {
                    id: "hati-hate-cure",

                    usuario: "Hati",

                    nome: "Hate Cure",

                    custoMp: 500,
                    custoEst: 450,

                    dano: 320,

                    alvo: "1 alvo",

                    efeito:
                        "Causa dano, Infecta e aplica Sangramento. " +
                        "Alvos Infectados não podem receber cura."
                },

                {
                    id: "skoll-uivo-sagrado",

                    usuario: "Skoll",

                    nome: "Uivo Sagrado",

                    custoMp: 750,
                    custoEst: 400,

                    dano: 0,

                    alvo: "1 aliado",

                    efeito:
                        "Concede +2 em todos os status ao alvo."
                },

                {
                    id: "hati-sombra-odiosa",

                    usuario: "Hati",

                    nome: "Sombra Odiosa",

                    custoMp: 600,
                    custoEst: 400,

                    dano: 380,

                    alvo: "1 alvo",

                    efeito:
                        "Ataque sombrio concentrado."
                },

                {
                    id: "skoll-odor-sangue",

                    usuario: "Skoll",

                    nome: "Odor de Sangue",

                    custoMp: 850,
                    custoEst: 650,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Inimigos na área sofrem -2 ATK, -2 ATK MGC e -2 AGI."
                },

                {
                    id: "hati-uivo-grotesco",

                    usuario: "Hati",

                    nome: "Uivo Grotesco",

                    custoMp: 1000,
                    custoEst: 700,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Atordoa todos os inimigos dentro da área."
                }
            ]
        },


        // =================================================
        // LV.200
        // =================================================
        200: {

            nivel: 200,

            skoll: {

                hp: 32000,
                mp: 38000,
                est: 50000,

                atk: 260,
                atkMgc: 340,
                agi: 240,
                def: 180,
                res: 620,
                int: 480
            },

            hati: {

                hp: 38000,
                mp: 30000,
                est: 50000,

                atk: 350,
                atkMgc: 260,
                agi: 220,
                def: 280,
                res: 480,
                int: 350
            },

            passiva: {

                nome: "Irmãos pra Sempre — Eclipse Duplo",

                descricao:
                    "A presença de Skoll e Hati começa a alterar o campo de batalha. " +
                    "Enquanto os dois estiverem vivos, suas habilidades recebem efeitos ampliados.",

                efeito:
                    "Quando um irmão cai, o sobrevivente recebe +4 AGI, +4 ATK e +4 ATK MGC.",

                estado:
                    "O Sol e a Lua se aproximam..."
            },

            habilidades: [

                {
                    id: "skoll-feicao-luminosa",

                    usuario: "Skoll",

                    nome: "Feição Luminosa",

                    custoMp: 3000,
                    custoEst: 2200,

                    dano: 1100,

                    alvo: "Área — até 3 jogadores",

                    efeito:
                        "Raio de luz massivo. Aplica queimadura intensa."
                },

                {
                    id: "hati-hate-cure",

                    usuario: "Hati",

                    nome: "Hate Cure",

                    custoMp: 2800,
                    custoEst: 2200,

                    dano: 1300,

                    alvo: "1 alvo",

                    efeito:
                        "Infecta profundamente o alvo e aplica Sangramento."
                },

                {
                    id: "skoll-uivo-sagrado",

                    usuario: "Skoll",

                    nome: "Uivo Sagrado",

                    custoMp: 3500,
                    custoEst: 1800,

                    dano: 0,

                    alvo: "1 aliado",

                    efeito:
                        "Concede +3 em todos os status ao alvo."
                },

                {
                    id: "hati-sombra-odiosa",

                    usuario: "Hati",

                    nome: "Sombra Odiosa",

                    custoMp: 3000,
                    custoEst: 1800,

                    dano: 1600,

                    alvo: "1 alvo",

                    efeito:
                        "Ataque sombrio de alta concentração."
                },

                {
                    id: "skoll-odor-sangue",

                    usuario: "Skoll",

                    nome: "Odor de Sangue",

                    custoMp: 4000,
                    custoEst: 3000,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Inimigos sofrem -3 ATK, -3 ATK MGC e -3 AGI."
                },

                {
                    id: "hati-uivo-grotesco",

                    usuario: "Hati",

                    nome: "Uivo Grotesco",

                    custoMp: 4500,
                    custoEst: 3200,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Atordoa todos os inimigos dentro da área."
                }
            ]
        },


        // =================================================
        // LV.300
        // =================================================
        300: {

            nivel: 300,

            skoll: {

                hp: 120000,
                mp: 125000,
                est: 165000,

                atk: 620,
                atkMgc: 780,
                agi: 520,
                def: 480,
                res: 1250,
                int: 950
            },

            hati: {

                hp: 140000,
                mp: 105000,
                est: 165000,

                atk: 820,
                atkMgc: 620,
                agi: 480,
                def: 650,
                res: 1000,
                int: 720
            },

            passiva: {

                nome: "Irmãos pra Sempre — Eclipse da Ruína",

                descricao:
                    "Skoll e Hati passam a agir como uma única entidade durante o eclipse. " +
                    "Enquanto ambos estiverem vivos, suas habilidades podem combinar efeitos.",

                efeito:
                    "Quando um irmão é derrotado, o sobrevivente recebe +6 AGI, +6 ATK e +6 ATK MGC. " +
                    "O sobrevivente também reduz a duração de efeitos negativos recebidos.",

                estado:
                    "O eclipse começou..."
            },

            habilidades: [

                {
                    id: "skoll-feicao-luminosa",

                    usuario: "Skoll",

                    nome: "Feição Luminosa — Eclipse Solar",

                    custoMp: 10000,
                    custoEst: 7500,

                    dano: 4200,

                    alvo: "Área — até 3 jogadores",

                    efeito:
                        "Uma explosão de luz atravessa a área e aplica queimadura."
                },

                {
                    id: "hati-hate-cure",

                    usuario: "Hati",

                    nome: "Hate Cure — Lua Negra",

                    custoMp: 9000,
                    custoEst: 7500,

                    dano: 4800,

                    alvo: "1 alvo",

                    efeito:
                        "Aplica Infectado e Sangramento. " +
                        "A cura do alvo fica bloqueada."
                },

                {
                    id: "skoll-uivo-sagrado",

                    usuario: "Skoll",

                    nome: "Uivo Sagrado — Benção Solar",

                    custoMp: 12000,
                    custoEst: 6500,

                    dano: 0,

                    alvo: "1 aliado",

                    efeito:
                        "Concede +4 em todos os status."
                },

                {
                    id: "hati-sombra-odiosa",

                    usuario: "Hati",

                    nome: "Sombra Odiosa — Garras do Eclipse",

                    custoMp: 10500,
                    custoEst: 6500,

                    dano: 6000,

                    alvo: "1 alvo",

                    efeito:
                        "Ataque sombrio devastador."
                },

                {
                    id: "skoll-odor-sangue",

                    usuario: "Skoll",

                    nome: "Odor de Sangue — Eclipse",

                    custoMp: 14000,
                    custoEst: 10000,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Inimigos sofrem -4 ATK, -4 ATK MGC e -4 AGI."
                },

                {
                    id: "hati-uivo-grotesco",

                    usuario: "Hati",

                    nome: "Uivo Grotesco — Eclipse",

                    custoMp: 15000,
                    custoEst: 11000,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Atordoa todos os inimigos dentro da área."
                }
            ]
        },


        // =================================================
        // LV.400 — ULTIMATE
        // =================================================
        400: {

            nivel: 400,

            skoll: {

                hp: 420000,
                mp: 400000,
                est: 500000,

                atk: 1450,
                atkMgc: 1800,
                agi: 900,
                def: 1100,
                res: 2800,
                int: 2200
            },

            hati: {

                hp: 480000,
                mp: 350000,
                est: 500000,

                atk: 1900,
                atkMgc: 1450,
                agi: 850,
                def: 1450,
                res: 2300,
                int: 1700
            },


            // =============================================
            // PASSIVA ULTIMATE
            // =============================================
            passiva: {

                nome: "Irmãos pra Sempre — Fim do Eclipse",

                descricao:
                    "Skoll e Hati alcançam sua forma máxima. " +
                    "Sol e Lua passam a existir simultaneamente no campo de batalha.",

                efeito:
                    "Enquanto os dois estiverem vivos, recebem resistência elevada a efeitos negativos. " +
                    "Quando um irmão é derrotado, o sobrevivente entra em Fúria Absoluta: " +
                    "+10 AGI, +10 ATK e +10 ATK MGC.",

                estado:
                    "☀️🌑 O ECLIPSE FINAL COMEÇOU."
            },


            // =============================================
            // HABILIDADES ULTIMATE
            // =============================================
            habilidades: [

                {
                    id: "skoll-feicao-luminosa",

                    usuario: "Skoll",

                    nome: "FEIÇÃO LUMINOSA — SOL FINAL",

                    custoMp: 35000,
                    custoEst: 25000,

                    dano: 15000,

                    alvo: "Área — até 3 jogadores",

                    efeito:
                        "Skoll libera a força do Sol. " +
                        "Uma enorme explosão luminosa atinge a área e aplica queimadura."
                },

                {
                    id: "hati-hate-cure",

                    usuario: "Hati",

                    nome: "HATE CURE — LUA DEVORADORA",

                    custoMp: 32000,
                    custoEst: 25000,

                    dano: 17000,

                    alvo: "1 alvo",

                    efeito:
                        "Hati envolve o alvo em sombras lunares. " +
                        "Aplica Infectado e Sangramento."
                },

                {
                    id: "skoll-uivo-sagrado",

                    usuario: "Skoll",

                    nome: "UIVO SAGRADO — AURORA DIVINA",

                    custoMp: 40000,
                    custoEst: 20000,

                    dano: 0,

                    alvo: "1 aliado",

                    efeito:
                        "Concede +5 em todos os status."
                },

                {
                    id: "hati-sombra-odiosa",

                    usuario: "Hati",

                    nome: "SOMBRA ODIOSA — ABISMO LUNAR",

                    custoMp: 38000,
                    custoEst: 22000,

                    dano: 22000,

                    alvo: "1 alvo",

                    efeito:
                        "Hati desfere um ataque concentrado de trevas."
                },

                {
                    id: "skoll-odor-sangue",

                    usuario: "Skoll",

                    nome: "ODOR DE SANGUE — SOL ETERNO",

                    custoMp: 45000,
                    custoEst: 35000,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Inimigos na área sofrem -5 ATK, -5 ATK MGC e -5 AGI."
                },

                {
                    id: "hati-uivo-grotesco",

                    usuario: "Hati",

                    nome: "UIVO GROTESCO — LUA DO FIM",

                    custoMp: 50000,
                    custoEst: 38000,

                    dano: 0,

                    alvo: "Área — 2 blocos",

                    efeito:
                        "Um uivo sobrenatural atinge todos os inimigos dentro de 2 blocos e os atordoa."
                },


                // =========================================
                // HABILIDADE EXCLUSIVA DO LV.400
                // =========================================
                {
                    id: "eclipse-final",

                    usuario: "Skoll & Hati",

                    nome: "☀️🌑 ECLIPSE FINAL",

                    custoMp: 80000,
                    custoEst: 60000,

                    dano: 35000,

                    alvo: "Todos os inimigos",

                    efeito:
                        "Skoll e Hati unem Sol e Lua em um único ataque. " +
                        "A área inteira é tomada pela energia do eclipse."
                }
            ]
        }
    }
};
