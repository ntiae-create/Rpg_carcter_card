/* =========================================================
   BOSS SKILLS
   MOTOR UNIVERSAL DE HABILIDADES

   Responsabilidades:
   - Descobrir o Boss atual
   - Descobrir o nível atual
   - Buscar a habilidade correta
   - Identificar o membro responsável pela habilidade
   - Verificar custos
   - Verificar se o membro está vivo
   - Executar a habilidade
   - Consumir MP / EST
========================================================= */


/* =========================================================
   BUSCAR HABILIDADE
========================================================= */

function obterHabilidade(indice) {

    const boss = BossState.obterBoss();
    const nivel = BossState.obterNivel();

    if (!boss) {
        console.warn("[BossSkills] Nenhum Boss ativo.");
        return null;
    }

    if (!boss.niveis?.[nivel]) {
        console.warn(
            `[BossSkills] O Boss ${boss.nome} não possui o nível ${nivel}.`
        );

        return null;
    }

    const habilidades = boss.niveis[nivel].habilidades;

    if (!Array.isArray(habilidades)) {
        console.warn(
            `[BossSkills] O Boss ${boss.nome} não possui habilidades configuradas.`
        );

        return null;
    }

    return habilidades[indice] || null;
}


/* =========================================================
   TODAS AS HABILIDADES DO BOSS ATUAL
========================================================= */

function obterHabilidades() {

    const boss = BossState.obterBoss();
    const nivel = BossState.obterNivel();

    if (!boss?.niveis?.[nivel]) {
        return [];
    }

    return boss.niveis[nivel].habilidades || [];
}


/* =========================================================
   IDENTIFICAR MEMBRO DA HABILIDADE
========================================================= */

function obterMembroDaHabilidade(habilidade) {

    if (!habilidade) {
        return null;
    }

    /*
       Boss único:
       não possui membro.
    */

    if (!habilidade.membro) {
        return null;
    }

    return habilidade.membro;
}


/* =========================================================
   RESOLVER MEMBRO

   Exemplo:

   habilidade.membro = "hati"

   Se ninguém informou membro:
       → Hati

   Se informaram Hati:
       → Hati

   Se informaram Skoll:
       → inválido
========================================================= */

function resolverMembro(habilidade, membroSolicitado = null) {

    const membroDaHabilidade =
        obterMembroDaHabilidade(habilidade);

    /*
       Boss único.
    */

    if (!membroDaHabilidade) {
        return null;
    }

    /*
       A própria habilidade determina o membro.
    */

    if (!membroSolicitado) {
        return membroDaHabilidade;
    }

    /*
       Impede um membro de executar
       habilidade pertencente ao outro.
    */

    if (membroSolicitado !== membroDaHabilidade) {

        console.warn(
            `[BossSkills] Habilidade "${habilidade.nome}" pertence ao ${membroDaHabilidade}, não ao ${membroSolicitado}.`
        );

        return null;
    }

    return membroSolicitado;
}


/* =========================================================
   CUSTO DA HABILIDADE
========================================================= */

function obterCustoHabilidade(habilidade) {

    if (!habilidade) {
        return {
            mp: 0,
            est: 0
        };
    }

    /*
       Formato atual:

       custo: {
           mp: 20,
           est: 30
       }
    */

    if (habilidade.custo) {

        return {
            mp: Number(habilidade.custo.mp) || 0,
            est: Number(habilidade.custo.est) || 0
        };
    }

    /*
       Compatibilidade com formato antigo.
    */

    return {
        mp: Number(habilidade.mp) || 0,
        est: Number(habilidade.est) || 0
    };
}


/* =========================================================
   VERIFICAR CUSTO — BOSS ÚNICO
========================================================= */

function podeUsarHabilidadeSingle(estado, habilidade) {

    if (!estado || !habilidade) {
        return false;
    }

    const custo = obterCustoHabilidade(habilidade);

    return (
        estado.mp >= custo.mp &&
        estado.est >= custo.est
    );
}


