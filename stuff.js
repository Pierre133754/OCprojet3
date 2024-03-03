/* base site */

export function createFigure(meat) {
    document.querySelector(".gallery").innerHTML = "";
    let gallery = ``;
    for (let i = 0; i < meat.length; i++) {
        gallery = `
        ${gallery}
        <figure>
            <img src=${meat[i].imageUrl} alt=${meat[i].title}>
            <figcaption>${meat[i].title}</figcaption>
        </figure>
        `;
    }
    document.querySelector(".gallery").innerHTML = gallery;
}

export async function createFilters() {
    /* categories are dynamic, but it isnt considered common to change the categories since you'd 
    have to change the node server because of post works, so it only realoads on page reload */
    const meat = await fetch ("http://localhost:5678/api/categories").then(Lcat => Lcat.json());
    let filters = `<div class="F activeF"><p>Tous</p></div>`;
    for (let i = 0; i < meat.length; i++) {
        filters =`
        ${filters}
        <div><p>${meat[i].name}</p></div>
        `;
    }
    document.querySelector(".filtres").innerHTML = filters;
    createFiltersButtons();
}


export async function createFiltersButtons() {
    const meat = document.querySelectorAll(".filtres div");
    for (let i = 0; i < meat.length; i++) {
        if (meat[i].innerText === "Tous") {
            meat[i].addEventListener("click", async function () {
                let works = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
                createFigure(works);
                document.querySelector(".activeF").classList.remove("activeF");
                meat[i].classList.add("activeF");
            });
        } else {
            meat[i].addEventListener("click", async function () {
                let works = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
                const worksFiltered = works.filter(function (work) {
                    return work.category.name === meat[i].innerText;
                });
                createFigure(worksFiltered);
                document.querySelector(".activeF").classList.remove("activeF");
                meat[i].classList.add("activeF");
            });
        }
    }
}

/* end of base site */

/* modal */

