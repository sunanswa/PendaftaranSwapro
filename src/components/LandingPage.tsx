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
  Handshake
} from 'lucide-react';

interface LandingPageProps {
  onStartApplication: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartApplication }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, number: '1,500+', label: 'Karyawan Bergabung', color: 'from-blue-400 to-blue-500' },
    { icon: Handshake, number: '50+', label: 'Mitra Perusahaan', color: 'from-orange-400 to-orange-500' },
    { icon: Award, number: '10+', label: 'Tahun Pengalaman', color: 'from-purple-400 to-purple-500' },
    { icon: Star, number: '4.8/5', label: 'Rating Kepuasan', color: 'from-green-400 to-green-500' }
  ];

  const positions = [
    { 
      title: 'Sales Officer Chaneling (SOC)', 
      icon: Target, 
      locations: 6, 
      type: 'Sales & Marketing',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      title: 'Credit Marketing Officer', 
      icon: TrendingUp, 
      locations: 2, 
      type: 'Credit & Finance',
      color: 'from-orange-400 to-orange-500'
    },
    { 
      title: 'Sales Advisor Used Car', 
      icon: Users, 
      locations: 1, 
      type: 'Sales & Advisory',
      color: 'from-purple-400 to-purple-500'
    },
    { 
      title: 'Telemarketing', 
      icon: Zap, 
      locations: 2, 
      type: 'Marketing & Communication',
      color: 'from-green-400 to-green-500'
    }
  ];

  const benefits = [
    { icon: Shield, title: 'Jaminan Kesehatan', desc: 'BPJS & Asuransi Swasta' },
    { icon: TrendingUp, title: 'Jenjang Karir Jelas', desc: 'Program Pengembangan Berkelanjutan' },
    { icon: Award, title: 'Bonus & Insentif', desc: 'Reward Berdasarkan Performa' },
    { icon: Clock, title: 'Work-Life Balance', desc: 'Jam Kerja Fleksibel' },
    { icon: Users, title: 'Tim Solid', desc: 'Lingkungan Kerja Supportif' },
    { icon: Heart, title: 'Employee Wellness', desc: 'Program Kesehatan Mental' }
  ];

  const testimonials = [
    {
      name: 'Sarah Wijaya',
      position: 'Sales Officer',
      text: 'SWAPRO memberikan kesempatan karir yang luar biasa. Tim yang solid dan lingkungan kerja yang mendukung.',
      rating: 5
    },
    {
      name: 'Ahmad Rizki',
      position: 'Credit Officer',
      text: 'Pengalaman kerja di SWAPRO sangat memuaskan. Benefit yang kompetitif dan jenjang karir yang jelas.',
      rating: 5
    },
    {
      name: 'Maya Sari',
      position: 'Relationship Officer',
      text: 'Bergabung dengan SWAPRO adalah keputusan terbaik. Work-life balance yang baik dan tim yang profesional.',
      rating: 5
    }
  ];

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
                Portal Karir SWAPRO
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl ml-2">✨</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Wujudkan karir impian Anda bersama kami. Bergabunglah dengan tim profesional yang 
              <span className="font-semibold text-blue-600"> inovatif</span> dan 
              <span className="font-semibold text-orange-600"> berpengalaman</span>
            </p>

            {/* CTA Button */}
            <button
              onClick={onStartApplication}
              className="group bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              Mulai Pendaftaran Sekarang
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

      {/* Positions Section */}
      <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Posisi yang Tersedia
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan posisi yang sesuai dengan passion dan keahlian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {positions.map((position, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${position.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto`}>
                  <position.icon size={32} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                  {position.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 sm:mb-4 text-center">{position.type}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-600 font-semibold">
                  <MapPin size={16} />
                  {position.locations} Lokasi Tersedia
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20">
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
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
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
              Kata Mereka tentang SWAPRO
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman langsung dari tim SWAPRO
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

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Siap Memulai Karir Baru?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah mempercayai SWAPRO sebagai tempat berkarir
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