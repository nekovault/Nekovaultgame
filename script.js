const games = [];

let gamesLoadPromise = null;

function loadGames() {

    // Kalau sudah pernah dipanggil,
    // jangan load game lagi
    if (gamesLoadPromise) {
        return gamesLoadPromise;
    }

    gamesLoadPromise = (async () => {

        for (const path of gameList) {

            const script = document.createElement("script");

            script.src = path;

            await new Promise(resolve => {

                script.onload = resolve;

                document.body.appendChild(script);

            });

            window.game.folder =
                path.replace("game.js", "");

            games.push(window.game);

            delete window.game;

        }

    })();

    return gamesLoadPromise;
}

loadGames().then(() => {

    const bannerSlider = document.getElementById("bannerSlider");
    const bannerBg = document.querySelector(".banner-bg");
    const gameGrid = document.getElementById("gameGrid");
    const bannerDots = document.getElementById("bannerDots");

    const featuredGames = games.filter(game => game.featured);

if (featuredGames.length > 0) {

    bannerSlider.innerHTML = featuredGames.map((game, index) => `
        <a href="game.html?game=${game.folder}" class="banner-item ${index === 0 ? "active" : ""}">

            <img
                src="${game.folder}${game.banner}"
                alt="${game.title}"
            >

            <div class="banner-info">

                <h2>${game.title}</h2>

                <div class="banner-meta">

                    <span class="banner-engine ${game.engine === "Ren'Py" ? "renpy" : game.engine === "Unity" ? "unity" : game.engine === "RPG Maker" ? "rpgmaker" : ""}">
    ${game.engine}
</span>

                    <span class="banner-dot">•</span>

                    <span class="banner-status ${game.status.toLowerCase()}">
    ${game.status}
</span>

                </div>

            </div>

        </a>
    `).join("");

    bannerBg.style.backgroundImage =
    `url("${featuredGames[0].folder}${featuredGames[0].banner}")`;

bannerDots.innerHTML = "";

featuredGames.forEach((game, index) => {

    const dot = document.createElement("span");

    if (index === 0) {
        dot.classList.add("active");
    }

    bannerDots.appendChild(dot);

});

let currentSlide = 0;


// =========================
// UPDATE BANNER
// =========================

function updateBanner() {

    const slides =
        bannerSlider.querySelectorAll(".banner-item");

    const dots =
        bannerDots.querySelectorAll("span");

    // Geser banner
    slides.forEach((slide) => {

        slide.style.transform =
            `translateX(-${currentSlide * 100}%)`;

    });

    // Ganti background blur
    bannerBg.style.backgroundImage =
        `url("${featuredGames[currentSlide].folder}${featuredGames[currentSlide].banner}")`;

    // Update dot
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

}


// =========================
// AUTO SLIDER
// =========================

setInterval(() => {

    if (featuredGames.length <= 1) return;

    currentSlide++;

    if (currentSlide >= featuredGames.length) {
        currentSlide = 0;
    }

    updateBanner();

}, 5000);


// =========================
// SWIPE MANUAL
// =========================

let touchStartX = 0;

bannerSlider.addEventListener("touchstart", (e) => {

    touchStartX =
        e.changedTouches[0].screenX;

});


bannerSlider.addEventListener("touchend", (e) => {

    if (featuredGames.length <= 1) return;

    const touchEndX =
        e.changedTouches[0].screenX;

    const swipeDistance =
        touchEndX - touchStartX;


    // SWIPE KE KIRI
    if (swipeDistance < -50) {

        currentSlide++;

        if (currentSlide >= featuredGames.length) {
            currentSlide = 0;
        }

        updateBanner();

    }


    // SWIPE KE KANAN
    else if (swipeDistance > 50) {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = featuredGames.length - 1;
        }

        updateBanner();

    }

});

}

    games.slice(0, 9).forEach(game => {

    let gameStatusHTML = "";

    if (game.status === "Ongoing") {

        gameStatusHTML =
            '<span class="card-language">Ongoing</span>';

    } else if (game.status === "Complete") {

        gameStatusHTML =
            '<span class="card-language complete">Complete</span>';

    } else if (game.status === "Abandoned") {

    gameStatusHTML =
        '<span class="card-language abandoned">Abandoned</span>';

    }

    // ...

    let statusHTML = "";

if (game.badge === "New") {
    statusHTML = '<span class="card-status new">🔥NEW</span>';
} else if (game.badge === "Update") {
    statusHTML = '<span class="card-status updt">🔥UPDT</span>';
}

    let platforms = "";

    if (game.android) {
        platforms += '<span class="card-platform">Android</span>';
    }

    if (game.windows) {
        platforms += '<span class="card-platform">Windows</span>';
    }

    gameGrid.innerHTML += `
        <a href="game.html?game=${game.folder}" class="game-card">

            <div class="card-image">

                <img
                    src="${game.folder}${game.cover}"
                    alt="${game.title}"
                >

                <div class="card-top">

    ${gameStatusHTML}

    ${statusHTML}

</div>

                <div class="card-bottom">

                    <div class="card-title">
                        ${game.title}
                    </div>

                    <div class="card-platforms">
                        ${platforms}
                    </div>

                </div>

            </div>

        </a>
    `;

});

});

// =========================
// MENU PANEL
// =========================

const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");

    menuPanel.classList.toggle("active");

});

// =========================
// SEARCH GAME
// =========================

const searchInput = document.getElementById("searchInput");
const catalogGrid = document.getElementById("catalogGrid");

if (searchInput && catalogGrid) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase().trim();

        const games = catalogGrid.children;

        for (let game of games) {

            const title = game.textContent.toLowerCase();

            if (title.includes(keyword)) {
                game.style.display = "";
            } else {
                game.style.display = "none";
            }

        }

    });

}

/* =========================
   GUIDE ACCORDION
========================= */

function toggleGuide(button) {

    const guideItem = button.closest(".guide-item");

    guideItem.classList.toggle("open");

}