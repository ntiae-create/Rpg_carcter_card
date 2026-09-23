/* =========================================================
   BOSS — HRÆSVELGR (CORRIGIDO)
   O DEVORADOR DOS CÉUS
   FORMATO: nome / afinidade / classeAfinidade /
   imagens / niveis (stats achatados) / passiva / habilidades
========================================================= */
const HRAESVELGR = {
    id: "hraesvelgr",
    nome: "Hræsvelgr",
    titulo: "O Devorador dos Céus",
    afinidade: "VENTO",
    classeAfinidade: "affinity-vento",
    tipo: "Boss Aéreo / Colossal",
    descricao: "A águia colossal cujo bater de asas cria o vento do mundo.",
    imagens: {
        base: "imagens/hraesvelgr.jpg",
        evolucao: "imagens/hraesvelgr.jpg",
        ultimate: "imagens/hraesvelgr.jpg"
    },
    niveis: {
        12: {
            hp: 180, mp: 180, est: 350,
            atk: 14, atkMgc: 18, agi: 18,
            def: 8, res: 35, int: 28,
            passiva: {
                nome: "Senhor dos Céus",
                descricao: "Enquanto estiver no ar, Hræsvelgr é imune a ataques corpo a corpo.",
                estado: "Sobrando pelos céus"
            },
            habilidades: [
                { nome: "Tempestade do Devorador", custo: { mp: 20, est: 30 }, efeito: "Rajada de vento em área (4 blocos). Dano de Vento + empurrão de 1 bloco." },
                { nome: "Asas do Fim", custo: { mp: 25, est: 35 }, efeito: "Explosão circular de vento (2 blocos ao redor). Dano + deslocamento aleatório." },
                { nome: "Queda do Céu", custo: { mp: 40, est: 50 }, efeito: "Sobe aos céus e despenca sobre área 3x3. Dano massivo de Vento." },
                { nome: "O Uivo dos Céus", custo: { mp: 30, est: 40 }, efeito: "Onda de choque global. Todos os inimigos são empurrados 2 blocos." }
            ]
        },
        100: {
            hp: 8500, mp: 7000, est: 12000,
            atk: 90, atkMgc: 120, agi: 85,
            def: 65, res: 140, int: 110,
            passiva: {
                nome: "Senhor dos Céus",
                descricao: "Imune a corpo a corpo no ar e recebe +1 AGI.",
                estado: "Sobrando pelos céus"
            },
            habilidades: [
                { nome: "Tempestade do Devorador", custo: { mp: 400, est: 600 }, efeito: "Rajada de vento (5 blocos). Dano de Vento + empurrão de 2 blocos." },
                { nome: "Asas do Fim", custo: { mp: 500, est: 700 }, efeito: "Explosão de vento (2 blocos). Dano + deslocamento aleatório até 2 blocos." },
                { nome: "Queda do Céu", custo: { mp: 800, est: 1000 }, efeito: "Despenca do céu em área 3x3. Dano massivo de Vento." },
                { nome: "O Uivo dos Céus", custo: { mp: 600, est: 800 }, efeito: "Onda de choque global. Todos empurrados 3 blocos." }
            ]
        },
        200: {
            hp: 40000, mp: 28000, est: 50000,
            atk: 200, atkMgc: 280, agi: 175,
            def: 150, res: 300, int: 240,
            passiva: {
                nome: "Senhor dos Céus II",
                descricao: "Imune a corpo a corpo no ar e recebe +2 AGI.",
                estado: "Sobrando pelos céus"
            },
            habilidades: [
                { nome: "Tempestade do Devorador", custo: { mp: 1500, est: 2200 }, efeito: "Corrente de vento poderosa (6 blocos). Empurrão de 3 blocos." },
                { nome: "Asas do Fim", custo: { mp: 1800, est: 2600 }, efeito: "Explosão circular (3 blocos). Deslocamento aleatório até 3 blocos." },
                { nome: "Queda do Céu", custo: { mp: 3000, est: 3800 }, efeito: "Queda sobre área 4x4. Dano massivo." },
                { nome: "Sopro do Abismo", custo: { mp: 2500, est: 2000 }, efeito: "Corrente de vento comprimida em linha (6 blocos). Atravessa alvos." },
                { nome: "O Uivo dos Céus", custo: { mp: 2200, est: 3000 }, efeito: "Vento domina o campo. Todos empurrados 4 blocos." }
            ]
        },
        300: {
            hp: 135000, mp: 95000, est: 165000,
            atk: 460, atkMgc: 650, agi: 360,
            def: 360, res: 680, int: 520,
            passiva: {
                nome: "Senhor dos Céus — Evolução",
                descricao: "Imune a corpo a corpo, +3 AGI, e ataques à distância têm -1 de precisão contra ele.",
                estado: "Domínio dos Céus ativo"
            },
            habilidades: [
                { nome: "Tempestade do Devorador — Evoluída", custo: { mp: 5000, est: 7000 }, efeito: "Gigantesca rajada (7 blocos). Empurrão de 4 blocos." },
                { nome: "Asas do Fim — Evoluída", custo: { mp: 6000, est: 8500 }, efeito: "Zona de turbulência (4 blocos). Deslocamento até 4 blocos." },
                { nome: "Queda do Céu — Evoluída", custo: { mp: 10000, est: 12000 }, efeito: "Catástrofe aérea em área 5x5. Dano massivo + empurrão 2." },
                { nome: "Sopro do Abismo", custo: { mp: 8000, est: 6500 }, efeito: "Linha (8 blocos). Atravessa jogadores, invocações e obstáculos." },
                { nome: "O Uivo dos Céus — Evoluído", custo: { mp: 7000, est: 9500 }, efeito: "Onda de choque gigante. Todos empurrados 5 blocos." }
            ]
        },
        400: {
            hp: 350000, mp: 250000, est: 450000,
            atk: 950, atkMgc: 1300, agi: 720,
            def: 850, res: 1600, int: 1150,
            passiva: {
                nome: "Senhor dos Céus — Ultimate",
                descricao: "Imune a corpo a corpo, +5 AGI, ataques físicos à distância têm -2 de precisão. Zonas de corrente surgem a cada turno.",
                estado: "Rei da Tempestade — FÚRIA"
            },
            habilidades: [
                { nome: "Tempestade do Devorador — Absoluta", custo: { mp: 12000, est: 17000 }, efeito: "Tempestade atravessa região enorme (8 blocos). Empurrão 5." },
                { nome: "Asas do Fim — Absoluta", custo: { mp: 15000, est: 20000 }, efeito: "Explosão desestabiliza inimigos (5 blocos). Deslocamento até 5." },
                { nome: "Queda do Céu — Absoluta", custo: { mp: 25000, est: 30000 }, efeito: "Catástrofe colossal em área 7x7. Dano extremo + empurrão 3." },
                { nome: "Sopro do Abismo — Absoluto", custo: { mp: 20000, est: 16000 }, efeito: "Linha (10 blocos). Atravessa múltiplos alvos e obstáculos." },
                { nome: "O Uivo dos Céus — Absoluto", custo: { mp: 18000, est: 24000 }, efeito: "Uivo definitivo. Todos empurrados 6 blocos." },
                { nome: "Penas do Armagedon", custo: { mp: 30000, est: 25000 }, efeito: "Defesa Ultimate: projéteis repelidos por 2 turnos." }
            ]
        }
    }
};
