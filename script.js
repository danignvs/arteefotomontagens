document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");
    const popup = document.getElementById("popup");
    const imagemPopup = document.getElementById("imagem-popup");
    const fecharPopup = document.getElementById("fechar-popup");
    const anterior = document.getElementById("anterior");
    const proximo = document.getElementById("proximo");
    const linkMontagem = document.createElement("a");
    linkMontagem.innerText = "Usar esta moldura";
    linkMontagem.id = "link-montagem";
    linkMontagem.style.display = "block";
    linkMontagem.style.marginTop = "10px";
    popup.appendChild(linkMontagem);
    
    let imagens = [
        { url: "https://lh5.googleusercontent.com/-xQftWSAXNpU/VB3oQbFWudI/AAAAAAAAEeM/Qu_HnHbZLB0/s0/anjoAnjinhafeliz.png", titulo: "anjinha feliz" },
        { url: "https://lh5.googleusercontent.com/-3SwcpROrcn8/VB3oQVnuZWI/AAAAAAAAEeE/CUk37kJQ6nU/s0/anjoanjinhosecachorrinho.png", titulo: "anjinhos" },
        { url: "https://lh5.googleusercontent.com/-zKBwRaOFaTY/VB3oQ4_QPVI/AAAAAAAAEeQ/X2EutKEGs-s/s0/anjopalito.png", titulo: "anjinho" }
    ];

    let imagemAtual = 0;

    function carregarGaleria() {
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
        linkMontagem.href = `montagem.html?moldura=${encodeURIComponent(imagens[index].url)}`;
        popup.style.display = "flex";
    }

    fecharPopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    anterior.addEventListener("click", () => {
        imagemAtual = (imagemAtual > 0) ? imagemAtual - 1 : imagens.length - 1;
        abrirPopup(imagemAtual);
    });

    proximo.addEventListener("click", () => {
        imagemAtual = (imagemAtual < imagens.length - 1) ? imagemAtual + 1 : 0;
        abrirPopup(imagemAtual);
    });

    carregarGaleria();
});
