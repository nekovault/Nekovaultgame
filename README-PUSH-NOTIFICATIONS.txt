NekoVault Push Notification - Integrasi Website

Isi ZIP ini adalah salinan file website yang kamu kirim, dengan integrasi Push Notification ditambahkan.

Perubahan:
- Menambahkan push-notifications.js.
- Menambahkan pemanggilan push-notifications.js pada index.html dan catalog.html.
- Mempertahankan script.js, notifications.js, style.css, dan sw.js yang sudah ada.
- Kontrol ON/OFF dibuat di dalam panel lonceng dengan CSS terisolasi.

Cara upload:
1. Ekstrak ZIP.
2. Upload file yang berubah (index.html, catalog.html, push-notifications.js) ke folder root GitHub, timpa versi lama untuk index.html dan catalog.html.
3. Pastikan sw.js yang sudah ada di root tetap sama seperti file di ZIP.
4. Tunggu Cloudflare Pages selesai deploy.
5. Tes di Chrome/Edge melalui https://nekovaultgame.pages.dev. Tekan lonceng lalu Aktifkan.

Catatan penting:
- Push subscription hanya berjalan setelah pengguna menekan Aktifkan dan memberikan izin browser.
- Pengaturan berlaku per perangkat/browser.
- Pastikan Edge Function manage-push-subscription dideploy dengan Verify JWT aktif dan secret SUPABASE_SERVICE_ROLE_KEY tersedia di Supabase. Frontend menggunakan anon JWT publik, bukan service_role.
- Edge Function send-game-notification harus menerima panggilan dari backend/otomasi dengan PUSH_ADMIN_TOKEN; jangan pernah taruh token tersebut di file website.
- Integrasi ini hanya mengaktifkan pendaftaran subscription. Pengiriman otomatis saat game baru dipublikasikan masih memerlukan workflow GitHub Actions atau pemanggilan server-side yang aman.
