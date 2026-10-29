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

// =========================
// NOTIFIKASI GAME BARU
// Data notifikasi diambil dari notifications.js agar game lama tidak ikut muncul.
// =========================
(() => {
    const notificationBtn = document.getElementById("notificationBtn");
    const notificationPanel = document.getElementById("notificationPanel");
    const notificationList = document.getElementById("notificationList");
    const unreadDot = document.getElementById("notificationUnreadDot");
    const markAllBtn = document.getElementById("notificationMarkAll");
    if (!notificationBtn || !notificationPanel || !notificationList) return;

    const readStorageKey = "nekovault_read_new_game_notifications_v2";

    function getReadIds() {
        try {
            const value = JSON.parse(localStorage.getItem(readStorageKey) || "[]");
            return new Set(Array.isArray(value) ? value : []);
        } catch {
            return new Set();
        }
    }

    function saveReadIds(ids) {
        try {
            localStorage.setItem(readStorageKey, JSON.stringify([...ids]));
        } catch (error) {
            console.warn("Status notifikasi tidak dapat disimpan.", error);
        }
    }

    function relativeTime(date) {
        const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
        if (seconds < 60) return "Baru saja";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} menit yang lalu`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} jam yang lalu`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} hari yang lalu`;
        const weeks = Math.floor(days / 7);
        if (weeks < 5) return `${weeks} minggu yang lalu`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${Math.max(1, months)} bulan yang lalu`;
        return `${Math.max(1, Math.floor(days / 365))} tahun yang lalu`;
    }

    function getNewGameNotifications() {
        const data = Array.isArray(window.NEKO_NOTIFICATIONS)
            ? window.NEKO_NOTIFICATIONS
            : [];

        return data
            .filter(item => item && item.id && item.title && item.folder && item.publishedAt)
            .map(item => ({ ...item, publishedDate: new Date(item.publishedAt) }))
            .filter(item => !Number.isNaN(item.publishedDate.getTime()))
            .sort((a, b) => b.publishedDate - a.publishedDate);
    }

    function renderNotifications() {
        const notifications = getNewGameNotifications();
        const readIds = getReadIds();
        unreadDot.hidden = !notifications.some(item => !readIds.has(item.id));
        notificationList.replaceChildren();

        if (!notifications.length) {
            const empty = document.createElement("p");
            empty.className = "notification-empty";
            empty.textContent = "Belum ada notifikasi game baru.";
            notificationList.appendChild(empty);
            return;
        }

        notifications.forEach(item => {
            const isUnread = !readIds.has(item.id);
            const link = document.createElement("a");
            link.className = `notification-item${isUnread ? " unread" : ""}`;
            link.href = `game.html?game=${encodeURIComponent(item.folder)}`;

            // Banner 16:9 diambil dari folder game: <folder>/img/banner.jpg
            const image = document.createElement("img");
            image.className = "notification-item-image";
            const cleanFolder = String(item.folder).replace(/^\/+|\/+$/g, "");
            image.src = `${cleanFolder}/img/banner.jpg`;
            image.alt = `${item.title} banner`;
            image.loading = "lazy";
            image.onerror = () => {
                image.hidden = true;
                link.classList.add("notification-item-no-image");
            };

            const content = document.createElement("span");
            content.className = "notification-item-content";

            const title = document.createElement("span");
            title.className = "notification-item-title";
            title.textContent = "New Upload 🔥";

            const subtitle = document.createElement("span");
            subtitle.className = "notification-item-subtitle";
            subtitle.textContent = item.title;

            const time = document.createElement("span");
            time.className = "notification-item-time";
            time.textContent = relativeTime(item.publishedDate);

            const dot = document.createElement("span");
            dot.className = "notification-item-dot";
            dot.setAttribute("aria-hidden", "true");

            content.append(title, subtitle, time);
            link.append(image, content, dot);
            link.addEventListener("click", () => {
                const ids = getReadIds();
                ids.add(item.id);
                saveReadIds(ids);
            });
            notificationList.appendChild(link);
        });
    }

    function closePanel() {
        notificationPanel.hidden = true;
        notificationBtn.classList.remove("active");
        notificationBtn.setAttribute("aria-expanded", "false");
    }

    notificationBtn.addEventListener("click", () => {
        if (!notificationPanel.hidden) {
            closePanel();
            return;
        }
        notificationPanel.hidden = false;
        notificationBtn.classList.add("active");
        notificationBtn.setAttribute("aria-expanded", "true");
        renderNotifications();
    });

    markAllBtn?.addEventListener("click", () => {
        const ids = getReadIds();
        getNewGameNotifications().forEach(item => ids.add(item.id));
        saveReadIds(ids);
        renderNotifications();
    });

    document.addEventListener("click", event => {
        if (!notificationPanel.hidden &&
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)) {
            closePanel();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closePanel();
    });

    window.setInterval(() => {
        if (!notificationPanel.hidden) renderNotifications();
    }, 60000);
})();
