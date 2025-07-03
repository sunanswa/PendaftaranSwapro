import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Star, 
  Building2, 
  Award, 
  Clock, 
  Shield,
  Heart,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Play,
  Briefcase,
  Handshake,
  Trophy,
  Phone,
  Mail,
  Globe,
  Send
} from 'lucide-react';

interface LandingPageProps {
  onStartApplication: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartApplication }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, number: '2,500+', label: 'Karyawan Bergabung', color: 'from-blue-400 to-blue-500' },
    { icon: Trophy, number: '150+', label: 'Proyek Sukses', color: 'from-orange-400 to-orange-500' },
    { icon: Handshake, number: '50+', label: 'Mitra Kerja', color: 'from-purple-400 to-purple-500' },
    { icon: Star, number: '4.9/5', label: 'Rating Kepuasan', color: 'from-green-400 to-green-500' }
  ];

  const services = [
    { 
      title: 'Outsourcing Profesional', 
      icon: Briefcase, 
      description: 'Penyediaan tenaga kerja profesional sesuai kebutuhan bisnis klien',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      title: 'Manajemen SDM', 
      icon: Users, 
      description: 'Solusi lengkap pengelolaan sumber daya manusia yang efektif',
      color: 'from-orange-400 to-orange-500'
    },
    { 
      title: 'Konsultasi Bisnis', 
      icon: Target, 
      description: 'Layanan konsultasi strategis untuk pengembangan bisnis berkelanjutan',
      color: 'from-purple-400 to-purple-500'
    },
    { 
      title: 'Training & Development', 
      icon: TrendingUp, 
      description: 'Program pelatihan dan pengembangan karyawan yang komprehensif',
      color: 'from-green-400 to-green-500'
    }
  ];

  const partners = [
    { name: 'PT. Adira Dinamika Multi Finance', category: 'Financial Services', logo: '🏦' },
    { name: 'PT. Summit Oto Finance', category: 'Automotive Finance', logo: '🚗' },
    { name: 'PT. Mandiri Tunas Finance', category: 'Multi Finance', logo: '💼' },
    { name: 'PT. BCA Finance', category: 'Banking & Finance', logo: '🏛️' },
    { name: 'PT. Mega Central Finance', category: 'Consumer Finance', logo: '💳' },
    { name: 'PT. Clipan Finance Indonesia', category: 'Equipment Finance', logo: '⚙️' }
  ];

  const benefits = [
    { icon: Shield, title: 'Jaminan Kesehatan', desc: 'BPJS & Asuransi Swasta Lengkap' },
    { icon: TrendingUp, title: 'Jenjang Karir Jelas', desc: 'Program Pengembangan Berkelanjutan' },
    { icon: Award, title: 'Bonus & Insentif', desc: 'Reward Berdasarkan Performa' },
    { icon: Clock, title: 'Work-Life Balance', desc: 'Jam Kerja Fleksibel & Cuti' },
    { icon: Users, title: 'Tim Profesional', desc: 'Lingkungan Kerja Supportif' },
    { icon: Heart, title: 'Employee Wellness', desc: 'Program Kesehatan Mental' }
  ];

  const testimonials = [
    {
      name: 'Sarah Wijaya',
      position: 'Sales Manager - PT. Adira Finance',
      text: 'SWAPRO memberikan solusi SDM yang sangat profesional. Tim mereka memahami kebutuhan bisnis kami dengan baik dan selalu memberikan kandidat terbaik.',
      rating: 5,
      company: 'PT. Adira Finance'
    },
    {
      name: 'Ahmad Rizki',
      position: 'HR Director - PT. Summit Oto',
      text: 'Kerjasama dengan SWAPRO sangat memuaskan. Proses recruitment yang efisien dan kualitas kandidat yang excellent membuat operasional kami berjalan lancar.',
      rating: 5,
      company: 'PT. Summit Oto'
    },
    {
      name: 'Maya Sari',
      position: 'Operations Manager - PT. BCA Finance',
      text: 'SWAPRO tidak hanya menyediakan tenaga kerja, tetapi juga partner strategis dalam pengembangan bisnis. Highly recommended!',
      rating: 5,
      company: 'PT. BCA Finance'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-orange-100/20"></div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo */}
            <div className="mb-8 sm:mb-12">
              <img 
                src="/swapro copy.png" 
                alt="SWAPRO Logo" 
                className="h-20 sm:h-24 lg:h-32 mx-auto drop-shadow-lg"
              />
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SWAPRO
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl ml-2">🚀</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-blue-600">Perusahaan Outsourcing Terdepan</span> dengan 
              <span className="font-semibold text-purple-600"> Budaya Kerja Profesional</span>, 
              <span className="font-semibold text-orange-600"> Efektif</span> dan 
              <span className="font-semibold text-green-600"> Inovatif</span>
            </p>

            <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan profesional yang telah mempercayai SWAPRO sebagai partner karir terbaik
            </p>

            {/* CTA Button */}
            <button
              onClick={onStartApplication}
              className="group bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              Mulai Karir Bersama Kami
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Stats */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 delay-${index * 100}`}
                >
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Layanan Unggulan Kami
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Solusi komprehensif untuk kebutuhan SDM dan pengembangan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 group"
              >
                <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={32} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Mitra Kerja Strategis
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Kerjasama strategis bersama perusahaan-perusahaan terpercaya di Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 group"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {partner.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Mengapa Bergabung dengan SWAPRO?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Nikmati berbagai benefit dan fasilitas terbaik untuk mendukung karir Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 group"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Testimoni Klien
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Kepercayaan dan kepuasan klien adalah prioritas utama kami
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl text-gray-700 mb-6 sm:mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <div className="font-bold text-lg sm:text-xl text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info & Contact Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Company Information */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Tentang SWAPRO
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <Target size={24} />
                    Visi Kami
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Menjadi perusahaan outsourcing terdepan dengan budaya kerja profesional, efektif dan inovatif
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                    <Zap size={24} />
                    Misi Kami
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Menjadi penyedia jasa outsourcing pendukung perkembangan bisnis klien
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
                    <MapPin size={24} />
                    Alamat Kantor
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Jln. Raya Tanjung Barat No. 129 Jagakarsa, Jakarta Selatan 12530
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center gap-2">
                    <Phone size={24} />
                    Kontak
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <Phone size={16} />
                      (021) 7806-5555
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={16} />
                      info@swapro.co.id
                    </p>
                    <p className="flex items-center gap-2">
                      <Globe size={16} />
                      www.swapro.co.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Hubungi Kami
              </h2>
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => handleContactChange('message', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 resize-none"
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Kirim Pesan
                  </button>
                </form>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={24} className="text-blue-600" />
                  Lokasi Kantor
                </h3>
                <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p className="font-semibold">Peta Lokasi</p>
                    <p className="text-sm">Jln. Raya Tanjung Barat No. 129</p>
                    <p className="text-sm">Jagakarsa, Jakarta Selatan 12530</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Siap Memulai Karir Bersama SWAPRO?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah mempercayai SWAPRO sebagai tempat berkarir terbaik
          </p>
          
          <button
            onClick={onStartApplication}
            className="group bg-white text-blue-600 px-8 sm:px-12 py-4 sm:py-6 rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <CheckCircle size={24} className="group-hover:scale-110 transition-transform" />
            Daftar Sekarang - Gratis!
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-blue-100 text-sm sm:text-base mt-6 sm:mt-8">
            Proses pendaftaran hanya membutuhkan 5-10 menit
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;