# Setup Google Apps Script untuk Integrasi Google Sheets

Untuk menghubungkan form dengan Google Spreadsheet Anda, ikuti langkah-langkah berikut:

## 1. Buka Google Apps Script
- Kunjungi [script.google.com](https://script.google.com)
- Klik "New Project"

## 2. Ganti Code.gs dengan kode berikut:

```javascript
function doPost(e) {
  try {
    // ID Spreadsheet Anda (ambil dari URL)
    const SPREADSHEET_ID = '1f1SPwqEnCocOVKKTq-6T5U7hB4zK0ICB1huyyv40toA';
    
    // Buka spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getActiveSheet();
    
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);
    
    // Jika ini adalah baris pertama, tambahkan header
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Posisi Dilamar',
        'Penempatan',
        'Nama Lengkap',
        'NIK',
        'No HP',
        'Tempat Lahir',
        'Tanggal Lahir',
        'Umur',
        'Jenis Kelamin',
        'Status Perkawinan',
        'Agama',
        'Nama Ayah',
        'Nama Ibu',
        'Alamat KTP',
        'Alamat Domisili',
        'RT/RW',
        'Nomor Rumah',
        'Kelurahan',
        'Kecamatan',
        'Kota',
        'Kode Pos',
        'Tingkat Pendidikan',
        'Nama Sekolah',
        'Jurusan',
        'Tahun Masuk',
        'Tahun Lulus',
        'IPK',
        'Pengalaman Kerja',
        'Pengalaman Leasing',
        'Nama Perusahaan',
        'Posisi Jabatan',
        'Periode Kerja',
        'Deskripsi Tugas',
        'Kendaraan Pribadi',
        'KTP Asli',
        'SIM C',
        'SIM A',
        'SKCK',
        'NPWP',
        'Riwayat Buruk Kredit',
        'Alasan Melamar',
        'CV File Name'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Siapkan data untuk dimasukkan
    const rowData = [
      new Date(data.timestamp),
      data.posisiDilamar,
      data.penempatan,
      data.namaLengkap,
      data.nik,
      data.noHp,
      data.tempatLahir,
      data.tanggalLahir,
      data.umur,
      data.jenisKelamin,
      data.statusPerkawinan,
      data.agama,
      data.namaAyah,
      data.namaIbu,
      data.alamatKtp,
      data.alamatDomisili,
      data.rtRw,
      data.nomorRumah,
      data.kelurahan,
      data.kecamatan,
      data.kota,
      data.kodePos,
      data.tingkatPendidikan,
      data.namaSekolah,
      data.jurusan,
      data.tahunMasuk,
      data.tahunLulus,
      data.ipk,
      data.pengalamanKerja,
      data.pengalamanLeasing,
      data.namaPerusahaan,
      data.posisiJabatan,
      data.periodeKerja,
      data.deskripsiTugas,
      data.kendaraanPribadi,
      data.ktpAsli,
      data.simC,
      data.simA,
      data.skck,
      data.npwp,
      data.riwayatBurukKredit,
      data.alasanMelamar,
      data.cvFileName
    ];
    
    // Tambahkan data ke baris baru
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Google Apps Script is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. Deploy Web App
1. Klik "Deploy" > "New deployment"
2. Pilih type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Klik "Deploy"
6. Copy URL yang diberikan

## 4. Update Form
Ganti `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` di file App.tsx dengan URL yang Anda dapatkan dari langkah 3.

## 5. Test
Coba submit form untuk memastikan data masuk ke spreadsheet Anda.

## Catatan Penting:
- Pastikan spreadsheet dapat diakses oleh script
- URL script harus diupdate di kode form
- File CV tidak akan diupload ke Google Drive, hanya nama file yang disimpan
- Untuk upload file CV, Anda perlu setup tambahan dengan Google Drive API

## Troubleshooting:
- Jika ada error, cek log di Google Apps Script
- Pastikan spreadsheet ID benar
- Pastikan permissions sudah diset dengan benar