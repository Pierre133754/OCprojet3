import { 
    createFigure,
    createFilters,
    createBtn
} from "./stuff.js";

const Lworks = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
createFigure(Lworks);

const Lcat = await fetch ("http://localhost:5678/api/categories").then(Lcat => Lcat.json());
createFilters(Lcat);

createBtn(document.querySelectorAll(".filtres div"));

