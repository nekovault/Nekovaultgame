/*
 * DATABASE NOTIFIKASI GAME BARU NEKOVAULT
 *
 * Cara pakai:
 * 1. Setiap kali menerbitkan game baru, tambahkan satu objek.
 * 2. Cukup isi id, title, dan folder.
 * 3. Jangan tambahkan publishedAt untuk game baru. Workflow hanya mendeteksi
 *    ID baru dan mengirim push notification; workflow tidak mengubah file ini.
 * 4. folder harus sama dengan folder game yang ada di gameList.
 * 5. publishedAt pada game lama dipertahankan sebagai data historis.
 *
 * Contoh game baru:
 * {
 *     id: "update-2026-11-17-nama-game",
 *     title: "Nama Game",
 *     folder: "renpy/nama-game/"
 * }
 */

window.NEKO_NOTIFICATIONS = [
    {
        "id": "update-2026-11-26-shattered-mind",
        "title": "Shattered Mind V.30 Beta",
        "folder": "renpy/shatteredminds"
    },
    {
        "id": "update-2026-11-26-re-even",
        "title": "RE Even v.0.3.3",
        "folder": "renpy/re-even"
    },
    {
        "id": "update-2026-11-26-k-tycon",
        "title": "K-Tycoon v.0.2 Beta",
        "folder": "renpy/k-tycon"
    },
    {
        "id": "update-2026-11-22-finding-mia",
        "title": "Finding Mia",
        "folder": "renpy/findingmia"
    },
    {
        "id": "update-2026-11-22-my-bully-is-my-lover",
        "title": "My Bully Is My Lover",
        "folder": "renpy/mbml"
    },
    {
        "id": "update-2026-11-22-f60-colliction",
        "title": "F60 COLLICTION",
        "folder": "renpy/f60collection"
    },
    {
        "id": "update-2026-11-22-oppai-odessey",
        "title": "Oppai Odessey",
        "folder": "renpy/oppaiodessey"
    },
    {
        "id": "update-2026-11-22-fates-collide",
        "title": "Fates Collide Tersedia Versi Android",
        "folder": "renpy/fatescollide"
    },
    {
        "id": "update-2026-11-22-life-gate",
        "title": "Life's Gate",
        "folder": "renpy/lifegate"
    },
    {
        "id": "update-2026-11-22-toxicity",
        "title": "Toxicity",
        "folder": "renpy/toxicity"
    },
    {
        "id": "update-2026-11-17-companion-of-darkness",
        "title": "Companion Of Darkness V.S2-Ch13",
        "folder": "renpy/companion2"
    },
    {
        "id": "update-2026-11-17-desert-stalker",
        "title": "Desert Stalker V.22 Beta",
        "folder": "renpy/desertstalker"
    },
    {
        "id": "update-2026-11-17-isekai-chan",
        "title": "Isekai Chan V.0.3.5",
        "folder": "renpy/isekaichan"
    },
    {
        "id": "update-2026-11-16-my-happy-life",
        "title": "My Happy Life",
        "folder": "rpgm/myhappylife"
    },
    {
        "id": "update-2026-11-16-dropout-saga",
        "title": "DropOut Saga",
        "folder": "renpy/dropoutsaga"
    },
    {
        "id": "update-2026-11-16-Absolute-dominantion",
        "title": "Absolute Domination",
        "folder": "renpy/absolutedomination"
    },
    {
        "id": "update-2026-11-11-good-luke",
        "title": "Good Luke +18 The Game",
        "folder": "renpy/goodluke/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-11-a-simple",
        "title": "A Simple Life With My Unobtrusive Sister",
        "folder": "rpgm/asimple/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-11-realm-invader",
        "title": "Realm Invader",
        "folder": "renpy/realminvader/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-11-how-to-raise",
        "title": "How To Raise Happy Harem",
        "folder": "renpy/happyharem/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-11-fates-collide",
        "title": "Fates Collide",
        "folder": "renpy/fatescollide/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-11-the-moon-club",
        "title": "The Moon Club",
        "folder": "renpy/themoonclub/",
        "publishedAt": "2026-11-11T16:24:01.000+08:00"
    },
    {
        "id": "update-2026-11-05-echoes-the-lies-we-tell-ourselves",
        "title": "Echoes: The Lies We Tell Ourselves",
        "folder": "renpy/echoes/",
        "publishedAt": "2026-11-05T14:16:30.000+08:00"
    },
    {
        "id": "update-2026-11-05-fate-wont-separate-us",
        "title": "Fate Won't Separate Us",
        "folder": "renpy/fatwonseparate/",
        "publishedAt": "2026-11-05T14:16:30.000+08:00"
    },
    {
        "id": "update-2026-11-05-shadows-of-absence",
        "title": "Shadows Of Absence",
        "folder": "renpy/shadowofabsence/",
        "publishedAt": "2026-11-05T14:16:30.000+08:00"
    },
    {
        "id": "update-2026-11-02-double-perception",
        "title": "Double Perception",
        "folder": "renpy/doubleperception/",
        "publishedAt": "2026-11-02T14:30:00+08:00"
    },
    {
        "id": "update-2026-11-02-whisper-of-desire",
        "title": "Whispers of Desire: Misaki's Path",
        "folder": "renpy/whisperofdesire/",
        "publishedAt": "2026-11-02T14:30:00+08:00"
    },
    {
        "id": "update-2026-10-29-ethereal-threads",
        "title": "Ethereal Threads",
        "folder": "renpy/etherealthreads/",
        "publishedAt": "2026-10-29T15:00:00+08:00"
    },
    {
        "id": "update-2026-10-29-between-humanity",
        "title": "Between Humanity",
        "folder": "renpy/betweenhumanity/",
        "publishedAt": "2026-10-29T15:00:00+08:00"
    },
    {
        "id": "update-2026-10-29-succubus-kingdom",
        "title": "Succubus Kingdom",
        "folder": "renpy/succubuskingdom/",
        "publishedAt": "2026-10-29T15:00:00+08:00"
    },
    {
        "id": "update-2026-10-29-forbidden-thoughts",
        "title": "Forbidden Thoughts",
        "folder": "renpy/forbiddenthoughts/",
        "publishedAt": "2026-10-29T15:00:00+08:00"
    }
];
