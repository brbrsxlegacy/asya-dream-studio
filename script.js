// Kıyafet seçenekleri (Buradaki emojiler yerine PNG linkleri de koyabilirsin)
const assets = {
    hair: ['💇‍♂️', '🦱', '👱‍♀️', '🧑‍🎤', '🦰'],
    top: ['👕', '🧥', '👘', '👗', '🎽'],
    bottom: ['👖', '🩳', '👙', '🥋', '🦵']
};

// Mevcut seçimlerin index değerleri
let currentIndices = {
    hair: 0,
    top: 0,
    bottom: 0
};

// Kıyafet değiştirme fonksiyonu
function change(category, step) {
    // Index'i güncelle (liste sonuna gelince başa döner)
    currentIndices[category] = (currentIndices[category] + step) % assets[category].length;
    
    // DOM'u güncelle
    const layer = document.getElementById(`${category}-layer`);
    layer.innerText = assets[category][currentIndices[category]];
    
    // Küçük bir "muq" animasyon tetikle
    layer.style.transform = "scale(1.1) translate(-50%, -50%)";
    setTimeout(() => {
        layer.style.transform = "scale(1.0) translate(-50%, -50%)";
    }, 100);
}

// Rastgele kombin yapma
function randomize() {
    Object.keys(assets).forEach(cat => {
        const randomIdx = Math.floor(Math.random() * assets[cat].length);
        currentIndices[cat] = randomIdx;
        document.getElementById(`${cat}-layer`).innerText = assets[cat][randomIdx];
    });
}

// Sayfa yüklendiğinde ilk kıyafetleri ata
window.onload = () => randomize();