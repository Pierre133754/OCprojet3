import { 
    createFigure,
    createFilters,
    createEditAndModal,
    createModal1Works,
    createModal2Categories,
    setModal2Img,
    checkIt
} from "./stuff.js";

/* base site */

const localWorks = await fetch ("http://localhost:5678/api/works").then(localWorks => localWorks.json());
createFigure(localWorks);
createFilters();

/* end of base site */

/* modal */

if (window.localStorage.getItem("token") !== null) {
    createEditAndModal();
    createModal1Works();
    createModal2Categories();

    /* both divs now become redirect to input type file */
    document.querySelector(".M2Fblock").addEventListener("click", function() {
        document.getElementById("M2file").click();
    });
    document.querySelector(".M2Fimg").addEventListener("click", function() {
        document.getElementById("M2file").click();
    });
    /*   */

    document.getElementById("M2file").addEventListener("change", function() {
        setModal2Img();
    });

    document.querySelector(".M2form").addEventListener("input", function() {
        checkIt();
    });
}

/* end of modal */