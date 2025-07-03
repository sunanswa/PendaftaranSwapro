import React, { useState, useCallback, useMemo } from 'react';
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
  AlertCircle,
  Send,
  Shield,
  ChevronRight,
  ChevronLeft,
  Star,
  Award,
  Target
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const sections = useMemo(() => [
    { 
      title: 'Posisi & Data Pribadi', 
      icon: User, 
      description: 'Informasi dasar dan posisi yang dilamar',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Alamat & Kontak', 
      icon: MapPin, 
      description: 'Alamat lengkap dan informasi kontak',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Pendidikan', 
      icon: GraduationCap, 
      description: 'Riwayat pendidikan terakhir',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Pengalaman Kerja', 
      icon: Briefcase, 
      description: 'Pengalaman dan riwayat pekerjaan',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      title: 'Dokumen & CV', 
      icon: FileCheck, 
      description: 'Upload dokumen dan motivasi',
      color: 'from-red-500 to-red-600'
    },
  ], []);

  const posisiOptions = useMemo(() => [
    'Sales Officer Chaneling (SOC)',
    'Sales Officer Mobile (SOM)',
    'Relationship Officer (RO)',
    'Remedial Collection (REMOF)',
    'Problem Account Officer (PAO)',
    'Sales Force (SF)'
  ], []);

  const penempatanOptions = useMemo(() => [
    'ADIRA TEBET MOTOR',
    'ADIRA TEBET MOBIL',
    'ADIRA KELAPA GADING MOTOR',
    'ADIRA KELAPA GADING MOBIL',
    'ADIRA KETAPANG',
    'ADIRA PONDOK GEDE',
    'SMSF JAKARTA TIMUR',
    'SMSF JAKARTA UTARA'
  ], []);

  // Optimized input change handler with debouncing effect
  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error immediately for better UX
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        handleInputChange('cvFile', file);
      } else {
        setErrors(prev => ({ ...prev, cvFile: 'File CV tidak boleh lebih dari 5MB' }));
      }
    } else if (file) {
      setErrors(prev => ({ ...prev, cvFile: 'File harus berformat PDF' }));
    }
  }, [handleInputChange]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const validateSection = useCallback((sectionIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (sectionIndex) {
      case 0: // Personal Information
        if (!formData.posisiDilamar) newErrors.posisiDilamar = 'Posisi yang dilamar harus dipilih';
        if (!formData.penempatan) newErrors.penempatan = 'Penempatan harus dipilih';
        if (!formData.namaLengkap) newErrors.namaLengkap = 'Nama lengkap harus diisi';
        if (!formData.nik) newErrors.nik = 'NIK harus diisi';
        if (formData.nik && formData.nik.length !== 16) newErrors.nik = 'NIK harus 16 digit';
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
  }, [formData]);

  const nextSection = useCallback(() => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
    }
  }, [currentSection, validateSection, sections.length]);

  const prevSection = useCallback(() => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  }, []);

  const submitToGoogleSheets = async (data: any) => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqbhFE0JP3-C4_nTaFp5eduOAeqvbWe2enBw-YjloKRApUlmZtnoPogHvDkfqL7S8Y/exec';
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSection(currentSection)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      let cvFileData = '';
      if (formData.cvFile) {
        cvFileData = await fileToBase64(formData.cvFile);
      }

      const submissionData = {
        timestamp: new Date().toISOString(),
        posisiDilamar: formData.posisiDilamar,
        penempatan: formData.penempatan,
        namaLengkap: formData.namaLengkap,
        nik: formData.nik,
        noHp: formData.noHp,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
        umur: formData.umur,
        jenisKelamin: formData.jenisKelamin,
        statusPerkawinan: formData.statusPerkawinan,
        agama: formData.agama,
        namaAyah: formData.namaAyah,
        namaIbu: formData.namaIbu,
        alamatKtp: formData.alamatKtp,
        alamatDomisili: formData.alamatDomisili,
        rtRw: formData.rtRw,
        nomorRumah: formData.nomorRumah,
        kelurahan: formData.kelurahan,
        kecamatan: formData.kecamatan,
        kota: formData.kota,
        kodePos: formData.kodePos,
        tingkatPendidikan: formData.tingkatPendidikan,
        namaSekolah: formData.namaSekolah,
        jurusan: formData.jurusan,
        tahunMasuk: formData.tahunMasuk,
        tahunLulus: formData.tahunLulus,
        ipk: formData.ipk,
        pengalamanKerja: formData.pengalamanKerja ? 'Ya' : 'Tidak',
        pengalamanLeasing: formData.pengalamanLeasing ? 'Ya' : 'Tidak',
        namaPerusahaan: formData.namaPerusahaan,
        posisiJabatan: formData.posisiJabatan,
        periodeKerja: formData.periodeKerja,
        deskripsiTugas: formData.deskripsiTugas,
        kendaraanPribadi: formData.kendaraanPribadi ? 'Ya' : 'Tidak',
        ktpAsli: formData.ktpAsli ? 'Ya' : 'Tidak',
        simC: formData.simC ? 'Ya' : 'Tidak',
        simA: formData.simA ? 'Ya' : 'Tidak',
        skck: formData.skck ? 'Ya' : 'Tidak',
        npwp: formData.npwp ? 'Ya' : 'Tidak',
        riwayatBurukKredit: formData.riwayatBurukKredit ? 'Ya' : 'Tidak',
        alasanMelamar: formData.alasanMelamar,
        cvFileName: formData.cvFile?.name || 'Tidak ada file',
        cvFileData: cvFileData
      };

      await submitToGoogleSheets(submissionData);
      
      setSubmitStatus('success');
      setSubmitMessage('Formulir berhasil dikirim! Data Anda telah tersimpan di sistem kami dan CV telah diupload ke Google Drive.');
      
      setTimeout(() => {
        setFormData({
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
        setCurrentSection(0);
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized components to prevent unnecessary re-renders
  const InputField = React.memo(({ 
    label, 
    field, 
    type = 'text', 
    required = false, 
    options = [],
    step,
    maxLength,
    icon: Icon
  }: {
    label: string;
    field: keyof FormData;
    type?: string;
    required?: boolean;
    options?: string[];
    step?: string;
    maxLength?: number;
    icon?: React.ComponentType<any>;
  }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      {type === 'select' ? (
        <select
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white ${
            errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-gray-300'
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
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none bg-white ${
            errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-gray-300'
          }`}
          rows={4}
          placeholder={`Masukkan ${label.toLowerCase()}`}
          maxLength={maxLength}
        />
      ) : (
        <input
          type={type}
          step={step}
          maxLength={maxLength}
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white ${
            errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-gray-300'
          }`}
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      )}
      {errors[field] && (
        <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
          <AlertCircle size={16} />
          {errors[field]}
        </p>
      )}
    </div>
  ));

  const BooleanField = React.memo(({ 
    label, 
    field,
    icon: Icon
  }: {
    label: string;
    field: keyof FormData;
    icon?: React.ComponentType<any>;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-500" />}
          {label}
        </div>
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={field}
            checked={formData[field] === true}
            onChange={() => handleInputChange(field, true)}
            className="w-5 h-5 text-green-600 focus:ring-green-500 focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">Ya</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={field}
            checked={formData[field] === false}
            onChange={() => handleInputChange(field, false)}
            className="w-5 h-5 text-red-600 focus:ring-red-500 focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">Tidak</span>
        </label>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SWAPRO Career Portal
              </h1>
              <p className="text-gray-600 font-medium">Formulir Pendaftaran Karyawan</p>
            </div>
          </div>
          
          {/* Anti-Duplicate Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center justify-center gap-3 text-blue-800">
              <Shield size={20} />
              <span className="text-sm font-semibold">
                🔒 Sistem Anti-Duplikasi Aktif - Setiap NIK hanya dapat mendaftar sekali
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3 shadow-lg">
            <CheckCircle size={24} />
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 shadow-lg">
            <AlertCircle size={24} />
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <div
                  key={index}
                  className={`flex-1 relative ${index < sections.length - 1 ? 'mr-4' : ''}`}
                >
                  {/* Connection Line */}
                  {index < sections.length - 1 && (
                    <div className={`absolute top-6 left-full w-full h-1 -ml-2 ${
                      isCompleted ? 'bg-green-400' : 'bg-gray-200'
                    } transition-colors duration-300`} />
                  )}
                  
                  <div className={`relative z-10 flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${section.color} text-white shadow-xl transform scale-105`
                      : isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-white text-gray-500 shadow-md hover:shadow-lg'
                  }`}>
                    <div className={`p-3 rounded-xl mb-2 ${
                      isActive || isCompleted ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <Icon size={24} className={isActive || isCompleted ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{section.title}</h3>
                    <p className={`text-xs ${isActive || isCompleted ? 'text-white/80' : 'text-gray-400'} hidden sm:block`}>
                      {section.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <form onSubmit={handleSubmit}>
            {/* Section Content */}
            <div className="p-8 lg:p-12">
              {/* Section 1: Personal Information */}
              {currentSection === 0 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl mb-4">
                      <User size={28} />
                      <h2 className="text-2xl font-bold">Posisi & Data Pribadi</h2>
                    </div>
                    <p className="text-gray-600">Mulai dengan memilih posisi yang diinginkan dan lengkapi data pribadi Anda</p>
                  </div>
                  
                  {/* Position Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                      <Target size={24} />
                      Posisi & Penempatan Kerja
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <InputField 
                        label="Posisi yang Dilamar" 
                        field="posisiDilamar" 
                        type="select" 
                        required
                        options={posisiOptions}
                        icon={Award}
                      />
                      <InputField 
                        label="Penempatan Kerja" 
                        field="penempatan" 
                        type="select" 
                        required
                        options={penempatanOptions}
                        icon={Building}
                      />
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField label="Nama Lengkap" field="namaLengkap" required icon={User} />
                    <InputField 
                      label="NIK (16 Digit)" 
                      field="nik" 
                      required 
                      maxLength={16}
                      type="number"
                      icon={FileCheck}
                    />
                    <InputField label="Nomor HP/WhatsApp" field="noHp" type="tel" required icon={Phone} />
                    <InputField label="Tempat Lahir" field="tempatLahir" required icon={MapPin} />
                    <InputField label="Tanggal Lahir" field="tanggalLahir" type="date" required icon={Calendar} />
                    <InputField label="Umur" field="umur" type="number" icon={User} />
                    <InputField 
                      label="Jenis Kelamin" 
                      field="jenisKelamin" 
                      type="select" 
                      required
                      options={['Laki-laki', 'Perempuan']}
                      icon={User}
                    />
                    <InputField 
                      label="Status Perkawinan" 
                      field="statusPerkawinan" 
                      type="select"
                      options={['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']}
                      icon={User}
                    />
                    <InputField 
                      label="Agama" 
                      field="agama" 
                      type="select"
                      options={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']}
                      icon={User}
                    />
                    <InputField label="Nama Lengkap Ayah" field="namaAyah" icon={User} />
                    <InputField label="Nama Lengkap Ibu" field="namaIbu" icon={User} />
                  </div>
                </div>
              )}

              {/* Section 2: Address Information */}
              {currentSection === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl mb-4">
                      <MapPin size={28} />
                      <h2 className="text-2xl font-bold">Alamat & Kontak</h2>
                    </div>
                    <p className="text-gray-600">Lengkapi informasi alamat lengkap dan detail kontak Anda</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <InputField 
                        label="Alamat Lengkap Sesuai KTP" 
                        field="alamatKtp" 
                        type="textarea" 
                        required 
                        maxLength={500}
                        icon={Home}
                      />
                      <InputField 
                        label="Alamat Domisili (Tempat Tinggal Sekarang)" 
                        field="alamatDomisili" 
                        type="textarea" 
                        required 
                        maxLength={500}
                        icon={Home}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <InputField label="RT/RW" field="rtRw" icon={MapPin} />
                      <InputField label="Nomor Rumah" field="nomorRumah" icon={Home} />
                      <InputField label="Kelurahan/Desa" field="kelurahan" icon={MapPin} />
                      <InputField label="Kecamatan" field="kecamatan" icon={MapPin} />
                      <InputField label="Kota/Kabupaten" field="kota" required icon={MapPin} />
                      <InputField label="Kode Pos" field="kodePos" maxLength={5} icon={MapPin} />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Education */}
              {currentSection === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-2xl mb-4">
                      <GraduationCap size={28} />
                      <h2 className="text-2xl font-bold">Riwayat Pendidikan</h2>
                    </div>
                    <p className="text-gray-600">Informasi pendidikan terakhir dan prestasi akademik Anda</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField 
                      label="Tingkat Pendidikan Terakhir" 
                      field="tingkatPendidikan" 
                      type="select" 
                      required
                      options={['SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3']}
                      icon={GraduationCap}
                    />
                    <InputField label="Nama Sekolah/Universitas" field="namaSekolah" required icon={School} />
                    <InputField label="Jurusan/Program Studi" field="jurusan" icon={GraduationCap} />
                    <InputField label="Tahun Masuk" field="tahunMasuk" type="number" icon={Calendar} />
                    <InputField label="Tahun Lulus" field="tahunLulus" type="number" icon={Calendar} />
                    <InputField label="IPK/Nilai Rata-rata" field="ipk" type="number" step="0.01" icon={Star} />
                  </div>
                </div>
              )}

              {/* Section 4: Work Experience */}
              {currentSection === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl mb-4">
                      <Briefcase size={28} />
                      <h2 className="text-2xl font-bold">Pengalaman Kerja</h2>
                    </div>
                    <p className="text-gray-600">Ceritakan pengalaman kerja dan keahlian profesional Anda</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
                      <BooleanField 
                        label="Apakah Anda memiliki pengalaman kerja sebelumnya?" 
                        field="pengalamanKerja" 
                        icon={Briefcase}
                      />
                    </div>
                    
                    {formData.pengalamanKerja && (
                      <div className="space-y-6 animate-in slide-in-from-top duration-300">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                          <BooleanField 
                            label="Apakah pengalaman tersebut di bidang Leasing/Finansial?" 
                            field="pengalamanLeasing" 
                            icon={Building}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <InputField label="Nama Perusahaan" field="namaPerusahaan" icon={Building} />
                          <InputField label="Posisi/Jabatan" field="posisiJabatan" icon={Briefcase} />
                          <InputField 
                            label="Periode Kerja (contoh: Jan 2020 - Des 2022)" 
                            field="periodeKerja" 
                            icon={Calendar}
                          />
                          <div className="lg:col-span-2">
                            <InputField 
                              label="Deskripsi Tugas dan Tanggung Jawab Utama" 
                              field="deskripsiTugas" 
                              type="textarea" 
                              maxLength={1000}
                              icon={FileCheck}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 5: Documents & Motivation */}
              {currentSection === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl mb-4">
                      <FileCheck size={28} />
                      <h2 className="text-2xl font-bold">Dokumen & Motivasi</h2>
                    </div>
                    <p className="text-gray-600">Kelengkapan dokumen dan motivasi bergabung dengan SWAPRO</p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Document Checklist */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-2xl border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <FileCheck size={24} />
                        Kelengkapan Dokumen & Persyaratan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BooleanField label="Memiliki Kendaraan Pribadi" field="kendaraanPribadi" />
                        <BooleanField label="Memiliki KTP Asli" field="ktpAsli" />
                        <BooleanField label="Memiliki SIM C (Motor)" field="simC" />
                        <BooleanField label="Memiliki SIM A (Mobil)" field="simA" />
                        <BooleanField label="Memiliki SKCK" field="skck" />
                        <BooleanField label="Memiliki NPWP" field="npwp" />
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <BooleanField 
                          label="Apakah Anda memiliki riwayat buruk di pinjaman/kredit?" 
                          field="riwayatBurukKredit" 
                        />
                      </div>
                    </div>
                    
                    {/* Motivation */}
                    <div className="space-y-6">
                      <InputField 
                        label="Ceritakan alasan dan motivasi Anda melamar posisi ini" 
                        field="alasanMelamar" 
                        type="textarea" 
                        required 
                        maxLength={1000}
                      />
                      
                      {/* CV Upload */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">
                          Upload CV Lengkap (Format PDF) <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                          formData.cvFile 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        }`}>
                          <Upload className={`mx-auto h-16 w-16 mb-4 ${
                            formData.cvFile ? 'text-green-500' : 'text-gray-400'
                          }`} />
                          <div className="space-y-3">
                            <label htmlFor="cv-upload" className="cursor-pointer">
                              <span className={`block text-lg font-bold ${
                                formData.cvFile ? 'text-green-700' : 'text-gray-700'
                              }`}>
                                {formData.cvFile ? `✓ ${formData.cvFile.name}` : 'Klik untuk upload CV Anda'}
                              </span>
                              <span className="block text-sm text-gray-500 mt-2">
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
                          <p className="text-sm text-red-600 flex items-center gap-2">
                            <AlertCircle size={16} />
                            {errors.cvFile}
                          </p>
                        )}
                        {formData.cvFile && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-sm text-green-700 flex items-center gap-2">
                              <CheckCircle size={16} />
                              File CV siap diupload: <strong>{formData.cvFile.name}</strong> ({(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="bg-gray-50 px-8 lg:px-12 py-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevSection}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    currentSection === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
                  }`}
                  disabled={currentSection === 0}
                >
                  <ChevronLeft size={20} />
                  Sebelumnya
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500 font-medium">
                    Langkah {currentSection + 1} dari {sections.length}
                  </span>
                </div>
                
                {currentSection === sections.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Mengirim Formulir...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Kirim Formulir
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Selanjutnya
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;