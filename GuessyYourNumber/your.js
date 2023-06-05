
var numeroSecreto;
var palpites = [];
var tentativasRestantes = 10;

function initializeGame() {
    numeroSecreto = gerarNumeroSecreto();
    palpites = [];
    tentativasRestantes = 10;
    exibirPalpites();
    document.getElementById("playAgainBtn").style.display = "none";
    document.getElementById("remainingAttempts").textContent = "Tentativas Restantes: " + tentativasRestantes;
}

function gerarNumeroSecreto() {
    var digitos = [];

    for (var i = 0; i < 4; i++) {
        var digitoAleatorio = Math.floor(Math.random() * 9) + 1;
        digitos.push(digitoAleatorio);
    }

    return parseInt(digitos.join(''));
}

function guessNumber() {
    if (tentativasRestantes === 0) {
        alert("Sem mais tentativas. O número secreto era: " + numeroSecreto);
        document.getElementById("playAgainBtn").style.display = "inline";
        return;
    }

    var inputPalpite = document.getElementById("guessInput");
    var palpite = parseInt(inputPalpite.value);

    if (isNaN(palpite) || palpite < 1111 || palpite > 9999) {
        inputPalpite.classList.add("invalid-input");
        return;
    } else {
        inputPalpite.classList.remove("invalid-input");
    }

    var caracteresCorretos = contarCaracteresCorretos(palpite, numeroSecreto);
    var numerosCorretos = contarNumerosCorretos(palpite, numeroSecreto);

    palpites.push({ palpite: palpite, caracteresCorretos: caracteresCorretos, numerosCorretos: numerosCorretos });

    exibirPalpites();
    inputPalpite.value = "";

    if (palpite === numeroSecreto) {
        alert("Parabéns! Você acertou o número 😎");
        document.getElementById("playAgainBtn").style.display = "inline";
    }

    tentativasRestantes--;
    document.getElementById("remainingAttempts").textContent = "Tentativas Restantes: " + tentativasRestantes;

    if (tentativasRestantes === 0) {
        alert("Game Over! Você não acertou a posição e os números corretos. O número secreto era: " + numeroSecreto);
        document.getElementById("playAgainBtn").style.display = "inline";
    }
}

function contarCaracteresCorretos(palpite, numeroSecreto) {
    var palpiteString = palpite.toString();
    var numeroSecretoString = numeroSecreto.toString();
    var count = 0;
    var caracteresVerificados = [];

    for (var i = 0; i < 4; i++) {
        if (palpiteString[i] === numeroSecretoString[i] && !caracteresVerificados.includes(palpiteString[i])) {
            count++;
            caracteresVerificados.push(palpiteString[i]);
        }
    }

    return count;
}

function contarNumerosCorretos(palpite, numeroSecreto) {
    var palpiteString = palpite.toString();
    var numeroSecretoString = numeroSecreto.toString();
    var count = 0;
    var caracteresVerificados = [];

    for (var i = 0; i < 4; i++) {
        if (numeroSecretoString.includes(palpiteString[i]) && !caracteresVerificados.includes(palpiteString[i])) {
            count++;
            caracteresVerificados.push(palpiteString[i]);
        }
    }

    return count;
}

function exibirPalpites() {
    var tabela = document.getElementById("guessTable");
    tabela.innerHTML = "<tr><th>Palpite</th><th>Posições Corretas</th><th>Números Corretos</th></tr>";

    for (var i = 0; i < palpites.length; i++) {
        var palpite = palpites[i];

        var novaLinha = document.createElement("tr");

        var celulaPalpite = document.createElement("td");
        celulaPalpite.textContent = palpite.palpite;
        novaLinha.appendChild(celulaPalpite);

        var celulaCaracteresCorretos = document.createElement("td");
        celulaCaracteresCorretos.textContent = palpite.caracteresCorretos;
        novaLinha.appendChild(celulaCaracteresCorretos);

        var celulaNumerosCorretos = document.createElement("td");
        celulaNumerosCorretos.textContent = palpite.numerosCorretos;
        novaLinha.appendChild(celulaNumerosCorretos);

        tabela.appendChild(novaLinha);
    }
}

function playAgain() {
    initializeGame();
}
