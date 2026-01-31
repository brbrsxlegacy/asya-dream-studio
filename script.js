// PNG linkleri veya yerel dosya yolunu kullanabilirsin
const assets = {
    hair: [
        'images/hair1.png',
        'images/hair2.png',
        'images/hair3.png'
    ],
    top: [
        'images/top1.png',
        'images/top2.png',
        'images/top3.png'
    ],
    bottom: [
        'images/bottom1.png',
        'images/bottom2.png',
        'images/bottom3.png'
    ]
};

let currentIndices = {
    hair: 0,
    top: 0,
    bottom: 0
};

function change(category, step) {
    currentIndices[category] = (currentIndices[category] + step + assets[category].length) % assets[category].length;
    const layer = document.getElementById(`${category}-layer`);
    
    // PNG kullanımı için innerText yerine <img> ekle
    layer.innerHTML = `<img src="${assets[category][currentIndices[category]]}" style="width:100%; height:100%;">`;
    
    // Küçük "muq" animasyonu
    layer.style.transform = "scale(1.1) translate(-50%, -50%)";
    setTimeout(() => {
        layer.style.transform = "scale(1.0) translate(-50%, -50%)";
    }, 100);
}

function randomize() {
    Object.keys(assets).forEach(cat => {
        const randomIdx = Math.floor(Math.random() * assets[cat].length);
        currentIndices[cat] = randomIdx;
        document.getElementById(`${cat}-layer`).innerHTML = `<img src="${assets[cat][randomIdx]}" style="width:100%; height:100%;">`;
    });
}

window.onload = () => randomize();
