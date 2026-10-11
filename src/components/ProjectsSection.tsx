import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';

const EASING = [0.22, 1, 0.36, 1] as const;

// 8 floating square coordinates (x%, y%, size px) for top header area
const HEADER_FLOATING_SQUARES = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 },
];

// 4 Core Brand Dental Services with verified high-res clinic photos
export interface DentalServiceItem {
  id: string;
  modalServiceKey: string;
  title: { geo: string; eng: string };
  category: { geo: string; eng: string };
  year: { geo: string; eng: string };
  image: string;
  squares: Array<{ x: number; y: number; size: number }>;
}

const DENTAL_SERVICES: DentalServiceItem[] = [
  {
    id: 'orthodontics',
    modalServiceKey: 'ორთოდონტია (ბრეკეტები & კაპები)',
    title: {
      geo: 'ორთოდონტია',
      eng: 'Orthodontics',
    },
    category: {
      geo: 'გამჭვირვალე კაპები & ბრეკეტები',
      eng: 'Invisalign® Clear Aligners & Braces',
    },
    year: {
      geo: '3D iTero',
      eng: '3D iTero',
    },
    image: 'https://cdn.prod.website-files.com/6a29d43f03b10014aa9b0c8c/6a2bc935c0d326b029aea62a_57b6bf36e4a51a6851d8ee4c71d0590b1ff02ba0.webp',
    squares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 },
    ],
  },
  {
    id: 'cosmetics',
    modalServiceKey: 'ესთეტიკური სტომატოლოგია & ვინირები',
    title: {
      geo: 'სტომატოლოგია',
      eng: 'General & Cosmetic',
    },
    category: {
      geo: 'კერამიკული ვინირები & გათეთრება',
      eng: 'Porcelain Veneers & Aesthetics',
    },
    year: {
      geo: 'ღიმილის დიზაინი',
      eng: 'Smile Design',
    },
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    squares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 },
    ],
  },
  {
    id: 'implants',
    modalServiceKey: 'იმპლანტაცია & ორთოპედია',
    title: {
      geo: 'ორთოპედია',
      eng: 'Prosthodontics',
    },
    category: {
      geo: 'გვირგვინები, ხიდები & იმპლანტაცია',
      eng: 'Crowns, Bridges & 3D Restorations',
    },
    year: {
      geo: '3D დაგეგმარება',
      eng: '3D Guided',
    },
    image: 'https://cdn.prod.website-files.com/6a29d43f03b10014aa9b0c8c/6a2bcce2d7747684b8cfb7d4_dental-implant-model.webp',
    squares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 },
    ],
  },
  {
    id: 'restorative',
    modalServiceKey: 'თერაპიული & პრევენციული სტომატოლოგია',
    title: {
      geo: 'თერაპია & პრევენცია',
      eng: 'Restorative & Prevention',
    },
    category: {
      geo: 'კარიესის მკურნალობა & წმენდა',
      eng: 'Microscopic Therapy & Hygiene',
    },
    year: {
      geo: 'უმტკივნეულო',
      eng: 'Pain-Free',
    },
    image: 'https://cdn.prod.website-files.com/6a29d43f03b10014aa9b0c8c/6a2bf2716f8b833baf1fca92_d08f6eea5cc34010c3ec8f340466b149d1b79b35.webp',
    squares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 },
    ],
  },
];

const TICKER_PHRASES = [
  '100% Digital Workflow',
  'Maximized Patient Comfort',
  'Microscopic Precision',
  'Predictable Outcomes',
  'Biocompatible Materials',
  'Minimally Invasive Dentistry (MID)',
  'Advanced 3D Imaging',
  'Sterilization Protocols',
];

