# Voice-Changer-Beta-Android

> Real-time voice changer untuk gamer HP.
> Modal headset / TWS, atau 2 HP. Tanpa PC.

**Status: Dalam Tahap Pengembangan — Beta Tester**

Proyek ini masih dalam tahap pengembangan dan saat ini dibuka untuk beta tester. Fitur, preset, dan performa dapat berubah selama masa beta. Laporan bug, masukan preset, dan hasil pengujian sangat membantu pengembangan selanjutnya.

## Tentang Proyek

Voice-Changer-Beta-Android adalah voice changer real-time yang dirancang khusus untuk gamer mobile, terutama Mobile Legends dan game lain yang menggunakan voice chat.

Fokus v1 adalah satu hal: **suara laki-laki ke perempuan yang natural, enak didengar, dan real-time, untuk prank / hode di MLBB dan game lain.**

## Yang Membedakan v1

Kebanyakan voice changer HP hanya menaikkan pitch. Hal tersebut membuat suara terdengar aneh, seperti chipmunk.

Proyek ini dirancang ulang dari sistem voice changer yang sudah ada — Voicemod, HitPaw VoicePea, Clownfish, MagicCall, sampai RVC / W-Okada — dengan mengambil hal yang benar-benar berpengaruh untuk suara natural:

1. **Pitch shift kecil, bukan besar.** Laki-laki ke perempuan itu +3 sampai +5 semitone, bukan +12. +12 membuat suara terdengar seperti kartun.
2. **Formant shift, bukan hanya pitch.** Formant mengubah timbre / karakter suara, tanpa merusak pitch. Ini kunci agar tidak terdengar seperti chipmunk.
3. **EQ + noise gate.** Potong frekuensi low yang membuat suara berat, boost presence di 3-5 kHz agar jernih, dan gate agar suara keyboard / kipas tidak ikut masuk.
4. **Latency rendah.** Target di bawah 150ms di HP. Jika delay terasa, prank akan gagal.

Riset lengkap ada di `RESEARCH.md`, dan rencana RVC v2 ada di `docs/rvc-okada.md`.

## Catatan Penting Soal Android

Android **tidak memiliki virtual microphone system-wide**. Satu aplikasi tidak dapat menjadi mic untuk aplikasi lain, seperti di Windows.

Oleh karena itu Voice-Changer-Beta-Android v1 **tidak mengklaim** dapat langsung menjadi mic MLBB di 1 HP yang sama. Yang dilakukan v1, dan yang benar-benar berjalan di HP, adalah sebagai berikut:

### Mode yang Berjalan di v1

**1. Mode 2 HP — direkomendasikan untuk MLBB**
- HP 1: menjalankan Voice Changer, mic dari headset kabel.
- HP 2: HP untuk bermain MLBB.
- Output HP 1 masuk ke mic HP 2 melalui kabel AUX / splitter TRRS / audio interface USB-C.
- Suara yang masuk ke MLBB sudah suara yang diubah, bukan suara asli pengguna.

**2. Mode Party Voice**
- Jangan memakai voice in-game MLBB. Pakai voice layer terpisah — Discord / Pinch / call di dalam Voice Changer.
- Di sini Voice Changer yang memegang call-nya, sehingga suara sudah diubah sebelum dikirim.

**3. Mode Clip / Soundboard**
- Rekam, ubah, lalu putar clip pendek di momen yang tepat. Untuk prank line, bukan obrolan panjang.

Detail wiring ada di `docs/setup-2-hp.md`.

Mode headset / TWS saja di 1 HP dapat dicoba untuk monitoring, tetapi untuk masuk ke game lain tetap terkena batasan Android di atas.

## Preset v1

| Preset | Pitch | Cocok untuk |
|---|---|---|
| Via — Kalem Alus | +2 semitone | Kalem, alus, menyentuh |
| Naila — Natural | +4 semitone | Hode MLBB, ngobrol normal |
| Sinta — Lembut | +3 semitone, formant naik sedikit | Ngobrol santai |
| Rara — Anime | +7 semitone | Prank, konten |
| Kirana — Manja | +5 semitone | Prank, gemes |
| Cowok Deep | -3 semitone | Prank suara berat |
| Robot | +0, efek khusus | Fun saja |

