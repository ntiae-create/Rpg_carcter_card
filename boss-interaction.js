// ==========================================
// RPG BOSS CARD
// INTERAÇÃO / FLIP
// ==========================================


// ==========================================
// CARTA / FLIP
// ==========================================

const bossCard =
    document.querySelector(".boss-card");


if (bossCard) {

    bossCard.addEventListener(
        "click",
        function (evento) {

            // ==========================================
            // IGNORAR CONTROLES
            // ==========================================

            if (
                evento.target.closest(
                    [
                        "button",
                        "input",
                        "select",
                        "textarea",
                        "a",
                        ".boss-test-buttons",
                        ".boss-selector",
                        ".boss-level-selector",
                        ".boss-skill-button",
                        ".master-controls",
                        ".master-toggle"
                    ].join(", ")
                )
            ) {
                return;
            }


            // ==========================================
            // FLIP
            // ==========================================

            bossCard.classList.toggle(
                "flipped"
            );

        }
    );

}


// ==========================================
// FUNÇÕES PÚBLICAS DO BOSS CARD
// ==========================================

window.BossInteraction = {

    // ==========================================
    // VIRAR CARTA
    // ==========================================

    virar: function () {

        if (!bossCard) {
            return;
        }

        bossCard.classList.add(
            "flipped"
        );

    },


    // ==========================================
    // DESVIRAR CARTA
    // ==========================================

    desvirar: function () {

        if (!bossCard) {
            return;
        }

        bossCard.classList.remove(
            "flipped"
        );

    },


    // ==========================================
    // ALTERNAR
    // ==========================================

    alternar: function () {

        if (!bossCard) {
            return;
        }

        bossCard.classList.toggle(
            "flipped"
        );

    },


    // ==========================================
    // SABER SE ESTÁ VIRADA
    // ==========================================

    estaVirada: function () {

        if (!bossCard) {
            return false;
        }

        return bossCard.classList.contains(
            "flipped"
        );

    }

};
