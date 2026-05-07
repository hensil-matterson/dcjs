function mudarTela(idDaTela) {
    const telas = document.querySelectorAll('.tela-jogo');
    telas.forEach(tela => tela.style.display = 'none');

    document.getElementById(idDaTela).style.display = 'block';
}

const fundos = {
    "tela-jogo": "gfx/skin/menu.png",
    "mapa-jogo": "gfx/skin/selecionar.png",
};

let imperios = [];
let imperioSelecionado = null;

fetch("script/imperios.json")
    .then(res => res.json())
    .then(data => {
        imperios = data;
        iniciarImperios();
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));

function iniciarImperios() {
    const lista = document.getElementById("lista-imperios");
    lista.innerHTML = "";

    imperios.forEach(imp => {
        const div = document.createElement("div");
        div.classList.add("bandeira");

        div.innerHTML = `
            <img src="${imp.bandeira}">
            <p>${imp.nome}</p>
        `;

        div.onclick = () => selecionarImperio(imp);

        lista.appendChild(div);
    });
}

function selecionarImperio(imp) {
    imperioSelecionado = imp;

    document.getElementById("imagem-imperio").innerHTML =
        `<img src="${imp.imagem}">`;

    document.getElementById("texto-imperio").innerHTML =
        `<p>${imp.descricao}</p>`;

    document.getElementById("btn-escolher").disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-escolher").onclick = () => {
        if (imperioSelecionado) {
            console.log("Escolhido:", imperioSelecionado.id);
        }
    };
});