/* =========================================================
   VERIFICAR CUSTO — BOSS DUPLO
========================================================= */

function podeUsarHabilidadeDual(
    estado,
    membro,
    habilidade
) {

    if (!estado || !membro || !habilidade) {
        return false;
    }

    const alvo = estado[membro];

    if (!alvo || alvo.abatido) {
        return false;
    }

    const custo = obterCustoHabilidade(habilidade);

    return (
        alvo.mpAtual >= custo.mp &&
        alvo.estAtual >= custo.est
    );
}


/* =========================================================
   CONSUMIR CUSTO — BOSS ÚNICO
========================================================= */

function consumirCustoSingle(estado, habilidade) {

    const custo = obterCustoHabilidade(habilidade);

    estado.mp -= custo.mp;
    estado.est -= custo.est;

    if (estado.mp < 0) {
        estado.mp = 0;
    }

    if (estado.est < 0) {
        estado.est = 0;
    }
}


/* =========================================================
   CONSUMIR CUSTO — BOSS DUPLO
========================================================= */

function consumirCustoDual(
    estado,
    membro,
    habilidade
) {

    const alvo = estado[membro];

    if (!alvo) {
        return;
    }

    const custo = obterCustoHabilidade(habilidade);

    alvo.mpAtual -= custo.mp;
    alvo.estAtual -= custo.est;

    if (alvo.mpAtual < 0) {
        alvo.mpAtual = 0;
    }

    if (alvo.estAtual < 0) {
        alvo.estAtual = 0;
    }
}


/* =========================================================
   EXECUTAR HABILIDADE — BOSS ÚNICO
========================================================= */

function executarHabilidadeSingle(indice) {

    const boss = BossState.obterBoss();
    const nivel = BossState.obterNivel();
    const estado = BossState.obterEstado();

    const habilidade = obterHabilidade(indice);

    if (!boss || !habilidade || !estado) {

        return {
            sucesso: false,
            motivo: "Habilidade indisponível."
        };
    }

    /*
       Segurança:
       uma habilidade que exige membro
       não pode ser usada como Boss único.
    */

    if (habilidade.membro) {

        return {
            sucesso: false,
            motivo:
                `Esta habilidade pertence ao ${habilidade.membro}.`
        };
    }

    if (!podeUsarHabilidadeSingle(estado, habilidade)) {

        return {
            sucesso: false,
            motivo: "MP ou EST insuficiente."
        };
    }

    consumirCustoSingle(
        estado,
        habilidade
    );

    let resultado = null;

    /*
       Executa a função específica
       definida no arquivo do Boss.
    */

    if (typeof habilidade.executar === "function") {

        resultado = habilidade.executar(
            estado,
            {
                boss,
                nivel,
                habilidade
            }
        );
    }

    BossRender.renderizarBoss();

    return {
        sucesso: true,
        tipo: "single",
        boss: boss.id,
        nivel,
        habilidade,
        resultado
    };
}


/* =========================================================
   EXECUTAR HABILIDADE — BOSS DUPLO
========================================================= */

