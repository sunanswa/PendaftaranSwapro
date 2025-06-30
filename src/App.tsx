import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  FileCheck, 
  Upload,
  Phone,
  Calendar,
  Home,
  School,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FormData {
  // Position Information
  posisiDilamar: string;
  penempatan: string;
  
  // Personal Information
  namaLengkap: string;
  nik: string;
  noHp: string;
  tempatLahir: string;
  tanggalLahir: string;
  umur: string;
  jenisKelamin: string;
  statusPerkawinan: string;
  agama: string;
  namaAyah: string;
  namaIbu: string;
  
  // Address Information
  alamatKtp: string;
  alamatDomisili: string;
  rtRw: string;
  nomorRumah: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  
  // Education
  tingkatPendidikan: string;
  namaSekolah: string;
  jurusan: string;
  tahunMasuk: string;
  tahunLulus: string;
  ipk: string;
  
  // Work Experience
  pengalamanKerja: boolean;
  pengalamanLeasing: boolean;
  namaPerusahaan: string;
  posisiJabatan: string;
  periodeKerja: string;
  deskripsiTugas: string;
  
  // Document Verification
  kendaraanPribadi: boolean;
  ktpAsli: boolean;
  simC: boolean;
  simA: boolean;
  skck: boolean;
  npwp: boolean;
  riwayatBurukKredit: boolean;
  
  // Motivation & CV
  alasanMelamar: string;
  cvFile: File | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    posisiDilamar: '',
    penempatan: '',
    namaLengkap: '',
    nik: '',
    noHp: '',
    tempatLahir: '',
    tanggalLahir: '',
    umur: '',
    jenisKelamin: '',
    statusPerkawinan: '',
    agama: '',
    namaAyah: '',
    namaIbu: '',
    alamatKtp: '',
    alamatDomisili: '',
    rtRw: '',
    nomorRumah: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    kodePos: '',
    tingkatPendidikan: '',
    namaSekolah: '',
    jurusan: '',
    tahunMasuk: '',
    tahunLulus: '',
    ipk: '',
    pengalamanKerja: false,
    pengalamanLeasing: false,
    namaPerusahaan: '',
    posisiJabatan: '',
    periodeKerja: '',
    deskripsiTugas: '',
    kendaraanPribadi: false,
    ktpAsli: false,
    simC: false,
    simA: false,
    skck: false,
    npwp: false,
    riwayatBurukKredit: false,
    alasanMelamar: '',
    cvFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Data Pribadi', icon: User },
    { title: 'Alamat', icon: MapPin },
    { title: 'Pendidikan', icon: GraduationCap },
    { title: 'Pengalaman Kerja', icon: Briefcase },
    { title: 'Dokumen & Motivasi', icon: FileCheck },
  ];

  const posisiOptions = [
    'Sales Officer Chaneling (SOC)',
    'Sales Officer Mobile (SOM)',
    'Relationship Officer (RO)',
    'Remedial Collection (REMOF)',
    'Problem Account Officer (PAO)',
    'Sales Force (SF)'
  ];

  const penempatanOptions = [
    'ADIRA TEBET MOTOR',
    'ADIRA TEBET MOBIL',
    'ADIRA KELAPA GADING MOTOR',
    'ADIRA KELAPA GADING MOBIL',
    'ADIRA KETAPANG',
    'ADIRA PONDOK GEDE',
    'SMSF JAKARTA TIMUR',
    'SMSF JAKARTA UTARA'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleInputChange('cvFile', file);
    } else if (file) {
      setErrors(prev => ({ ...prev, cvFile: 'File harus berformat PDF' }));
    }
  };

  const validateSection = (sectionIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (sectionIndex) {
      case 0: // Personal Information
        if (!formData.posisiDilamar) newErrors.posisiDilamar = 'Posisi yang dilamar harus dipilih';
        if (!formData.penempatan) newErrors.penempatan = 'Penempatan harus dipilih';
        if (!formData.namaLengkap) newErrors.namaLengkap = 'Nama lengkap harus diisi';
        if (!formData.nik) newErrors.nik = 'NIK harus diisi';
        if (!formData.noHp) newErrors.noHp = 'Nomor HP harus diisi';
        if (!formData.tempatLahir) newErrors.tempatLahir = 'Tempat lahir harus diisi';
        if (!formData.tanggalLahir) newErrors.tanggalLahir = 'Tanggal lahir harus diisi';
        if (!formData.jenisKelamin) newErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
        break;
      case 1: // Address
        if (!formData.alamatKtp) newErrors.alamatKtp = 'Alamat KTP harus diisi';
        if (!formData.alamatDomisili) newErrors.alamatDomisili = 'Alamat domisili harus diisi';
        if (!formData.kota) newErrors.kota = 'Kota harus diisi';
        break;
      case 2: // Education
        if (!formData.tingkatPendidikan) newErrors.tingkatPendidikan = 'Tingkat pendidikan harus dipilih';
        if (!formData.namaSekolah) newErrors.namaSekolah = 'Nama sekolah/universitas harus diisi';
        break;
      case 4: // Documents & Motivation
        if (!formData.alasanMelamar) newErrors.alasanMelamar = 'Alasan melamar harus diisi';
        if (!formData.cvFile) newErrors.cvFile = 'CV harus diupload';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSection(currentSection)) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      alert('Formulir berhasil dikirim!');
    }
  };

  const InputField = ({ 
    label, 
    field, 
    type = 'text', 
    required = false, 
    options = [] 
  }: {
    label: string;
    field: keyof FormData;
    type?: string;
    required?: boolean;
    options?: string[];
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Pilih {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      )}
      {errors[field] && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={16} />
          {errors[field]}
        </p>
      )}
    </div>
  );

  const BooleanField = ({ 
    label, 
    field 
  }: {
    label: string;
    field: keyof FormData;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={field}
            checked={formData[field] === true}
            onChange={() => handleInputChange(field, true)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Ya</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={field}
            checked={formData[field] === false}
            onChange={() => handleInputChange(field, false)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Tidak</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulir Pendaftaran Karyawan
          </h1>
          <p className="text-gray-600">
            Lengkapi semua informasi dengan benar dan akurat
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    index === currentSection
                      ? 'bg-blue-600 text-white'
                      : index < currentSection
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium hidden sm:block">
                    {section.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Section 1: Personal Information */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">Data Pribadi</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Position and Placement Fields - Now at the top */}
                <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Building size={20} />
                    Informasi Posisi & Penempatan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Posisi yang Dilamar" 
                      field="posisiDilamar" 
                      type="select" 
                      required
                      options={posisiOptions}
                    />
                    <InputField 
                      label="Penempatan" 
                      field="penempatan" 
                      type="select" 
                      required
                      options={penempatanOptions}
                    />
                  </div>
                </div>

                {/* Personal Information Fields */}
                <InputField label="Nama Lengkap" field="namaLengkap" required />
                <InputField label="NIK" field="nik" required />
                <InputField label="No. HP" field="noHp" type="tel" required />
                <InputField label="Tempat Lahir" field="tempatLahir" required />
                <InputField label="Tanggal Lahir" field="tanggalLahir" type="date" required />
                <InputField label="Umur" field="umur" type="number" />
                <InputField 
                  label="Jenis Kelamin" 
                  field="jenisKelamin" 
                  type="select" 
                  required
                  options={['Laki-laki', 'Perempuan']}
                />
                <InputField 
                  label="Status Perkawinan" 
                  field="statusPerkawinan" 
                  type="select"
                  options={['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']}
                />
                <InputField 
                  label="Agama" 
                  field="agama" 
                  type="select"
                  options={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']}
                />
                <InputField label="Nama Lengkap Ayah" field="namaAyah" />
                <InputField label="Nama Lengkap Ibu" field="namaIbu" />
              </div>
            </div>
          )}

          {/* Section 2: Address Information */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">Informasi Alamat</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Alamat Sesuai KTP" field="alamatKtp" type="textarea" required />
                </div>
                <div className="md:col-span-2">
                  <InputField label="Alamat Domisili (Tempat Tinggal Sekarang)" field="alamatDomisili" type="textarea" required />
                </div>
                <InputField label="RT/RW" field="rtRw" />
                <InputField label="Nomor Rumah" field="nomorRumah" />
                <InputField label="Kelurahan" field="kelurahan" />
                <InputField label="Kecamatan" field="kecamatan" />
                <InputField label="Kota" field="kota" required />
                <InputField label="Kode Pos" field="kodePos" />
              </div>
            </div>
          )}

          {/* Section 3: Education */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">Pendidikan</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  label="Tingkat Pendidikan Terakhir" 
                  field="tingkatPendidikan" 
                  type="select" 
                  required
                  options={['SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3']}
                />
                <InputField label="Nama Sekolah/Universitas" field="namaSekolah" required />
                <InputField label="Jurusan/Program Studi" field="jurusan" />
                <InputField label="Tahun Masuk" field="tahunMasuk" type="number" />
                <InputField label="Tahun Lulus" field="tahunLulus" type="number" />
                <InputField label="IPK/Nilai Rata-rata" field="ipk" type="number" step="0.01" />
              </div>
            </div>
          )}

          {/* Section 4: Work Experience */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">Pengalaman Kerja</h2>
              </div>
              
              <div className="space-y-6">
                <BooleanField label="Apakah Sebelumnya Memiliki Pengalaman Kerja?" field="pengalamanKerja" />
                
                {formData.pengalamanKerja && (
                  <>
                    <BooleanField label="Apakah Pengalaman di Dunia Leasing?" field="pengalamanLeasing" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Nama Perusahaan" field="namaPerusahaan" />
                      <InputField label="Posisi/Jabatan" field="posisiJabatan" />
                      <InputField 
                        label="Periode Kerja (contoh: Jan 2020 - Des 2022)" 
                        field="periodeKerja" 
                      />
                      <div className="md:col-span-2">
                        <InputField 
                          label="Deskripsi Tugas Utama" 
                          field="deskripsiTugas" 
                          type="textarea" 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Section 5: Documents & Motivation */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileCheck className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-900">Dokumen & Motivasi</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BooleanField label="Apakah Kamu Memiliki Kendaraan Pribadi?" field="kendaraanPribadi" />
                  <BooleanField label="Apakah Kamu Memiliki KTP Asli?" field="ktpAsli" />
                  <BooleanField label="Apakah Kamu Memiliki SIM C?" field="simC" />
                  <BooleanField label="Apakah Kamu Memiliki SIM A?" field="simA" />
                  <BooleanField label="Apakah Kamu Memiliki SKCK?" field="skck" />
                  <BooleanField label="Apakah Kamu Memiliki NPWP?" field="npwp" />
                </div>
                
                <BooleanField 
                  label="Apakah Kamu Memiliki Riwayat Buruk di Pinjaman/Kredit?" 
                  field="riwayatBurukKredit" 
                />
                
                <InputField 
                  label="Berikan Alasan Mengapa Anda Tertarik Melamar Posisi Ini" 
                  field="alasanMelamar" 
                  type="textarea" 
                  required 
                />
                
                {/* CV Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload CV Lengkap (PDF) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          {formData.cvFile ? formData.cvFile.name : 'Klik untuk upload CV'}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          File harus berformat PDF, maksimal 5MB
                        </span>
                      </label>
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  {errors.cvFile && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.cvFile}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            <button
              type="button"
              onClick={prevSection}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentSection === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={currentSection === 0}
            >
              Sebelumnya
            </button>
            
            {currentSection === sections.length - 1 ? (
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle size={20} />
                Kirim Formulir
              </button>
            ) : (
              <button
                type="button"
                onClick={nextSection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Selanjutnya
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;