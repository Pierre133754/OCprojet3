import { 
    createFigure
} from "./stuff.js";

const Lworks = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
createFigure(Lworks);