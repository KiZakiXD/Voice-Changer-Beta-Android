# Setup 2 HP — Voice-Changer-Beta-Android v1

Ini setup recommended untuk MLBB. Modal: 2 HP, 1 headset kabel, 1 kabel AUX / splitter.

## Yang dibutuhkan

- HP 1 — HP Voice Changer. Jalankan Voice Changer di sini.
- HP 2 — HP Game. Main MLBB di sini.
- Headset kabel dengan mic (bukan TWS, untuk v1 ini kabel lebih stabil).
- Kabel AUX 3.5mm male-to-male, atau splitter TRRS + kabel AUX.
- Kalau HP tidak ada jack 3.5mm: adapter USB-C to 3.5mm.

TWS bisa untuk monitoring di HP 1, tapi untuk kirim suara ke HP 2, kabel tetap paling bersih.

## Wiring

```
[Pengguna berbicara]
  -> Mic headset kabel
  -> HP 1 (Voice Changer: pitch + formant + EQ, real-time)
  -> Output HP 1 (jack / USB-C)
  -> Kabel AUX
  -> Input mic HP 2
  -> MLBB in-game voice
  -> Teman mendengar suara perempuan
```

Game audio dari HP 2 jangan masuk ke jalur ini. dengarkan game lewat earphone terpisah, atau speaker HP 2 pelan.

## Langkah

1. HP 1: buka prototipe Voice Changer, colok headset, izinin mic.
2. Pilih preset **Cewe Natural (+4)**.
3. Tekan Mulai, berbicara "halo, test satu dua tiga", cek di headset monitoring.
4. Turun / naikin pitch 1 semitone sampai paling natural.
5. Colok kabel AUX dari HP 1 ke HP 2 (port mic / splitter).
6. HP 2: buka MLBB, Settings > Sound, pastiin mic aktif, volume mic jangan 100% — mulai dari 70%.
7. Test di lobby / custom: berbicara pendek, tanya teman "suara saya aneh tidak?".
8. Kalau ada feedback / bunyi nging: turunin volume output HP 1, jauhin speaker dari mic, pakai headset, bukan speaker HP.

## Kalau suara masih aneh

- Terlalu chipmunk: turunin pitch dari +7 ke +4, atau +3.
- Terlalu berat / cowo sangat: naikin pitch 1 semitone, naikin formant dikit.
- Suara tipis / jauh: naikin volume output HP 1, cek kabel AUX longgar atau tidak.
- Delay kerasa: tutup aplikasi lain di HP 1, pakai headset kabel (bukan TWS) untuk input.

## Mode Party Voice (alternatif 1 HP)

Kalau tidak mau ribet 2 HP:

1. Jangan pakai voice in-game MLBB.
2. Ajak squad ke Discord / Pinch / voice call yang sama.
3. Voice Changer yang pegang voice layer itu, jadi suara sudah diubah sebelum dikirim.

Ini paling bersih untuk 1 HP, tapi teman harus mau pindah voice ke luar game.