Preset lengkap + cara tuning ada di `docs/presets.md`.

## Mencoba Prototipe v1

Ada dua cara mencoba v1:

**A. Aplikasi Android (Beta) — direkomendasikan**

File: `Voice-Changer-Beta-Android-debug.apk` (694 KB, version 1.0-beta).

1. Salin APK ke HP.
2. Di HP, izinkan instalasi dari sumber tidak dikenal untuk aplikasi file manager / browser yang dipakai.
3. Buka APK, instal, lalu izinkan akses mikrofon saat pertama dibuka.
4. Gunakan headset kabel untuk monitoring, agar tidak terjadi feedback.
5. Pilih preset (Naila — Natural adalah default), tekan **Mulai**, berbicara, dengarkan melalui headset.

**B. Prototipe web (PWA)**

Buka `prototype/index.html` di browser HP / Chrome. Prototipe ini juga
dapat diinstal sebagai aplikasi web (PWA) dari browser, dengan
`manifest.webmanifest` dan `sw.js`.

1. Colok headset kabel, izinkan mic.
2. Pilih preset **Naila — Natural**.
3. Tekan **Mulai**, berbicara, dengarkan melalui headset.
4. Tuning pitch +/- 1 semitone sampai terdengar paling natural. Setiap orang memiliki sweet spot yang berbeda.

Prototipe ini memakai Web Audio real-time, bukan rekaman dulu baru diubah.

## v2 — RVC (rencana, bukan v1)

v1 ini DSP murni: pitch + formant + EQ, berjalan di CPU HP, tidak butuh GPU.

v2 adalah RVC, dan itu berbeda kelas:

- **Butuh GPU untuk training + inference.** Training model suara perempuan asli butuh GPU. Inference real-time di PC butuh GPU juga — CPU-only bisa, tetapi latency naik 300-600ms.
- **Jalur mobile: ONNX.** Untuk HP, v2 memakai model ONNX, bukan CUDA saja. Contohnya fork RVC-only ONNX seperti `woys`. Jika HP tidak kuat, server RVC dapat berjalan di cloud GPU (Colab / Kaggle) atau HP kedua.
- **Pitch RVC berbeda dengan DSP.** Di RVC, laki-laki ke perempuan itu sweet spot **+10 sampai +14 semitone**. Di DSP v1, sweet spot hanya **+2 sampai +7** — +12 tanpa model timbre langsung menjadi kartun. Jangan disamakan mentah-mentah.
- **Parameter yang wajib ada:** formant shift, index ratio (seberapa nempel aksen ke model), F0 det **RMVPE** (paling presisi) vs **FCPE** (lebih cepat, delay lebih kecil), dan buffer — lag total = buf + res, buffer harus lebih panjang dari res time.
- **Model harus dari suara perempuan asli, dengan izin.** Via / Naila / Sinta / Rara / Kirana di v1 adalah preset DSP. Di v2 nama yang sama menjadi nama modelnya: `via.pth`, `naila.pth`, dst.

Detail lengkap + sumber public W-Okada ada di `docs/rvc-okada.md`.

## Coming Soon

- **VTuber / Live Cam** — karakter animasi yang bergerak mengikuti muka + suara pengguna, untuk live TikTok / IG. Coming soon.
- **RVC Model** — voice conversion AI untuk timbre yang lebih nempel, setelah DSP v1 stabil. Lihat bagian v2 di atas.
- **Mode 1 HP yang lebih bersih** — riset lanjutan untuk routing audio tanpa PC.

## Status Pengembangan

- **v1.0 — Beta, dalam tahap pengembangan**
  - Prototipe + riset + setup 2 HP
  - Terbuka untuk beta tester
  - Harap laporkan bug, preset yang kurang enak, atau setup yang lebih baik melalui issue / PR
- **VTuber / Live Cam — Coming Soon**

## Penggunaan yang Bertanggung Jawab

Jangan dipakai untuk menipu orang, scam, atau menyamar untuk hal yang merugikan orang lain. Proyek ini dibuat untuk have fun di game, prank teman, dan konten.
