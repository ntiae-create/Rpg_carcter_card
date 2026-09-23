/* =========================================================
   BOSS — HRÆSVE LGR
   O DEVORADOR DOS CÉUS
   SISTEMA DE NÍVEIS: 12 / 100 / 200 / 300 / 400

   Lv. 12  → Forma Base
   Lv. 100 → Forma Base Aprimorada
   Lv. 200 → Forma Base Superior
   Lv. 300 → EVOLUÍDO
   Lv. 400 → ULTIMATE BOSS

   ELEMENTO: VENTO
========================================================= */

const HRAESVELGR = {

    id: "hraesvelgr",

    name: "Hræsvelgr",

    title: "O Devorador dos Céus",

    element: "vento",

    type: "Boss Aéreo / Colossal",

    levels: {

        /* =================================================
           LEVEL 12
        ================================================= */

        12: {

            form: "Base",

            status: {
                HP: 180,
                MP: 180,
                EST: 350,
                ATK: 14,
                "ATK MGC": 18,
                AGI: 18,
                DEF: 8,
                RES: 35,
                INT: 28
            },

            passive: {
                name: "Senhor dos Céus",

                description:
                    "Enquanto estiver no ar, Hræsvelgr se torna imune a ataques corpo a corpo."
            },

            abilities: [

                {
                    name: "Tempestade do Devorador",

                    type: "Área",

                    description:
                        "Hræsvelgr abre suas asas e libera uma poderosa rajada de vento contra uma área à sua frente. Os inimigos atingidos sofrem dano de Vento e são empurrados para trás.",

                    range: "4 blocos",

                    effect:
                        "Dano de Vento + empurrão de 1 bloco."
                },

                {
                    name: "Asas do Fim",

                    type: "Área",

                    description:
                        "Hræsvelgr bate violentamente suas asas, criando correntes de vento ao seu redor. Todos os inimigos próximos sofrem dano e são deslocados aleatoriamente.",

                    area: "2 blocos ao redor",

                    effect:
                        "Dano de Vento + deslocamento aleatório."
                },

                {
                    name: "Queda do Céu",

                    type: "Área",

                    description:
                        "Hræsvelgr sobe aos céus e desaparece temporariamente do campo. No turno seguinte, despenca violentamente sobre uma área determinada, causando dano massivo.",

                    area: "3 x 3 blocos",

                    effect:
                        "Dano massivo de Vento."
                },

                {
                    name: "O Uivo dos Céus",

                    type: "Controle Global",

                    description:
                        "Hræsvelgr libera um uivo colossal que cria uma explosão de vento ao redor de seu corpo.",

                    effect:
                        "Todos os inimigos no campo são empurrados 2 blocos para longe de Hræsvelgr."
                }
            ]
        },


        /* =================================================
           LEVEL 100
        ================================================= */

        100: {

            form: "Base Aprimorada",

            status: {
                HP: 8500,
                MP: 7000,
                EST: 12000,
                ATK: 90,
                "ATK MGC": 120,
                AGI: 85,
                DEF: 65,
                RES: 140,
                INT: 110
            },

            passive: {
                name: "Senhor dos Céus",

                description:
                    "Enquanto estiver no ar, Hræsvelgr se torna imune a ataques corpo a corpo e recebe +1 AGI."
            },

            abilities: [

                {
                    name: "Tempestade do Devorador",

                    type: "Área",

                    description:
                        "Libera uma poderosa rajada de vento contra uma área à sua frente.",

                    range: "5 blocos",

                    effect:
                        "Dano de Vento + empurrão de 2 blocos."
                },

                {
                    name: "Asas do Fim",

                    type: "Área",

                    description:
                        "Uma violenta explosão de vento atinge todos os inimigos próximos.",

                    area: "2 blocos ao redor",

                    effect:
                        "Dano de Vento + deslocamento aleatório de até 2 blocos."
                },

                {
                    name: "Queda do Céu",

                    type: "Área",

                    description:
                        "Hræsvelgr desaparece do campo e retorna violentamente do céu.",

                    area: "3 x 3 blocos",

                    effect:
                        "Dano massivo de Vento."
                },

                {
                    name: "O Uivo dos Céus",

                    type: "Controle Global",

                    description:
                        "Um uivo colossal produz uma onda de choque que atravessa todo o campo.",

                    effect:
                        "Todos os inimigos são empurrados 3 blocos."
                }
            ]
        },


        /* =================================================
           LEVEL 200
        ================================================= */

        200: {

            form: "Base Superior",

            status: {
                HP: 40000,
                MP: 28000,
                EST: 50000,
                ATK: 200,
                "ATK MGC": 280,
                AGI: 175,
                DEF: 150,
                RES: 300,
                INT: 240
            },

            passive: {
                name: "Senhor dos Céus II",

                description:
                    "Enquanto estiver no ar, Hræsvelgr se torna imune a ataques corpo a corpo e recebe +2 AGI."
            },

            abilities: [

                {
                    name: "Tempestade do Devorador",

                    type: "Área",

                    description:
                        "Hræsvelgr libera uma corrente de vento extremamente poderosa.",

                    range: "6 blocos",

                    effect:
                        "Dano de Vento + empurrão de 3 blocos."
                },

                {
                    name: "Asas do Fim",

                    type: "Área",

                    description:
                        "Uma explosão circular de vento atinge todos os inimigos próximos.",

                    area: "3 blocos ao redor",

                    effect:
                        "Dano de Vento + deslocamento aleatório de até 3 blocos."
                },

                {
                    name: "Queda do Céu",

                    type: "Área",

                    description:
                        "Hræsvelgr desaparece do campo e cai violentamente sobre uma grande região.",

                    area: "4 x 4 blocos",

                    effect:
                        "Dano massivo de Vento."
                },

                {
                    name: "Sopro do Abismo",

                    type: "Linha",

                    description:
                        "Hræsvelgr concentra o ar em uma corrente extremamente comprimida e dispara contra uma linha de inimigos.",

                    range: "6 blocos",

                    effect:
                        "Dano mágico de Vento e atravessa múltiplos alvos."
                },

                {
                    name: "O Uivo dos Céus",

                    type: "Controle Global",

                    description:
                        "Hræsvelgr libera uma onda de vento que domina o campo inteiro.",

                    effect:
                        "Todos os inimigos são empurrados 4 blocos."
                }
            ]
        },


        /* =================================================
           LEVEL 300 — EVOLUÍDO
        ================================================= */

        300: {

            form: "Evoluído",

            status: {
                HP: 135000,
                MP: 95000,
                EST: 165000,
                ATK: 460,
                "ATK MGC": 650,
                AGI: 360,
                DEF: 360,
                RES: 680,
                INT: 520
            },

            passive: {
                name: "Senhor dos Céus — Evolução",

                description:
                    "Enquanto estiver no ar, Hræsvelgr se torna imune a ataques corpo a corpo, recebe +3 AGI e ataques à distância sofrem -1 de precisão contra ele."
            },

            specialMechanic: {

                name: "Domínio dos Céus",

                description:
                    "A presença de Hræsvelgr altera o campo de batalha. Correntes de vento surgem em diferentes regiões do mapa.",

                effect:
                    "Zonas de Corrente podem alterar o movimento dos personagens e deslocá-los involuntariamente."
            },

            abilities: [

                {
                    name: "Tempestade do Devorador — Evoluída",

                    type: "Área",

                    range: "7 blocos",

                    description:
                        "Uma gigantesca rajada de vento atravessa o campo.",

                    effect:
                        "Dano elevado de Vento + empurrão de 4 blocos."
                },

                {
                    name: "Asas do Fim — Evoluída",

                    type: "Área",

                    area: "4 blocos ao redor",

                    description:
                        "Hræsvelgr transforma o espaço ao seu redor em uma zona de turbulência.",

                    effect:
                        "Dano + deslocamento aleatório de até 4 blocos."
                },

                {
                    name: "Queda do Céu — Evoluída",

                    type: "Área",

                    area: "5 x 5 blocos",

                    description:
                        "Hræsvelgr desaparece dos céus e retorna como uma catástrofe aérea.",

                    effect:
                        "Dano massivo de Vento + empurrão de 2 blocos."
                },

                {
                    name: "Sopro do Abismo",

                    type: "Linha",

                    range: "8 blocos",

                    description:
                        "Uma corrente de vento comprimido atravessa tudo em sua trajetória.",

                    effect:
                        "Atravessa jogadores, invocações e obstáculos destrutíveis."
                },

                {
                    name: "O Uivo dos Céus — Evoluído",

                    type: "Controle Global",

                    description:
                        "O uivo de Hræsvelgr produz uma gigantesca onda de choque.",

                    effect:
                        "Todos os inimigos são empurrados 5 blocos."
                }
            ]
        },


        /* =================================================
           LEVEL 400 — ULTIMATE BOSS
        ================================================= */

        400: {

            form: "Ultimate Boss",

            status: {
                HP: 350000,
                MP: 250000,
                EST: 450000,
                ATK: 950,
                "ATK MGC": 1300,
                AGI: 720,
                DEF: 850,
                RES: 1600,
                INT: 1150
            },

            passive: {

                name: "Senhor dos Céus — Ultimate",

                description:
                    "Enquanto estiver no ar, Hræsvelgr se torna imune a ataques corpo a corpo, recebe +5 AGI e ataques físicos à distância sofrem -2 de precisão contra ele."
            },

            ultimatePassive: {

                name: "Rei da Tempestade",

                description:
                    "Enquanto Hræsvelgr estiver no ar, todo o campo sofre influência de suas correntes de vento. A cada determinados turnos, novas zonas de corrente surgem no campo.",

                effect:
                    "As zonas podem alterar o movimento dos jogadores e deslocá-los involuntariamente."
            },

            abilities: [

                {
                    name: "Tempestade do Devorador — Absoluta",

                    type: "Área",

                    range: "8 blocos",

                    description:
                        "Hræsvelgr abre suas asas e libera uma tempestade capaz de atravessar uma enorme região do campo.",

                    effect:
                        "Dano massivo de Vento + empurrão de 5 blocos."
                },

                {
                    name: "Asas do Fim — Absoluta",

                    type: "Área",

                    area: "5 blocos ao redor",

                    description:
                        "As asas de Hræsvelgr provocam uma explosão de vento que desestabiliza completamente os inimigos.",

                    effect:
                        "Dano massivo + deslocamento aleatório de até 5 blocos."
                },

                {
                    name: "Queda do Céu — Absoluta",

                    type: "Área",

                    area: "7 x 7 blocos",

                    description:
                        "Hræsvelgr sobe aos céus e retorna como uma catástrofe colossal.",

                    effect:
                        "Dano extremo de Vento + empurrão de 3 blocos."
                },

                {
                    name: "Sopro do Abismo — Absoluto",

                    type: "Linha",

                    range: "10 blocos",

                    description:
                        "Hræsvelgr dispara uma corrente de vento comprimido de força devastadora.",

                    effect:
                        "Atravessa múltiplos alvos e obstáculos destrutíveis."
                },

                {
                    name: "O Uivo dos Céus — Absoluto",

                    type: "Controle Global",

                    description:
                        "Hræsvelgr libera o uivo definitivo do Devorador dos Céus.",

                    effect:
                        "Todos os inimigos são violentamente empurrados 6 blocos para longe de Hræsvelgr."
                },

                {
                    name: "Penas do Armagedon",

                    type: "Defesa Ultimate",

                    unlockLevel: 400,

                    duration: "2 turnos",

                    description:
                        "Quando Hræsvelgr utiliza O Uivo dos Céus, violentas correntes de vento se concentram sob suas penas.",

                    effect:
                        "Projéteis são repelidos antes de atingir Hræsvelgr durante 2 turnos."
                }
            ],

            ultimate: {

                name: "Fúria do Devorador dos Céus",

                type: "Ultimate",

                description:
                    "Hræsvelgr sobe aos céus e cria uma tempestade colossal que domina o campo de batalha.",

                effects: [

                    "Todos os inimigos sofrem dano massivo de Vento.",

                    "O campo recebe múltiplas Zonas de Corrente.",

                    "Os jogadores podem ser deslocados pelas correntes.",

                    "Todos os inimigos são empurrados.",

                    "Ao final da Ultimate, O Uivo dos Céus é ativado automaticamente."
                ]
            }
        }
    }
};


/* =========================================================
   FUNÇÃO AUXILIAR
   RETORNA OS DADOS DO HRÆSVELGR DE ACORDO COM O LEVEL
========================================================= */

function getHraesvelgrByLevel(level) {

    const validLevels = [12, 100, 200, 300, 400];

    if (!validLevels.includes(level)) {
        throw new Error(
            "Level inválido. Use: 12, 100, 200, 300 ou 400."
        );
    }

    return {
        ...HRAESVELGR,
        level: level,
        ...HRAESVELGR.levels[level]
    };
}
