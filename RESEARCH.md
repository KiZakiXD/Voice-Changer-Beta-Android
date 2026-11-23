# Riset — Voice-Changer-Beta-Android v1

Riset ini dibuat sebelum menulis kode. Tujuannya: reset dari nol, jangan ngulang kesalahan aplikasi voice changer HP yang sudah ada.

## 1. Platform yang sudah ada — apa yang dipelajari

### Voicemod (Windows, inti produknya desktop)
- Sistemnya: virtual microphone. Mic asli -> Voicemod -> virtual mic -> Discord / game / OBS pilih virtual mic itu.
- Fitur kunci: VoiceLab (pitch, tone, timbre), preset, soundboard, hotkey.
- Pelajaran: routing virtual mic itu yang membuat dia jalan di PC. Di HP, privilege ini tidak ada.
- Catatan penting: **tidak ada Voicemod Android live yang resmi.** APK "Voicemod Android" di luar itu rawan malware. Jangan sideload.

### HitPaw VoicePea
- Real-time voice changer, 300+ efek, integrasi game PC, pitch / tone bisa di-adjust.
- Pelajaran: preset yang bagus itu bukan cuma pitch, tapi pitch + tone + karakter. Dan switching preset harus cepat, tanpa gap.

### Clownfish Voice Changer
- Gratis, system-wide di Windows, 14 suara termasuk Female, custom pitch dengan mixing efek.
- Pelajaran: simplicity menang. User mau langsung jalan, bukan setting 30 menit.

### MagicCall
- Bukan virtual mic. Dia membuat call-nya sendiri lewat infrastrukturnya, suara diubah sebelum dikirim.
- Pelajaran: ini pola yang bisa ditiru di HP — kalau aplikasinya yang pegang call / voice layer-nya, baru real-time voice changer bisa jalan.

### RVC / W-Okada (Realtime Voice Changer, RVC)
- RVC = Retrieval-based Voice Conversion. Bukan sekadar pitch shift, tapi ganti timbre pakai model.
- Parameter inti yang diambil:
  - **Pitch:** cowo ke cewe, sweet spot di +10 sampai +14 di setting RVC (tergantung model dan suara dasar). Di DSP murni tanpa model, sweet spot lebih kecil: +3 sampai +5 semitone.
  - **Formant Shift:** ngubah harmonic / timbre tanpa ngubah pitch. Ini yang membuat suara cewe tidak jadi chipmunk.
  - **Index Ratio:** ngatur seberapa nempel aksen / artikulasi ke model.
  - **F0 det:** RMVPE (paling presisi, robust) vs FCPE (lebih cepat, delay lebih kecil).
- Pelajaran: pitch saja itu tidak cukup. Formant + EQ + model timbre itu yang membuat natural.
- RVC butuh GPU / CPU berat, dan Virtual Audio Cable untuk masuk ke Discord / game di PC. Di HP, ini baru masuk akal di v2, bukan v1. Detail v2 ada di `docs/rvc-okada.md`.

### Voice.ai, Altered Studio, MorphVOX, Voxal
- Voice.ai: preset morphing stabil antar take.
- Altered Studio: batch processing, konsisten untuk aset.
- MorphVOX: customisasi detail pitch / timbre.
- Pelajaran: konsistensi preset itu penting. Suara pengguna harus sama di take 1 dan take 100.

## 2. Kenapa Android susah — batasan sistem

Ini bagian paling penting, dan paling sering dibohongin sama aplikasi lain.

- Android itu sandboxed per aplikasi. Satu aplikasi cuma bisa akses mic-nya sendiri, tidak bisa nyuntik audio ke aplikasi lain.
- **Tidak ada virtual microphone system-wide di Android stock.** Tidak ada API publik untuk daftar mic virtual yang bisa dipilih MLBB / Discord.
- Akibatnya: aplikasi voice changer HP yang klaim "langsung jadi mic MLBB di 1 HP" itu bohong, atau cuma proses clip rekaman, bukan live.
- Latency mobile umumnya 50-200ms, lebih tinggi dari PC yang di-setup bener.
- AI voice cloning real-time di Android bisa, tapi berat di baterai dan CPU.

