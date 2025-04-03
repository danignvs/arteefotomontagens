document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");
    const popup = document.getElementById("popup");
    const imagemPopup = document.getElementById("imagem-popup");
    const fecharPopup = document.getElementById("fechar-popup");
    const anterior = document.getElementById("anterior");
    const proximo = document.getElementById("proximo");
    let imagens = [];
    let imagemAtual = 0;

    function carregarGaleria() {
        // Exemplo de imagens, substituir por um banco de dados real
        imagens = [
            { url: "img1.jpg", titulo: "Moldura 1" },
            { url: "img2.jpg", titulo: "Moldura 2" },
            { url: "img3.jpg", titulo: "Moldura 3" }
        ];

        imagens.forEach((img, index) => {
            let elemento = document.createElement("img");
            elemento.src = img.url;
            elemento.alt = img.titulo;
            elemento.addEventListener("click", () => abrirPopup(index));
            galeria.appendChild(elemento);
        });
    }

    function abrirPopup(index) {
        imagemAtual = index;
        imagemPopup.src = imagens[index].url;
        popup.style.display = "flex";
    }

    fecharPopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    anterior.addEventListener("click", () => {
        imagemAtual = (imagemAtual > 0) ? imagemAtual - 1 : imagens.length - 1;
        imagemPopup.src = imagens[imagemAtual].url;
    });

    proximo.addEventListener("click", () => {
        imagemAtual = (imagemAtual < imagens.length - 1) ? imagemAtual + 1 : 0;
        imagemPopup.src = imagens[imagemAtual].url;
    });

    carregarGaleria();
});
