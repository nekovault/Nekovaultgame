/* NekoVault browser Push Notifications
 * Separate from script.js: the existing in-site notification bell remains unchanged.
 */
(() => {
  "use strict";

  const SUPABASE_URL = "https://rjsuhsvzdyiefdnuvatt.supabase.co";
  // Public legacy anon JWT. Never replace this with a service_role or secret key.
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqc3Voc3Z6ZHlpZWZkbnV2YXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzE1NjIsImV4cCI6MjEwNjQwNzU2Mn0.MWY1Chts_G_VjJZ7Kc-HpHbIQl5mhX_zw3aWhooz5nQ";
  const VAPID_PUBLIC_KEY = "BA6scEPDMuFob4-ICrLPpmymWUMtYWQJQnEFrmjPwO3ChtERl3OjXXgVWkIJhaojIJWe6kBfGJsR7YW0_a2nqlY";
  const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/manage-push-subscription`;

  const STYLE_ID = "nekovault-push-settings-style";
  const PANEL_ID = "nekovaultPushSettings";

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PANEL_ID}{margin:0 14px 14px;padding:12px 13px;border:1px solid rgba(167,139,250,.28);border-radius:12px;background:rgba(91,54,160,.12);}
      #${PANEL_ID} .nv-push-title{font-size:13px;font-weight:700;color:inherit;margin:0 0 5px;}
      #${PANEL_ID} .nv-push-description{font-size:11px;line-height:1.5;opacity:.78;margin:0 0 10px;}
      #${PANEL_ID} .nv-push-row{display:flex;align-items:center;justify-content:space-between;gap:10px;}
      #${PANEL_ID} .nv-push-status{font-size:11px;line-height:1.4;opacity:.82;}
      #${PANEL_ID} .nv-push-button{border:0;border-radius:8px;padding:8px 12px;background:#8b5cf6;color:#fff;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;}
      #${PANEL_ID} .nv-push-button:disabled{opacity:.55;cursor:wait;}
      #${PANEL_ID} .nv-push-button.nv-push-off{background:#454052;}
    `;
    document.head.appendChild(style);
  }

  function base64UrlToUint8Array(base64Url) {
    const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw = atob(base64);
    const output = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
    return output;
  }

  async function callSubscriptionFunction(payload) {
    const response = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(payload)
    });

    let result = {};
    try { result = await response.json(); } catch (_) {}
    if (!response.ok || !result.success) {
      throw new Error(result.error || `Permintaan gagal (${response.status})`);
    }
    return result;
  }

  function createPanelControls() {
    const panel = document.getElementById("notificationPanel");
    const list = document.getElementById("notificationList");
    if (!panel || !list || document.getElementById(PANEL_ID)) return null;

    addStyles();
    const wrapper = document.createElement("section");
    wrapper.id = PANEL_ID;
    wrapper.setAttribute("aria-label", "Pengaturan Push Notification");
    wrapper.innerHTML = `
      <p class="nv-push-title">Notifikasi di perangkat</p>
      <p class="nv-push-description">Aktifkan agar kabar game baru tetap masuk meskipun NekoVault tidak sedang dibuka. Pengaturan berlaku untuk browser/perangkat ini.</p>
      <div class="nv-push-row">
        <span class="nv-push-status" id="nvPushStatus" role="status" aria-live="polite">Memeriksa dukungan browser…</span>
        <button class="nv-push-button" id="nvPushToggle" type="button" disabled>Memeriksa</button>
      </div>
    `;
    panel.insertBefore(wrapper, list);
    return {
      status: wrapper.querySelector("#nvPushStatus"),
      button: wrapper.querySelector("#nvPushToggle")
    };
  }

  function setUI(ui, message, enabled, busy = false) {
    if (!ui) return;
    ui.status.textContent = message;
    ui.button.disabled = busy;
    ui.button.classList.toggle("nv-push-off", enabled);
    ui.button.textContent = busy ? "Memproses…" : (enabled ? "Matikan" : "Aktifkan");
    ui.button.dataset.enabled = enabled ? "true" : "false";
  }

  async function init() {
    const ui = createPanelControls();
    if (!ui) return;

    if (!window.isSecureContext || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setUI(ui, "Browser ini belum mendukung Push Notification. Coba Chrome atau Edge terbaru.", false);
      ui.button.hidden = true;
      return;
    }

    let registration;
    try {
      registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      await navigator.serviceWorker.ready;
    } catch (error) {
      console.error("NekoVault service worker:", error);
      setUI(ui, "Service Worker gagal diaktifkan. Muat ulang halaman atau periksa file /sw.js.", false);
      ui.button.disabled = true;
      return;
    }

    const refresh = async () => {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        setUI(ui, "Push Notification aktif di perangkat ini.", true);
      } else if (Notification.permission === "denied") {
        setUI(ui, "Izin notifikasi diblokir. Ubah izin situs melalui pengaturan browser.", false);
        ui.button.disabled = true;
      } else {
        setUI(ui, "Push Notification belum diaktifkan.", false);
      }
      return subscription;
    };

    await refresh();

    ui.button.addEventListener("click", async () => {
      const enabled = ui.button.dataset.enabled === "true";
      setUI(ui, enabled ? "Menonaktifkan notifikasi…" : "Meminta izin notifikasi…", enabled, true);

      try {
        const current = await registration.pushManager.getSubscription();
        if (current || enabled) {
          if (!current) {
            await refresh();
            return;
          }
          await callSubscriptionFunction({ action: "unsubscribe", endpoint: current.endpoint });
          const removed = await current.unsubscribe();
          if (!removed) throw new Error("Browser tidak berhasil menonaktifkan subscription.");
          setUI(ui, "Push Notification sudah dimatikan di perangkat ini.", false);
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          if (permission === "denied") {
            setUI(ui, "Izin ditolak. Aktifkan izin situs dari pengaturan browser.", false);
            ui.button.disabled = true;
          } else {
            setUI(ui, "Izin notifikasi belum diberikan.", false);
          }
          return;
        }

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64UrlToUint8Array(VAPID_PUBLIC_KEY)
        });

        try {
          await callSubscriptionFunction({
            action: "subscribe",
            endpoint: subscription.endpoint,
            subscription: subscription.toJSON()
          });
        } catch (error) {
          await subscription.unsubscribe();
          throw error;
        }

        setUI(ui, "Push Notification aktif di perangkat ini.", true);
      } catch (error) {
        console.error("NekoVault push setting:", error);
        setUI(ui, `Gagal: ${error.message || "Terjadi kesalahan"}`, false);
        ui.button.disabled = false;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
