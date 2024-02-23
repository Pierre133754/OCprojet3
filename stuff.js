export function createFigure(meat) {
    let figure = ''
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