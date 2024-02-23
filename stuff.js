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
    let dog = `<div class="activeF"><p>Tous</p></div>`;
    for (let i = 0; i < meat.length; i++) {
        dog =`
        ${dog}
        <div><p>${meat[i].name}</p></div>
        `;
    }
    document.querySelector(".filtres").innerHTML = dog;
}


export async function createBtn(meat) {
    const huh = await fetch ("http://localhost:5678/api/works").then(Lworks => Lworks.json());
    for (let i = 0; i < meat.length; i++) {
        if (meat[i].innerText === "Tous") {
            meat[i].addEventListener("click", function () {
                createFigure(huh);
                document.querySelector(".activeF").classList.remove("activeF");
                meat[i].classList.add("activeF");
            });
        } else {
            meat[i].addEventListener("click", function () {
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