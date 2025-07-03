import React, { useState, useCallback } from 'react';
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
  Target,
  CreditCard,
  Car,
  FileText,
  Sparkles,
  DollarSign,
  AlertTriangle,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

import FormInput from './components/FormInput';
import BooleanInput from './components/BooleanInput';
import ProgressSteps from './components/ProgressSteps';

interface FormData {
  // Informasi Posisi
  posisiDilamar: string;
  penempatan: string;
  
  // Data Pribadi
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
  
  // Alamat
  alamatKtp: string;
  alamatDomisili: string;
  rtRw: string;
  nomorRumah: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  
  // Pendidikan
  tingkatPendidikan: string;
  namaSekolah: string;
  jurusan: string;
  tahunMasuk: string;
  tahunLulus: string;
  ipk: string;
  
  // Pengalaman Kerja
  pengalamanKerja: boolean;
  pengalamanLeasing: boolean;
  namaPerusahaan: string;
  posisiJabatan: string;
  periodeKerja: string;
  deskripsiTugas: string;
  
  // Dokumen
  kendaraanPribadi: boolean;
  ktpAsli: boolean;
  simC: boolean;
  simA: boolean;
  skck: boolean;
  npwp: boolean;
  riwayatBurukKredit: boolean;
  
  // Detail Riwayat Kredit (NEW)
  jenisKreditBermasalah: string;
  nominalTunggakan: string;
  statusKolektibilitas: string;
  
