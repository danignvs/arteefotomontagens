document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const imagemPopup = document.getElementById("imagemPopup");
    const montagemLink = document.getElementById("montagemLink");
    const imagens = Array.from(document.querySelectorAll(".galeria img"));
    let imagemAtual = 0;

    imagens.forEach((img, index) => {
        img.addEventListener("click", function () {
            abrirPopup(index);
        });
    });

    window.abrirPopup = function(index) {
        imagemAtual = index;
        imagemPopup.src = imagens[index].src;
        montagemLink.href = `montagem.html?moldura=${encodeURIComponent(imagens[index].src)}`;
        popup.style.display = "flex";
    }

    window.fecharPopup = function() {
        popup.style.display = "none";
    }

    window.navegar = function(direcao) {
        imagemAtual = (imagemAtual + direcao + imagens.length) % imagens.length;
        imagemPopup.src = imagens[imagemAtual].src;
        montagemLink.href = `montagem.html?moldura=${encodeURIComponent(imagens[imagemAtual].src)}`;
    }
});
