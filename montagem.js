document.addEventListener("DOMContentLoaded", function () {
    const molduraImg = document.getElementById("moldura");
    const fotoInput = document.getElementById("fotoInput");
    const fotoCanvas = document.getElementById("fotoCanvas");
    const ctx = fotoCanvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");

    let foto = new Image();
    let moldura = new Image();
    let fotoX = 0, fotoY = 0;
    let arrastando = false;

    // Carregar a moldura
    const urlParams = new URLSearchParams(window.location.search);
    const molduraSrc = urlParams.get("moldura");
    if (molduraSrc) {
        moldura.src = decodeURIComponent(molduraSrc);
        moldura.onload = desenharMontagem;
    }

    // Carregar a foto do usuário
    fotoInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                foto.src = e.target.result;
                foto.onload = desenharMontagem;
            };
            reader.readAsDataURL(file);
        }
    });

    function desenharMontagem() {
        ctx.clearRect(0, 0, fotoCanvas.width, fotoCanvas.height);
        if (foto.width && foto.height) {
            ctx.drawImage(foto, fotoX, fotoY, fotoCanvas.width, fotoCanvas.height);
        }
        if (moldura.width && moldura.height) {
            ctx.drawImage(moldura, 0, 0, fotoCanvas.width, fotoCanvas.height);
        }
    }

    // Permitir arrastar a foto
    fotoCanvas.addEventListener("mousedown", function (e) {
        arrastando = true;
    });

    fotoCanvas.addEventListener("mousemove", function (e) {
        if (arrastando) {
            fotoX += e.movementX;
            fotoY += e.movementY;
            desenharMontagem();
        }
    });

    fotoCanvas.addEventListener("mouseup", function () {
        arrastando = false;
    });

    fotoCanvas.addEventListener("mouseleave", function () {
        arrastando = false;
    });

    // Botão de download
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "montagem.png";
        link.href = fotoCanvas.toDataURL("image/png");
        link.click();
    });
});
