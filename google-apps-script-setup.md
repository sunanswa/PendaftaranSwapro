# Setup Google Apps Script untuk Integrasi Google Sheets & Google Drive

Untuk menghubungkan form dengan Google Spreadsheet dan Google Drive Anda, ikuti langkah-langkah berikut:

## 1. Buka Google Apps Script
- Kunjungi [script.google.com](https://script.google.com)
- Klik "New Project"

## 2. Ganti Code.gs dengan kode berikut:

```javascript
function doPost(e) {
  try {
    // ID Spreadsheet Anda
    const SPREADSHEET_ID = '1f1SPwqEnCocOVKKTq-6T5U7hB4zK0ICB1huyyv40toA';
    
    // ID Google Drive Folder untuk CV
    const DRIVE_FOLDER_ID = '1CX03Rk8VImbIFVt1iR9BX17ie1T8IfC_';
    
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
        'CV File Name',
        'CV Drive Link'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setWrap(true);
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // Handle CV file upload jika ada
    let cvFileName = 'Tidak ada file';
    let cvDriveLink = '';
    
    if (data.cvFileData && data.cvFileName) {
      try {
        // Decode base64 file data
        const fileBlob = Utilities.newBlob(
          Utilities.base64Decode(data.cvFileData), 
          'application/pdf', 
          `${data.namaLengkap.replace(/[^a-zA-Z0-9]/g, '_')}_${data.posisiDilamar.replace(/[^a-zA-Z0-9]/g, '_')}_CV.pdf`
        );
        
        // Upload ke Google Drive folder
        const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const file = folder.createFile(fileBlob);
        
        cvFileName = file.getName();
        cvDriveLink = file.getUrl();
        
        // Set file permissions agar bisa diakses
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        console.log('CV uploaded successfully:', cvFileName);
        
      } catch (uploadError) {
        console.error('Error uploading CV:', uploadError);
        cvFileName = `Error: ${data.cvFileName}`;
        cvDriveLink = 'Upload failed';
      }
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
      cvFileName,
      cvDriveLink
    ];
    
    // Tambahkan data ke baris baru
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format baris baru
    const newRowRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // Highlight CV link jika ada
    if (cvDriveLink && cvDriveLink !== 'Upload failed') {
      const cvLinkCell = sheet.getRange(newRow, rowData.length); // Last column
      cvLinkCell.setBackground('#e8f5e8');
      cvLinkCell.setFontColor('#1a73e8');
    }
    
    console.log('Data saved successfully for:', data.namaLengkap);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        cvUploaded: !!cvDriveLink && cvDriveLink !== 'Upload failed',
        message: 'Data berhasil disimpan'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Script error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'Terjadi kesalahan saat menyimpan data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Google Apps Script is working! Ready to receive form submissions.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Function untuk test koneksi
function testConnections() {
  try {
    // Test Spreadsheet
    const SPREADSHEET_ID = '1f1SPwqEnCocOVKKTq-6T5U7hB4zK0ICB1huyyv40toA';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ Spreadsheet accessible:', ss.getName());
    
    // Test Drive Folder
    const DRIVE_FOLDER_ID = '1CX03Rk8VImbIFVt1iR9BX17ie1T8IfC_';
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    console.log('✅ Drive folder accessible:', folder.getName());
    
    return {
      spreadsheet: ss.getName(),
      driveFolder: folder.getName(),
      status: 'All connections working!'
    };
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return {
      error: error.toString(),
      status: 'Connection failed!'
    };
  }
}

// Function untuk membuat sample data (opsional)
function createSampleData() {
  const SPREADSHEET_ID = '1f1SPwqEnCocOVKKTq-6T5U7hB4zK0ICB1huyyv40toA';
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getActiveSheet();
  
  // Sample data
  const sampleData = {
    timestamp: new Date().toISOString(),
    posisiDilamar: 'Sales Officer Chaneling (SOC)',
    penempatan: 'ADIRA TEBET MOTOR',
    namaLengkap: 'John Doe',
    nik: '1234567890123456',
    noHp: '081234567890',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1990-01-01',
    umur: '34',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    agama: 'Islam',
    namaAyah: 'John Senior',
    namaIbu: 'Jane Doe',
    alamatKtp: 'Jl. Contoh No. 123',
    alamatDomisili: 'Jl. Contoh No. 123',
    rtRw: '001/002',
    nomorRumah: '123',
    kelurahan: 'Kelurahan Contoh',
    kecamatan: 'Kecamatan Contoh',
    kota: 'Jakarta',
    kodePos: '12345',
    tingkatPendidikan: 'S1',
    namaSekolah: 'Universitas Contoh',
    jurusan: 'Ekonomi',
    tahunMasuk: '2008',
    tahunLulus: '2012',
    ipk: '3.5',
    pengalamanKerja: 'Ya',
    pengalamanLeasing: 'Ya',
    namaPerusahaan: 'PT. Contoh',
    posisiJabatan: 'Sales',
    periodeKerja: 'Jan 2020 - Des 2023',
    deskripsiTugas: 'Melakukan penjualan produk',
    kendaraanPribadi: 'Ya',
    ktpAsli: 'Ya',
    simC: 'Ya',
    simA: 'Tidak',
    skck: 'Ya',
    npwp: 'Ya',
    riwayatBurukKredit: 'Tidak',
    alasanMelamar: 'Tertarik dengan perusahaan dan posisi yang ditawarkan',
    cvFileName: 'sample_cv.pdf',
    cvFileData: null
  };
  
  // Simulate doPost with sample data
  const mockEvent = {
    postData: {
      contents: JSON.stringify(sampleData)
    }
  };
  
  return doPost(mockEvent);
}
```

## 3. Enable Google Drive API
1. Di Google Apps Script, klik "Services" (ikon + di sebelah kiri)
2. Pilih "Google Drive API"
3. Klik "Add"

## 4. Test Koneksi (Opsional)
1. Di Google Apps Script, klik "Run" pada function `testConnections`
2. Authorize semua permissions yang diminta
3. Cek log untuk memastikan koneksi berhasil

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

## Fitur yang Akan Bekerja:
✅ **Data form** → Masuk ke Google Spreadsheet Anda
✅ **File CV** → Upload ke Google Drive folder Anda  
✅ **Link CV** → Tersimpan di spreadsheet untuk akses mudah
✅ **Auto-naming** → File CV akan dinamai: `NamaLengkap_Posisi_CV.pdf`
✅ **Permissions** → File CV bisa diakses via link
✅ **Auto-formatting** → Header berwarna, border otomatis
✅ **File validation** → Hanya PDF maksimal 5MB

## Struktur Data di Spreadsheet:
- **Header berwarna biru** dengan semua field form
- **Kolom terakhir** berisi link langsung ke file CV di Google Drive
- **Timestamp otomatis** untuk setiap submission
- **Auto-resize columns** untuk readability
- **Highlight CV links** yang berhasil diupload

## Keamanan & Permissions:
- **File CV** akan ter-share dengan permission "Anyone with link can view"
- **Folder Google Drive** hanya bisa diakses oleh Anda
- **Spreadsheet** hanya bisa diakses oleh Anda
- **Script** berjalan dengan permission Anda

## Troubleshooting:
- **Error permissions**: Pastikan sudah authorize semua permissions
- **Error folder access**: Cek apakah folder ID benar dan accessible
- **Error upload**: Cek ukuran file (max 5MB) dan format (harus PDF)
- **Error script**: Cek log di Google Apps Script > Executions
- **CORS errors**: Normal untuk mode 'no-cors', data tetap terkirim

## File Naming Convention:
File CV akan otomatis dinamai dengan format:
`NamaLengkap_PosisiDilamar_CV.pdf`

Contoh: `John_Doe_Sales_Officer_Chaneling_SOC_CV.pdf`

## Monitoring:
- Cek **Google Apps Script > Executions** untuk log aktivitas
- Cek **Google Drive folder** untuk file yang terupload
- Cek **Google Spreadsheet** untuk data yang masuk