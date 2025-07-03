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
  FileText
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
    alasanMelamar: '',
    cvFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const steps = [
    { title: 'Data Pribadi', icon: User },
    { title: 'Alamat', icon: MapPin },
    { title: 'Pendidikan', icon: GraduationCap },
    { title: 'Pengalaman', icon: Briefcase },
    { title: 'Dokumen', icon: FileCheck },
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

  // Optimized input handler - no debouncing, direct update
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
        alasanMelamar: formData.alasanMelamar,
        cvFileName: formData.cvFile?.name || 'Tidak ada file',
        cvFileData: cvFileData
      };

      await submitToGoogleSheets(submissionData);
      
      setSubmitStatus('success');
      setSubmitMessage('Formulir berhasil dikirim! Data Anda telah tersimpan dan CV telah diupload.');
      
      // Reset form after 5 seconds
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
        setCurrentStep(0);
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <img 
              src="/swapro copy.png" 
              alt="SWAPRO Logo" 
              className="h-16 w-auto"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Portal Karir SWAPRO
              </h1>
              <p className="text-gray-600 mt-1">Formulir Pendaftaran Karyawan</p>
            </div>
          </div>
          
          {/* Anti-Duplicate Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <Shield size={18} />
              <span className="text-sm font-medium">
                Sistem Anti-Duplikasi: Setiap NIK hanya dapat mendaftar sekali
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-3">
            <CheckCircle size={20} />
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-medium">{submitMessage}</span>
          </div>
        )}

        {/* Progress Steps */}
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8">
              {/* Step 0: Data Pribadi */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Data Pribadi & Posisi</h2>
                    <p className="text-gray-600">Lengkapi informasi pribadi dan posisi yang dilamar</p>
                  </div>
                  
                  {/* Posisi */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target size={20} />
                      Informasi Posisi
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Data Pribadi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Informasi Alamat</h2>
                    <p className="text-gray-600">Lengkapi alamat lengkap dan detail kontak</p>
                  </div>
                  
                  <div className="space-y-4">
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Riwayat Pendidikan</h2>
                    <p className="text-gray-600">Informasi pendidikan terakhir dan prestasi akademik</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Pengalaman Kerja</h2>
                    <p className="text-gray-600">Ceritakan pengalaman kerja dan keahlian profesional</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <BooleanInput
                        label="Apakah Anda memiliki pengalaman kerja sebelumnya?"
                        name="pengalamanKerja"
                        value={formData.pengalamanKerja}
                        onChange={(value) => handleInputChange('pengalamanKerja', value)}
                        icon={Briefcase}
                      />
                    </div>
                    
                    {formData.pengalamanKerja && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                          <BooleanInput
                            label="Apakah pengalaman tersebut di bidang Leasing/Finansial?"
                            name="pengalamanLeasing"
                            value={formData.pengalamanLeasing}
                            onChange={(value) => handleInputChange('pengalamanLeasing', value)}
                            icon={Building}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Dokumen & Motivasi</h2>
                    <p className="text-gray-600">Kelengkapan dokumen dan motivasi bergabung</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Dokumen */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileCheck size={20} />
                        Kelengkapan Dokumen & Persyaratan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <BooleanInput
                          label="Apakah Anda memiliki riwayat buruk di pinjaman/kredit?"
                          name="riwayatBurukKredit"
                          value={formData.riwayatBurukKredit}
                          onChange={(value) => handleInputChange('riwayatBurukKredit', value)}
                        />
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
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload CV Lengkap (Format PDF) <span className="text-red-500">*</span>
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        formData.cvFile 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                      }`}>
                        <Upload className={`mx-auto h-12 w-12 mb-3 ${
                          formData.cvFile ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <div className="space-y-2">
                          <label htmlFor="cv-upload" className="cursor-pointer">
                            <span className={`block font-medium ${
                              formData.cvFile ? 'text-green-700' : 'text-gray-700'
                            }`}>
                              {formData.cvFile ? `✓ ${formData.cvFile.name}` : 'Klik untuk upload CV Anda'}
                            </span>
                            <span className="block text-sm text-gray-500 mt-1">
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
                          <AlertCircle size={14} />
                          {errors.cvFile}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                disabled={currentStep === 0}
              >
                <ChevronLeft size={18} />
                Sebelumnya
              </button>
              
              <span className="text-sm text-gray-500 font-medium">
                {currentStep + 1} dari {steps.length}
              </span>
              
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Formulir
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Selanjutnya
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;