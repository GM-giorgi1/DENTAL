import React, { useEffect, useRef, useState } from 'react';

interface TimelineStep {
  id: number;
  number: string;
  headline: { geo: string; eng: string };
  paragraph: { geo: string; eng: string };
}

const PHILOSOPHY_STEPS: TimelineStep[] = [
  {
    id: 1,
    number: '1',
    headline: {
      geo: 'პროფესიონალიზმი',
      eng: 'Professionalism',
    },
    paragraph: {
      geo: 'ინდივიდუალური მიდგომა, მკაცრი სამედიცინო ეთიკა და გამჭვირვალე მკურნალობის გეგმა თითოეული პაციენტისთვის.',
      eng: 'Personalized treatment pathways, rigorous clinical ethics, and transparent treatment plans tailored to each patient.',
    },
  },
  {
    id: 2,
    number: '2',
    headline: {
      geo: 'გამოცდილება',
      eng: 'Experience',
    },
    paragraph: {
      geo: 'ექიმი ეკა ბუხრაშვილის მრავალწლიანი კლინიკური პრაქტიკა ურთულესი სტომატოლოგიური შემთხვევების უსაფრთხო მართვაში.',
      eng: 'Years of dedicated practice led by Dr. Eka Bukhrashvili, bringing master-level expertise to every complex case.',
    },
  },
  {
    id: 3,
    number: '3',
    headline: {
      geo: 'ტექნოლოგია',
      eng: 'Technology',
    },
    paragraph: {
      geo: '3D ციფრული სკანირება (iTero), ულტრათანამედროვე აპარატურა და უმტკივნეულო მკურნალობა მაქსიმალური კომფორტისთვის.',
      eng: '3D intraoral scanning (iTero), cutting-edge equipment, and minimally invasive, pain-free dental procedures.',
    },
  },
];

interface PhilosophyTimelineProps {
  lang?: 'geo' | 'eng';
}

export function PhilosophyTimeline({ lang = 'geo' }: PhilosophyTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Re-scan AIFX effects if the runtime script is loaded
    if (typeof window !== 'undefined' && (window as any).AIFX?.rescan) {
      (window as any).AIFX.rescan();
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
        const scrolledIntoSection = (windowHeight * 0.75 - rect.top) / (rect.height + windowHeight * 0.5);

        if (scrolledIntoSection > 0.65) {
          setActiveStep(3);
        } else if (scrolledIntoSection > 0.3) {
          setActiveStep(2);
        } else {
          setActiveStep(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveStep((prev) => Math.max(prev, index + 1));
            }
          }
        });
      },
      { threshold: [0.3, 0.6] }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="relative isolate bg-[#050505] text-white py-32 overflow-hidden select-none"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      {/* Caustics WebGL Effect Background */}
      <div
        data-aifx="caustics"
        data-aifx-colors="#00cdff,#0b5e6d,#16a8b8,#00efff,#ccdbdc"
        data-aifx-bg="#5370d1"
        data-aifx-speed="0.73"
        data-aifx-scale="1.05"
        data-aifx-intensity="0.85"
        data-aifx-dispersion="0.38"
        data-aifx-rays="0.26"
        data-aifx-depth="0.31"
        data-aifx-wobble="0.68"
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Blur & Contrast Overlay to guarantee perfect text legibility */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-slate-950/65 backdrop-blur-[6px]"
        aria-hidden="true"
      />

      {/* Fluid Section Blending Gradient Overlays at Top and Bottom */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#070d17] via-[#070d17]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-14 xl:gap-16">
          {PHILOSOPHY_STEPS.map((step, idx) => {
            const stepNumber = idx + 1;
            const isActive = stepNumber <= activeStep;

            return (
              <div
                key={`phil-step-${step.id}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-index={idx}
                onClick={() => setActiveStep(stepNumber)}
                className="flex flex-col cursor-pointer group min-w-0 max-w-full overflow-hidden"
              >
                {/* 1. Timeline Track with Orange Square Node */}
                <div className="relative flex items-center mb-2 h-10">
                  {/* Left horizontal line connecting to previous/left edge */}
                  <div
                    className={`h-[3px] sm:h-[4px] flex-1 transition-all duration-700 ease-out ${
                      idx === 0
                        ? isActive
                          ? 'bg-[#ff5500] shadow-[0_0_14px_rgba(255,85,0,0.6)]'
                          : 'bg-slate-800/80'
                        : stepNumber <= activeStep
                        ? 'bg-[#ff5500] shadow-[0_0_14px_rgba(255,85,0,0.6)]'
                        : 'bg-slate-800/80'
                    }`}
                  />

                  {/* Indicator Square Box containing Number */}
                  <div
                    className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-700 ease-out flex-shrink-0 ${
                      isActive
                        ? 'bg-[#ff5500] text-white shadow-[0_0_20px_rgba(255,85,0,0.65)] scale-100'
                        : 'bg-slate-900/90 border border-slate-800/90 text-slate-400 scale-90'
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Right horizontal line connecting to next */}
                  <div
                    className={`h-[3px] sm:h-[4px] flex-1 transition-all duration-700 ease-out ${
                      stepNumber < activeStep
                        ? 'bg-[#ff5500] shadow-[0_0_14px_rgba(255,85,0,0.6)]'
                        : 'bg-slate-800/80'
                    }`}
                  />
                </div>

                {/* 2. Content Block: Crisp high-contrast text against blurred caustics */}
                <div
                  className={`mt-4 transition-all duration-700 ease-out min-w-0 max-w-full overflow-hidden ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'
                  }`}
                >
                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-2.5 leading-snug transition-colors duration-700 ease-out break-words drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {step.headline[lang]}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed transition-colors duration-700 ease-out break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                      isActive ? 'text-white/95' : 'text-slate-400'
                    }`}
                  >
                    {step.paragraph[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
