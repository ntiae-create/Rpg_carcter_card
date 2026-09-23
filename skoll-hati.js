// =========================================================
// SKOLL & HATI
// BOSS DATA
//
// Um único Boss formado por dois membros.
//
// Skoll = Luz
// Hati  = Trevas
//
// As regras gerais ficam nos módulos:
// - boss-state.js
// - boss-render.js
// - boss-combat.js
// - boss-skills.js
// - boss-events.js
// =========================================================


const SKOLL_HATI = {

    id: "skoll-hati",

    nome: "Skoll & Hati",

    afinidade: "LUZ / TREVAS",

    classeAfinidade: "affinity-dual",

    tipo: "Boss Duplo",

    descricao:
        "Os irmãos eternamente ligados pelo eclipse.",


    // =====================================================
    // IMAGENS
    // =====================================================

    imagens: {

        base:
            "imagens/skoll-hati.jpg",

        evolucao:
            "imagens/skoll-hati.jpg",

        ultimate:
            "imagens/skoll-hati.jpg"

    },


    // =====================================================
    // NÍVEIS
    // =====================================================

    niveis: {


        // =================================================
        // NÍVEL 12
        // =================================================

        12: {

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


            passiva: {

                nome:
                    "Irmãos pra Sempre",

                descricao:
                    "Quando um dos irmãos é derrotado, o sobrevivente entra em Fúria, recebendo +2 ATK, +2 ATK MGC e +2 AGI."

            },


            habilidades: [

                {

                    nome:
                        "Feição Luminosa",

                    membro:
                        "skoll",

                    custo: {

                        mp: 30,
                        est: 25

                    },

                    descricao:
                        "Skoll dispara um raio de luz que causa dano de Luz e pode atingir até 3 jogadores.",

                    executar({
                        membroEstado
                    }) {

                        return {

                            tipo:
                                "area",

                            elemento:
                                "luz",

                            alvos:
                                3,

                            mensagem:
                                "Skoll libera um raio de luz sobre o campo."

                        };

                    }

                },


                {

                    nome:
                        "Hate Cure",

                    membro:
                        "hati",

                    custo: {

                        mp: 30,
                        est: 25

                    },

                    descricao:
                        "Hati desfere um ataque de Trevas que infecta o alvo e aplica sangramento.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            elemento:
                                "trevas",

                            efeitos: [

                                "infeccao",

                                "sangramento"

                            ],

                            mensagem:
                                "Hati infecta o alvo com Hate Cure."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Sagrado",

                    membro:
                        "skoll",

                    custo: {

                        mp: 35,
                        est: 20

                    },

                    descricao:
                        "Skoll fortalece um aliado com seu uivo sagrado, concedendo +1 em todos os atributos.",

                    executar() {

                        return {

                            tipo:
                                "buff",

                            alvo:
                                "aliado",

                            bonus:
                                1,

                            atributos:
                                "todos",

                            mensagem:
                                "O Uivo Sagrado fortalece seu aliado."

                        };

                    }

                },


                {

                    nome:
                        "Sombra Odiosa",

                    membro:
                        "hati",

                    custo: {

                        mp: 25,
                        est: 30

                    },

                    descricao:
                        "Hati desfere uma garra de sombra contra um único alvo.",

                    executar() {

                        return {

                            tipo:
                                "single",

                            elemento:
                                "trevas",

                            mensagem:
                                "Hati desfere sua Sombra Odiosa."

                        };

                    }

                },


                {

                    nome:
                        "Odor de Sangue",

                    membro:
                        "skoll",

                    custo: {

                        mp: 40,
                        est: 35

                    },

                    descricao:
                        "Skoll espalha o odor de sangue em uma área de 2 blocos. Inimigos atingidos sofrem -1 ATK, -1 ATK MGC e -1 AGI.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            area:
                                2,

                            penalidades: {

                                atk: -1,

                                atkMgc: -1,

                                agi: -1

                            },

                            mensagem:
                                "O Odor de Sangue enfraquece os inimigos."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Grotesco",

                    membro:
                        "hati",

                    custo: {

                        mp: 40,
                        est: 35

                    },

                    descricao:
                        "Hati emite um uivo grotesco que atordoa todos os inimigos em até 2 blocos.",

                    executar() {

                        return {

                            tipo:
                                "controle",

                            efeito:
                                "stun",

                            area:
                                2,

                            mensagem:
                                "O Uivo Grotesco paralisa os inimigos próximos."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 100
        // =================================================

        100: {

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

                nome:
                    "Irmãos pra Sempre — Pacto Lunar",

                descricao:
                    "Quando um irmão é derrotado, o sobrevivente recebe +3 ATK, +3 ATK MGC e +3 AGI, além de resistência aos efeitos negativos."

            },


            habilidades: [

                {

                    nome:
                        "Feição Luminosa",

                    membro:
                        "skoll",

                    custo: {
                        mp: 500,
                        est: 400
                    },

                    descricao:
                        "Um raio luminoso atinge até 3 jogadores e queima o campo.",

                    executar() {

                        return {

                            tipo:
                                "area",

                            elemento:
                                "luz",

                            alvos:
                                3,

                            mensagem:
                                "Skoll ilumina o campo com sua Feição Luminosa."

                        };

                    }

                },


                {

                    nome:
                        "Hate Cure",

                    membro:
                        "hati",

                    custo: {
                        mp: 450,
                        est: 400
                    },

                    descricao:
                        "Ataque de Trevas que infecta o alvo e causa sangramento.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            efeitos: [
                                "infeccao",
                                "sangramento"
                            ],

                            mensagem:
                                "Hati espalha a infecção pelo alvo."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Sagrado",

                    membro:
                        "skoll",

                    custo: {
                        mp: 600,
                        est: 350
                    },

                    descricao:
                        "Fortalece um aliado com +2 em todos os atributos.",

                    executar() {

                        return {

                            tipo:
                                "buff",

                            bonus:
                                2,

                            atributos:
                                "todos",

                            mensagem:
                                "Skoll fortalece seu irmão com o Uivo Sagrado."

                        };

                    }

                },


                {

                    nome:
                        "Sombra Odiosa",

                    membro:
                        "hati",

                    custo: {
                        mp: 400,
                        est: 450
                    },

                    descricao:
                        "Uma poderosa garra de sombra atinge um único alvo.",

                    executar() {

                        return {

                            tipo:
                                "single",

                            elemento:
                                "trevas",

                            mensagem:
                                "Hati desfere uma poderosa Sombra Odiosa."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Grotesco",

                    membro:
                        "hati",

                    custo: {
                        mp: 700,
                        est: 600
                    },

                    descricao:
                        "Atordoa inimigos em uma área de 2 blocos.",

                    executar() {

                        return {

                            tipo:
                                "controle",

                            efeito:
                                "stun",

                            area:
                                2,

                            mensagem:
                                "O Uivo Grotesco paralisa os inimigos próximos."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 200
        // =================================================

        200: {

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

                nome:
                    "Irmãos pra Sempre — Eclipse Duplo",

                descricao:
                    "Quando um irmão cai, o sobrevivente recebe +4 ATK, +4 ATK MGC e +4 AGI, tornando-se muito mais resistente aos efeitos negativos."

            },


            habilidades: [

                {

                    nome:
                        "Feição Luminosa",

                    membro:
                        "skoll",

                    custo: {
                        mp: 2500,
                        est: 1800
                    },

                    descricao:
                        "Um enorme raio de Luz atinge até 3 jogadores.",

                    executar() {

                        return {

                            tipo:
                                "area",

                            elemento:
                                "luz",

                            alvos:
                                3,

                            mensagem:
                                "Skoll dispara uma poderosa Feição Luminosa."

                        };

                    }

                },


                {

                    nome:
                        "Hate Cure",

                    membro:
                        "hati",

                    custo: {
                        mp: 2200,
                        est: 2000
                    },

                    descricao:
                        "Ataque de Trevas que infecta e causa sangramento.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            efeitos: [
                                "infeccao",
                                "sangramento"
                            ],

                            mensagem:
                                "Hati espalha sua maldição pelo alvo."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Sagrado",

                    membro:
                        "skoll",

                    custo: {
                        mp: 3000,
                        est: 1800
                    },

                    descricao:
                        "Concede +3 em todos os atributos ao irmão.",

                    executar() {

                        return {

                            tipo:
                                "buff",

                            bonus:
                                3,

                            atributos:
                                "todos",

                            mensagem:
                                "O Eclipse é fortalecido pelo Uivo Sagrado."

                        };

                    }

                },


                {

                    nome:
                        "Odor de Sangue",

                    membro:
                        "skoll",

                    custo: {
                        mp: 3500,
                        est: 2800
                    },

                    descricao:
                        "Cria uma área de 2 blocos que reduz ATK, ATK MGC e AGI dos inimigos.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            area:
                                2,

                            penalidades: {

                                atk: -2,

                                atkMgc: -2,

                                agi: -2

                            },

                            mensagem:
                                "O Odor de Sangue enfraquece o campo."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Grotesco",

                    membro:
                        "hati",

                    custo: {
                        mp: 3500,
                        est: 3000
                    },

                    descricao:
                        "Atordoa todos os inimigos em uma área de 2 blocos.",

                    executar() {

                        return {

                            tipo:
                                "controle",

                            efeito:
                                "stun",

                            area:
                                2,

                            mensagem:
                                "Hati paralisa o campo com seu Uivo Grotesco."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 300
        // =================================================

        300: {

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

                nome:
                    "Irmãos pra Sempre — Eclipse da Ruína",

                descricao:
                    "Quando um irmão é derrotado, o sobrevivente recebe +6 ATK, +6 ATK MGC e +6 AGI. A duração dos efeitos negativos recebidos é drasticamente reduzida."

            },


            habilidades: [

                {

                    nome:
                        "Feição Luminosa",

                    membro:
                        "skoll",

                    custo: {
                        mp: 8000,
                        est: 6500
                    },

                    descricao:
                        "Um raio de Luz colossal atinge até 3 jogadores.",

                    executar() {

                        return {

                            tipo:
                                "area",

                            elemento:
                                "luz",

                            alvos:
                                3,

                            mensagem:
                                "A Feição Luminosa cobre o campo de luz."

                        };

                    }

                },


                {

                    nome:
                        "Hate Cure",

                    membro:
                        "hati",

                    custo: {
                        mp: 7000,
                        est: 6500
                    },

                    descricao:
                        "Uma poderosa maldição infecta o alvo e causa sangramento.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            efeitos: [
                                "infeccao",
                                "sangramento"
                            ],

                            mensagem:
                                "Hate Cure infecta o alvo."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Sagrado",

                    membro:
                        "skoll",

                    custo: {
                        mp: 9000,
                        est: 6000
                    },

                    descricao:
                        "Concede +5 em todos os atributos ao irmão.",

                    executar() {

                        return {

                            tipo:
                                "buff",

                            bonus:
                                5,

                            atributos:
                                "todos",

                            mensagem:
                                "Skoll fortalece Hati com o Uivo Sagrado."

                        };

                    }

                },


                {

                    nome:
                        "Odor de Sangue",

                    membro:
                        "skoll",

                    custo: {
                        mp: 10000,
                        est: 8500
                    },

                    descricao:
                        "Cria uma zona de 2 blocos que reduz ATK, ATK MGC e AGI dos inimigos.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            area:
                                2,

                            penalidades: {

                                atk: -3,

                                atkMgc: -3,

                                agi: -3

                            },

                            mensagem:
                                "O Odor de Sangue domina a área."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Grotesco",

                    membro:
                        "hati",

                    custo: {
                        mp: 10000,
                        est: 9000
                    },

                    descricao:
                        "Um uivo aterrador atordoa todos os inimigos em 2 blocos.",

                    executar() {

                        return {

                            tipo:
                                "controle",

                            efeito:
                                "stun",

                            area:
                                2,

                            mensagem:
                                "O Uivo Grotesco domina o campo."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 400
        // =================================================

        400: {

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


            passiva: {

                nome:
                    "Irmãos pra Sempre — Fim do Eclipse",

                descricao:
                    "Enquanto ambos estiverem vivos, os irmãos possuem alta resistência aos efeitos negativos. Quando um é derrotado, o sobrevivente recebe +10 ATK, +10 ATK MGC e +10 AGI.",

            },


            habilidades: [

                {

                    nome:
                        "Feição Luminosa",

                    membro:
                        "skoll",

                    custo: {
                        mp: 30000,
                        est: 22000
                    },

                    descricao:
                        "Um raio de Luz colossal cobre uma grande área e atinge até 3 jogadores.",

                    executar() {

                        return {

                            tipo:
                                "area",

                            elemento:
                                "luz",

                            alvos:
                                3,

                            escala:
                                "colossal",

                            mensagem:
                                "Skoll libera a Feição Luminosa Suprema."

                        };

                    }

                },


                {

                    nome:
                        "Hate Cure",

                    membro:
                        "hati",

                    custo: {
                        mp: 28000,
                        est: 24000
                    },

                    descricao:
                        "Uma maldição de Trevas infecta o alvo e causa sangramento.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            efeitos: [
                                "infeccao",
                                "sangramento"
                            ],

                            escala:
                                "suprema",

                            mensagem:
                                "Hati lança Hate Cure sobre o alvo."

                        };

                    }

                },


                {

                    nome:
                        "Uivo Sagrado",

                    membro:
                        "skoll",

                    custo: {
                        mp: 35000,
                        est: 25000
                    },

                    descricao:
                        "Fortalece o irmão com um grande aumento em todos os atributos.",

                    executar() {

                        return {

                            tipo:
                                "buff",

                            bonus:
                                8,

                            atributos:
                                "todos",

                            mensagem:
                                "O Uivo Sagrado desperta o poder do eclipse."

                        };

                    }

                },


                {

                    nome:
                        "Odor de Sangue",

                    membro:
                        "skoll",

                    custo: {
                        mp: 40000,
                        est: 30000
                    },

                    descricao:
                        "Uma zona de 2 blocos reduz fortemente ATK, ATK MGC e AGI dos inimigos.",

                    executar() {

                        return {

                            tipo:
                                "debuff",

                            area:
                                2,

                            penalidades: {

                                atk: -4,

                                atkMgc: -4,

                                agi: -4

                            },

                            mensagem:
                                "O Odor de Sangue cobre o campo."

                        };

                    }

                },


                {

                    nome:
                        "ECLIPSE FINAL",

                    membro:
                        "hati",

                    custo: {
                        mp: 60000,
                        est: 50000
                    },

                    descricao:
                        "Skoll e Hati sincronizam Luz e Trevas em um eclipse absoluto. Disponível exclusivamente no nível 400.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo:
                                "ultimate",

                            elemento:
                                "luz-trevas",

                            alvo:
                                "todos",

                            eclipse:
                                true,

                            mensagem:
                                "Skoll e Hati desencadeiam o Eclipse Final."

                        };

                    }

                }

            ]

        }

    }

};


// =========================================================
// REGISTRO GLOBAL
// =========================================================

window.SKOLL_HATI = SKOLL_HATI;
