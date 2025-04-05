const montageFrame = document.getElementById('montage-frame');
const montageCanvas = document.getElementById('montage-canvas');
const ctx = montageCanvas.getContext('2d');
const uploadInput = document.getElementById('upload-photo');

let frameImage = new Image();
let userImage = null;

// Variáveis para controlar a posição, escala e rotação da foto
let photoX = 0;
let photoY = 0;
let scale = 1;
let rotation = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

// Carrega a moldura selecionada
const selectedFrame = localStorage.getItem('selectedFrame');
if (selectedFrame) {
    montageFrame.src = selectedFrame;
    frameImage.src = selectedFrame; // <-- Adicionado para garantir que a imagem da moldura será carregada
    frameImage.onload = () => {
        montageCanvas.width = 898;
        montageCanvas.height = 602;
        photoX = montageCanvas.width / 2;
        photoY = montageCanvas.height / 2;
        drawMontage();
    };
}

// Carrega a foto do usuário
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userImage = new Image();
            userImage.onload = () => {
                // Redefine a posição, escala e rotação ao carregar uma nova imagem
                scale = 1;
                rotation = 0;
                photoX = montageCanvas.width / 2;
                photoY = montageCanvas.height / 2;
                drawMontage();
            };
            userImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Event listeners para mover a foto arrastando
montageCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - photoX;
    startY = e.clientY - photoY;
    montageCanvas.style.cursor = 'grabbing';
});

montageCanvas.addEventListener('mouseup', () => {
    isDragging = false;
    montageCanvas.style.cursor = 'grab';
});

montageCanvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    photoX = e.clientX - startX;
    photoY = e.clientY - startY;
    drawMontage();
});

montageCanvas.addEventListener('mouseout', () => {
    if (isDragging) {
        isDragging = false;
        montageCanvas.style.cursor = 'grab';
    }
});

function drawMontage() {
    const canvasWidth = montageCanvas.width;
    const canvasHeight = montageCanvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (userImage) {
        ctx.save(); // Salva o estado atual do contexto

        ctx.translate(photoX, photoY); // Move para o centro da foto
        ctx.rotate(rotation); // Aplica a rotação
        ctx.scale(scale, scale); // Aplica a escala

        // Desenha a foto com o centro na origem (0, 0)
        ctx.drawImage(userImage, -userImage.width / 2, -userImage.height / 2);

        ctx.restore(); // Restaura o estado anterior do contexto
    }

    if (frameImage) {
        ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
    }
}

function zoomPhoto(amount) {
    scale += amount;
    drawMontage();
}

function rotatePhoto(direction) {
    const rotationAmount = Math.PI / 180 * 5; // Rotaciona 5 graus por vez
    if (direction === 'left') {
        rotation -= rotationAmount;
    } else if (direction === 'right') {
        rotation += rotationAmount;
    }
    drawMontage();
}

function saveMontage() {
    const imageName = selectedFrame.split('/').pop().split('.')[0];
    const filename = `${imageName}-Arte-e-Foto-Montagens-com.png`;

    montageCanvas.width = 898;
    montageCanvas.height = 602;
    drawMontage(); // Redesenha com o tamanho correto

    const dataURL = montageCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}