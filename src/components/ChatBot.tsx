import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Users,
  Award,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatBotProps {
  onStartApplication?: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onStartApplication }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(
          "Halo! Saya Mimin SWAPRO 👋\n\nSaya siap membantu Anda dengan informasi seputar karir di SWAPRO. Ada yang bisa saya bantu?",
          [
            "Apa itu SWAPRO?",
            "Posisi apa saja yang tersedia?",
            "Bagaimana cara melamar?",
            "Benefit bekerja di SWAPRO"
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (!isOpen) {
      setHasNewMessage(true);
    }
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (duration: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  const getBotResponse = (userInput: string): { text: string; quickReplies?: string[] } => {
    const input = userInput.toLowerCase();

    // Greeting responses
    if (input.includes('halo') || input.includes('hai') || input.includes('hello')) {
      return {
        text: "Halo! Senang bertemu dengan Anda! 😊\n\nSaya Mimin SWAPRO, asisten virtual yang siap membantu Anda dengan informasi karir di SWAPRO. Apa yang ingin Anda ketahui?",
        quickReplies: ["Tentang SWAPRO", "Lowongan Kerja", "Cara Melamar", "Kontak"]
      };
    }

    // About SWAPRO
    if (input.includes('apa itu swapro') || input.includes('tentang swapro') || input.includes('profil perusahaan')) {
      return {
        text: "🏢 **SWAPRO (PT. Swadharma Bhakti Sedaya)**\n\nSWAPRO adalah perusahaan pembiayaan terpercaya yang telah berpengalaman lebih dari 10 tahun dalam industri finansial. Kami fokus pada:\n\n✅ Pembiayaan Kendaraan Bermotor\n✅ Multiguna & Konsumer\n✅ Layanan Finansial Terpadu\n\n**Visi:** Menjadi perusahaan pembiayaan terdepan yang memberikan solusi finansial terbaik\n\n**Misi:** Memberikan layanan pembiayaan yang mudah, cepat, dan terpercaya untuk meningkatkan kesejahteraan masyarakat",
        quickReplies: ["Lowongan Kerja", "Lokasi Kantor", "Benefit Karyawan"]
      };
    }

    // Job positions
    if (input.includes('posisi') || input.includes('lowongan') || input.includes('kerja') || input.includes('jabatan')) {
      return {
        text: "🎯 **Posisi yang Tersedia di SWAPRO:**\n\n**SALES & MARKETING:**\n• Sales Officer Chaneling (SOC) - 6 lokasi\n• Sales Officer Mobile (SOM) - 6 lokasi\n• Sales Force (SF) - 1 lokasi\n• Sales Advisor Used Car - 1 lokasi\n• Telemarketing Astra & WOM - 2 lokasi\n\n**CREDIT & FINANCE:**\n• Credit Marketing Officer - 2 lokasi\n• Credit Relation Executive/Officer - 2 lokasi\n• Recovery - 2 lokasi\n\n**OPERATIONS:**\n• Relationship Officer (RO) - 6 lokasi\n• Remedial Collection (REMOF) - 6 lokasi\n• Problem Account Officer (PAO) - 6 lokasi\n• Sourcing Consultant/Mekanik - Jabodetabek\n\nMau tahu detail posisi tertentu?",
        quickReplies: ["Detail SOC", "Detail Credit Officer", "Detail Recovery", "Semua Lokasi"]
      };
    }

    // SOC details
    if (input.includes('soc') || input.includes('sales officer chaneling')) {
      return {
        text: "💼 **Sales Officer Chaneling (SOC)**\n\n**Tugas Utama:**\n✅ Melakukan penjualan produk pembiayaan kendaraan\n✅ Menjalin hubungan dengan dealer/showroom\n✅ Mencapai target penjualan bulanan\n✅ Memberikan pelayanan terbaik kepada customer\n✅ Melakukan survey dan analisis kredit\n\n**Lokasi Tersedia:**\n• ADIRA TEBET MOTOR\n• ADIRA TEBET MOBIL\n• ADIRA KELAPA GADING MOTOR\n• ADIRA KELAPA GADING MOBIL\n• ADIRA KETAPANG\n• ADIRA PONDOK GEDE\n\n**Requirements:**\n• Min. SMA/SMK\n• Pengalaman sales (preferred)\n• Memiliki kendaraan pribadi\n• Komunikasi baik",
        quickReplies: ["Gaji SOC", "Cara Melamar", "Posisi Lain"]
      };
    }

    // Credit Officer details
    if (input.includes('credit') || input.includes('kredit')) {
      return {
        text: "💳 **Credit Marketing Officer**\n\n**Tugas Utama:**\n✅ Melakukan analisis kredit calon nasabah\n✅ Memproses aplikasi pembiayaan\n✅ Melakukan survey dan verifikasi data\n✅ Memastikan kelengkapan dokumen\n✅ Memberikan rekomendasi persetujuan kredit\n\n**Lokasi Tersedia:**\n• SMSF JAKARTA TIMUR\n• SMSF JAKARTA UTARA\n\n**Requirements:**\n• Min. D3/S1 (Finance/Ekonomi preferred)\n• Pengalaman di bidang kredit/banking\n• Analisis yang baik\n• Detail oriented",
        quickReplies: ["Gaji Credit Officer", "Recovery Position", "Cara Melamar"]
      };
    }

    // Recovery details
    if (input.includes('recovery') || input.includes('collection')) {
      return {
        text: "🔄 **Recovery Officer**\n\n**Tugas Utama:**\n✅ Menangani nasabah dengan tunggakan pembayaran\n✅ Melakukan negosiasi dan penagihan\n✅ Mencari solusi win-win untuk nasabah bermasalah\n✅ Menjaga hubungan baik dengan nasabah\n✅ Membuat laporan recovery\n\n**Lokasi Tersedia:**\n• SMSF JAKARTA TIMUR\n• SMSF JAKARTA UTARA\n\n**Requirements:**\n• Min. SMA/SMK\n• Pengalaman collection/recovery\n• Negosiasi yang baik\n• Sabar dan teliti",
        quickReplies: ["Gaji Recovery", "REMOF vs Recovery", "Cara Melamar"]
      };
    }

    // Salary information
    if (input.includes('gaji') || input.includes('salary') || input.includes('penghasilan')) {
      return {
        text: "💰 **Informasi Gaji & Benefit:**\n\n**Range Gaji (Gross):**\n• Fresh Graduate: 4-6 juta\n• Berpengalaman: 6-12 juta\n• Senior Level: 12-20 juta\n\n**Benefit Tambahan:**\n✅ Tunjangan Transport\n✅ Tunjangan Makan\n✅ BPJS Kesehatan & Ketenagakerjaan\n✅ Asuransi Jiwa\n✅ Bonus Performance\n✅ Insentif Penjualan\n✅ THR\n✅ Cuti Tahunan\n\n*Gaji final disesuaikan dengan pengalaman, posisi, dan hasil interview",
        quickReplies: ["Bonus & Insentif", "Jenjang Karir", "Cara Melamar"]
      };
    }

    // Benefits
    if (input.includes('benefit') || input.includes('fasilitas') || input.includes('tunjangan')) {
      return {
        text: "🎁 **Benefit & Fasilitas SWAPRO:**\n\n**KESEHATAN:**\n✅ BPJS Kesehatan\n✅ Asuransi Swasta\n✅ Medical Check-up Tahunan\n\n**FINANSIAL:**\n✅ Gaji Kompetitif\n✅ Bonus Performance\n✅ Insentif Penjualan\n✅ THR\n✅ Tunjangan Transport & Makan\n\n**PENGEMBANGAN:**\n✅ Training Program\n✅ Jenjang Karir Jelas\n✅ Sertifikasi Profesi\n\n**WORK-LIFE BALANCE:**\n✅ Jam Kerja Fleksibel\n✅ Cuti Tahunan\n✅ Team Building\n✅ Employee Gathering",
        quickReplies: ["Jenjang Karir", "Training Program", "Cara Melamar"]
      };
    }

    // Application process
    if (input.includes('cara melamar') || input.includes('daftar') || input.includes('apply') || input.includes('lamar')) {
      return {
        text: "📝 **Cara Melamar di SWAPRO:**\n\n**STEP 1: Persiapan Dokumen**\n✅ CV terbaru (PDF)\n✅ Foto formal\n✅ KTP\n✅ Ijazah terakhir\n✅ Sertifikat (jika ada)\n\n**STEP 2: Daftar Online**\n✅ Isi formulir pendaftaran\n✅ Upload CV & dokumen\n✅ Pilih posisi & lokasi\n\n**STEP 3: Proses Seleksi**\n✅ Screening CV (1-3 hari)\n✅ Interview HR (via phone/video)\n✅ Interview User (tatap muka)\n✅ Medical Check-up\n✅ Offering & Onboarding\n\n**Timeline:** 1-2 minggu\n\nSiap untuk memulai pendaftaran?",
        quickReplies: ["Mulai Daftar", "Dokumen Lengkap", "Tips Interview"]
      };
    }

    // Contact information
    if (input.includes('kontak') || input.includes('alamat') || input.includes('telepon') || input.includes('email')) {
      return {
        text: "📞 **Kontak SWAPRO:**\n\n**HEAD OFFICE:**\n🏢 Jl. Ampera Raya No. 15, Jakarta Selatan\n📞 (021) 7806-5555\n📧 recruitment@swapro.co.id\n🌐 www.swapro.co.id\n\n**RECRUITMENT TEAM:**\n👥 Recruitment 1: +62 857-1864-8488\n👥 Recruitment 2: +62 857-1145-1184\n\n**JAM OPERASIONAL:**\n🕐 Senin - Jumat: 08:00 - 17:00\n🕐 Sabtu: 08:00 - 12:00\n\n**SOCIAL MEDIA:**\n📱 Instagram: @swapro_official\n📘 LinkedIn: PT Swadharma Bhakti Sedaya",
        quickReplies: ["Lokasi Cabang", "WhatsApp HR", "Cara Melamar"]
      };
    }

    // Locations
    if (input.includes('lokasi') || input.includes('cabang') || input.includes('kantor')) {
      return {
        text: "📍 **Lokasi Kantor SWAPRO:**\n\n**HEAD OFFICE:**\n🏢 HO Ampera - Jakarta Selatan\n\n**CABANG ADIRA:**\n🏢 ADIRA TEBET MOTOR\n🏢 ADIRA TEBET MOBIL\n🏢 ADIRA KELAPA GADING MOTOR\n🏢 ADIRA KELAPA GADING MOBIL\n🏢 ADIRA KETAPANG\n🏢 ADIRA PONDOK GEDE\n\n**CABANG SMSF:**\n🏢 SMSF JAKARTA TIMUR\n🏢 SMSF JAKARTA UTARA\n\n**AREA COVERAGE:**\n🌍 JABODETABEK\n🌍 Tangerang City\n🌍 Juanda Jakarta Pusat",
        quickReplies: ["Posisi per Lokasi", "Kontak Cabang", "Cara Melamar"]
      };
    }

    // Tips
    if (input.includes('tips') || input.includes('saran') || input.includes('interview')) {
      return {
        text: "💡 **Tips Sukses Interview di SWAPRO:**\n\n**PERSIAPAN:**\n✅ Pelajari profil SWAPRO\n✅ Pahami job description\n✅ Siapkan pertanyaan untuk interviewer\n✅ Dress code professional\n\n**SAAT INTERVIEW:**\n✅ Datang 15 menit lebih awal\n✅ Tunjukkan antusiasme\n✅ Ceritakan pengalaman relevan\n✅ Tanyakan tentang jenjang karir\n\n**YANG DINILAI:**\n✅ Komunikasi & interpersonal skill\n✅ Motivasi & target oriented\n✅ Problem solving ability\n✅ Cultural fit\n\n**PERTANYAAN UMUM:**\n• Mengapa tertarik dengan SWAPRO?\n• Pengalaman sales/finance?\n• Target karir 5 tahun ke depan?",
        quickReplies: ["Cara Melamar", "Benefit SWAPRO", "Kontak HR"]
      };
    }

    // Default response
    return {
      text: "Maaf, saya belum memahami pertanyaan Anda 😅\n\nSaya bisa membantu dengan informasi tentang:\n\n🏢 Profil SWAPRO\n💼 Lowongan kerja & job description\n💰 Gaji & benefit\n📝 Cara melamar\n📞 Kontak & lokasi\n💡 Tips interview\n\nSilakan pilih topik yang ingin Anda ketahui, atau ketik pertanyaan dengan kata kunci yang lebih spesifik!",
      quickReplies: ["Tentang SWAPRO", "Lowongan Kerja", "Cara Melamar", "Kontak"]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userInput = inputValue;
    setInputValue('');

    simulateTyping();
    
    setTimeout(() => {
      const response = getBotResponse(userInput);
      addBotMessage(response.text, response.quickReplies);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    simulateTyping();
    
    setTimeout(() => {
      const response = getBotResponse(reply);
      addBotMessage(response.text, response.quickReplies);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleStartApplication = () => {
    if (onStartApplication) {
      onStartApplication();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative group bg-gradient-to-r from-blue-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 ${
            isOpen ? 'scale-110' : 'hover:scale-110 animate-bounce'
          }`}
          style={{ animationDuration: '3s' }}
        >
          {/* Mascot Avatar */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="text-2xl">👨‍💼</div>
          </div>
          
          {/* Notification Badge */}
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              !
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat dengan Mimin SWAPRO
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-4 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="text-xl">👨‍💼</div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Mimin SWAPRO</h3>
                <p className="text-blue-100 text-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                      {message.isBot && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot size={16} className="text-blue-500" />
                          <span className="text-xs text-gray-500 font-medium">Mimin SWAPRO</span>
                        </div>
                      )}
                      <div className={`p-3 rounded-2xl ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-gradient-to-r from-blue-500 to-orange-500 text-white'
                      }`}>
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {message.text}
                        </div>
                      </div>
                      
                      {/* Quick Replies */}
                      {message.isBot && message.quickReplies && (
                        <div className="mt-2 space-y-1">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors border border-blue-200"
                            >
                              {reply}
                            </button>
                          ))}
                          {message.quickReplies.includes("Mulai Daftar") && (
                            <button
                              onClick={handleStartApplication}
                              className="block w-full text-left px-3 py-2 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-colors flex items-center gap-2"
                            >
                              <ArrowRight size={16} />
                              Mulai Pendaftaran Sekarang
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {message.isBot && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center order-1 mr-2 flex-shrink-0">
                        <div className="text-white text-sm">👨‍💼</div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="text-white text-sm">👨‍💼</div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pertanyaan Anda..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-4 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-2xl hover:from-blue-600 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;