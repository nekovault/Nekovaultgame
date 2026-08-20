// =========================
// SEARCH GAME
// =========================

const searchInput =
    document.getElementById("searchInput");

const resultBox =
    document.getElementById("searchResults");


if (searchInput && resultBox) {

    searchInput.addEventListener("input", function () {

        const keyword =
            this.value
            .toLowerCase()
            .trim();


        // Kosongkan hasil sebelumnya
        resultBox.innerHTML = "";


        // Kalau kosong
        if (keyword === "") {
            return;
        }


        // Ambil database game
        const games =
            window.catalogGames || [];


        // Cari game
        const results =
            games.filter(game =>
                game.title
                .toLowerCase()
                .includes(keyword)
            );


        // Tidak ditemukan
        if (results.length === 0) {

            resultBox.innerHTML = `
                <div class="search-empty">
                    Game tidak ditemukan
                </div>
            `;

            return;
        }


        // =========================
        // TAMPILKAN GAME CARD
        // =========================

        results.forEach(game => {

            let gameStatusHTML = "";

            if (game.status === "Ongoing") {

                gameStatusHTML =
                    '<span class="card-language">Ongoing</span>';

            } else if (game.status === "Complete") {

                gameStatusHTML =
                    '<span class="card-language complete">Complete</span>';

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
            // CARD SEARCH
            // =========================

            const card = document.createElement("a");

            card.href =
                `game.html?game=${game.folder}`;

            card.className =
                "search-game-card";


            card.innerHTML = `

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

            `;


            resultBox.appendChild(card);

        });

    });

}