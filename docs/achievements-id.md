Panduan Voice Changer

Aplikasi ini adalah voice changer real-time untuk gamer HP yang masih dalam tahap pengembangan beta. Suara dari mikrofon diproses langsung saat berbicara, lalu diteruskan ke game. Yang diubah adalah pitch, formant, dan EQ. Pitch menaikkan atau menurunkan nada suara, formant mengubah karakter dan warna suara, dan EQ merapikan bagian suara yang terlalu rendah atau terlalu tajam.

Cara memakai yang disarankan di repo ini adalah mulai dari preset Naila (+4), lalu uji dengan kalimat biasa, misalnya halo, saya mau beli skin. Kalau terdengar terlalu berat, naikkan 1 semitone. Kalau terdengar terlalu tinggi atau seperti chipmunk, turunkan 1 semitone. Jangan langsung memakai pitch yang terlalu tinggi, misalnya +12, dan jangan menambahkan bass atau reverb yang berlebihan di dalam game, karena hasilnya malah tidak jelas.

Preset suara

Normal: suara asli tanpa perubahan. Ini titik awal untuk membandingkan hasil preset lain dan untuk memeriksa apakah suara terdengar jelas sebelum diubah.

Via (+2 semitone): suara kalem, halus, dan lembut, dengan tempo bicara yang agak lambat. Cocok untuk ngobrol santai. Formant naik sedikit (+0.5) dan EQ-nya lembut, memotong frekuensi rendah di bawah 100 Hz dan menaikkan presence di 2-4 kHz.

Naila (+4 semitone): suara yang paling natural menurut dokumen preset. Cocok untuk main Mobile Legends sambil ngobrol biasa, misalnya saat memakai Layla atau Lesley. Formant naik sedikit, EQ memotong frekuensi rendah di bawah 120 Hz dan menaikkan 3-5 kHz.

Sinta (+3 semitone): suara lembut untuk ngobrol santai, tidak terlalu tinggi. Formant naik sedikit dan EQ-nya lembut, tidak terlalu bright.

Rara (+7 semitone): suara anime yang tinggi, cocok untuk prank atau konten karakter. Formant naik lebih banyak dan EQ-nya bright. Kalau suara dasar sudah tinggi, hasilnya bisa terdengar seperti chipmunk, jadi turunkan ke +5.

Kirana (+5 semitone): suara manja, cocok untuk prank atau konten yang gemas. Formant naik dan EQ-nya bright.

Cowok Deep (-3 semitone): suara yang lebih berat dan rendah dari suara asli. Cocok untuk prank suara berat. Formant turun sedikit.

Catatan: dokumen preset di repo ini juga menyebut preset Robot, yaitu pitch 0 dengan efek robot dan echo tipis, yang dipakai untuk hiburan saja karena tidak terdengar natural.

Tips singkat

Uji preset dengan kalimat normal, bukan dengan suara yang dibuat-buat. Ubah pitch sedikit demi sedikit, 1 semitone setiap kali. Kalau satu preset terasa kurang pas, coba preset di dekatnya dulu sebelum mengubah banyak pengaturan. Detail lengkap tiap preset ada di docs/presets.md dan gambaran umum proyek ada di README.md.
