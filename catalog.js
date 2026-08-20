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
    // AWAL
    // TERBARU
    // =========================

    renderGames(games);


    // =========================
    // TOMBOL TERBARU
    // =========================

    if (sortNewest) {

        sortNewest.addEventListener("click", function () {

            renderGames(games);

            sortNewest.classList.add("active");

            if (sortAZ) {
                sortAZ.classList.remove("active");
            }

        });

    }


    // =========================
    // TOMBOL A-Z
    // =========================

    if (sortAZ) {

        sortAZ.addEventListener("click", function () {

            const sortedGames =
                [...games].sort(function (a, b) {

                    return a.title.localeCompare(
                        b.title,
                        undefined,
                        {
                            sensitivity: "base"
                        }
                    );

                });


            renderGames(sortedGames);


            sortAZ.classList.add("active");

            if (sortNewest) {
                sortNewest.classList.remove("active");
            }

        });

    }
    
    // =========================
// FILTER ENGINE
// =========================

if (filterBtn && filterPanel) {

    filterBtn.addEventListener("click", function () {

        filterPanel.classList.toggle("active");

    });

    const filterButtons =
        filterPanel.querySelectorAll("button");

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const engine =
                this.dataset.engine;

            if (engine === "all") {

                renderGames(games);

                if (gameCount) {
                    gameCount.textContent =
                        `${games.length} Games`;
                }

            } else {

                const filteredGames =
                    games.filter(game =>
                        game.engine === engine
                    );

                renderGames(filteredGames);

                if (gameCount) {
                    gameCount.textContent =
                        `${filteredGames.length} Games`;
                }

            }

            filterPanel.classList.remove("active");

        });

    });

}

});