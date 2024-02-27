import { 
    createFigure,
    createFilters,
    createBtn,
    createModalBtn,
    createMting
} from "./stuff.js";

/* base site */

const Lworks = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
createFigure(Lworks);

const Lcat = await fetch ("http://localhost:5678/api/categories").then(Lcat => Lcat.json());
createFilters(Lcat);

createBtn(document.querySelectorAll(".filtres div"));

/* end of base site */

/* modal */

if (window.localStorage.getItem("token") !== null) {
    createModalBtn();
    document.querySelector("nav a li").innerText = "logout";
    document.querySelector("nav a").href = "#";
    document.querySelector("nav a").addEventListener("click", function() {
        window.localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}

createMting(Lworks, window.localStorage.getItem("token"));



/* end of modal */