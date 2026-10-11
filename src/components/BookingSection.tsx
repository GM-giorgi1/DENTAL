import React, { useState } from 'react';

interface BookingSectionProps {
  lang?: 'geo' | 'eng';
}

export function BookingSection({ lang = 'geo' }: BookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('კონსულტაცია & დიაგნოსტიკა');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('11:00 AM');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const servicesList = [
    { geo: 'კონსულტაცია & დიაგნოსტიკა', eng: 'Consultation & Diagnostics' },
    { geo: 'ორთოდონტია', eng: 'Orthodontics & Aligners' },
    { geo: 'ესთეტიკური სტომატოლოგია', eng: 'Cosmetic Dentistry & Veneers' },
    { geo: 'ორთოპედია', eng: 'Prosthodontics & Restorations' },
    { geo: 'თერაპია & პრევენცია', eng: 'Therapy & Deep Hygiene' },
  ];

  const timeSlots = ['10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

  return (
    <section id="booking" className="relative py-20 sm:py-28 bg-[#f8fafc] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#437b60] text-xs font-semibold uppercase tracking-wider mb-3.5 border border-emerald-200/60">
            {lang === 'geo' ? 'ონლაინ ჩაწერა' : 'ONLINE APPOINTMENT'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            {lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Book an Appointment'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            {lang === 'geo'
              ? 'შეავსეთ მარტივი ფორმა და კლინიკის ადმინისტრაცია უმოკლეს დროში დაგიკავშირდებათ ვიზიტის დასადასტურებლად.'
              : 'Fill out the simple form below and our clinic administration will contact you shortly to confirm your visit.'}
          </p>
        </div>

        {/* Content Grid: Form (Left) & Schedule + Location (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Minimalist High-End Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#437b60] flex items-center justify-center text-3xl font-bold mb-4 shadow-sm">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {lang === 'geo' ? 'ვიზიტი წარმატებით დაიჯავშნა!' : 'Appointment Request Received!'}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                  {lang === 'geo'
                    ? `გმადლობთ, ${name}! ჩვენი ადმინისტრაცია დაგიკავშირდებათ ნომერზე: ${phone} ვიზიტის დასადასტურებლად.`
                    : `Thank you, ${name}! Our team will call you shortly at ${phone} to confirm your appointment.`}
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl text-left w-full max-w-md text-xs sm:text-sm space-y-2 mb-6 border border-slate-200">
                  <div><strong>{lang === 'geo' ? 'სერვისი:' : 'Service:'}</strong> {service}</div>
                  <div><strong>{lang === 'geo' ? 'თარიღი & დრო:' : 'Date & Time:'}</strong> {date} · {time}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {lang === 'geo' ? 'ახალი ჯავშანი' : 'Book Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'geo' ? 'სახელი და გვარი' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'geo' ? 'მაგ: გიორგი ბერიძე' : 'e.g. John Doe'}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#437b60]/20 focus:border-[#437b60] transition-all bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'geo' ? 'ტელეფონის ნომერი' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={lang === 'geo' ? '557 77 04 06' : '+995 557 77 04 06'}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#437b60]/20 focus:border-[#437b60] transition-all bg-slate-50/50 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {lang === 'geo' ? 'სასურველი სერვისი' : 'Select Treatment'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#437b60]/20 focus:border-[#437b60] transition-all bg-slate-50/50 cursor-pointer"
                  >
                    {servicesList.map((s, idx) => (
                      <option key={idx} value={s[lang]}>
                        {s[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'geo' ? 'სასურველი თარიღი' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#437b60]/20 focus:border-[#437b60] transition-all bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'geo' ? 'სასურველი დრო' : 'Preferred Time'}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#437b60]/20 focus:border-[#437b60] transition-all bg-slate-50/50 cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Redesigned Brand Button with Emerald Theme and Spacing */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-2xl bg-[#437b60] hover:bg-[#34624c] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>{lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Confirm Appointment'}</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    {lang === 'geo' ? 'ან პირდაპირ დაგვირეკეთ: 557 77 04 06' : 'Or call us directly: 557 77 04 06'}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Clinic Location & Direct Contact (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">
                    {lang === 'geo' ? 'კლინიკის მისამართი' : 'Clinic Location'}
                  </h4>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  ო. ჭილაძის #166 / 10, საბურთალო, თბილისი (ბუდაპეშტის #9-ის პირდაპირ)
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                <a
                  href="tel:557770406"
                  className="px-4 py-2.5 rounded-xl bg-[#437b60] hover:bg-[#34624c] text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  557 77 04 06
                </a>
                <a
                  href="https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&name=Tsotne+Dadiani+207%2C+Tbilisi%2C+Georgia&mkt=en-US&FORM=FBKPL1&q=41.738738645435%2C+44.794999300411&cp=41.738739%7E44.794998&lvl=4&style=r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs border border-sky-200/80 transition-colors flex items-center gap-1.5"
                >
                  {lang === 'geo' ? 'რუკაზე ნახვა ↗' : 'View on Map ↗'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
