/* =========================================================
   BOSS EFFECTS ENGINE
   CANVAS DE EFEITOS ATMOSFÉRICOS

   Arquitetura:

       BOSS CARD
           │
           ├── Canvas BACK
           │      atmosfera distante
           │
           ├── HTML NORMAL
           │      imagem / status / habilidades
           │
           └── Canvas FRONT
                  partículas em primeiro plano

   IMPORTANTE:

   O Canvas NÃO desenha a imagem do Boss.

   A imagem continua sendo:

       <img id="boss-image">

   O Canvas apenas cria a atmosfera ao redor
   e através do card.
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       CONFIGURAÇÃO
    ===================================================== */

    const CONFIG = {

        cardSelector: "#boss-card",

        backClass: "boss-effect-canvas-back",

        frontClass: "boss-effect-canvas-front",

        maxDpr: 2,

        /*
            Quantidade base de partículas.

            O valor é multiplicado pela intensidade
            correspondente ao nível do Boss.
        */
        baseParticles: 32,

        /*
            Velocidade máxima dos efeitos.
        */
        maxSpeed: 5,

        /*
            Intervalo mínimo entre atualizações
            do tamanho do Canvas.
        */
        resizeDelay: 100

    };


    /* =====================================================
       ESTADO
    ===================================================== */

    const estado = {

        iniciado: false,

        animando: false,

        tipo: "vento",

        afinidade: "VENTO",

        nivel: 12,

        intensidade: 1,

        card: null,

        canvasBack: null,

        canvasFront: null,

        ctxBack: null,

        ctxFront: null,

        largura: 0,

        altura: 0,

        dpr: 1,

        animationFrame: null,

        ultimoTempo: 0,

        resizeTimer: null,

        resizeObserver: null,

        particlesBack: [],

        particlesFront: [],

        flashes: [],

        ondas: [],

        pontos: []

    };


    /* =====================================================
       UTILITÁRIOS
    ===================================================== */

    function aleatorio(min, max) {

        return Math.random() * (max - min) + min;

    }


    function inteiro(min, max) {

        return Math.floor(
            aleatorio(min, max + 1)
        );

    }


    function limitar(valor, min, max) {

        return Math.max(
            min,
            Math.min(max, valor)
        );

    }


    function distancia(x1, y1, x2, y2) {

        const dx = x2 - x1;
        const dy = y2 - y1;

        return Math.sqrt(
            dx * dx + dy * dy
        );

    }


    /* =====================================================
       INTENSIDADE POR NÍVEL
    ===================================================== */

    function obterIntensidadeNivel(nivel) {

        const n = Number(nivel);

        if (n >= 400) {
            return 4;
        }

        if (n >= 300) {
            return 3.2;
        }

        if (n >= 200) {
            return 2.3;
        }

        if (n >= 100) {
            return 1.5;
        }

        return 1;

    }


    /* =====================================================
       TIPO POR AFINIDADE
    ===================================================== */

    function resolverTipoPorAfinidade(afinidade) {

        if (!afinidade) {
            return "magico";
        }

        const texto = String(afinidade)
            .trim()
            .toLowerCase();

        if (
            texto.includes("agua") ||
            texto.includes("água")
        ) {
            return "agua";
        }

        if (
            texto.includes("veneno") ||
            texto.includes("poison")
        ) {
            return "veneno";
        }

        if (
            texto.includes("fogo") ||
            texto.includes("fire")
        ) {
            return "fogo";
        }

        if (
            texto.includes("vento") ||
            texto.includes("wind")
        ) {
            return "vento";
        }

        if (
            texto.includes("gelo") ||
            texto.includes("ice")
        ) {
            return "gelo";
        }

        if (
            texto.includes("raio") ||
            texto.includes("eletrico") ||
            texto.includes("elétrico") ||
            texto.includes("eletric") ||
            texto.includes("lightning")
        ) {
            return "raio";
        }

        if (
            texto.includes("trevas") ||
            texto.includes("sombra") ||
            texto.includes("dark")
        ) {
            return "trevas";
        }

        if (
            texto.includes("luz") ||
            texto.includes("light")
        ) {
            return "luz";
        }

        if (
            texto.includes("terra") ||
            texto.includes("earth")
        ) {
            return "terra";
        }

        if (
            texto.includes("fisico") ||
            texto.includes("físico")
        ) {
            return "terra";
        }

        if (
            texto.includes("magico") ||
            texto.includes("mágico") ||
            texto.includes("arcano")
        ) {
            return "magico";
        }

        /*
            Skoll & Hati:

            "LUZ / TREVAS"
            "Luz/Trevas"
            etc.
        */

        if (
            texto.includes("/") &&
            (
                texto.includes("luz") ||
                texto.includes("trevas")
            )
        ) {
            return "dual";
        }

        return "magico";

    }


    /* =====================================================
       CRIAÇÃO DOS CANVAS
    ===================================================== */

    function criarCanvas() {

        if (!estado.card) {
            return false;
        }


        /*
            Evita duplicação caso o sistema
            seja iniciado novamente.
        */

        let back = estado.card.querySelector(
            "." + CONFIG.backClass
        );

        let front = estado.card.querySelector(
            "." + CONFIG.frontClass
        );


        if (!back) {

            back = document.createElement("canvas");

            back.className =
                CONFIG.backClass;

            back.setAttribute(
                "aria-hidden",
                "true"
            );

            estado.card.prepend(back);

        }


        if (!front) {

            front = document.createElement("canvas");

            front.className =
                CONFIG.frontClass;

            front.setAttribute(
                "aria-hidden",
                "true"
            );

            estado.card.appendChild(front);

        }


        estado.canvasBack = back;
        estado.canvasFront = front;


        estado.ctxBack =
            back.getContext("2d", {
                alpha: true
            });


        estado.ctxFront =
            front.getContext("2d", {
                alpha: true
            });


        if (
            !estado.ctxBack ||
            !estado.ctxFront
        ) {

            console.error(
                "[BossEffects] Não foi possível criar os contextos Canvas."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       REDIMENSIONAMENTO
    ===================================================== */

    function redimensionar() {

        if (
            !estado.card ||
            !estado.canvasBack ||
            !estado.canvasFront
        ) {
            return;
        }


        const rect =
            estado.card.getBoundingClientRect();


        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {
            return;
        }


        estado.largura = rect.width;
        estado.altura = rect.height;


        estado.dpr = Math.min(
            window.devicePixelRatio || 1,
            CONFIG.maxDpr
        );


        configurarCanvas(
            estado.canvasBack,
            estado.ctxBack
        );


        configurarCanvas(
            estado.canvasFront,
            estado.ctxFront
        );


        criarParticulas();

    }


    function configurarCanvas(canvas, ctx) {

        canvas.width =
            Math.round(
                estado.largura *
                estado.dpr
            );

        canvas.height =
            Math.round(
                estado.altura *
                estado.dpr
            );


        canvas.style.width =
            estado.largura + "px";

        canvas.style.height =
            estado.altura + "px";


        ctx.setTransform(
            estado.dpr,
            0,
            0,
            estado.dpr,
            0,
            0
        );

    }


    /* =====================================================
       OBSERVADOR DO TAMANHO
    ===================================================== */

    function iniciarResizeObserver() {

        if (
            typeof ResizeObserver === "undefined"
        ) {
            window.addEventListener(
                "resize",
                agendarRedimensionamento
            );

            return;
        }


        if (estado.resizeObserver) {

            estado.resizeObserver.disconnect();

        }


        estado.resizeObserver =
            new ResizeObserver(() => {

                agendarRedimensionamento();

            });


        estado.resizeObserver.observe(
            estado.card
        );

    }


    function agendarRedimensionamento() {

        clearTimeout(
            estado.resizeTimer
        );


        estado.resizeTimer =
            setTimeout(() => {

                redimensionar();

            }, CONFIG.resizeDelay);

    }


    /* =====================================================
       PARTÍCULAS
    ===================================================== */

    function criarParticulas() {

        estado.particlesBack = [];
        estado.particlesFront = [];


        const quantidade =
            Math.round(
                CONFIG.baseParticles *
                estado.intensidade
            );


        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            estado.particlesBack.push(
                criarParticula("back")
            );

        }


        for (
            let i = 0;
            i < Math.round(quantidade * 0.65);
            i++
        ) {

            estado.particlesFront.push(
                criarParticula("front")
            );

        }

    }


    function criarParticula(camada) {

        const tipo =
            estado.tipo;


        /*
            VENTO
        */

        if (tipo === "vento") {

            return {

                x: aleatorio(
                    -estado.largura * 0.2,
                    estado.largura * 1.2
                ),

                y: aleatorio(
                    0,
                    estado.altura
                ),

                comprimento: aleatorio(
                    25,
                    90
                ),

                velocidade: aleatorio(
                    1.2,
                    3.8
                ) * estado.intensidade,

                espessura: aleatorio(
                    0.5,
                    1.8
                ),

                curva: aleatorio(
                    -0.4,
                    0.4
                ),

                alpha: aleatorio(
                    0.12,
                    0.45
                ),

                fase: aleatorio(
                    0,
                    Math.PI * 2
                ),

                camada

            };

        }


        /*
            PADRÃO GENÉRICO
        */

        return {

            x: aleatorio(
                0,
                estado.largura
            ),

            y: aleatorio(
                0,
                estado.altura
            ),

            vx: aleatorio(
                -1,
                1
            ),

            vy: aleatorio(
                -1,
                1
            ),

            tamanho: aleatorio(
                1,
                4
            ),

            alpha: aleatorio(
                0.1,
                0.5
            ),

            fase: aleatorio(
                0,
                Math.PI * 2
            ),

            camada

        };

    }


    /* =====================================================
       LIMPAR CANVAS
    ===================================================== */

    function limparCanvas(ctx) {

        if (!ctx) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            estado.largura,
            estado.altura
        );

    }


    /* =====================================================
       EFEITO — VENTO
    ===================================================== */

    function efeitoVento(
        ctx,
        particulas,
        tempo,
        camada
    ) {

        if (!ctx) {
            return;
        }


        ctx.save();


        /*
            Mistura visual.
        */

        ctx.globalCompositeOperation =
            "lighter";


        /*
            Intensidade do nível.
        */

        const intensidade =
            estado.intensidade;


        for (
            const p of particulas
        ) {

            /*
                Movimento principal.
            */

            p.x +=
                p.velocidade *
                intensidade;


            /*
                Movimento ondulatório.

                Isso impede que pareça apenas
                linhas retas atravessando o card.
            */

            const onda =
                Math.sin(
                    tempo * 0.0018 +
                    p.fase +
                    p.x * 0.012
                );


            p.y +=
                onda *
                p.curva *
                intensidade;


            /*
                Reinicia quando sai pela direita.
            */

            if (
                p.x >
                estado.largura + 120
            ) {

                p.x =
                    -p.comprimento -
                    aleatorio(10, 120);

                p.y =
                    aleatorio(
                        0,
                        estado.altura
                    );

            }


            /*
                Mantém o efeito dentro do card.
            */

            if (
                p.y < -40
            ) {

                p.y =
                    estado.altura + 40;

            }


            if (
                p.y >
                estado.altura + 40
            ) {

                p.y = -40;

            }


            /*
                Direção do vento.

                A curvatura muda levemente
                conforme a altura.
            */

            const inclinacao =
                -0.12 +
                Math.sin(
                    p.y * 0.006 +
                    tempo * 0.0005
                ) * 0.05;


            const x2 =
                p.x +
                p.comprimento;


            const y2 =
                p.y +
                p.comprimento *
                inclinacao;


            /*
                Gradiente da corrente.
            */

            const grad =
                ctx.createLinearGradient(
                    p.x,
                    p.y,
                    x2,
                    y2
                );


            grad.addColorStop(
                0,
                "rgba(170,225,255,0)"
            );


            grad.addColorStop(
                0.35,
                `rgba(170,225,255,${p.alpha})`
            );


            grad.addColorStop(
                0.75,
                `rgba(220,245,255,${p.alpha * 0.75})`
            );


            grad.addColorStop(
                1,
                "rgba(170,225,255,0)"
            );


            ctx.beginPath();

            ctx.moveTo(
                p.x,
                p.y
            );


            /*
                Curva de Bézier.
            */

            const controleX =
                p.x +
                p.comprimento * 0.5;


            const controleY =
                p.y +
                Math.sin(
                    tempo * 0.001 +
                    p.fase
                ) *
                10 *
                intensidade;


            ctx.quadraticCurveTo(
                controleX,
                controleY,
                x2,
                y2
            );


            ctx.strokeStyle =
                grad;


            ctx.lineWidth =
                p.espessura *
                (camada === "front"
                    ? 1.15
                    : 0.8);


            ctx.stroke();

        }


        ctx.restore();

    }


    /* =====================================================
       EFEITO — ÁGUA
    ===================================================== */

    function efeitoAgua(
        ctx,
        particulas,
        tempo
    ) {

        /*
            Base preparada para a próxima etapa.

            A água receberá:
            - gotas
            - ondas
            - partículas
            - reflexos
        */

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "agua"
        );

    }


    /* =====================================================
       EFEITO — VENENO
    ===================================================== */

    function efeitoVeneno(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "veneno"
        );

    }


    /* =====================================================
       EFEITO — FOGO
    ===================================================== */

    function efeitoFogo(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "fogo"
        );

    }


    /* =====================================================
       EFEITO — GELO
    ===================================================== */

    function efeitoGelo(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "gelo"
        );

    }


    /* =====================================================
       EFEITO — RAIO
    ===================================================== */

    function efeitoRaio(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "raio"
        );

    }


    /* =====================================================
       EFEITO — TREVAS
    ===================================================== */

    function efeitoTrevas(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "trevas"
        );

    }


    /* =====================================================
       EFEITO — LUZ
    ===================================================== */

    function efeitoLuz(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "luz"
        );

    }


    /* =====================================================
       EFEITO — TERRA
    ===================================================== */

    function efeitoTerra(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "terra"
        );

    }


    /* =====================================================
       EFEITO — MÁGICO
    ===================================================== */

    function efeitoMagico(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "magico"
        );

    }


    /* =====================================================
       EFEITO — DUAL
       LUZ + TREVAS
    ===================================================== */

    function efeitoDual(
        ctx,
        particulas,
        tempo
    ) {

        efeitoParticulasGenerico(
            ctx,
            particulas,
            tempo,
            "dual"
        );

    }


    /* =====================================================
       EFEITO — GENÉRICO
       
       Temporário para os elementos que ainda receberão
       seus sistemas visuais específicos.
    ===================================================== */

    function efeitoParticulasGenerico(
        ctx,
        particulas,
        tempo,
        tipo
    ) {

        if (!ctx) {
            return;
        }


        ctx.save();

        ctx.globalCompositeOperation =
            "lighter";


        for (
            const p of particulas
        ) {

            /*
                Movimento simples.
            */

            p.x +=
                (p.vx || 0) *
                estado.intensidade;

            p.y +=
                (p.vy || 0) *
                estado.intensidade;


            /*
                Loop.
            */

            if (
                p.x < -20
            ) {
                p.x =
                    estado.largura + 20;
            }

            if (
                p.x >
                estado.largura + 20
            ) {
                p.x = -20;
            }

            if (
                p.y < -20
            ) {
                p.y =
                    estado.altura + 20;
            }

            if (
                p.y >
                estado.altura + 20
            ) {
                p.y = -20;
            }


            /*
                Pulsação.
            */

            const pulsar =
                0.75 +
                Math.sin(
                    tempo * 0.002 +
                    p.fase
                ) *
                0.25;


            const tamanho =
                (p.tamanho || 2) *
                pulsar;


            let preenchimento;


            switch (tipo) {

                case "agua":
                    preenchimento =
                        `rgba(80,190,255,${p.alpha})`;
                    break;

                case "veneno":
                    preenchimento =
                        `rgba(90,255,100,${p.alpha})`;
                    break;

                case "fogo":
                    preenchimento =
                        `rgba(255,150,50,${p.alpha})`;
                    break;

                case "gelo":
                    preenchimento =
                        `rgba(190,240,255,${p.alpha})`;
                    break;

                case "raio":
                    preenchimento =
                        `rgba(150,220,255,${p.alpha})`;
                    break;

                case "trevas":
                    preenchimento =
                        `rgba(150,70,255,${p.alpha})`;
                    break;

                case "luz":
                    preenchimento =
                        `rgba(255,225,130,${p.alpha})`;
                    break;

                case "terra":
                    preenchimento =
                        `rgba(180,140,90,${p.alpha})`;
                    break;

                case "dual":
                    preenchimento =
                        `rgba(210,180,255,${p.alpha})`;
                    break;

                default:
                    preenchimento =
                        `rgba(180,180,255,${p.alpha})`;

            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                tamanho,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                preenchimento;

            ctx.fill();

        }


        ctx.restore();

    }


    /* =====================================================
       DESENHO DE UMA CAMADA
    ===================================================== */

    function desenharCamada(
        ctx,
        particulas,
        tempo,
        camada
    ) {

        if (!ctx) {
            return;
        }


        switch (estado.tipo) {

            case "vento":

                efeitoVento(
                    ctx,
                    particulas,
                    tempo,
                    camada
                );

                break;


            case "agua":

                efeitoAgua(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "veneno":

                efeitoVeneno(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "fogo":

                efeitoFogo(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "gelo":

                efeitoGelo(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "raio":

                efeitoRaio(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "trevas":

                efeitoTrevas(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "luz":

                efeitoLuz(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "terra":

                efeitoTerra(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "magico":

                efeitoMagico(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            case "dual":

                efeitoDual(
                    ctx,
                    particulas,
                    tempo
                );

                break;


            default:

                efeitoMagico(
                    ctx,
                    particulas,
                    tempo
                );

        }

    }


    /* =====================================================
       LOOP PRINCIPAL
    ===================================================== */

    function loop(tempo) {

        if (!estado.animando) {
            return;
        }


        estado.ultimoTempo =
            tempo;


        /*
            Limpa as duas camadas.
        */

        limparCanvas(
            estado.ctxBack
        );


        limparCanvas(
            estado.ctxFront
        );


        /*
            Desenha atmosfera distante.
        */

        desenharCamada(
            estado.ctxBack,
            estado.particlesBack,
            tempo,
            "back"
        );


        /*
            Desenha partículas frontais.
        */

        desenharCamada(
            estado.ctxFront,
            estado.particlesFront,
            tempo,
            "front"
        );


        estado.animationFrame =
            requestAnimationFrame(
                loop
            );

    }


    /* =====================================================
       INICIAR
    ===================================================== */

    function iniciar(opcoes = {}) {

        /*
            Localiza o card.
        */

        estado.card =
            document.querySelector(
                CONFIG.cardSelector
            );


        if (!estado.card) {

            console.warn(
                "[BossEffects] #boss-card não encontrado."
            );

            return false;

        }


        /*
            Define afinidade.
        */

        if (opcoes.afinidade) {

            estado.afinidade =
                opcoes.afinidade;

            estado.tipo =
                resolverTipoPorAfinidade(
                    opcoes.afinidade
                );

        }


        /*
            Define tipo diretamente.
        */

        if (opcoes.tipo) {

            estado.tipo =
                String(
                    opcoes.tipo
                ).toLowerCase();

        }


        /*
            Define nível.
        */

        if (opcoes.nivel) {

            estado.nivel =
                Number(
                    opcoes.nivel
                );

        }


        estado.intensidade =
            obterIntensidadeNivel(
                estado.nivel
            );


        /*
            Cria Canvas.
        */

        if (!criarCanvas()) {

            return false;

        }


        /*
            Configura tamanho.
        */

        redimensionar();


        /*
            Observa alterações de tamanho.
        */

        iniciarResizeObserver();


        /*
            Inicia animação.
        */

        estado.iniciado = true;
        estado.animando = true;


        if (
            estado.animationFrame
        ) {

            cancelAnimationFrame(
                estado.animationFrame
            );

        }


        estado.animationFrame =
            requestAnimationFrame(
                loop
            );


        return true;

    }


    /* =====================================================
       PARAR
    ===================================================== */

    function parar() {

        estado.animando = false;


        if (
            estado.animationFrame
        ) {

            cancelAnimationFrame(
                estado.animationFrame
            );

            estado.animationFrame =
                null;

        }

    }


    /* =====================================================
       DEFINIR TIPO
    ===================================================== */

    function definirTipo(tipo) {

        if (!tipo) {
            return;
        }


        estado.tipo =
            String(
                tipo
            ).toLowerCase();


        if (!estado.iniciado) {
            return;
        }


        criarParticulas();

    }


    /* =====================================================
       DEFINIR AFINIDADE
    ===================================================== */

    function definirAfinidade(
        afinidade
    ) {

        if (!afinidade) {
            return;
        }


        estado.afinidade =
            afinidade;


        estado.tipo =
            resolverTipoPorAfinidade(
                afinidade
            );


        if (!estado.iniciado) {
            return;
        }


        criarParticulas();

    }


    /* =====================================================
       DEFINIR NÍVEL
    ===================================================== */

    function definirNivel(
        nivel
    ) {

        const novoNivel =
            Number(nivel);


        if (
            !Number.isFinite(
                novoNivel
            )
        ) {
            return;
        }


        estado.nivel =
            novoNivel;


        estado.intensidade =
            obterIntensidadeNivel(
                novoNivel
            );


        if (!estado.iniciado) {
            return;
        }


        criarParticulas();

    }


    /* =====================================================
       OBTER ESTADO
    ===================================================== */

    function obterEstado() {

        return {

            iniciado:
                estado.iniciado,

            animando:
                estado.animando,

            tipo:
                estado.tipo,

            afinidade:
                estado.afinidade,

            nivel:
                estado.nivel,

            intensidade:
                estado.intensidade,

            largura:
                estado.largura,

            altura:
                estado.altura

        };

    }


    /* =====================================================
       API PÚBLICA
    ===================================================== */

    window.BossEffects = {

        iniciar,

        parar,

        definirTipo,

        definirNivel,

        definirAfinidade,

        redimensionar,

        resolverTipoPorAfinidade,

        estado:
            obterEstado

    };


})();
