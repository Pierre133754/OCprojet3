/* base site */

export function createFigure(meat) {
    document.querySelector(".gallery").innerHTML = "";
    let figure = ``;
    for (let i = 0; i < meat.length; i++) {
        figure = `
        ${figure}
        <figure>
            <img src=${meat[i].imageUrl} alt=${meat[i].title}>
            <figcaption>${meat[i].title}</figcaption>
        </figure>
        `;
    }
    document.querySelector(".gallery").innerHTML = figure;
}

export function createFilters(meat) {
    let dog = `<div class="F activeF"><p>Tous</p></div>`;
    for (let i = 0; i < meat.length; i++) {
        dog =`
        ${dog}
        <div><p>${meat[i].name}</p></div>
        `;
    }
    document.querySelector(".filtres").innerHTML = dog;
}


export async function createBtn(meat) {
    for (let i = 0; i < meat.length; i++) {
        if (meat[i].innerText === "Tous") {
            meat[i].addEventListener("click", async function () {
                let huh = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
                createFigure(huh);
                document.querySelector(".activeF").classList.remove("activeF");
                meat[i].classList.add("activeF");
            });
        } else {
            meat[i].addEventListener("click", async function () {
                let huh = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
                const buh = huh.filter(function (cookieMAN) {
                    return cookieMAN.category.name === meat[i].innerText;
                });
                createFigure(buh);
                document.querySelector(".activeF").classList.remove("activeF");
                meat[i].classList.add("activeF");
            });
        }
    }
}

/* end of base site */

/* modal */

export function createModalBtn() {   
    const modal = document.querySelector(".modal1");
    document.querySelector(".top").classList.remove("hidden");
    document.querySelector(".squat").classList.remove("hidden");
    document.querySelector(".squat").addEventListener("click", function() {
        modal.style.display = "flex";
    });
    document.querySelector(".M1close").addEventListener("click", function(){
        modal.style.display = "none";
    });
    modal.addEventListener("click", function() {
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
    });
}

export function createMting (meat, token) {
    try {
        const man = document.querySelector(".M1img");
        man.innerHTML = "";
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
                deleteMting(meat[i], token);
            })
        }
     } catch(error) {
        console.log(error.message);
     }
}

export async function deleteMting (meat, token) {
    try {
        await fetch("http://localhost:5678/api/works/" + meat.id, {
            method: "DELETE",
            body:"",
            headers: {"Content-Type": "application/json", "Authorization": "token "+token}
        });
        let Lworks = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
        createMting(Lworks, token);
        createFigure(Lworks);
        document.querySelector(".activeF").classList.remove("activeF");
        document.querySelector(".F").classList.add("activeF");
    } catch (error) {
        console.log(error.message);
    }
}

/* end of modal */