// PNG linklerini değiştir veya kendi dosyalarını kullan
const assets = {
    hair: [
        "/mnt/data/b897870f-8158-4ba6-aae0-f29a8953a7af.png"  // senin yüklediğin dosya
    ],
    top: [
        "/mnt/data/b897870f-8158-4ba6-aae0-f29a8953a7af.png"
    ],
    bottom: [
        "/mnt/data/b897870f-8158-4ba6-aae0-f29a8953a7af.png"
    ]
};


let currentIndices = { hair: 0, top: 0, bottom: 0 };

// Katman değiştirme fonksiyonu
function change(category, step) {
    currentIndices[category] = (currentIndices[category] + step + assets[category].length) % assets[category].length;
    const layer = document.getElementById(`${category}-layer`);
    layer.innerHTML = `<img src="${assets[category][currentIndices[category]]}">`;
    layer.style.transition = "transform 0.2s ease";
    layer.style.transform = "scale(1.2)";
    setTimeout(() => layer.style.transform = "scale(1.0)", 150);
}


// Rastgele kombin
function randomize() {
    Object.keys(assets).forEach(cat => {
        const idx = Math.floor(Math.random() * assets[cat].length);
        currentIndices[cat] = idx;
        document.getElementById(`${cat}-layer`).innerHTML = `<img src="${assets[cat][idx]}">`;
    });
}

function openGame(){
  hideAll();
  document.getElementById('game').classList.remove('hidden');
  startGame();
}

// Başlangıçta rastgele seç
window.onload = () => randomize();



