"use strict"

/* Hämta in meny-knapparna */
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    /* hämtar in css för menyn */
    let style = window.getComputedStyle(navMenuEl);

    /* kontrollera om navigering är synlig eller ej, ändrar display block/none */
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

