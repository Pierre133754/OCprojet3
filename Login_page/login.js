const form = document.querySelector("form");
const Emsg = document.querySelector(".Emsg");

form.addEventListener("submit", (event) => {
    try {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;
        if (email.trim() === "" || pass.trim() === "") {
            throw new Error("Tous les champs ne sont pas remplies");
        } else {
            Emsg.innerHTML = "";
            login(email, pass);
        };
    } catch (error) {
        console.log("error: " + error.message);
        Emsg.innerHTML = error.message;
    };
});

async function login(email, pass) {
    try {
        let vovee = "";
        const wowee = await fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            body: `{
                "email": "${email}",
                "password": "${pass}"
            }`,
            headers: {"Content-Type": "application/json"}
        }).then(ok => {
            vovee = ok.status;
            return ok.json();
        });
        /* fixed the api being inconsistent */
        if (vovee !== 200) {
            throw new Error("Erreur dans l’identifiant ou le mot de passe");
        } else {
            window.localStorage.setItem("token", wowee.token);
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.log("error: " + error.message);
        Emsg.innerHTML = error.message;
    };
};