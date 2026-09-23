// =========================================================
// HRÆSvelgr
// BOSS DATA
// =========================================================
//
// Este arquivo contém SOMENTE os dados e efeitos próprios
// do Hræsvelgr.
//
// O sistema geral fica em:
// - boss-state.js
// - boss-render.js
// - boss-combat.js
// - boss-skills.js
// - boss-events.js
// =========================================================


const HRAESVELGR = {

    id: "hraesvelgr",

    nome: "Hræsvelgr",

    afinidade: "VENTO",

    classeAfinidade: "affinity-vento",

    tipo: "Boss",

    descricao:
        "O Devorador dos Céus.",


    // =====================================================
    // IMAGENS
    // =====================================================

    imagens: {

        base:
            "hraesvelgr.png",

        evolucao:
            "hraesvelgr-evolucao.png",

        ultimate:
            "hraesvelgr-ultimate.png"

    },


    // =====================================================
    // NÍVEIS
    // =====================================================

    niveis: {


        // =================================================
        // NÍVEL 12
        // =================================================

        12: {

            hp: 180,
            mp: 180,
            est: 350,

            atk: 14,
            atkMgc: 18,
            agi: 18,
            def: 8,
            res: 35,
            int: 28,


            passiva: {

                nome:
                    "Rei dos Céus",

                descricao:
                    "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo."

            },


            habilidades: [

                {

                    nome:
                        "Tempestade do Devorador",

                    custo: {

                        mp: 35,
                        est: 30

                    },

                    descricao:
                        "Invoca uma tempestade de vento que atinge todos os inimigos.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo: "area",

                            efeito:
                                "vento",

                            mensagem:
                                "Hræsvelgr invoca uma tempestade devastadora."

                        };

                    }

                },


                {

                    nome:
                        "Asas do Fim",

                    custo: {

                        mp: 25,
                        est: 20

                    },

                    descricao:
                        "Bate suas asas violentamente, lançando uma poderosa rajada de vento.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo: "empurrao",

                            mensagem:
                                "As asas de Hræsvelgr lançam uma rajada que repele os inimigos."

                        };

                    }

                },


                {

                    nome:
                        "Queda do Céu",

                    custo: {

                        mp: 30,
                        est: 35

                    },

                    descricao:
                        "Hræsvelgr mergulha dos céus contra o campo de batalha.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo: "impacto",

                            mensagem:
                                "Hræsvelgr despenca dos céus sobre o campo de batalha."

                        };

                    }

                },


                {

                    nome:
                        "O Uivo dos Céus",

                    custo: {

                        mp: 45,
                        est: 40

                    },

                    descricao:
                        "Um uivo colossal cria uma onda de vento que empurra todos os inimigos para longe.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo: "repulsao",

                            alvo: "todos",

                            distancia:
                                "grande",

                            mensagem:
                                "O Uivo dos Céus repele todos os inimigos."

                        };

                    }

                },


                {

                    nome:
                        "Sopro do Abismo",

                    custo: {

                        mp: 55,
                        est: 45

                    },

                    descricao:
                        "Libera uma rajada concentrada de vento contra uma grande área.",

                    executar({
                        estado
                    }) {

                        return {

                            tipo: "area",

                            elemento:
                                "vento",

                            mensagem:
                                "Hræsvelgr libera o Sopro do Abismo."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 100
        // =================================================

        100: {

            hp: 8500,
            mp: 7000,
            est: 12000,

            atk: 90,
            atkMgc: 120,
            agi: 85,
            def: 65,
            res: 140,
            int: 110,


            passiva: {

                nome:
                    "Rei dos Céus — Domínio Aéreo",

                descricao:
                    "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo. Sua presença nos céus também aumenta sua resistência aos efeitos negativos."

            },


            habilidades: [

                {

                    nome:
                        "Tempestade do Devorador",

                    custo: {

                        mp: 450,
                        est: 350

                    },

                    descricao:
                        "Uma tempestade de vento cobre uma grande área do campo.",

                    executar() {

                        return {

                            tipo: "area",

                            mensagem:
                                "Uma gigantesca tempestade toma o campo."

                        };

                    }

                },


                {

                    nome:
                        "Asas do Fim",

                    custo: {

                        mp: 350,
                        est: 300

                    },

                    descricao:
                        "Uma poderosa rajada de vento repele os inimigos.",

                    executar() {

                        return {

                            tipo: "repulsao",

                            mensagem:
                                "As asas de Hræsvelgr lançam todos para trás."

                        };

                    }

                },


                {

                    nome:
                        "Queda do Céu",

                    custo: {

                        mp: 500,
                        est: 450

                    },

                    descricao:
                        "Hræsvelgr mergulha em velocidade extrema contra o campo.",

                    executar() {

                        return {

                            tipo: "impacto",

                            mensagem:
                                "Hræsvelgr cai dos céus como um meteoro."

                        };

                    }

                },


                {

                    nome:
                        "O Uivo dos Céus",

                    custo: {

                        mp: 700,
                        est: 600

                    },

                    descricao:
                        "Seu uivo cria uma onda de choque de vento que afasta todos os inimigos.",

                    executar() {

                        return {

                            tipo: "repulsao",

                            alvo: "todos",

                            mensagem:
                                "O Uivo dos Céus explode pelo campo."

                        };

                    }

                },


                {

                    nome:
                        "Sopro do Abismo",

                    custo: {

                        mp: 850,
                        est: 700

                    },

                    descricao:
                        "Um sopro concentrado de vento destrói uma grande área.",

                    executar() {

                        return {

                            tipo: "area",

                            mensagem:
                                "O Sopro do Abismo atravessa o campo."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 200
        // =================================================

        200: {

            hp: 40000,
            mp: 28000,
            est: 50000,

            atk: 200,
            atkMgc: 280,
            agi: 175,
            def: 150,
            res: 300,
            int: 240,


            passiva: {

                nome:
                    "Rei dos Céus — Soberania Aérea",

                descricao:
                    "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo. Sua presença aérea reduz a duração dos efeitos negativos recebidos.",

            },


            habilidades: [

                {

                    nome:
                        "Tempestade do Devorador",

                    custo: {
                        mp: 1600,
                        est: 1200
                    },

                    descricao:
                        "Uma tempestade colossal envolve o campo.",

                    executar() {

                        return {

                            tipo: "area",

                            mensagem:
                                "O céu inteiro parece se transformar em uma tempestade."

                        };

                    }

                },


                {

                    nome:
                        "Asas do Fim",

                    custo: {
                        mp: 1200,
                        est: 1000
                    },

                    descricao:
                        "Uma rajada monstruosa repele os inimigos.",

                    executar() {

                        return {

                            tipo: "repulsao",

                            distancia:
                                "extrema",

                            mensagem:
                                "Uma rajada brutal arremessa os inimigos para longe."

                        };

                    }

                },


                {

                    nome:
                        "Queda do Céu",

                    custo: {
                        mp: 1800,
                        est: 1600
                    },

                    descricao:
                        "Hræsvelgr mergulha contra o campo em velocidade devastadora.",

                    executar() {

                        return {

                            tipo: "impacto",

                            mensagem:
                                "Hræsvelgr despenca dos céus."

                        };

                    }

                },


                {

                    nome:
                        "O Uivo dos Céus",

                    custo: {
                        mp: 2200,
                        est: 1900
                    },

                    descricao:
                        "Um uivo colossal repele todos os inimigos.",

                    executar() {

                        return {

                            tipo: "repulsao",

                            alvo:
                                "todos",

                            mensagem:
                                "O Uivo dos Céus atravessa todo o campo."

                        };

                    }

                },


                {

                    nome:
                        "Sopro do Abismo",

                    custo: {
                        mp: 2600,
                        est: 2200
                    },

                    descricao:
                        "Concentra uma enorme quantidade de energia de vento em uma área.",

                    executar() {

                        return {

                            tipo: "area",

                            mensagem:
                                "O Sopro do Abismo devasta uma enorme área."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 300
        // =================================================

        300: {

            hp: 135000,
            mp: 95000,
            est: 165000,

            atk: 460,
            atkMgc: 650,
            agi: 360,
            def: 360,
            res: 680,
            int: 520,


            passiva: {

                nome:
                    "Rei da Tempestade",

                descricao:
                    "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo. Sua presença domina o campo aéreo e reduz drasticamente a duração de efeitos negativos.",

            },


            habilidades: [

                {

                    nome:
                        "Tempestade do Devorador",

                    custo: {
                        mp: 5000,
                        est: 4000
                    },

                    descricao:
                        "Uma tempestade gigantesca cobre o campo de batalha.",

                    executar() {

                        return {

                            tipo: "area",

                            mensagem:
                                "Uma tempestade colossal desce sobre o campo."

                        };

                    }

                },


                {

                    nome:
                        "Asas do Fim",

                    custo: {
                        mp: 4000,
                        est: 3500
                    },

                    descricao:
                        "Uma explosão de vento repele violentamente todos os inimigos.",

                    executar() {

                        return {

                            tipo: "repulsao",

                            alvo:
                                "todos",

                            distancia:
                                "extrema",

                            mensagem:
                                "As asas de Hræsvelgr varrem o campo."

                        };

                    }

                },


                {

                    nome:
                        "Queda do Céu",

                    custo: {
                        mp: 5500,
                        est: 5000
                    },

                    descricao:
                        "Hræsvelgr cai dos céus em uma investida devastadora.",

                    executar() {

                        return {

                            tipo: "impacto",

                            mensagem:
                                "O céu treme quando Hræsvelgr inicia sua queda."

                        };

                    }

                },


                {

                    nome:
                        "Domínio dos Céus",

                    custo: {
                        mp: 6500,
                        est: 5500
                    },

                    descricao:
                        "Hræsvelgr assume o domínio absoluto do espaço aéreo.",

                    executar({
                        estado
                    }) {

                        estado.reflexo = true;

                        return {

                            tipo:
                                "estado",

                            estado:
                                "dominio-dos-ceus",

                            mensagem:
                                "Hræsvelgr assume o domínio dos céus."

                        };

                    }

                },


                {

                    nome:
                        "O Uivo dos Céus",

                    custo: {
                        mp: 7500,
                        est: 6500
                    },

                    descricao:
                        "Um uivo colossal cria uma onda de choque capaz de afastar todos os inimigos.",

                    executar() {

                        return {

                            tipo:
                                "repulsao",

                            alvo:
                                "todos",

                            mensagem:
                                "O Uivo dos Céus explode pelo campo."

                        };

                    }

                }

            ]

        },


        // =================================================
        // NÍVEL 400
        // =================================================

        400: {

            hp: 350000,
            mp: 250000,
            est: 450000,

            atk: 950,
            atkMgc: 1300,
            agi: 720,
            def: 850,
            res: 1600,
            int: 1150,


            passiva: {

                nome:
                    "Rei da Tempestade",

                descricao:
                    "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo. Sua presença domina completamente o campo aéreo e reduz drasticamente a duração dos efeitos negativos.",

            },


            habilidades: [

                {

                    nome:
                        "Tempestade do Devorador",

                    custo: {
                        mp: 12000,
                        est: 10000
                    },

                    descricao:
                        "Uma tempestade apocalíptica cobre todo o campo.",

                    executar() {

                        return {

                            tipo:
                                "area",

                            escala:
                                "apocaliptica",

                            mensagem:
                                "O céu desaparece sob a Tempestade do Devorador."

                        };

                    }

                },


                {

                    nome:
                        "Asas do Fim",

                    custo: {
                        mp: 10000,
                        est: 8500
                    },

                    descricao:
                        "Hræsvelgr libera uma onda de vento colossal que repele todos os inimigos.",

                    executar() {

                        return {

                            tipo:
                                "repulsao",

                            alvo:
                                "todos",

                            distancia:
                                "extrema",

                            mensagem:
                                "As Asas do Fim varrem o campo inteiro."

                        };

                    }

                },


                {

                    nome:
                        "Queda do Céu",

                    custo: {
                        mp: 14000,
                        est: 12000
                    },

                    descricao:
                        "Hræsvelgr mergulha dos céus com força devastadora.",

                    executar() {

                        return {

                            tipo:
                                "impacto",

                            escala:
                                "apocaliptica",

                            mensagem:
                                "Hræsvelgr cai dos céus como a própria destruição."

                        };

                    }

                },


                {

                    nome:
                        "O Uivo dos Céus",

                    custo: {
                        mp: 16000,
                        est: 14000
                    },

                    descricao:
                        "Um uivo monstruoso repele todos os inimigos e ativa as Penas do Armagedon.",

                    executar({
                        estado
                    }) {

                        estado.reflexo = true;

                        return {

                            tipo:
                                "repulsao",

                            alvo:
                                "todos",

                            armagedon:
                                true,

                            duracao:
                                2,

                            mensagem:
                                "O Uivo dos Céus ativa as Penas do Armagedon."

                        };

                    }

                },


                {

                    nome:
                        "Fúria do Devorador dos Céus",

                    custo: {
                        mp: 25000,
                        est: 22000
                    },

                    descricao:
                        "Hræsvelgr libera toda a sua força, transformando o campo em um domínio absoluto de vento.",

                    executar({
                        estado
                    }) {

                        estado.enfurecido = true;

                        return {

                            tipo:
                                "ultimate",

                            elemento:
                                "vento",

                            mensagem:
                                "Hræsvelgr libera a Fúria do Devorador dos Céus."

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
//
// O boss-state.js utiliza HRAESVELGR diretamente.
// Mantemos também uma referência global para facilitar
// futuras integrações.
// =========================================================

window.HRAESVELGR = HRAESVELGR;