Sumber pola ini konsisten di banyak panduan Android: live voice change di game / Discord di stock Android tidak jalan tanpa root atau PC relay.

## 3. Tiga cara yang beneran jalan tanpa PC

Reset ke 3 cara ini, dan v1 Voice Changer dibangun di atasnya:

### A. Speaker loopback / 2 HP
- HP B jalanin voice changer, suaranya di-play lewat speaker, HP A (game) tangkep lewat mic-nya.
- Jalan hari ini, biaya nol.
- Kelemahan: reverb ruangan, noise, suara tipis / jauh, dan satu tangan kepake pegang HP kedua.
- **Verdict: untuk eksperimen 5 menit, bukan setup utama.** Kecuali pakai kabel, bukan speaker.

### B. 2 HP + kabel / audio interface (v1 recommended)
- HP 1: proses suara. HP 2: main game.
- Output HP 1 masuk ke input mic HP 2 lewat kabel AUX / splitter TRRS / interface USB-C.
- Ini versi kabel dari loopback, jauh lebih bersih, latency lebih kecil, dan hands-free.
- Kekurangan: butuh kabel / splitter, setup 4-6 langkah per sesi.

### C. Party voice / aplikasi yang pegang call-nya
- Jangan pakai in-game voice MLBB. Pakai layer voice terpisah (Discord, Pinch, atau call di dalam Voice Changer sendiri).
- Karena Voice Changer yang pegang call-nya, suara sudah diubah sebelum dikirim. Ini pola MagicCall, dan ini satu-satunya cara yang bersih di 1 HP.
- Contoh yang sudah jalan: Pinch — voice chat gaming terpisah yang jalan di background sambil main MLBB / PUBG / CODM.

### D. PC relay (bukan fokus v1, tapi dicatat)
- HP jadi mic kedua, PC proses suara pakai virtual mic, terus routing balik ke HP / game.
- Paling reliable, tapi butuh PC. Bukan "modal HP saja", jadi bukan v1.

## 4. MLBB spesifik

- MLBB voice pack yang natural itu kombinasi: pitch + formant profile + tonal EQ.
- Contoh dari riset hero voice: Layla (cewe, bright) itu pitch +3 sampai +4 semitone dari suara cowo. Lesley mirip. Gusion / Granger untuk cowo ke cowo deep itu -3 sampai -4.
- Jadi preset "Cewe Natural" di +4 semitone itu bukan asal — itu di tengah sweet spot Layla / Lesley.
- Android player yang mau suara hero masuk ke in-game voice butuh PC bridge (USB / Bluetooth routing), tanpa root. Itu konfirmasi lagi kenapa v1 fokus ke 2 HP + kabel dan party voice, bukan klaim 1 HP ajaib.

## 5. Kesimpulan riset — desain v1

1. Jangan naikin pitch saja. Pitch + formant + EQ.
2. Jangan klaim system-wide Android. Bangun di 3 mode yang jalan: 2 HP kabel, party voice, clip.
3. Latency adalah fitur. Kalau >200ms, user bakal ninggalin.
4. Preset harus bisa di-tuning per orang. Sweet spot tiap suara beda 1-2 semitone.
5. RVC / AI model itu v2, setelah DSP v1 stabil dan enak didenger. Lihat `docs/rvc-okada.md` untuk parameter, repo public W-Okada, dan mapping preset Via / Naila / Sinta / Rara / Kirana ke model `.pth`.

## Sumber riset

- Voicemod / HitPaw / Clownfish / MorphVOX — perbandingan voice modifying software 2026
- W-Okada RVC Realtime Voice Changer — pitch, formant shift, RMVPE / FCPE — detail di `docs/rvc-okada.md`
- Android voice changer limitations — no system-wide virtual mic, sandbox per app
- Dubbing AI — earbuds vs mobile app vs PC, speaker loopback
- MLBB hero voice pack — Layla +3 to +4 semitones, Android PC bridge
- Pinch — gaming voice chat terpisah untuk MLBB / PUBG / CODM
