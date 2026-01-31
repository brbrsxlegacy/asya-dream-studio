// PNG linklerini değiştir veya kendi dosyalarını kullan
const assets = {
    hair: [
        "https://i.imgur.com/L0g0l82.png",
        "https://i.imgur.com/f2K0HbX.png",
        "https://i.imgur.com/XrJ7tGd.png"
    ],
    top: [
        "https://i.imgur.com/yX1AqWf.png",
        "https://i.imgur.com/qvHL2cM.png",
        "https://i.imgur.com/LR0O4xK.png"
    ],
    bottom: [
        "https://i.imgur.com/MWkZc0U.png",
        "https://i.imgur.com/bGzvPaI.png",
        "https://i.imgur.com/HykSgrE.png"
    ]
};

let currentIndices = { hair: 0, top: 0, bottom: 0 };

// Katman değiştirme fonksiyonu
function change(category, step) {
    currentIndices[category] = (currentIndices[category] + step + assets[category].length) % assets[category].length;
    const layer = document.getElementById(`${category}-layer`);
    layer.innerHTML = `<img src="${assets[category][currentIndices[category]]}">`;
    // kısa animasyon
    layer.style.transform = "scale(1.1)";
    setTimeout(() => layer.style.transform = "scale(1.0)", 100);
}

// Rastgele kombin
function randomize() {
    Object.keys(assets).forEach(cat => {
        const idx = Math.floor(Math.random() * assets[cat].length);
        currentIndices[cat] = idx;
        document.getElementById(`${cat}-layer`).innerHTML = `<img src="${assets[cat][idx]}">`;
    });
}

// Başlangıçta rastgele seç
window.onload = () => randomize();
