document.addEventListener("DOMContentLoaded", function () {
    const fotoInput = document.getElementById("fotoInput");
    const fotoCanvas = document.getElementById("fotoCanvas");
    const ctx = fotoCanvas.getContext("2d");
    const downloadBtn = document.getElementById("downloadBtn");
    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");

    let foto = new Image();
    let moldura = new Image();
    let fotoX = 0, fotoY = 0, escala = 1;
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
            const scaledWidth = foto.width * escala;
            const scaledHeight = foto.height * escala;
            ctx.drawImage(foto, fotoX, fotoY, scaledWidth, scaledHeight);
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

    // Função de zoom
    zoomInBtn.addEventListener("click", function () {
        escala *= 1.1;
        desenharMontagem();
    });

    zoomOutBtn.addEventListener("click", function () {
        escala *= 0.9;
        desenharMontagem();
    });

    // Botão de download corrigido com log de depuração
    downloadBtn.addEventListener("click", function () {
        console.log("Botão de download clicado");
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = fotoCanvas.width;
        tempCanvas.height = fotoCanvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        if (foto.width && foto.height) {
            const scaledWidth = foto.width * escala;
            const scaledHeight = foto.height * escala;
            tempCtx.drawImage(foto, fotoX, fotoY, scaledWidth, scaledHeight);
        }
        if (moldura.width && moldura.height) {
            tempCtx.drawImage(moldura, 0, 0, tempCanvas.width, tempCanvas.height);
        }
        
        const imagemURL = tempCanvas.toDataURL("image/png");
        console.log("Imagem gerada para download", imagemURL);
        
        const link = document.createElement("a");
        link.href = imagemURL;
        link.download = "montagem.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
