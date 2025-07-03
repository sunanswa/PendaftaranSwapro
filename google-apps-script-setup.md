# Setup Google Apps Script untuk Integrasi Google Sheets & Google Drive

Untuk menghubungkan form dengan Google Spreadsheet dan Google Drive Anda, ikuti langkah-langkah berikut:

## 1. Buka Google Apps Script
- Kunjungi [script.google.com](https://script.google.com)
- Klik "New Project"

## 2. Ganti Code.gs dengan kode berikut:

```javascript

```

## 3. Enable Google Drive API
1. Di Google Apps Script, klik "Services" (ikon + di sebelah kiri)
2. Pilih "Google Drive API"
3. Klik "Add"

## 4. Test Koneksi & Script
1. **Test Koneksi**: Jalankan function `testConnections` untuk memastikan akses ke spreadsheet dan drive folder
2. **Test Script**: Jalankan function `testDoPost` untuk test dengan sample data
3. Authorize semua permissions yang diminta
4. Cek log untuk memastikan tidak ada error

## 5. Deploy Web App
1. Klik "Deploy" > "New deployment"
2. Pilih type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Klik "Deploy"
6. **PENTING**: Authorize semua permissions yang diminta
7. Copy URL yang diberikan

## 6. Update Form
Ganti `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` di file App.tsx dengan URL yang Anda dapatkan dari langkah 5.

## 7. Test Complete Integration
1. Coba submit form dengan file CV
2. Cek apakah data masuk ke spreadsheet: https://docs.google.com/spreadsheets/d/1f1SPwqEnCocOVKKTq-6T5U7hB4zK0ICB1huyyv40toA/edit
3. Cek apakah file CV terupload ke Google Drive: https://drive.google.com/drive/folders/1CX03Rk8VImbIFVt1iR9BX17ie1T8IfC_

## Troubleshooting Error yang Anda Alami:

### ❌ `TypeError: Cannot read properties of undefined (reading 'postData')`
**Penyebab**: Function `doPost` dipanggil tanpa data POST yang valid
**Solusi**: 
1. ✅ Sudah ditambahkan error handling untuk cek `postData`
2. ✅ Sudah ditambahkan fallback values untuk semua field
3. ✅ Sudah ditambahkan function `testDoPost` untuk testing

### 🔧 Langkah Debug:
1. **Jalankan `testConnections`** - pastikan akses ke spreadsheet & drive OK
2. **Jalankan `testDoPost`** - test script dengan sample data
3. **Cek Execution log** - lihat apakah ada error lain
4. **Deploy ulang** - setelah update kode

### 📝 Tips:
- Pastikan sudah authorize semua permissions
- Jangan test dengan "Run" button untuk `doPost` - gunakan `testDoPost` instead
- Error tersebut normal jika `doPost` dijalankan manual tanpa data

Coba jalankan function `testConnections` dan `testDoPost` dulu untuk memastikan semuanya bekerja!