// Top Area Floating Square with Parallax and Gentle Infinite Bob
function FloatingSquare({
  index,
  x,
  y,
  size,
  scrollYProgress,
}: {
  index: number;
  x: number;
  y: number;
  size: number;
  scrollYProgress: any;
}) {
  const parallaxTransform = useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)]);
  const smoothY = useSpring(parallaxTransform, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        y: smoothY,
      }}
      className="pointer-events-none"
    >
      <motion.div
        className="bg-black"
        style={{ width: size, height: size }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3 + index * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      />
    </motion.div>
  );
}

// Single Magnetic Square on Card
function MagneticSquare({
  sq,
  mouseX,
  mouseY,
}: {
  sq: { x: number; y: number; size: number };
  mouseX: any;
  mouseY: any;
}) {
  const shiftX = useTransform(mouseX, (x: number) => (x - 0.5) * 40);
  const shiftY = useTransform(mouseY, (y: number) => (y - 0.5) * 40);
  const springX = useSpring(shiftX, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(shiftY, { stiffness: 80, damping: 18, mass: 0.6 });

  return (
    <motion.div
      className="absolute bg-black pointer-events-none z-10"
      style={{
        left: `${sq.x}%`,
        top: `${sq.y}%`,
        width: sq.size,
        height: sq.size,
        x: springX,
        y: springY,
      }}
    />
  );
}

// Case Study Card with Pixel-block dissolve and Magnetic Squares
function ServiceCard({
  service,
  index,
  lang,
  onCardClick,
}: {
  service: DentalServiceItem;
  index: number;
  lang: 'geo' | 'eng';
  onCardClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rows = 8;
  const cols = 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING }}
      className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-neutral-900 rounded-none shadow-sm hover:shadow-2xl transition-shadow duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
    >
      {/* 1. Background image (authentic dental treatment photo) */}
      <img
        src={service.image}
        alt={service.title[lang]}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle brand overlay gradient for contrast and polish */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-[2]" />

      {/* 2. Pixel-block hover overlay (12 cols x 8 rows of bg-black/80) */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const delayIn = (r + c) * 0.018;
            const delayOut = ((rows - 1 - r) + (cols - 1 - c)) * 0.012;

            return (
              <motion.div
                key={`pixel-${r}-${c}`}
                className="absolute bg-black/80"
                style={{
                  left: `${(c * 100) / cols}%`,
                  top: `${(r * 100) / rows}%`,
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isHovered
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.25,
                  delay: isHovered ? delayIn : delayOut,
                  ease: EASING,
                }}
              />
            );
          })
        )}
      </div>

      {/* 3. Magnetic squares (5-6 small black squares reacting to cursor) */}
      {service.squares.map((sq, sqIdx) => (
        <MagneticSquare
          key={`mag-sq-${sqIdx}`}
          sq={sq}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}

      {/* 4. Plus button (top right) */}
      <div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-white/40 text-xs text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-90 group-hover:border-white"
        style={{ zIndex: 10 }}
      >
        +
      </div>

      {/* 5. Info plate (bottom left) */}
      <div
        className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 transition-transform duration-300 shadow-md max-w-[80%] sm:max-w-[70%]"
        style={{ zIndex: 20 }}
      >
        <h3 className="text-xs sm:text-base lg:text-lg font-bold leading-tight text-black tracking-tight truncate">
          {service.title[lang]}
        </h3>
        <div className="mt-0.5 flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span className="text-[10px] sm:text-[11px] text-black/60 font-medium truncate max-w-[140px] sm:max-w-none">
            {service.category[lang]}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#437b60] tracking-wide uppercase shrink-0">
            {service.year[lang]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  lang?: 'geo' | 'eng';
  onBookClick?: (serviceKey?: string) => void;
}

export function ProjectsSection({ lang = 'geo', onBookClick }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-white text-black"
      style={{ fontFamily: "'DM Sans', 'Noto Sans Georgian', -apple-system, sans-serif" }}
    >
      {/* Injected marquee & slice button styles */}
      <style>{`
        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }

        /* From Uiverse.io by nikk7007 */ 
        .slice {
          --c1: #ffffff;
          --c2: #00a1b7;
          --size-letter: 16px;
          padding: 0.65em 1.6em;
          font-size: var(--size-letter);

          background-color: transparent;
          border: calc(var(--size-letter) / 6) solid var(--c2);
          border-radius: 0.3em;
          cursor: pointer;

          overflow: hidden;
          position: relative;
          transition: 300ms cubic-bezier(0.83, 0, 0.17, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .slice > .text {
          font-weight: 700;
          color: var(--c2);
          position: relative;
          z-index: 1;
          letter-spacing: 0.02em;
          transition: color 700ms cubic-bezier(0.83, 0, 0.17, 1);
        }

        .slice::after {
          content: "";
          width: 0;
          height: calc(300% + 1em);
          position: absolute;
          translate: -50% -50%;
          inset: 50%;
          rotate: 30deg;
          background-color: var(--c2);
          transition: 1000ms cubic-bezier(0.83, 0, 0.17, 1);
        }

        .slice:hover > .text {
          color: var(--c1);
        }

        .slice:hover::after {
          width: calc(120% + 1em);
        }

        .slice:active {
          scale: 0.98;
          filter: brightness(0.9);
        }
      `}</style>

      {/* =====================================================================
          Top Area (Header with floating squares)
         ===================================================================== */}
      <div className="relative px-6 pb-10 pt-28 sm:px-10 lg:px-16 lg:pt-36">
        {/* Parallax floating black squares layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {HEADER_FLOATING_SQUARES.map((sq, i) => (
            <FloatingSquare
              key={`float-sq-${i}`}
              index={i}
              x={sq.x}
              y={sq.y}
              size={sq.size}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Header text */}
        <div ref={headerRef} className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASING }}
          >
            {/* Badge */}
            <span className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
              {lang === 'geo' ? 'კლინიკური სერვისები' : 'Our Services'}
            </span>

            {/* Heading */}
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
              {lang === 'geo' ? (
                <>
                  ვზრუნავთ <span className="text-blue-600 font-semibold">თქვენს ჯანსაღ ღიმილზე</span>
                </>
              ) : (
                <>
                  Caring for <span className="text-blue-600 font-semibold">Your Radiant Smile</span>
                </>
              )}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* =====================================================================
          Dental Services Cards (2x2 grid with authentic dental imagery)
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-2">
          {DENTAL_SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              lang={lang}
              onCardClick={() => onBookClick?.(service.modalServiceKey)}
            />
          ))}
        </div>
      </div>

      {/* =====================================================================
          Footer Area (Clinic copy + CTA button, Marquee ticker)
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
          {/* Left side */}
          <div className="max-w-md">
            <p className="text-[14px] leading-[1.7] text-black/60">
              {lang === 'geo'
                ? 'ჩვენ ვზრუნავთ თითოეული პაციენტის კომფორტზე, უმტკივნეულო გამოცდილებასა და იდეალურ შედეგზე — თანამედროვე ტექნოლოგიებისა და მრავალწლიანი ექსპერტიზის სინთეზით.'
                : 'We prioritize each patient\'s comfort, pain-free experience, and flawless results — through the synthesis of modern technology and years of expertise.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onBookClick?.()}
                className="slice"
              >
                <span className="text">
                  {lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Book Your Visit'}
                </span>
              </button>
            </div>
          </div>

          {/* Right side: Continuous horizontal ticker */}
          <div className="flex-1 overflow-hidden md:ml-12 border-t border-black/10 md:border-t-0">
            <div className="overflow-hidden py-5">
              <div className="marquee-projects flex w-max items-center">
                {[...TICKER_PHRASES, ...TICKER_PHRASES].map((phrase, idx) => (
                  <div
                    key={`ticker-${idx}`}
                    className="flex shrink-0 items-center gap-3.5 px-4 text-xs sm:text-sm font-medium tracking-wide text-black/75"
                  >
                    <span>{phrase}</span>
                    <span className="text-blue-600 font-bold">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-12" />
    </section>
  );
}
