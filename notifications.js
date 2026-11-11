/*
 * DATABASE NOTIFIKASI GAME BARU NEKOVAULT
 *
 * Cara pakai:
 * 1. Setiap kali menerbitkan game baru, tambahkan satu objek.
 * 2. Cukup isi id, title, dan folder.
 * 3. Jangan isi publishedAt untuk game baru. GitHub Actions akan mengisinya
 *    otomatis berdasarkan waktu commit publikasi, dikonversi ke WITA (+08:00),
 *    lalu menyimpan hasilnya ke file ini.
 * 4. folder harus sama dengan folder game yang ada di gameList.
 * 5. Game lama dan publishedAt yang sudah tersimpan jangan diubah.
 *
 * Contoh game baru:
 * {
 *     id: "update-2026-11-05-nama-game",
 *     title: "Nama Game",
 *     folder: "renpy/nama-game/"
 * }
 */

window.NEKO_NOTIFICATIONS = [
    {
        id: "update-2026-11-11-good-luke",
        title: "Good Luke +18 The Game",
        folder: "renpy/goodluke/"
    },
    {
        id: "update-2026-11-11-a-simple",
        title: "A Simple Life With My Unobtrusive Sister",
        folder: "renpy/asimple/"
    },
    {
        id: "update-2026-11-11-realm-invader",
        title: "Realm Invader",
        folder: "renpy/realminvader/"
    },
    {
        id: "update-2026-11-11-how-to-raise",
        title: "How To Raise Happy Harem",
        folder: "renpy/happyharem/"
    },
    {
        id: "update-2026-11-11-fates-collide",
        title: "Fates Collide",
        folder: "renpy/fatescollide/"
    },
    {
        id: "update-2026-11-11-the-moon-club",
        title: "The Moon Club",
        folder: "renpy/themoonclub/"
    },
        {
        id: "update-2026-11-05-echoes-the-lies-we-tell-ourselves",
        title: "Echoes: The Lies We Tell Ourselves",
        folder: "renpy/echoes/"
    },
    {
        id: "update-2026-11-05-fate-wont-separate-us",
        title: "Fate Won't Separate Us",
        folder: "renpy/fatwonseparate/"
    },
    {
        id: "update-2026-11-05-shadows-of-absence",
        title: "Shadows Of Absence",
        folder: "renpy/shadowofabsence/"
    },
    {
        id: "update-2026-11-02-double-perception",
        title: "Double Perception",
        folder: "renpy/doubleperception/",
        publishedAt: "2026-11-02T14:30:00+08:00"
    },
    {
        id: "update-2026-11-02-whisper-of-desire",
        title: "Whispers of Desire: Misaki's Path",
        folder: "renpy/whisperofdesire/",
        publishedAt: "2026-11-02T14:30:00+08:00"
    },
    {
        id: "update-2026-10-29-ethereal-threads",
        title: "Ethereal Threads",
        folder: "renpy/etherealthreads/",
        publishedAt: "2026-10-29T15:00:00+08:00"
    },
    {
        id: "update-2026-10-29-between-humanity",
        title: "Between Humanity",
        folder: "renpy/betweenhumanity/",
        publishedAt: "2026-10-29T15:00:00+08:00"
    },
    {
        id: "update-2026-10-29-succubus-kingdom",
        title: "Succubus Kingdom",
        folder: "renpy/succubuskingdom/",
        publishedAt: "2026-10-29T15:00:00+08:00"
    },
    {
        id: "update-2026-10-29-forbidden-thoughts",
        title: "Forbidden Thoughts",
        folder: "renpy/forbiddenthoughts/",
        publishedAt: "2026-10-29T15:00:00+08:00"
    }
];
