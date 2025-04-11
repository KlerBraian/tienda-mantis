
let menuHamburguesa = document.querySelector(".menu-nav-ul")
let menu = document.querySelector("#button-menu");

menu.addEventListener("click", () => {
    menuHamburguesa.classList.toggle("desplegar")
})