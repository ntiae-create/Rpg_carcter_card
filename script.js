const card = document.querySelector(".character-card");

card.addEventListener("click", function (evento) {

    // Não virar o card ao clicar em botões,
    // campos ou controles do Mestre
    if (
        evento.target.closest(
            ".master-controls, .master-toggle, button, input, select"
        )
    ) {
        return;
    }

    card.classList.toggle("flipped");

});
