var palavraFiltro = null;
var palavra = null;
var vidas = 0;

const palavrasComDica = [
    { palavra: "Pikachu", dica: "Trovão" },
    { palavra: "Tipo", dica: "Elemento" },
    { palavra: "Kanto", dica: "Regiao" },
    { palavra: "TM", dica: "DVD" },
    { palavra: "Charmander", dica: "Fogo" },
    { palavra: "Pokebolla", dica: "Bola" },
    { palavra: "insignia", dica: "Ginasio" },
    { palavra: "Bicicleta", dica: "Duas rodas" },
    { palavra: "Vara", dica: "Aguá" }
];

function iniciarJogo() {
    document.getElementById("teclado").style.display = "block";
    vidas = 0;
    atualizarImagemForca();
    document.getElementById("palavra").innerHTML = "";
    document.getElementById("dica").innerText = "";

    const teclas = document.querySelectorAll(".tecla");
    teclas.forEach(tecla => {
        tecla.disabled = false;
        tecla.classList.remove("certo");
    });

    gerarPalavraAleatoria();
}

function gerarPalavraAleatoria() {
    const sorteada = palavrasComDica[Math.floor(Math.random() * palavrasComDica.length)];
    palavra = sorteada.palavra;
    palavraFiltro = palavra;
    document.getElementById("dica").innerText = `Dica: ${sorteada.dica}`;

    for (let letra of palavra) {
        let span = document.createElement("u");
        span.innerHTML = letra === " " ? "&nbsp;&nbsp;&nbsp;" : "&nbsp;&nbsp;&nbsp;";
        document.getElementById("palavra").appendChild(span);
    }
}

function mandarLetra(letra, button) {
    let existeLetra = false;
    const uElements = document.querySelectorAll("u");
    let diff = 0;

    for (let i = 0; i < palavraFiltro.length; i++) {
        if (palavraFiltro[i] === " ") {
            diff++;
            continue;
        }

        if (letra.toLowerCase() === palavraFiltro[i].toLowerCase()) {
            existeLetra = true;
            uElements[i - diff].innerHTML = palavra[i];
        }
    }

    correcao(existeLetra, button);
}

function correcao(existeLetra, button) {
    if (existeLetra) {
        button.classList.add("certo");
    } else {
        vidas++;
        atualizarImagemForca();
    }
    button.disabled = true;

    if (vidas >= 7) {
        setTimeout(() => {
            alert("VOCÊ PERDEU O JOGO!");
            document.getElementById("teclado").style.display = "none";
            vidas = 0
        }, 1000)
    }

    ganhar();
}

function atualizarImagemForca() {
    const caminho = `img/${vidas}.png`;
    document.getElementById("forca").src = caminho;
}

function ganhar() {
    const uElements = document.querySelectorAll("u");
    for (let u of uElements) {
        if (u.innerHTML === "&nbsp;&nbsp;&nbsp;") {
            return;
        }
    }

    alert("PARABÉNS!!!\nVidas restantes: " + vidas);
    document.getElementById("teclado").style.display = "none";
}

window.onload = iniciarJogo;