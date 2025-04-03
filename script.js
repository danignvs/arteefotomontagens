document.addEventListener("DOMContentLoaded", function () {
    carregarTemplate(); // Carregar cabeçalho e rodapé
    carregarGaleria();  // Carregar a galeria de imagens
});

function carregarTemplate() {
    // Carregar o cabeçalho
    fetch("templates/header.html") // Ajuste o caminho aqui
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error("Erro ao carregar o cabeçalho:", error));

    // Carregar o rodapé
    fetch("templates/footer.html") // Ajuste o caminho aqui
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        })
        .catch(error => console.error("Erro ao carregar o rodapé:", error));
}

function carregarGaleria() {
    const imagens = [
        { url: "molduras/chico-bento_2025.png", titulo: "Chico Bento" },
        { url: "molduras/chico-bento_e_rosinha_2025.png", titulo: "Chico Bento e Rosinha" },
        { url: "molduras/rosinha_2025.png", titulo: "Rosinha" }
    ];

    const galeria = document.getElementById("galeria");
    imagens.forEach((imagem, index) => {
        let imgElement = document.createElement("img");
        imgElement.src = imagem.url;
        imgElement.alt = imagem.titulo;
        imgElement.onclick = () => abrirPopup(index, imagens);
        galeria.appendChild(imgElement);
    });
}

function abrirPopup(index, imagens) {
    const popup = document.getElementById("popup");
    const imagemPopup = document.getElementById("imagemPopup");
    const montagemLink = document.getElementById("montagemLink");

    imagemPopup.src = imagens[index].url;
    montagemLink.href = `montagem.html?moldura=${encodeURIComponent(imagens[index].url)}`;

    popup.style.display = "flex";
    popup.dataset.index = index; // Salvar o índice atual no popup
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function navegar(direcao) {
    const popup = document.getElementById("popup");
    const imagemPopup = document.getElementById("imagemPopup");
    const imagens = [
        { url: "molduras/chico-bento_2025.png", titulo: "Chico Bento" },
        { url: "molduras/chico-bento_e_rosinha_2025.png", titulo: "Chico Bento e Rosinha" },
        { url: "molduras/rosinha_2025.png", titulo: "Rosinha" }
    ];

    let indexAtual = parseInt(popup.dataset.index, 10);
    let novoIndex = indexAtual + direcao;

    if (novoIndex < 0) novoIndex = imagens.length - 1;
    if (novoIndex >= imagens.length) novoIndex = 0;

    abrirPopup(novoIndex, imagens);
}
