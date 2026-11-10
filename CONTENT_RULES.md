# Standar Penambahan Doa & Dzikir Baru (DzikirKu)

Setiap kali menambahkan doa atau dzikir baru ke dalam aplikasi (baik pada `doa-data.ts`, `daily-dhikr-data.ts`, maupun data dzikir utama):

1. **Wajib Memiliki Field `note`**:
   - Seluruh item baru harus menyertakan keterangan rujukan hadits atau ayat Al-Qur'an.
2. **Pilihan Situs Sumber Rujukan Terverifikasi**:
   - https://hadits.in/
   - https://www.hadits.id/
   - https://hadits.tazkia.ac.id/
   - https://hadits.arina.id/
   - https://ilmuislam.id/
   - https://quran.kemenag.go.id/
3. **Penyertaan Link Website pada Teks Catatan**:
   - Teks catatan harus menyertakan URL aktif dari daftar pilihan website di atas agar otomatis di-render sebagai tautan yang dapat diklik di antarmuka pengguna.
   - Contoh:
     `QS. Al-Baqarah [2]: 201 · Sumber: https://quran.kemenag.go.id/`
     `HR. Bukhari no. 6306 · Sumber: https://hadits.in/`
4. **Pembaruan Service Worker & Deploy**:
   - Setiap ada penambahan konten baru, naikkan versi cache di `public/sw.js` (bump version), jalankan tes `npm test`, lalu build dan deploy ke GitHub.
