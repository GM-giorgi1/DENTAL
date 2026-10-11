import React from 'react';

interface PrinciplesTickerProps {
  lang?: 'geo' | 'eng';
}

interface PrincipleItem {
  geo: string;
  eng: string;
  tagGeo?: string;
  tagEng?: string;
}

const PRIMARY_PRINCIPLES: PrincipleItem[] = [
  { geo: 'პროფესიონალიზმი', eng: 'Clinical Professionalism', tagGeo: 'სტანდარტი', tagEng: 'Standard' },
  { geo: '15+ წლიანი გამოცდილება', eng: '15+ Years Expertise', tagGeo: 'გამოცდილება', tagEng: 'Expertise' },
  { geo: 'უმტკივნეულო სტომატოლოგია', eng: 'Pain-Free Dentistry', tagGeo: 'კომფორტი', tagEng: 'Comfort' },
  { geo: '3D ციფრული დიაგნოსტიკა', eng: '3D Digital Diagnostics', tagGeo: 'iTero', tagEng: 'iTero' },
  { geo: 'გამჭვირვალე მკურნალობის გეგმა', eng: 'Transparent Treatment Plan', tagGeo: 'ნდობა', tagEng: 'Trust' },
  { geo: 'ინდივიდუალური მიდგომა', eng: 'Personalized Patient Care', tagGeo: 'პაციენტი', tagEng: 'Care' },
];

const SECONDARY_PRINCIPLES: PrincipleItem[] = [
  { geo: '100% სტერილიზაციის კონტროლი', eng: '100% Sterilization Protocols', tagGeo: 'უსაფრთხოება', tagEng: 'Safety' },
  { geo: 'ბიოშეთავსებადი პრემიუმ მასალები', eng: 'Biocompatible Materials', tagGeo: 'ხარისხი', tagEng: 'Quality' },
  { geo: 'პაციენტის მაქსიმალური კომფორტი', eng: 'Maximized Patient Comfort', tagGeo: 'კომფორტი', tagEng: 'Care' },
  { geo: 'მიკროსკოპული სიზუსტე', eng: 'Microscopic Precision', tagGeo: 'სიზუსტე', tagEng: 'Precision' },
  { geo: 'პროგნოზირებადი შედეგები', eng: 'Predictable Clinical Outcomes', tagGeo: 'გარანტია', tagEng: 'Results' },
  { geo: 'საერთაშორისო პროტოკოლები', eng: 'International Protocols', tagGeo: 'გლობალური', tagEng: 'Global' },
];

export function PrinciplesTicker({ lang = 'geo' }: PrinciplesTickerProps) {
  return (
    <section
      id="principles"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-sky-800 via-blue-800 to-sky-900 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite] animate-ocean-gradient text-white select-none"
    >
      {/* Dynamic ambient ocean light reflection */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.22),transparent_70%)] pointer-events-none"
      />

      {/* Top transition veil matching Hero dark theme */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-b from-[#0a1118]/80 to-transparent pointer-events-none z-10"
      />

      {/* Header / Kicker */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-cyan-200 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
          {lang === 'geo' ? 'ჩვენი კლინიკური პრინციპები' : 'OUR CLINICAL PRINCIPLES'}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
          {lang === 'geo' ? (
            <>
              საიმედოობა, სიზუსტე და <span className="font-normal text-cyan-100">უმტკივნეულო ზრუნვა</span>
            </>
          ) : (
            <>
              Reliability, Precision &amp; <span className="font-normal text-cyan-100">Pain-Free Care</span>
            </>
          )}
        </h2>
      </div>

      {/* Marquee Row 1: Leftward Smooth Motion */}
      <div className="relative w-full overflow-hidden marquee-mask mb-4 sm:mb-5">
        <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 py-1">
          {[...PRIMARY_PRINCIPLES, ...PRIMARY_PRINCIPLES, ...PRIMARY_PRINCIPLES].map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] whitespace-nowrap transition-transform hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
              <span className="text-sm sm:text-base font-medium tracking-wide">
                {lang === 'geo' ? item.geo : item.eng}
              </span>
              <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-cyan-100/90 font-semibold border border-white/10">
                {lang === 'geo' ? item.tagGeo : item.tagEng}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Rightward Smooth Motion */}
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 py-1">
          {[...SECONDARY_PRINCIPLES, ...SECONDARY_PRINCIPLES, ...SECONDARY_PRINCIPLES].map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-sky-950/40 hover:bg-sky-950/60 backdrop-blur-md border border-cyan-400/20 text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] whitespace-nowrap transition-transform hover:scale-105"
            >
              <span className="text-cyan-300 font-bold text-xs shrink-0">✦</span>
              <span className="text-sm sm:text-base font-medium tracking-wide">
                {lang === 'geo' ? item.geo : item.eng}
              </span>
              <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-400/15 text-cyan-200 font-semibold border border-cyan-400/25">
                {lang === 'geo' ? item.tagGeo : item.tagEng}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom transition veil softly blending into Section 3 (FounderSection white/slate-50) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-12 sm:h-20 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-10"
      />
    </section>
  );
}
