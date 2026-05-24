import { useState, useMemo, FormEvent } from 'react';
import { Menu, X, Plane, Calendar, Users, MapPin, ChevronRight, CheckCircle, Award, Compass, Shield, HelpCircle, DollarSign, Clock, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define the modal types we can open
type ActiveModalType = 'start' | 'story' | 'rates' | 'benefits' | 'faq' | 'book' | 'discover' | null;

interface FlightQuote {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  jetClass: string;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  
  // States for Flight Estimator / Booking Form
  const [bookingForm, setBookingForm] = useState<FlightQuote>({
    origin: 'Toshkent (UTTT)',
    destination: 'Dubay (OMDB)',
    date: '2026-06-15',
    passengers: 4,
    jetClass: 'Super Midsize'
  });
  const [bookingInquirySubmitted, setBookingInquirySubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Sample prices per class
  const jetClasses = [
    { name: 'Light Jet', seats: '6-7', speed: '450 ktAS', rate: 4500, desc: 'Qisqa mintaqaviy parvozlar uchun ideal tanlov.' },
    { name: 'Super Midsize', seats: '8-9', speed: '490 ktAS', rate: 6800, desc: 'Mukammal masofa quvvati, tezlik va yuqori nafislik.' },
    { name: 'Heavy Jet', seats: '12-16', speed: '510 ktAS', rate: 9500, desc: 'Butun dunyo bo\'ylab parvoz, hashamatli xonalar va to\'liq ekipaj.' }
  ];

  // Map representation of routes for dynamic price estimation
  const estimateDistance = (origin: string, dest: string) => {
    const combined = `${origin.toLowerCase()}-${dest.toLowerCase()}`;
    if (combined.includes('toshkent') && combined.includes('dubay')) return 3.5; // hours
    if (combined.includes('tashkent') && combined.includes('dubai')) return 3.5;
    if (combined.includes('new york') && combined.includes('miami')) return 2.2;
    if (combined.includes('london') && combined.includes('nice')) return 1.8;
    return 2.0; // default estimate hours
  };

  const estimatedCost = useMemo(() => {
    const selectedClass = jetClasses.find(c => c.name === bookingForm.jetClass) || jetClasses[1];
    const hours = estimateDistance(bookingForm.origin, bookingForm.destination);
    return Math.round(hours * selectedClass.rate);
  }, [bookingForm.origin, bookingForm.destination, bookingForm.jetClass]);

  // Handle Form Change
  const handleFormChange = (key: keyof FlightQuote, val: any) => {
    setBookingForm(prev => ({ ...prev, [key]: val }));
  };

  // Handle Form Submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ref = `SE-${Math.floor(1000 + Math.random() * 9000)}-${bookingForm.origin.substring(0, 3).toUpperCase()}`;
    setBookingReference(ref);
    setBookingInquirySubmitted(true);
  };

  const resetForm = () => {
    setBookingInquirySubmitted(false);
    setBookingReference('');
  };

  return (
    <div id="sky-elite-root" className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden font-sans">
      
      {/* Hero Section Container */}
      <section id="hero" className="relative h-screen overflow-hidden">
        
        {/* Immersive Video Background */}
        <video
          id="hero-video"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[1.03]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dynamic Premium White Overlay Gradient for pristine contrast and layout integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/75 pointer-events-none z-10" />

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col z-20">
          
          {/* Navigation Bar */}
          <header id="nav-header" className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            {/* Logo on Left */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveModal(null)}
            >
              <div className="w-8 h-8 rounded-full bg-[#202A36] flex items-center justify-center text-white font-serif font-bold text-sm tracking-widest shadow-md">
                HE
              </div>
              <span className="text-2xl font-semibold text-gray-900 tracking-tight transition-all duration-300 hover:opacity-90">
                HavoElit
              </span>
            </div>

            {/* Desktop menu items */}
            <nav id="desktop-nav" className="hidden md:flex items-center gap-10">
              <button onClick={() => { setActiveModal('start'); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors cursor-pointer py-1 border-b border-transparent hover:border-gray-900">Boshlash</button>
              <button onClick={() => { setActiveModal('story'); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors cursor-pointer py-1 border-b border-transparent hover:border-gray-900">Tarix</button>
              <button onClick={() => { setActiveModal('rates'); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors cursor-pointer py-1 border-b border-transparent hover:border-gray-900">Narxlar</button>
              <button onClick={() => { setActiveModal('benefits'); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors cursor-pointer py-1 border-b border-transparent hover:border-gray-900">Afzalliklar</button>
              <button onClick={() => { setActiveModal('faq'); setIsMobileMenuOpen(false); }} className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors cursor-pointer py-1 border-b border-transparent hover:border-gray-900">Savollar</button>
            </nav>

            {/* Mobile menu trigger button */}
            <div className="md:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-900 hover:text-gray-700 focus:outline-none transition-colors"
                aria-label="Navigatsiya menyusini ochish"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 transition-transform duration-200 rotate-90" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </header>

          {/* Mobile Dropdown Menu with blur and animations */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/50"
              >
                <div className="px-6 py-6 flex flex-col gap-4">
                  <button onClick={() => { setActiveModal('start'); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-gray-900 hover:bg-gray-100/80 transition-colors font-medium">Parvozni hisoblash</button>
                  <button onClick={() => { setActiveModal('story'); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-gray-900 hover:bg-gray-100/80 transition-colors font-medium">Bizning tariximiz</button>
                  <button onClick={() => { setActiveModal('rates'); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-gray-900 hover:bg-gray-100/80 transition-colors font-medium">Soatbay tariflar</button>
                  <button onClick={() => { setActiveModal('benefits'); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-gray-900 hover:bg-gray-100/80 transition-colors font-medium">Eksklyuziv afzalliklar</button>
                  <button onClick={() => { setActiveModal('faq'); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-gray-900 hover:bg-gray-100/80 transition-colors font-medium">Ko'p so'raladigan savollar</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area (Centering vertically in the available space) */}
          <main className="flex-1 flex items-center justify-center px-6 select-none">
            <div id="hero-content" className="w-full max-w-4xl text-center flex flex-col items-center">
              
              {/* Category tag */}
              <p className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                SHAXSIY JETLAR
              </p>

              {/* Spectacular Overlapping Two-Line Luxury Headline */}
              <h1 className="flex flex-col items-center leading-none tracking-tighter mb-5">
                <span className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal italic text-gray-400 leading-none tracking-tight">
                  Premium.
                </span>
                <span 
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-sans font-bold tracking-tighter" 
                  style={{ color: '#202A36', marginTop: '-16px' }}
                >
                  Hamyonbop.
                </span>
              </h1>

              {/* Subheader */}
              <p className="text-lg md:text-xl xl:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed tracking-normal font-sans font-light">
                Sizning zahmatli mehnatingiz e'tirofga loyiq. Shaxsiy jadvalingiz asosida yaratilgan eksklyuziv xizmat ko'rsatish orqali betakror parvoz tajribasini his eting.
              </p>

              {/* Responsive Elegant CTAs */}
              <div className="flex flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActiveModal('discover')}
                  className="px-6 py-2.5 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 focus:outline-none transition-colors duration-300 shadow-sm text-sm md:text-base cursor-pointer"
                >
                  Batafsil
                </button>
                <button
                  onClick={() => setActiveModal('book')}
                  className="px-6 py-2.5 rounded-full text-white font-medium focus:outline-none transition-all duration-300 shadow-md text-sm md:text-base cursor-pointer"
                  style={{ backgroundColor: '#202A36' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2229'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#202A36'}
                >
                  Band qilish
                </button>
              </div>

            </div>
          </main>
          
          {/* Subtle Bottom Aesthetic Status Line (Humble & Elegant, purely user value focused) */}
          <footer className="w-full text-center py-6 text-xs text-gray-500 font-sans mt-auto z-20">
            HavoElit Air Charter LLC © 2026. Global miqyosda sertifikatlangan parvozlar yo'nalishi.
          </footer>

        </div>
      </section>

      {/* OVERLAY INTERACTIVE MODALS - Highly Polished, Fully Client-Side */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202A36]/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
            >
              {/* Close Button on Top Right */}
              <button
                onClick={() => { setActiveModal(null); resetForm(); }}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors z-10 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content Switch */}
              <div className="p-8">

                {/* MODAL 1: BOOK NOW & START */}
                {(activeModal === 'book' || activeModal === 'start') && (
                  <div>
                    {!bookingInquirySubmitted ? (
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Plane className="w-6 h-6 text-[#202A36]" />
                          <h2 className="text-2xl font-semibold text-gray-900">Shaxsiy parvozni band qilish</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                          Tezkor hisob-kitobni olish uchun o'zingizga qulay bo'lgan reys tafsilotlarini quyida kiriting.
                        </p>

                        <form onSubmit={handleFormSubmit} className="space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Uchish joyi
                              </label>
                              <input
                                type="text"
                                required
                                value={bookingForm.origin}
                                onChange={(e) => handleFormChange('origin', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-[#202A36] focus:bg-white transition-all"
                                placeholder="Masalan, Toshkent (UTTT)"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Qo'nish joyi
                              </label>
                              <input
                                type="text"
                                required
                                value={bookingForm.destination}
                                onChange={(e) => handleFormChange('destination', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-[#202A36] focus:bg-white transition-all"
                                placeholder="Masalan, Dubay (OMDB)"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" /> Uchish sanasi
                              </label>
                              <input
                                type="date"
                                required
                                value={bookingForm.date}
                                onChange={(e) => handleFormChange('date', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-[#202A36] focus:bg-white transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-gray-400" /> Yo'lovchilar soni
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="19"
                                required
                                value={bookingForm.passengers}
                                onChange={(e) => handleFormChange('passengers', parseInt(e.target.value) || 1)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-[#202A36] focus:bg-white transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5">Samolyot klassi</label>
                            <div className="grid grid-cols-3 gap-2.5">
                              {jetClasses.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => handleFormChange('jetClass', item.name)}
                                  className={`p-3 text-left rounded-xl border transition-all ${
                                    bookingForm.jetClass === item.name
                                      ? 'border-[#202A36] bg-[#202A36]/5 text-[#202A36] font-semibold'
                                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                                  }`}
                                >
                                  <div className="text-xs font-bold leading-tight">{item.name === 'Light Jet' ? 'Yengil Jet' : item.name === 'Super Midsize' ? 'O\'rta Jet' : 'Og\'ir Jet'}</div>
                                  <div className="text-[10px] text-gray-500 mt-0.5">{item.seats} o'rindiq</div>
                                  <div className="text-[10px] text-gray-400 mt-1">${item.rate}/soat</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Instant Price Card */}
                          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Taxminiy umumiy narx</span>
                              <p className="text-2xl font-bold text-gray-900">${estimatedCost.toLocaleString()} <span className="text-xs font-normal text-gray-500">USD</span></p>
                            </div>
                            <div className="text-right text-[10px] text-gray-500 max-w-xs">
                              Ushbu narxga uchuvchilar xizmati, qo'nish to'lovlari, yoqilg'i va premium katering kiradi.
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 rounded-full text-white font-medium hover:bg-[#1a2229] transition-colors shadow-lg shadow-gray-200"
                            style={{ backgroundColor: '#202A36' }}
                          >
                            Band qilish so'rovini yuborish
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">So'rov muvaffaqiyatli yuborildi</h2>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                          Bizning elita parvozlarni muvofiqlashtiruvchi konsyerj xizmatimiz hozirda aeroport slotlarini o'rganmoqda.
                        </p>

                        <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-4 max-w-sm mx-auto text-left mb-6 space-y-1.5 text-xs">
                          <div className="flex justify-between font-mono"><span className="text-gray-400">So'rov kodi:</span> <span className="text-gray-900 font-semibold">{bookingReference}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Yo'nalish:</span> <span className="text-gray-900 font-medium">{bookingForm.origin} ✈ {bookingForm.destination}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Sana:</span> <span className="text-gray-900 font-medium">{bookingForm.date}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Klass:</span> <span className="text-gray-900 font-medium">{bookingForm.jetClass === 'Light Jet' ? 'Yengil Jet' : bookingForm.jetClass === 'Super Midsize' ? 'O\'rta Jet' : 'Og\'ir Jet'}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400">Taxminiy xizmat narxi:</span> <span className="text-emerald-700 font-bold">${estimatedCost.toLocaleString()}</span></div>
                        </div>

                        <p className="text-xs text-gray-400 mb-6">
                          Sayohat bo'yicha maxsus mutaxassisimiz tez fursatda siz bilan bog'lanadi. 12 daqiqa ichida telefon qo'ng'irog'ini kuting.
                        </p>

                        <button
                          onClick={() => { setActiveModal(null); resetForm(); }}
                          className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Yopish
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* MODAL 2: STORY & DISCOVER */}
                {(activeModal === 'story' || activeModal === 'discover') && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Compass className="w-6 h-6 text-[#202A36]" />
                      <h2 className="text-2xl font-semibold text-gray-900">HavoElit falsafasi</h2>
                    </div>

                    <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                      <p>
                        HavoElit kompaniyasi bitta muhim g'oyaga asoslangan: <strong className="text-gray-900 font-medium">Haqiqiy hashamat bu - vaqt hashamatidir</strong>. Kundalik tijoriy parvozlar rejalari dunyo miqyosidagi innovatorlar, yetakchilar hamda ijodkorlarni belgilangan qat'iy uchish vaqtlari, uzoq navbatlar va noqulay yo'nalishlar atrofida hayot kechirishga majbur etadi.
                      </p>
                      <p>
                        Biz shaxsiy va moslashuvchan havo transportini taqdim etuvchi zamonaviy jet dispetcherlik tizimini barpo etdik. Yo'lovchisiz qaytayotgan reyslarni mijozlarimiz ehtiyojlariga moslashtirish evaziga, biz xususiy aviatsiya sohasida mutlaqo oqilona bo'lgan narxlar va qulayliklarni taklif etamiz.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="font-semibold text-gray-900 text-sm mb-1">Kafolatlangan samolyotlar</div>
                        <p className="text-xs text-gray-500">Yer yuzining istalgan nuqtasida 48 soatdan kam vaqt ichida havo kemasi yetkazilishining 100% kafolati.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="font-semibold text-gray-900 text-sm mb-1">Maxsus yerdagi konsyerj</div>
                        <p className="text-xs text-gray-400">Xalqaro darajadagi taom pishirish kuryerlaridan transfer hamda to'liq himoyalangan eksklyuziv transport.</p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button
                        onClick={() => setActiveModal('book')}
                        className="px-5 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#202A36' }}
                      >
                        Sayohatni bron qilish
                      </button>
                    </div>
                  </div>
                )}

                {/* MODAL 3: RATES */}
                {activeModal === 'rates' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-[#202A36]" />
                      <h2 className="text-2xl font-semibold text-gray-900">Shaffof narx standartlari</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                      Biz adolatli va qat'iy narxlash modellari bilan faxrlanamiz. Hech qanday majburiy a'zolik badallari yoki sun'iy oshirilgan narxlar mavjud emas.
                    </p>

                    <div className="border border-gray-200/60 rounded-2xl overflow-hidden divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-3 p-4 bg-gray-50 font-semibold text-gray-600">
                        <span>Jet klassi</span>
                        <span className="text-center">Soatlik tarif</span>
                        <span className="text-right">Maximal sig'im</span>
                      </div>
                      
                      <div className="grid grid-cols-3 p-4 hover:bg-gray-50/40">
                        <span className="font-medium text-gray-900">Yengil Jetlar</span>
                        <span className="text-center text-[#202A36] font-bold">$4,500</span>
                        <span className="text-right text-gray-500">7 tagacha mehmon</span>
                      </div>
                      <div className="grid grid-cols-3 p-4 hover:bg-gray-50/40">
                        <span className="font-medium text-gray-900">O'rtacha Jetlar</span>
                        <span className="text-center text-[#202A36] font-bold">$6,800</span>
                        <span className="text-right text-gray-500">9 tagacha mehmon</span>
                      </div>
                      <div className="grid grid-cols-3 p-4 hover:bg-gray-50/40">
                        <span className="font-medium text-gray-900">Uzoq masofali og'ir Jet</span>
                        <span className="text-center text-[#202A36] font-bold">$9,500</span>
                        <span className="text-right text-gray-500">16 tagacha mehmon</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 text-xs text-gray-500 leading-relaxed">
                      💡 <strong>Tarifga nimalar kiradi:</strong> Barcha parvozlarda yuqori tezlikdagi simsiz Internet (Wi-Fi), individual menyu, aeroport angarlari to'lovlari, har bir yo'lovchi uchin ikki dona bepul yuk hamda navbatlarsiz tezkor tekshirish xizmati.
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveModal('book')}
                        className="px-5 py-2 rounded-full text-white text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#202A36' }}
                      >
                        Parvoz xarajatini hisoblash
                      </button>
                    </div>
                  </div>
                )}

                {/* MODAL 4: BENEFITS */}
                {activeModal === 'benefits' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-[#202A36]" />
                      <h2 className="text-2xl font-semibold text-gray-900">Premium xizmat afzalliklari</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                      Oliy darajadagi hashamat biz uchun me'yordir. HavoElit har bir parvozni yanada mukammal qilish uchun qo'shimcha imtiyozlarni taqdim etadi.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex gap-3">
                        <div className="p-2 rounded-xl bg-white text-[#202A36] shadow-sm h-fit">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Navbatlarsiz terminallar</div>
                          <p className="text-xs text-gray-500 mt-1">Uchishdan bor-yo'g'i 15 daqiqa oldin kelib aeroportdagi standart navbatlarsiz bemalol bortga ko'taring.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex gap-3">
                        <div className="p-2 rounded-xl bg-white text-[#202A36] shadow-sm h-fit">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Wyvern Wingman himoyasi</div>
                          <p className="text-xs text-gray-400">Barcha jalb qilingan havo kemalari xalqaro darajadagi Oltin xavfsizlik sertifikatiga va tajribali professional ekipajga ega.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex gap-3">
                        <div className="p-2 rounded-xl bg-white text-[#202A36] shadow-sm h-fit">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Ekologik mas'uliyat</div>
                          <p className="text-xs text-gray-400">Biz har bir reysda uglerod gazlarini to'liq qoplash hamda atrof-muhitni asrash dasturlariga faol hissa qo'shamiz.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex gap-3">
                        <div className="p-2 rounded-xl bg-white text-[#202A36] shadow-sm h-fit">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Jonivorlar uchun qulay salon</div>
                          <p className="text-xs text-gray-400">Sizning sevimli uy hayvonlaringiz qafassiz to'g'ridan-to'g'ri salonda uchishadi hamda maxsus katering xizmatidan foydalanishadi.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveModal('book')}
                        className="px-5 py-2 rounded-full text-white text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#202A36' }}
                      >
                        Hozir joy band qilish
                      </button>
                    </div>
                  </div>
                )}

                {/* MODAL 5: FAQ */}
                {activeModal === 'faq' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-6 h-6 text-[#202A36]" />
                      <h2 className="text-2xl font-semibold text-gray-900">Sizni qiziqtirgan savollar</h2>
                    </div>

                    <div className="space-y-3">
                      <div className="details p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="font-semibold text-gray-900 text-sm">Oylik yoki yillik a'zolik to'lovi bormi?</div>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                          Yo'q. HavoElit to'liq on-demand (so'rovga asosan) tartibida xizmat ko'rsatadi. Hech qanday majburiy boshlang'ich yoki yashirin brokerlik to'lovlari yo'q.
                        </p>
                      </div>

                      <div className="details p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="font-semibold text-gray-900 text-sm">HavoElit qaysi aeroportlardan foydalanadi?</div>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                          Biz butun dunyo bo'ylab 5000 dan ortiq hududiy va korporativ uchish-qo'nish yo'laklarini jalb qilamiz va sizga eng yaqin nuqtaga parvozni tashkil etamiz.
                        </p>
                      </div>

                      <div className="details p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="font-semibold text-gray-900 text-sm">Parvoz jadvalini oxirgi daqiqada o'zgartirsam bo'ladimi?</div>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                          Albatta. Sayohat vaqtini o'zgartirish yoki kechiktirish uchun shaxsiy konsyerj mutaxassisingizga bitta xabar yuborish kifoya.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveModal('book')}
                        className="px-5 py-2 rounded-full text-white text-sm font-medium hover:opacity-90"
                        style={{ backgroundColor: '#202A36' }}
                      >
                        So'rov qoldirish
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