export function createEditAndModal() {   
    const modal1 = document.querySelector(".modal1");
    const modal2 = document.querySelector(".modal2");

    /* edit stuff appears */
    document.querySelector(".top").classList.remove("hidden");
    document.querySelector(".squat").classList.remove("hidden");
    document.querySelector("nav a li").innerText = "logout";
    document.querySelector("nav a").href = "#";
    document.querySelector("nav a").addEventListener("click", function() {
        window.localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    /* buttons for closing/opening the modals */
    document.querySelector(".squat").addEventListener("click", function() {
        modal1.style.display = "flex";
    });
    document.querySelector(".M1close").addEventListener("click", function(){
        modal1.style.display = "none";
    });
    modal1.addEventListener("click", function() {
        window.onclick = function(event) {
            if (event.target == modal1) {
            modal1.style.display = "none";
            }
        }
    });
    document.querySelector(".M1p").addEventListener("click", function() {
        modal1.style.display = "none";
        modal2.style.display = "flex";
    });
    document.querySelector(".M2close").addEventListener("click", function() {
        modal2.style.display = "none";
        formReset();
    });
    document.querySelector(".fa-arrow-left").addEventListener("click", function() {
        modal2.style.display = "none";
        modal1.style.display = "flex";
        formReset();
    });
    modal2.addEventListener("click", function() {
        window.onclick = function(event) {
            if (event.target == modal2) {
            modal2.style.display = "none";
            formReset();
            }
        }
    });
}

export async function createModal1Works () {
    try {
        const meat = await fetch ("http://localhost:5678/api/works").then(localWorks => localWorks.json());
        const man = document.querySelector(".M1img");
        man.innerHTML = "";
        /* is waierd but i wanted to do a specific thing */
        for (let i = 0; i < meat.length; i++) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            let si = document.createElement("i");
            img.src = meat[i].imageUrl;
            img.alt = meat[i].title;
            si.classList.add("fa-solid");
            si.classList.add("fa-trash-can");
            man.appendChild(div);
            div.appendChild(img);
            div.appendChild(si);
            si.addEventListener("click", function () {
                if (confirm("you sure buddy ?") == true) {
                    deleteWork(meat[i]);
                }
            });
        }
     } catch(error) {
        console.log(error.message);
     }
}

export async function deleteWork (meat) {
    try {
        const token = window.localStorage.getItem("token");
        await fetch("http://localhost:5678/api/works/" + meat.id, {
            method: "DELETE",
            body:"",
            headers: {"Content-Type": "application/json", "Authorization": "token "+token}
        });
        const localWorks = await fetch ("http://localhost:5678/api/works").then(localWorks => localWorks.json());
        createModal1Works();
        createFigure(localWorks);
        document.querySelector(".activeF").classList.remove("activeF");
        document.querySelector(".F").classList.add("activeF");
    } catch (error) {
        console.log(error.message);
    }
}

export async function createModal2Categories() {
    /* categories are dynamic, but it isnt considered common to change the categories since you'd 
    have to change the node server because of post works, so it only realoads on page reload */
    const localCategories = await fetch ("http://localhost:5678/api/categories").then(Lcat => Lcat.json());
    let categoriesInput = `<option></option>`;
    for (let i = 0; i < localCategories.length; i++) {
        categoriesInput =`
        ${categoriesInput}
        <option value="${localCategories[i].id}">${localCategories[i].name}</option>
        `;
    }
    document.getElementById("M2type").innerHTML = categoriesInput;
}

export function setModal2Img() {
    try {
        document.querySelector(".M2Fblock").style.display = "none";
        document.querySelector(".M2Fimg").style.display = "flex";
        const imgData = document.getElementById("M2file").files[0];
        const placeToPutIt = document.querySelector(".M2Fimg img");
        placeToPutIt.src = URL.createObjectURL(imgData);
    } catch (error) {
        /* fixes some really obscure things that nobody wouldve ever seen */
        document.querySelector(".M2Fblock").style.display = "flex";
        document.querySelector(".M2Fimg").style.display = "none";
    }
}

function formReset() {
    document.querySelector(".M2Fblock").style.display = "flex";
    document.querySelector(".M2Fimg").style.display = "none";
    document.getElementById("M2file").value = "";
    document.getElementById("M2type").value = "";
    document.getElementById("M2title").value = "";
    document.querySelector(".M2p").classList.remove("ok");
    document.querySelector(".M2p").removeEventListener("click", SENDIT);
}


export function checkIt() {
    const type = document.getElementById("M2type").value;
    const title = document.getElementById("M2title").value;
    const imgYeOrNay = document.getElementById("M2file").value;
    const sendButton = document.querySelector(".M2p");
    if (type === "" || title.trim() === "" || imgYeOrNay === "") {
        if (sendButton.classList.length === 3) {
            sendButton.classList.remove("ok");
            sendButton.removeEventListener("click", SENDIT);
        }
    } else {
        if (sendButton.classList.length !== 3) {
            sendButton.classList.add("ok");
            sendButton.addEventListener("click", SENDIT);
        }
    }
}

async function SENDIT() {
    try {
        const lookTheFormDataBelowItsAllDoneInOneLineThatShitCrazyHowdHeDoThatMFHadToFormatCSSHTMLAndJSWaitIsThatADog = window.localStorage.getItem("token");
        const formData = new FormData(document.querySelector(".M2form"));
        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body:formData,
            headers: {"Authorization": "token "+lookTheFormDataBelowItsAllDoneInOneLineThatShitCrazyHowdHeDoThatMFHadToFormatCSSHTMLAndJSWaitIsThatADog}
        });
        /* updates all */
        const localWorks = await fetch ("http://localhost:5678/api/works").then(localWorks => localWorks.json());
        createModal1Works();
        createFigure(localWorks);
        document.querySelector(".activeF").classList.remove("activeF");
        document.querySelector(".F").classList.add("activeF");
        document.querySelector(".modal2").style.display = "none";
        formReset();
    } catch (error) {
        console.log(error.message);
    }
}

/* end of modal */