function executarHabilidadeDual(
    membro,
    indice
) {

    const boss = BossState.obterBoss();
    const nivel = BossState.obterNivel();
    const estado = BossState.obterEstado();

    const habilidade = obterHabilidade(indice);

    if (!boss || !habilidade || !estado) {

        return {
            sucesso: false,
            motivo: "Habilidade indisponível."
        };
    }

    /*
       A habilidade determina seu próprio membro.
    */

    const membroResolvido =
        resolverMembro(
            habilidade,
            membro
        );

    if (!membroResolvido) {

        return {
            sucesso: false,
            motivo:
                `A habilidade "${habilidade.nome}" não pertence ao ${membro}.`
        };
    }

    /*
       Confirma que o membro existe.
    */

    const dadosMembro =
        estado[membroResolvido];

    if (!dadosMembro) {

        return {
            sucesso: false,
            motivo: "Membro inválido."
        };
    }

    /*
       Membro derrotado não pode usar habilidade.
    */

    if (dadosMembro.abatido) {

        return {
            sucesso: false,
            motivo:
                `${membroResolvido} está derrotado.`
        };
    }

    /*
       Verifica MP / EST.
    */

    if (
        !podeUsarHabilidadeDual(
            estado,
            membroResolvido,
            habilidade
        )
    ) {

        return {
            sucesso: false,
            motivo: "MP ou EST insuficiente."
        };
    }

    /*
       Consome custo.
    */

    consumirCustoDual(
        estado,
        membroResolvido,
        habilidade
    );

    let resultado = null;

    /*
       Executa a habilidade específica.
    */

    if (typeof habilidade.executar === "function") {

        resultado = habilidade.executar(
            dadosMembro,
            {
                boss,
                nivel,
                membro: membroResolvido,
                estado,
                habilidade
            }
        );
    }

    BossRender.renderizarBoss();

    return {
        sucesso: true,
        tipo: "dual",
        boss: boss.id,
        nivel,
        membro: membroResolvido,
        habilidade,
        resultado
    };
}


/* =========================================================
   FUNÇÃO PRINCIPAL
========================================================= */

function usarHabilidade(
    indice,
    membro = null
) {

    const boss = BossState.obterBoss();

    if (!boss) {

        return {
            sucesso: false,
            motivo: "Nenhum Boss ativo."
        };
    }

    const habilidade =
        obterHabilidade(indice);

    if (!habilidade) {

        return {
            sucesso: false,
            motivo: "Habilidade não encontrada."
        };
    }

    /*
       Se a habilidade possui "membro",
       é um Boss duplo.
    */

    if (habilidade.membro) {

        const membroResolvido =
            resolverMembro(
                habilidade,
                membro
            );

        if (!membroResolvido) {

            return {
                sucesso: false,
                motivo:
                    `Esta habilidade pertence ao ${habilidade.membro}.`
            };
        }

        return executarHabilidadeDual(
            membroResolvido,
            indice
        );
    }

    /*
       Boss único.
    */

    return executarHabilidadeSingle(
        indice
    );
}


/* =========================================================
   VERIFICAR SE PODE USAR
========================================================= */

function podeUsarHabilidade(
    indice,
    membro = null
) {

    const habilidade =
        obterHabilidade(indice);

    const estado =
        BossState.obterEstado();

    if (!habilidade || !estado) {
        return false;
    }

    /*
       Habilidade de membro.
    */

    if (habilidade.membro) {

        const membroResolvido =
            resolverMembro(
                habilidade,
                membro
            );

        if (!membroResolvido) {
            return false;
        }

        return podeUsarHabilidadeDual(
            estado,
            membroResolvido,
            habilidade
        );
    }

    /*
       Habilidade de Boss único.
    */

    return podeUsarHabilidadeSingle(
        estado,
        habilidade
    );
}


/* =========================================================
   FORMATAR CUSTO
========================================================= */

function formatarCustoHabilidade(
    habilidade
) {

    const custo =
        obterCustoHabilidade(
            habilidade
        );

    const partes = [];

    if (custo.mp > 0) {
        partes.push(`MP ${custo.mp}`);
    }

    if (custo.est > 0) {
        partes.push(`EST ${custo.est}`);
    }

    if (partes.length === 0) {
        return "GRÁTIS";
    }

    return partes.join(" • ");
}


/* =========================================================
   EXPOSIÇÃO GLOBAL
========================================================= */

window.BossSkills = {

    obterHabilidade,
    obterHabilidades,

    obterMembroDaHabilidade,
    resolverMembro,

    obterCustoHabilidade,

    podeUsarHabilidadeSingle,
    podeUsarHabilidadeDual,

    consumirCustoSingle,
    consumirCustoDual,

    executarHabilidadeSingle,
    executarHabilidadeDual,

    usarHabilidade,
    podeUsarHabilidade,

    formatarCustoHabilidade
};
