# RVC / W-Okada — yang diambil untuk v2

> Sumber public, bukan ditulis dari nol. Pola + parameternya diambil, lalu diadaptasi untuk Voice-Changer-Beta-Android.

## Repo public yang dipakai sebagai referensi

- **w-okada/voice-changer** — VCClient, original. 21k+ stars, 2.4k+ forks, public sejak Agustus 2022.
  - `https://github.com/w-okada/voice-changer`
  - Support: RVC, MMVC, so-vits-svc, DDSP-SVC, Beatrice v1/v2
  - Server-client: server proses suara, client web UI di browser (localhost:18888)
  - Lisensi: custom, BUKAN MIT semua. Beatrice itu NOT MIT. Baca LICENSE dulu sebelum dipakai komersial.
- **tg-develop/voice-changer** — fork dari Deiteris fork, performance improvements, Web UI lebih bagus, support Spin Embedder Models, ada Audio Effects.
  - `git clone https://github.com/tg-develop/voice-changer.git`
  - Ada versi cloud: Google Colab / Kaggle / Lightning.AI, untuk yang tidak punya GPU lokal.
- **deiteris/voice-changer** — fork yang lebih performant dari original W-Okada.
- **alirexha/woys** — fork-and-trim W-Okada, RVC-only, ONNX Runtime CUDA, PipeWire-native, Linux. Ini contoh paling bersih untuk v2 ringan: engine RVC saja, tanpa Beatrice / MMVC / dll.

## Yang diambil dari Okada

### 1. Arsitektur server-client
- Mic -> server (RVC inference) -> Virtual Audio Cable / output -> Discord / game / OBS.
- Di PC, Virtual Audio Cable itu kunci. Di HP, ini diganti sama Mode 2 HP + kabel / party voice di v1.
- untuk v2 mobile: server bisa di HP kedua / cloud GPU, client-nya HP game. Sama seperti pola 2 PC di Okada: 1 PC gaming, 1 PC lagi khusus voice changer.

### 2. Parameter RVC yang wajib ada di v2
Ini yang membuat suara cewe asli tidak jadi chipmunk:

- **Pitch (semitone):** cowo ke cewe, sweet spot +10 sampai +14 di RVC (tergantung suara dasar). Di DSP v1 dipakai +2 sampai +7, karena tanpa model timbre, +12 itu langsung kartun.
- **Formant Shift:** ngubah harmonic / timbre tanpa ngubah pitch.
- **Index Ratio:** ngatur seberapa nempel aksen / artikulasi ke model. Kalau aksen pengguna berat, pakai rendah.
- **F0 det:** RMVPE (paling presisi, robust) vs FCPE (lebih cepat, delay lebih kecil).
- **Buffer / res:** lag dari berbicara sampai keluar suara = buf + res. Buffer harus lebih panjang dari res time.
- **RMS mix, silence, crossfade, block length:** untuk suara tidak putus-putus dan nafas tetap nafas, bukan dikasih pitch tetangga.

### 3. Model .pth / .safetensors
- Model RVC itu file `.pth` (training output) atau `.safetensors`.
- Model harus dilatih terpisah, dari suara cewe asli, dengan izin.
- Via / Naila / Sinta / Rara / Kirana di v1 itu preset DSP. Di v2, nama yang sama jadi nama model RVC-nya: `via.pth`, `naila.pth`, dst.
- Jangan pakai model orang lain tanpa izin / lisensi yang jelas.

### 4. Edisi menentukan model
- Dari v2.2.1: edisi `std` cuma Beatrice, `cuda` (Windows) + RVC, `onnx` (Windows / Mac M1) + RVC.
- Untuk v2: dipakai jalur **ONNX** — paling masuk akal untuk HP / ringan, bukan CUDA saja.

### 5. Cloud GPU untuk yang tidak punya GPU
- Tg-Develop fork ada versi Colab / Kaggle. Polanya: server jalan di cloud, client buka lewat Public Tunnel URL.
- Ini bisa jadi jalan untuk user HP yang mau template cewe asli tapi HP-nya tidak kuat inference RVC.

## Yang TIDAK diambil mentah-mentah

- Repo Okada tidak di-copy-paste ke repo ini. Repo ini tetap proyek sendiri, dengan arsitektur sendiri untuk Android / HP.
- Beatrice / model orang lain tidak diklaim sebagai model proyek ini.
- Lisensi custom Okada tidak dipakai untuk bagian yang bukan MIT tanpa dibaca dulu.

## Rencana v2 — mapping preset ke RVC

| Preset v1 (DSP) | RVC v2 (model) | Pitch awal | F0 det |
|---|---|---|---|
| Via — Kalem Alus | via.pth | +10 | RMVPE |
| Naila — Natural | naila.pth | +12 | RMVPE |
| Sinta — Lembut | sinta.pth | +11 | FCPE (latency kecil) |
| Rara — Anime | rara.pth | +13 | RMVPE |
| Kirana — Manja | kirana.pth | +12 | FCPE |

Catatan: angka pitch RVC beda sama DSP. Jangan samain mentah-mentah, harus tuning per suara.

## Referensi

- w-okada/voice-changer README_en.md
- Tg-Develop's W-Okada Fork — docs.aihub.gg
- Deiteris' W-Okada Fork
- woys — RVC-only ONNX fork
- RVC Guide — pitch shift +12 untuk cowo ke cewe, RMVPE vs FCPE
