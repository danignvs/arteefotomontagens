let currentTheme = '';
let currentImage = '';

// Função para carregar os temas na página inicial
function loadThemes() {
    const themesGrid = document.querySelector('.themes-grid');
    if (themesGrid) {
        // Simulação de temas (em um cenário real, você buscaria isso do servidor)
        const themes = ['Marvel', 'Turma da Mônica', 'Flores', 'Aniversário', 'Etiquetas', 'Convites', 'Personalizados'];
        themes.forEach(theme => {
            const link = document.createElement('a');
            link.href = `tema.html?tema=${theme.toLowerCase().replace(' ', '-')}`;
            link.classList.add('theme-link');
            link.textContent = theme;
            themesGrid.appendChild(link);
        });
    }
}

// Função para carregar as imagens de um tema específico
function loadThemeImages(themeName) {
    currentTheme = themeName;
    const imageGrid = document.querySelector('.image-grid');
    if (imageGrid) {
        imageGrid.innerHTML = ''; // Limpa o grid anterior

        let imageFiles = [];
        if (themeName === 'marvel') {
            imageFiles = ['capitao-america_mini.jpg', 'homem-aranha_mini.jpg', 'homem-de-ferro_mini.jpg', 'hulk_mini-baby.png', 'thor_mini-baby.png'];
        } else if (themeName === 'turma-da-monica') {
            imageFiles = ['monica_mini.png', 'cebolinha_mini.png', 'cascao_mini.png', 'magali_mini.png'];
        } else if (themeName === 'flores') {
            imageFiles = ['flor-01.jpg', 'flor-02.png', 'flor-03.jpg'];
        } else if (themeName === 'aniversario') {
            imageFiles = ['aniversario-01.jpg', 'aniversario-02.png'];
        } else if (themeName === 'etiquetas') {
            imageFiles = ['etiqueta-01.png', 'etiqueta-02.jpg', 'etiqueta-03.png'];
        } else if (themeName === 'convites') {
            imageFiles = ['convite-01.jpg', 'convite-02.png'];
        } else if (themeName === 'personalizados') {
            imageFiles = ['personalizado-01.jpg', 'personalizado-02.png', 'personalizado-03.jpg', 'personalizado-04.png'];
        }
        imageFiles.sort(); // Ordena alfabeticamente

        imageFiles.forEach(imageFile => {
            const img = document.createElement('img');
            img.src = `temas/${themeName.toLowerCase().replace(' ', '-')}/${imageFile}`;
            img.alt = imageFile.split('.')[0]; // Usa o nome do arquivo sem extensão como alt
            img.onclick = () => openPopup(img.src);
            imageGrid.appendChild(img);
        });
    }
}

// Popup de visualização da imagem
function openPopup(imageSrc) {
    currentImage = imageSrc;
    const popup = document.getElementById('image-popup');
    const popupImage = document.getElementById('popup-image');
    popupImage.src = imageSrc;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('image-popup');
    popup.style.display = 'none';
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = currentImage;
    a.download = currentImage.split('/').pop(); // Usa o nome do arquivo para o download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function openMontagePage() {
    localStorage.setItem('selectedFrame', currentImage);
    window.location.href = 'montagem.html';
}

// Evento para carregar os temas na página inicial
document.addEventListener('DOMContentLoaded', loadThemes);

// Funcionalidade de busca (sem alterações)
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const themeLinks = document.querySelectorAll('.theme-link');
        themeLinks.forEach(link => {
            const themeName = link.textContent.toLowerCase();
            if (themeName.includes(searchTerm)) {
                link.style.display = '';
            } else {
                link.style.display = 'none';
            }
        });
    });
}