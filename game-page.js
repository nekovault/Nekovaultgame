// ===============================
// Ambil parameter dari URL
// ===============================

const params = new URLSearchParams(window.location.search);
let folder = params.get("game");

if (folder.endsWith("/")) {
    folder = folder.slice(0, -1);
}

if (!folder) {
    alert("Parameter game tidak ditemukan!");
    throw new Error("Parameter game kosong");
}

// ===============================
// Load game.js
// ===============================

const script = document.createElement("script");
script.src = folder + "/game.js";

script.onload = () => {

    if (!window.game) {
        alert("window.game tidak ditemukan!");
        return;
    }

    // ===========================
    // COVER
    // ===========================

    const cover = document.getElementById("gameCover");

    if (!cover) {
        alert("ID gameCover tidak ada!");
        return;
    }

    const coverPath = folder + "/" + window.game.banner;

    cover.src = coverPath;
    
    document.getElementById("gameTitle").textContent = window.game.title;
    
    document.getElementById("gameDeveloper").textContent = window.game.developer;
    
    document.getElementById("gameVersion").textContent = window.game.version;
const engine = document.getElementById("gameEngine");

engine.textContent = window.game.engine;

if (window.game.engine === "Ren'Py") {
    engine.style.color = "#2ea8ff";
}
else if (window.game.engine === "Unity") {
    engine.style.color = "#b56cff";
}
else if (window.game.engine === "RPG Maker") {
    engine.style.color = "#ff9d00";
}
document.getElementById("gameReleased").textContent = window.game.released;
document.getElementById("gameUpdated").textContent = window.game.updated;

const gameSize = document.getElementById("gameSize");

if (gameSize) {
    gameSize.textContent = window.game.size || "";
}

document.getElementById("gameLanguage");let html = "";

window.game.languages.forEach(lang => {
    if (lang === "Indonesia" && window.game.showCredit) {
        html += `
            <div class="language-item">
                <div class="language-name">${lang}</div>
                <div class="language-credit">✦ by Arata Senpai</div>
            </div>
        `;
    } else {
        html += `
            <div class="language-item">
                <div class="language-name">${lang}</div>
            </div>
        `;
    }
});

gameLanguage.innerHTML = html;
    
    const badges = document.getElementById("platformBadges");

if (window.game.contentRating) {
    badges.innerHTML += `
        <span class="badge ${window.game.contentRating.toLowerCase()}">
            ${window.game.contentRating}
        </span>
    `;
}

if (window.game.status === "Ongoing") {
    badges.innerHTML += `
        <span class="badge status-ongoing">
            Ongoing
        </span>
    `;
}

if (window.game.status === "Complete") {
    badges.innerHTML += `
        <span class="badge status-complete">
            Complete
        </span>
    `;
}

if (window.game.status === "Abandoned") {
    badges.innerHTML += `
        <span class="badge status-abandoned">
            Abandoned
        </span>
    `;
}

if (window.game.android) {
    badges.innerHTML += `
        <span class="badge">
            Android
        </span>
    `;
}

if (window.game.windows) {
    badges.innerHTML += `
        <span class="badge">
            Windows
        </span>
    `;
}

    const genreBadges = document.getElementById("genreBadges");

const genres = window.game.genres
    .split(",")
    .map(g => g.trim())
    .filter(g => g !== "");

genres.forEach(genre => {
    genreBadges.innerHTML += `
        <span class="genre-badge">${genre}</span>
    `;
});

document.getElementById("genreCount").textContent =
    "• " + genres.length;
    
    document.getElementById("gameSynopsis").textContent = window.game.synopsis;
    const synopsis = document.getElementById("gameSynopsis");
const showMoreBtn = document.getElementById("showMoreBtn");

showMoreBtn.addEventListener("click", () => {

    if (synopsis.classList.contains("expanded")) {

        // TUTUP
        synopsis.style.maxHeight = synopsis.scrollHeight + "px";

        requestAnimationFrame(() => {
            synopsis.style.maxHeight = "180px";
        });

        showMoreBtn.textContent = "Selengkapnya";
        synopsis.classList.remove("expanded");

    } else {

        // BUKA
        synopsis.style.maxHeight = synopsis.scrollHeight + "px";

        showMoreBtn.textContent = "Sembunyikan";
        synopsis.classList.add("expanded");
    }

});

    const previewSlider = document.getElementById("previewSlider");
    window.game.screenshots.forEach(image => {
    previewSlider.innerHTML += `
        <img src="${folder}/${image}" alt="Preview">
    `;
});
    
    const paidBtn = document.querySelector(".download-btn:nth-child(1)");
const freeBtn = document.querySelector(".download-btn:nth-child(2)");

paidBtn.style.display = window.game.download.paid ? "inline-flex" : "none";
freeBtn.style.display = window.game.download.free ? "inline-flex" : "none";

paidBtn.addEventListener("click", () => {
    window.open(window.game.download.paidLink, "_blank");
});

freeBtn.addEventListener("click", () => {
    window.open(window.game.download.freeLink, "_blank");
});
    
    document.querySelector(".game-header")
    .style.setProperty("--cover", `url(${folder}/${window.game.cover})`);

    cover.onload = () => {
        console.log("Cover berhasil dimuat");
    };

    cover.onerror = () => {
        alert("Cover gagal dimuat : " + coverPath);
    };

};

script.onerror = () => {
    alert("Gagal memuat : " + script.src);
};

document.body.appendChild(script);