  // Motivasi & CV
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
    jenisKreditBermasalah: '',
    nominalTunggakan: '',
    statusKolektibilitas: '',
    alasanMelamar: '',
    cvFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const steps = [
    { title: 'Data Pribadi', icon: User, color: 'from-rose-400 to-pink-500' },
    { title: 'Alamat', icon: MapPin, color: 'from-violet-400 to-purple-500' },
    { title: 'Pendidikan', icon: GraduationCap, color: 'from-blue-400 to-indigo-500' },
    { title: 'Pengalaman', icon: Briefcase, color: 'from-emerald-400 to-teal-500' },
    { title: 'Dokumen', icon: FileCheck, color: 'from-amber-400 to-orange-500' },
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

  const jenisKreditOptions = [
    'Kredit Kendaraan Bermotor (Motor/Mobil)',
    'Kredit Tanpa Agunan (KTA)',
    'Kredit Pemilikan Rumah (KPR)',
    'Kartu Kredit',
    'Kredit Multiguna',
    'Pinjaman Online (Fintech)',
    'Kredit Usaha/Modal Kerja',
    'Lainnya'
  ];

  const kolektibilitasOptions = [
    'Tidak Tahu',
    'Kolektibilitas 0 (Lancar)',
    'Kolektibilitas 1 (Dalam Perhatian Khusus)',
    'Kolektibilitas 2 (Kurang Lancar)',
    'Kolektibilitas 3 (Diragukan)',
    'Kolektibilitas 4 (Macet)',
    'Kolektibilitas 5 (Hapus Buku)'
  ];

  // Optimized input handler
  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error immediately
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
      if (file.size <= 5 * 1024 * 1024) {
        handleInputChange('cvFile', file);
      } else {
        setErrors(prev => ({ ...prev, cvFile: 'File CV tidak boleh lebih dari 5MB' }));
      }
    } else if (file) {
      setErrors(prev => ({ ...prev, cvFile: 'File harus berformat PDF' }));
    }
  }, [handleInputChange]);

  const validateStep = useCallback((stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (stepIndex) {
      case 0: // Data Pribadi
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
      case 1: // Alamat
        if (!formData.alamatKtp) newErrors.alamatKtp = 'Alamat KTP harus diisi';
        if (!formData.alamatDomisili) newErrors.alamatDomisili = 'Alamat domisili harus diisi';
        if (!formData.kota) newErrors.kota = 'Kota harus diisi';
        break;
      case 2: // Pendidikan
        if (!formData.tingkatPendidikan) newErrors.tingkatPendidikan = 'Tingkat pendidikan harus dipilih';
        if (!formData.namaSekolah) newErrors.namaSekolah = 'Nama sekolah/universitas harus diisi';
        break;
      case 4: // Dokumen
        if (!formData.alasanMelamar) newErrors.alasanMelamar = 'Alasan melamar harus diisi';
        if (!formData.cvFile) newErrors.cvFile = 'CV harus diupload';
        // Validasi untuk riwayat kredit bermasalah
        if (formData.riwayatBurukKredit) {
          if (!formData.jenisKreditBermasalah) newErrors.jenisKreditBermasalah = 'Jenis kredit bermasalah harus dipilih';
          if (!formData.nominalTunggakan) newErrors.nominalTunggakan = 'Nominal tunggakan harus diisi';
          if (!formData.statusKolektibilitas) newErrors.statusKolektibilitas = 'Status kolektibilitas harus dipilih';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, validateStep, steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

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

  const generateWhatsAppMessage = () => {
    const message = `Halo Tim HR SWAPRO! 🌟

Saya telah menyelesaikan pengisian formulir pendaftaran karyawan melalui Portal Karir SWAPRO.

📋 *Detail Pendaftaran:*
• Nama: ${formData.namaLengkap}
• Posisi: ${formData.posisiDilamar}
• Penempatan: ${formData.penempatan}
• NIK: ${formData.nik}
• No. HP: ${formData.noHp}

✅ *Status:* Formulir telah berhasil dikirim dan CV telah terupload

Mohon konfirmasi penerimaan data dan informasi tahapan selanjutnya.

Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp HR
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

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
        jenisKreditBermasalah: formData.jenisKreditBermasalah,
        nominalTunggakan: formData.nominalTunggakan,
        statusKolektibilitas: formData.statusKolektibilitas,
        alasanMelamar: formData.alasanMelamar,
        cvFileName: formData.cvFile?.name || 'Tidak ada file',
        cvFileData: cvFileData
      };

      await submitToGoogleSheets(submissionData);
      
      setSubmitStatus('success');
      setSubmitMessage('Formulir berhasil dikirim! Data Anda telah tersimpan dan CV telah diupload.');
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-rose-100">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
          {/* Logo and Title Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-violet-400 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-rose-100">
                  <img 
                    src="/swapro copy.png" 
                    alt="SWAPRO Logo" 
                    className="h-16 sm:h-20 w-auto"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black bg-gradient-to-r from-rose-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                PORTAL KARIR SWAPRO
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="text-rose-400" size={16} />
                <p className="text-base sm:text-lg text-gray-600 font-medium">Formulir Pendaftaran Karyawan</p>
                <Sparkles className="text-violet-400" size={16} />
              </div>
            </div>
          </div>
          
          {/* Anti-Duplicate Notice */}
          <div className="bg-gradient-to-r from-rose-50 to-violet-50 border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-rose-800">
              <div className="p-1.5 sm:p-2 bg-rose-100 rounded-full">
                <Shield size={16} className="text-rose-600" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-center">
                🔒 Sistem Anti-Duplikasi Aktif - Setiap NIK hanya dapat mendaftar sekali
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Success Message with WhatsApp */}
        {submitStatus === 'success' && (
          <div className="mb-8 space-y-4">
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-800 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <CheckCircle size={24} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pendaftaran Berhasil! 🎉</h3>
                  <p className="text-sm">{submitMessage}</p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Confirmation Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <MessageCircle size={32} className="text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Langkah Selanjutnya</h3>
                  <p className="text-green-700 mb-4">
                    Untuk mempercepat proses seleksi, silakan konfirmasi pendaftaran Anda melalui WhatsApp dengan menekan tombol di bawah ini.
                  </p>
                  <button
                    onClick={openWhatsApp}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <MessageCircle size={20} />
                    Konfirmasi via WhatsApp
                    <ExternalLink size={16} />
                  </button>
                  <p className="text-xs text-green-600 mt-2">
                    Tim HR akan segera menghubungi Anda untuk tahapan selanjutnya
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-800 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <span className="font-semibold">{submitMessage}</span>
          </div>
        )}

        {/* Progress Steps */}
        {submitStatus !== 'success' && <ProgressSteps steps={steps} currentStep={currentStep} />}

        {/* Form Container */}
        {submitStatus !== 'success' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-4 sm:p-6 lg:p-12">
                {/* Step 0: Data Pribadi */}
                {currentStep === 0 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-3xl mb-4 sm:mb-6 shadow-xl">
                        <User size={24} />
                        <h2 className="text-lg sm:text-2xl font-bold">Data Pribadi & Posisi</h2>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg">Lengkapi informasi pribadi dan posisi yang dilamar</p>
                    </div>
                    
                    {/* Posisi Section */}
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 sm:p-8 rounded-3xl border-2 border-rose-200 shadow-lg">
                      <h3 className="text-lg sm:text-xl font-bold text-rose-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-rose-100 rounded-full">
                          <Target size={20} className="text-rose-600" />
                        </div>
                        Informasi Posisi
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <FormInput
                          label="Posisi yang Dilamar"
                          name="posisiDilamar"
                          type="select"
                          value={formData.posisiDilamar}
                          onChange={(value) => handleInputChange('posisiDilamar', value)}
                          error={errors.posisiDilamar}
                          required
                          options={posisiOptions}
                          icon={Award}
                        />
                        <FormInput
                          label="Penempatan Kerja"
                          name="penempatan"
                          type="select"
                          value={formData.penempatan}
                          onChange={(value) => handleInputChange('penempatan', value)}
                          error={errors.penempatan}
                          required
                          options={penempatanOptions}
                          icon={Building}
                        />
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormInput
                        label="Nama Lengkap"
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={(value) => handleInputChange('namaLengkap', value)}
                        error={errors.namaLengkap}
                        required
                        icon={User}
                      />
                      <FormInput
                        label="NIK (16 Digit)"
                        name="nik"
                        value={formData.nik}
                        onChange={(value) => handleInputChange('nik', value)}
                        error={errors.nik}
                        required
                        maxLength={16}
                        icon={CreditCard}
                      />
                      <FormInput
                        label="Nomor HP/WhatsApp"
                        name="noHp"
                        type="tel"
                        value={formData.noHp}
                        onChange={(value) => handleInputChange('noHp', value)}
                        error={errors.noHp}
                        required
                        icon={Phone}
                      />
                      <FormInput
                        label="Tempat Lahir"
                        name="tempatLahir"
                        value={formData.tempatLahir}
                        onChange={(value) => handleInputChange('tempatLahir', value)}
                        error={errors.tempatLahir}
                        required
                        icon={MapPin}
                      />
                      <FormInput
                        label="Tanggal Lahir"
                        name="tanggalLahir"
                        type="date"
                        value={formData.tanggalLahir}
                        onChange={(value) => handleInputChange('tanggalLahir', value)}
                        error={errors.tanggalLahir}
                        required
                        icon={Calendar}
                      />
                      <FormInput
                        label="Umur"
                        name="umur"
                        type="number"
                        value={formData.umur}
                        onChange={(value) => handleInputChange('umur', value)}
                        icon={User}
                      />
                      <FormInput
                        label="Jenis Kelamin"
                        name="jenisKelamin"
                        type="select"
                        value={formData.jenisKelamin}
                        onChange={(value) => handleInputChange('jenisKelamin', value)}
                        error={errors.jenisKelamin}
                        required
                        options={['Laki-laki', 'Perempuan']}
                        icon={User}
                      />
                      <FormInput
                        label="Status Perkawinan"
                        name="statusPerkawinan"
                        type="select"
                        value={formData.statusPerkawinan}
                        onChange={(value) => handleInputChange('statusPerkawinan', value)}
                        options={['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']}
                        icon={User}
                      />
                      <FormInput
                        label="Agama"
                        name="agama"
                        type="select"
                        value={formData.agama}
                        onChange={(value) => handleInputChange('agama', value)}
                        options={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']}
                        icon={User}
                      />
                      <FormInput
                        label="Nama Lengkap Ayah"
                        name="namaAyah"
                        value={formData.namaAyah}
                        onChange={(value) => handleInputChange('namaAyah', value)}
                        icon={User}
                      />
                      <FormInput
                        label="Nama Lengkap Ibu"
                        name="namaIbu"
                        value={formData.namaIbu}
                        onChange={(value) => handleInputChange('namaIbu', value)}
                        icon={User}
                      />
                    </div>
                  </div>
                )}

                {/* Step 1: Alamat */}
                {currentStep === 1 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-r from-violet-400 to-purple-500 text-white rounded-3xl mb-4 sm:mb-6 shadow-xl">
                        <MapPin size={24} />
                        <h2 className="text-lg sm:text-2xl font-bold">Informasi Alamat</h2>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg">Lengkapi alamat lengkap dan detail kontak</p>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <FormInput
                        label="Alamat Lengkap Sesuai KTP"
                        name="alamatKtp"
                        type="textarea"
                        value={formData.alamatKtp}
                        onChange={(value) => handleInputChange('alamatKtp', value)}
                        error={errors.alamatKtp}
                        required
                        maxLength={500}
                        icon={Home}
                      />
                      <FormInput
                        label="Alamat Domisili (Tempat Tinggal Sekarang)"
                        name="alamatDomisili"
                        type="textarea"
                        value={formData.alamatDomisili}
                        onChange={(value) => handleInputChange('alamatDomisili', value)}
                        error={errors.alamatDomisili}
                        required
                        maxLength={500}
                        icon={Home}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <FormInput
                          label="RT/RW"
                          name="rtRw"
                          value={formData.rtRw}
                          onChange={(value) => handleInputChange('rtRw', value)}
                          icon={MapPin}
                        />
                        <FormInput
                          label="Nomor Rumah"
                          name="nomorRumah"
                          value={formData.nomorRumah}
                          onChange={(value) => handleInputChange('nomorRumah', value)}
                          icon={Home}
                        />
                        <FormInput
                          label="Kelurahan/Desa"
                          name="kelurahan"
                          value={formData.kelurahan}
                          onChange={(value) => handleInputChange('kelurahan', value)}
                          icon={MapPin}
                        />
                        <FormInput
                          label="Kecamatan"
                          name="kecamatan"
                          value={formData.kecamatan}
                          onChange={(value) => handleInputChange('kecamatan', value)}
                          icon={MapPin}
                        />
                        <FormInput
                          label="Kota/Kabupaten"
                          name="kota"
                          value={formData.kota}
                          onChange={(value) => handleInputChange('kota', value)}
                          error={errors.kota}
                          required
                          icon={MapPin}
                        />
                        <FormInput
                          label="Kode Pos"
                          name="kodePos"
                          value={formData.kodePos}
                          onChange={(value) => handleInputChange('kodePos', value)}
                          maxLength={5}
                          icon={MapPin}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Pendidikan */}
                {currentStep === 2 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-3xl mb-4 sm:mb-6 shadow-xl">
                        <GraduationCap size={24} />
                        <h2 className="text-lg sm:text-2xl font-bold">Riwayat Pendidikan</h2>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg">Informasi pendidikan terakhir dan prestasi akademik</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormInput
                        label="Tingkat Pendidikan Terakhir"
                        name="tingkatPendidikan"
                        type="select"
                        value={formData.tingkatPendidikan}
                        onChange={(value) => handleInputChange('tingkatPendidikan', value)}
                        error={errors.tingkatPendidikan}
                        required
                        options={['SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3']}
                        icon={GraduationCap}
                      />
                      <FormInput
                        label="Nama Sekolah/Universitas"
                        name="namaSekolah"
                        value={formData.namaSekolah}
                        onChange={(value) => handleInputChange('namaSekolah', value)}
                        error={errors.namaSekolah}
                        required
                        icon={School}
                      />
                      <FormInput
                        label="Jurusan/Program Studi"
                        name="jurusan"
                        value={formData.jurusan}
                        onChange={(value) => handleInputChange('jurusan', value)}
                        icon={GraduationCap}
                      />
                      <FormInput
                        label="Tahun Masuk"
                        name="tahunMasuk"
                        type="number"
                        value={formData.tahunMasuk}
                        onChange={(value) => handleInputChange('tahunMasuk', value)}
                        icon={Calendar}
                      />
                      <FormInput
                        label="Tahun Lulus"
                        name="tahunLulus"
                        type="number"
                        value={formData.tahunLulus}
                        onChange={(value) => handleInputChange('tahunLulus', value)}
                        icon={Calendar}
                      />
                      <FormInput
                        label="IPK/Nilai Rata-rata"
                        name="ipk"
                        type="number"
                        value={formData.ipk}
                        onChange={(value) => handleInputChange('ipk', value)}
                        icon={Star}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Pengalaman Kerja */}
                {currentStep === 3 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-3xl mb-4 sm:mb-6 shadow-xl">
                        <Briefcase size={24} />
                        <h2 className="text-lg sm:text-2xl font-bold">Pengalaman Kerja</h2>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg">Ceritakan pengalaman kerja dan keahlian profesional</p>
                    </div>
                    
                    <div className="space-y-6 sm:space-y-8">
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 shadow-lg">
                        <BooleanInput
                          label="Apakah Anda memiliki pengalaman kerja sebelumnya?"
                          name="pengalamanKerja"
                          value={formData.pengalamanKerja}
                          onChange={(value) => handleInputChange('pengalamanKerja', value)}
                          icon={Briefcase}
                        />
                      </div>
                      
                      {formData.pengalamanKerja && (
                        <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-top duration-500">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border-2 border-blue-200 shadow-lg">
                            <BooleanInput
                              label="Apakah pengalaman tersebut di bidang Leasing/Finansial?"
                              name="pengalamanLeasing"
                              value={formData.pengalamanLeasing}
                              onChange={(value) => handleInputChange('pengalamanLeasing', value)}
                              icon={Building}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <FormInput
                              label="Nama Perusahaan"
                              name="namaPerusahaan"
                              value={formData.namaPerusahaan}
                              onChange={(value) => handleInputChange('namaPerusahaan', value)}
                              icon={Building}
                            />
                            <FormInput
                              label="Posisi/Jabatan"
                              name="posisiJabatan"
                              value={formData.posisiJabatan}
                              onChange={(value) => handleInputChange('posisiJabatan', value)}
                              icon={Briefcase}
                            />
                            <FormInput
                              label="Periode Kerja"
                              name="periodeKerja"
                              value={formData.periodeKerja}
                              onChange={(value) => handleInputChange('periodeKerja', value)}
                              placeholder="contoh: Jan 2020 - Des 2022"
                              icon={Calendar}
                            />
                          </div>
                          
                          <FormInput
                            label="Deskripsi Tugas dan Tanggung Jawab Utama"
                            name="deskripsiTugas"
                            type="textarea"
                            value={formData.deskripsiTugas}
                            onChange={(value) => handleInputChange('deskripsiTugas', value)}
                            maxLength={1000}
                            icon={FileText}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Dokumen */}
                {currentStep === 4 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-3xl mb-4 sm:mb-6 shadow-xl">
                        <FileCheck size={24} />
                        <h2 className="text-lg sm:text-2xl font-bold">Dokumen & Motivasi</h2>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-lg">Kelengkapan dokumen dan motivasi bergabung</p>
                    </div>
                    
                    <div className="space-y-6 sm:space-y-8">
                      {/* Dokumen */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-amber-100 rounded-full">
                            <FileCheck size={20} className="text-amber-600" />
                          </div>
                          Kelengkapan Dokumen & Persyaratan
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <BooleanInput
                            label="Memiliki Kendaraan Pribadi"
                            name="kendaraanPribadi"
                            value={formData.kendaraanPribadi}
                            onChange={(value) => handleInputChange('kendaraanPribadi', value)}
                            icon={Car}
                          />
                          <BooleanInput
                            label="Memiliki KTP Asli"
                            name="ktpAsli"
                            value={formData.ktpAsli}
                            onChange={(value) => handleInputChange('ktpAsli', value)}
                            icon={CreditCard}
                          />
                          <BooleanInput
                            label="Memiliki SIM C (Motor)"
                            name="simC"
                            value={formData.simC}
                            onChange={(value) => handleInputChange('simC', value)}
                            icon={CreditCard}
                          />
                          <BooleanInput
                            label="Memiliki SIM A (Mobil)"
                            name="simA"
                            value={formData.simA}
                            onChange={(value) => handleInputChange('simA', value)}
                            icon={CreditCard}
                          />
                          <BooleanInput
                            label="Memiliki SKCK"
                            name="skck"
                            value={formData.skck}
                            onChange={(value) => handleInputChange('skck', value)}
                            icon={FileCheck}
                          />
                          <BooleanInput
                            label="Memiliki NPWP"
                            name="npwp"
                            value={formData.npwp}
                            onChange={(value) => handleInputChange('npwp', value)}
                            icon={FileCheck}
                          />
                        </div>
                      </div>

                      {/* Riwayat Kredit */}
                      <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 sm:p-8 rounded-3xl border-2 border-red-200 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-red-100 rounded-full">
                            <AlertTriangle size={20} className="text-red-600" />
                          </div>
                          Riwayat Kredit & Pinjaman
                        </h3>
                        
                        <div className="space-y-4 sm:space-y-6">
                          <BooleanInput
                            label="Apakah Anda pernah mengalami masalah dalam pembayaran kredit/pinjaman?"
                            name="riwayatBurukKredit"
                            value={formData.riwayatBurukKredit}
                            onChange={(value) => handleInputChange('riwayatBurukKredit', value)}
                            icon={AlertTriangle}
                          />
                          
                          {formData.riwayatBurukKredit && (
                            <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-top duration-500 bg-white p-4 sm:p-6 rounded-2xl border-2 border-red-300">
                              <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-200">
                                <p className="text-xs sm:text-sm text-red-700 font-medium flex items-center gap-2">
                                  <AlertTriangle size={16} />
                                  Mohon isi informasi berikut dengan jujur dan lengkap untuk proses evaluasi
                                </p>
                              </div>
                              
                              <FormInput
                                label="Jenis Kredit/Pinjaman yang Bermasalah"
                                name="jenisKreditBermasalah"
                                type="select"
                                value={formData.jenisKreditBermasalah}
                                onChange={(value) => handleInputChange('jenisKreditBermasalah', value)}
                                error={errors.jenisKreditBermasalah}
                                required
                                options={jenisKreditOptions}
                                icon={CreditCard}
                              />
                              
                              <FormInput
                                label="Estimasi Nominal Tunggakan (dalam Rupiah)"
                                name="nominalTunggakan"
                                type="number"
                                value={formData.nominalTunggakan}
                                onChange={(value) => handleInputChange('nominalTunggakan', value)}
                                error={errors.nominalTunggakan}
                                required
                                placeholder="contoh: 5000000"
                                icon={DollarSign}
                              />
                              
                              <FormInput
                                label="Status Kolektibilitas (Tingkat Kemacetan)"
                                name="statusKolektibilitas"
                                type="select"
                                value={formData.statusKolektibilitas}
                                onChange={(value) => handleInputChange('statusKolektibilitas', value)}
                                error={errors.statusKolektibilitas}
                                required
                                options={kolektibilitasOptions}
                                icon={AlertTriangle}
                              />
                              
                              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                                <p className="text-xs text-blue-700">
                                  <strong>Keterangan Kolektibilitas:</strong><br/>
                                  • <strong>Lancar (0):</strong> Pembayaran tepat waktu<br/>
                                  • <strong>Dalam Perhatian Khusus (1):</strong> Tunggakan 1-90 hari<br/>
                                  • <strong>Kurang Lancar (2):</strong> Tunggakan 91-120 hari<br/>
                                  • <strong>Diragukan (3):</strong> Tunggakan 121-180 hari<br/>
                                  • <strong>Macet (4):</strong> Tunggakan lebih dari 180 hari<br/>
                                  • <strong>Hapus Buku (5):</strong> Kredit yang sudah dihapus dari pembukuan bank
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Motivasi */}
                      <FormInput
                        label="Ceritakan alasan dan motivasi Anda melamar posisi ini"
                        name="alasanMelamar"
                        type="textarea"
                        value={formData.alasanMelamar}
                        onChange={(value) => handleInputChange('alasanMelamar', value)}
                        error={errors.alasanMelamar}
                        required
                        maxLength={1000}
                      />
                      
                      {/* CV Upload */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">
                          Upload CV Lengkap (Format PDF) <span className="text-red-500">*</span>
                        </label>
                        <div className={`border-3 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all duration-300 ${
                          formData.cvFile 
                            ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg' 
                            : 'border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50 hover:border-rose-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50'
                        }`}>
                          <div className={`mx-auto w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mb-4 ${
                            formData.cvFile ? 'bg-emerald-100' : 'bg-gray-100'
                          }`}>
                            <Upload className={`h-8 sm:h-10 w-8 sm:w-10 ${
                              formData.cvFile ? 'text-emerald-500' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="cv-upload" className="cursor-pointer">
                              <span className={`block text-base sm:text-lg font-bold ${
                                formData.cvFile ? 'text-emerald-700' : 'text-gray-700'
                              }`}>
                                {formData.cvFile ? `✓ ${formData.cvFile.name}` : 'Klik untuk upload CV Anda'}
                              </span>
                              <span className="block text-xs sm:text-sm text-gray-500 mt-2">
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
                          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl">
                            <p className="text-sm text-emerald-700 flex items-center gap-2">
                              <CheckCircle size={16} />
                              File CV siap diupload: <strong>{formData.cvFile.name}</strong> ({(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="bg-gradient-to-r from-rose-50 to-violet-50 px-4 sm:px-6 lg:px-12 py-4 sm:py-6 border-t border-rose-100">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                      currentStep === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105'
                    }`}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Sebelumnya</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  <div className="text-center">
                    <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                      {currentStep + 1}/{steps.length}
                    </span>
                  </div>
                  
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base ${
                        isSubmitting
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-xl hover:shadow-2xl transform hover:scale-105'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                          <span className="hidden sm:inline">Mengirim...</span>
                          <span className="sm:hidden">Kirim</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span className="hidden sm:inline">Kirim Formulir</span>
                          <span className="sm:hidden">Kirim</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl font-semibold hover:from-rose-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;