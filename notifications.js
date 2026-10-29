/*
 * DATABASE NOTIFIKASI GAME BARU NEKOVAULT
 *
 * Cara pakai:
 * 1. Setiap kali akan menerbitkan game baru, tambahkan satu objek untuk setiap game.
 * 2. Untuk game yang dipublikasikan pada hari dan jam yang sama, gunakan publishedAt
 *    yang SAMA persis pada semua objek dalam kelompok tersebut.
 * 3. Gunakan format tanggal ISO: YYYY-MM-DDTHH:mm:ss+07:00 untuk waktu WIB.
 *    Contoh: 2026-10-30T16:00:00+07:00
 * 4. folder harus sama dengan folder game yang ada di gameList, tanpa "game.js"
 *    dan tanpa garis miring di awal/akhir. Contoh: "renpy/etherealthreads/"
 * 5. title adalah judul yang akan ditampilkan di panel notifikasi.
 *
 * Game lama tidak perlu dimasukkan. Hanya tambahkan game yang baru dipublikasikan.
 * Jangan ubah tanggal game lama saat melakukan deploy minggu berikutnya.
 */
    

window.NEKO_NOTIFICATIONS = [
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
