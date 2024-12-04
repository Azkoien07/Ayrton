const hamburgerBtn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("menu");

hamburgerBtn.addEventListener("click", () => {
    menu.classList.toggle("menu-oculto");
});
