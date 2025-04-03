document.addEventListener("DOMContentLoaded", function () {
    carregarGaleria();
});

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
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function navegar(direcao) {
    const imagemAtual = document.getElementById("imagemPopup").src;
    const imagens = Array.from(document.querySelectorAll(".galeria img")).map(img => img.src);
    let indexAtual = imagens.indexOf(imagemAtual);

    let novoIndex = indexAtual + direcao;
    if (novoIndex < 0) novoIndex = imagens.length - 1;
    if (novoIndex >= imagens.length) novoIndex = 0;

    abrirPopup(novoIndex, imagens.map(src => ({ url: src })));
}
