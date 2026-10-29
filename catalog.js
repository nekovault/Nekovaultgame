loadGames().then(() => {

    const catalogGrid =
        document.getElementById("catalogGrid");

    const gameCount =
        document.getElementById("gameCount");

    const sortNewest =
        document.getElementById("sortNewest");

    const sortAZ =
        document.getElementById("sortAZ");
        
    const filterBtn =
        document.getElementById("filterBtn");

    const filterPanel =
        document.getElementById("filterPanel");

    if (!catalogGrid) return;


    // =========================
    // DATA UNTUK SEARCH
    // =========================

    window.catalogGames = games;


    // =========================
    // JUMLAH GAME
    // =========================

    if (gameCount) {

        gameCount.textContent =
            `${games.length} Games`;

    }


    // =========================
    // TAMPILKAN GAME
    // =========================

    function renderGames(gameList) {

        catalogGrid.innerHTML = "";


        gameList.forEach(game => {


            // =========================
            // STATUS GAME
            // =========================

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

            // =========================
            // NEW / UPDATE
            // =========================

            let statusHTML = "";

            if (game.badge === "New") {

                statusHTML =
                    '<span class="card-status new">🔥NEW</span>';

            } else if (game.badge === "Update") {

                statusHTML =
                    '<span class="card-status updt">🔥UPDT</span>';

            }


            // =========================
            // PLATFORM
            // =========================

            let platforms = "";

            if (game.android) {

                platforms +=
                    '<span class="card-platform">Android</span>';

            }

            if (game.windows) {

                platforms +=
                    '<span class="card-platform">Windows</span>';

            }


            // =========================
            // CARD
            // =========================

            catalogGrid.innerHTML += `

                <a
                    href="game.html?game=${game.folder}"
                    class="game-card"
                >

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

    }


    // =========================
    // FILTER + SORT KATALOG
    // =========================
    let selectedEngine = "all";
    let selectedGenre = "all";
    let currentSort = "newest";

    function getGenres(game) {
        const value = game.genres ?? game.genre ?? [];
        const list = Array.isArray(value) ? value : String(value).split(",");
        return list.map(item => String(item).trim()).filter(Boolean);
    }

    // Pilih satu nama wakil bagi setiap genre tanpa membedakan huruf besar/kecil.
    // Utamakan penulisan dengan huruf awal kapital, dan jika seri pilih bentuk
    // dengan kapitalisasi yang lebih rapi (contoh: "Ahegao" daripada "ahegao").
    function genreNameScore(name) {
        const firstLetter = name.match(/[A-Za-z]/)?.[0] || "";
        const startsCapital = firstLetter && firstLetter === firstLetter.toUpperCase() ? 1 : 0;
        const allCapsPenalty = /^[^a-z]*$/.test(name) && /[A-Z]/.test(name) ? 1 : 0;
        const uppercaseCount = (name.match(/[A-Z]/g) || []).length;
        const lowercaseCount = (name.match(/[a-z]/g) || []).length;
        return [startsCapital, allCapsPenalty ? 0 : 1, uppercaseCount, lowercaseCount];
    }

    function compareGenreNames(a, b) {
        const scoreA = genreNameScore(a);
        const scoreB = genreNameScore(b);
        for (let i = 0; i < scoreA.length; i++) {
            if (scoreA[i] !== scoreB[i]) return scoreB[i] - scoreA[i];
        }
        return a.localeCompare(b, undefined, { sensitivity: "base" });
    }

    function getUniqueSortedGenres(gameList) {
        const chosenByKey = new Map();
        gameList.flatMap(getGenres).forEach(name => {
            const key = name.toLocaleLowerCase();
            const current = chosenByKey.get(key);
            if (!current || compareGenreNames(name, current) < 0) {
                chosenByKey.set(key, name);
            }
        });
        return [...chosenByKey.values()].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
        );
    }

    function applyCatalogFilters() {
        let filtered = [...games];

        if (selectedEngine !== "all") {
            filtered = filtered.filter(game =>
                String(game.engine || "").toLowerCase() === selectedEngine.toLowerCase()
            );
        }

        if (selectedGenre !== "all") {
            filtered = filtered.filter(game =>
                getGenres(game).some(genre => genre.toLowerCase() === selectedGenre.toLowerCase())
            );
        }

        if (currentSort === "az") {
            filtered.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
        }

        renderGames(filtered);

        if (gameCount) gameCount.textContent = `${filtered.length} Games`;
        return filtered;
    }

    window.applyCatalogFilters = applyCatalogFilters;
    window.getGameGenres = getGenres;

    function buildGenreTags() {
        const genreTags = document.getElementById("genreTags");
        const genreCount = document.getElementById("genreCount");
        if (!genreTags) return;

        const allGenres = getUniqueSortedGenres(games);

        if (genreCount) genreCount.textContent = `• ${allGenres.length}`;
        genreTags.innerHTML = "";

        allGenres.forEach(genre => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "genre-tag";
            button.textContent = genre;
            button.dataset.genre = genre;
            button.addEventListener("click", () => {
                selectedGenre = selectedGenre.toLowerCase() === genre.toLowerCase() ? "all" : genre;
                genreTags.querySelectorAll(".genre-tag").forEach(tag => {
                    tag.classList.toggle("active", tag.dataset.genre.toLowerCase() === String(selectedGenre).toLowerCase());
                });
                applyCatalogFilters();
            });
            genreTags.appendChild(button);
        });
    }

    buildGenreTags();
    renderGames(games);
    applyCatalogFilters();

    // Accordion panel Genres / Engines
    function setupAccordion(toggleId, panelId) {
        const toggle = document.getElementById(toggleId);
        const panel = document.getElementById(panelId);
        if (!toggle || !panel) return;

        toggle.addEventListener("click", () => {
            const opening = panel.hidden;
            panel.hidden = !opening;
            toggle.setAttribute("aria-expanded", String(opening));
            toggle.classList.toggle("expanded", opening);
        });
    }

    setupAccordion("genresToggle", "genresPanel");
    setupAccordion("enginesToggle", "enginesPanel");

    // Engine choices in hamburger panel
    const engineOptions = document.getElementById("engineOptions");
    if (engineOptions) {
        engineOptions.querySelectorAll("[data-engine]").forEach(button => {
            button.addEventListener("click", () => {
                const chosen = button.dataset.engine;
                selectedEngine = selectedEngine.toLowerCase() === chosen.toLowerCase() ? "all" : chosen;
                engineOptions.querySelectorAll("[data-engine]").forEach(option => {
                    option.classList.toggle("active", option.dataset.engine.toLowerCase() === selectedEngine.toLowerCase());
                });
                applyCatalogFilters();
            });
        });
    }

    document.getElementById("clearGenreFilter")?.addEventListener("click", () => {
        selectedGenre = "all";
        document.querySelectorAll(".genre-tag").forEach(tag => tag.classList.remove("active"));
        applyCatalogFilters();
    });

    document.getElementById("clearEngineFilter")?.addEventListener("click", () => {
        selectedEngine = "all";
        document.querySelectorAll("#engineOptions [data-engine]").forEach(button => button.classList.remove("active"));
        applyCatalogFilters();
    });

    // Sort
    if (sortNewest) {
        sortNewest.addEventListener("click", () => {
            currentSort = "newest";
            sortNewest.classList.add("active");
            sortAZ?.classList.remove("active");
            applyCatalogFilters();
        });
    }

    if (sortAZ) {
        sortAZ.addEventListener("click", () => {
            currentSort = "az";
            sortAZ.classList.add("active");
            sortNewest?.classList.remove("active");
            applyCatalogFilters();
        });
    }

    // Filter panel lama tetap berfungsi, memakai filter engine yang sama
    if (filterBtn && filterPanel) {
        filterBtn.addEventListener("click", () => filterPanel.classList.toggle("active"));
        filterPanel.querySelectorAll("button[data-engine]").forEach(button => {
            button.addEventListener("click", () => {
                selectedEngine = button.dataset.engine === "all" ? "all" : button.dataset.engine;
                applyCatalogFilters();
                filterPanel.classList.remove("active");
            });
        });
    }
});
