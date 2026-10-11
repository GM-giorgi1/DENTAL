import React, { useEffect, useState, useRef, useMemo } from 'react';
import LOGO1 from '../Images/LOGO1.jpeg';
import HERO1 from '../Images/HERO1.jpg';
import HERO2 from '../Images/hero2.jpg';
import HERO3 from '../Images/hero3.jpg';
import HERO4 from '../Images/hero4.jpg';
import HERO5 from '../Images/HERO5.jpg';
import HERO6 from '../Images/hero6.jpg';
import HERO7 from '../Images/HERO7.jpeg';
import HERO8 from '../Images/HERO8.jpg';
import aboutFeaturesHtml from './about_features.html?raw';
import { FounderSection } from './components/FounderSection';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { ProjectsSection } from './components/ProjectsSection';
import { PhilosophyTimeline } from './components/PhilosophyTimeline';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

declare global {
  interface Window {
    gsap?: any;
    Webflow?: any;
  }
}

export default function App() {
  const [lang, setLang] = useState<'geo' | 'eng'>('geo');
  const [modalOpen, setModalOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal form states
  const [modalService, setModalService] = useState('კონსულტაცია & დიაგნოსტიკა');
  const [modalDate, setModalDate] = useState('2026-10-15');
  const [modalTime, setModalTime] = useState('11:00 AM');
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalStep, setModalStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const restContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setAboutDropdownOpen(false);
      setServicesDropdownOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Initialize scripts for the rest of page (accordions, slider arrows, tilt effects)
  useEffect(() => {
    const container = restContainerRef.current;
    if (!container) return;

    // Set current year
    const yrSpan = container.querySelector('.year-span');
    if (yrSpan) {
      yrSpan.textContent = new Date().getFullYear().toString();
    }

    // FAQ Accordions
    const accordions = container.querySelectorAll('.faq4_accordion');
    accordions.forEach((acc, i) => {
      const q = acc.querySelector('.faq4_question') as HTMLElement | null;
      const a = acc.querySelector('.faq4_answer') as HTMLElement | null;
      const chevron = acc.querySelector('.faq4_icon-wrappper') as HTMLElement | null;
      if (!q || !a) return;

      if (i === 0) {
        a.style.display = 'block';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        a.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }

      q.addEventListener('click', (e) => {
        e.preventDefault();
        const isClosed = a.style.display === 'none';
        accordions.forEach((other) => {
          const otherA = other.querySelector('.faq4_answer') as HTMLElement | null;
          const otherChev = other.querySelector('.faq4_icon-wrappper') as HTMLElement | null;
          if (otherA) otherA.style.display = 'none';
          if (otherChev) otherChev.style.transform = 'rotate(0deg)';
        });
        if (isClosed) {
          a.style.display = 'block';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
      });
    });

    // Testimonials Slider Arrows
    const sliderMask = container.querySelector('.testimonial8_mask') as HTMLElement | null;
    const arrowLeft = container.querySelector('.w-slider-arrow-left') as HTMLElement | null;
    const arrowRight = container.querySelector('.w-slider-arrow-right') as HTMLElement | null;
    if (sliderMask && arrowLeft && arrowRight) {
      arrowLeft.addEventListener('click', (e) => {
        e.preventDefault();
        sliderMask.scrollBy({ left: -380, behavior: 'smooth' });
      });
      arrowRight.addEventListener('click', (e) => {
        e.preventDefault();
        sliderMask.scrollBy({ left: 380, behavior: 'smooth' });
      });
    }

    // 3D Card Hover / Tilt Effects with GSAP
    if (window.gsap) {
      const MAX_TILT = 14;
      container.querySelectorAll('.feature-wrapper-2').forEach((wrapper: any, index: number) => {
        const number = wrapper.querySelector('.text-number');
        const bgDiv = wrapper.querySelector('.bg-color-div');
        const image = wrapper.querySelector('.feature-image');
        const imageWrap = wrapper.querySelector('.feature-image-wrapper-2');
        if (!number || !bgDiv || !image || !imageWrap) return;

        const hoverColor = index === 0 ? '#B1D7FE' : '#B7E6BE';
        const hoverTl = window.gsap.timeline({
          paused: true,
          defaults: { duration: 0.8, ease: 'power2.inOut' },
        });
        hoverTl
          .to(number, { color: hoverColor }, 0)
          .to(bgDiv, { rotate: 0, scaleY: 1.06 }, 0)
          .to(image, { scale: 1.05 }, 0);

        imageWrap.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = image.getBoundingClientRect();
          const xNorm = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const yNorm = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          window.gsap.to(imageWrap, {
            rotateY: xNorm * MAX_TILT,
            rotateX: -yNorm * MAX_TILT,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        wrapper.addEventListener('mouseenter', () => hoverTl.play());
        wrapper.addEventListener('mouseleave', () => {
          hoverTl.reverse();
          window.gsap.to(imageWrap, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
        });
      });
    }

    // Intercept booking buttons in rest of page
    const allLinks = container.querySelectorAll('a, button');
    allLinks.forEach((el) => {
      const text = el.textContent?.trim().toLowerCase() || '';
      const href = el.getAttribute('href') || '';
      if (
        text.includes('book appointment') ||
        text.includes('schedule') ||
        text.includes('დაჯავშნა') ||
        href.includes('booking') ||
        href.includes('contact-us') ||
        href.includes('dental4.me')
      ) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          setSubmitted(false);
          setModalStep(1);
          setModalOpen(true);
        });
      }
    });
  }, [aboutFeaturesHtml]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalPhone.trim()) return;
    setSubmitted(true);
  };

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
  ];

  return (
    <div className="premier-arts-root relative w-full overflow-x-hidden">
      {/* =========================================================================
          1. NAVBAR (Transparent Logo with mix-blend-mode: multiply & no underlines)
         ========================================================================= */}
      <div data-wf--navbar--variant="base" className="navbar1_component">
        <div className="navbar1_container">
          {/* Top-left Clinic Logo: transparent background, seamlessly blending into navbar */}
          <a
            href="/"
            aria-label="Clinic Logo"
            aria-current="page"
            className="navbar1_logo-link w-inline-block w--current no-underline"
            style={{ textDecoration: 'none', background: 'transparent' }}
          >
            <img
              src={LOGO1}
              alt="Clinic Logo"
              className="navbar1_logo"
              style={{
                mixBlendMode: 'multiply',
                backgroundColor: 'transparent',
              }}
            />
          </a>

          {/* Desktop Navigation Links (Underlines removed, Patient Info removed) */}
          <nav className={`navbar1_menu ${mobileMenuOpen ? 'is-open' : ''}`}>
            <ul role="list" className="navbar1_menu-links">
              {/* Home */}
              <li className="navbar1_menu-link-item">
                <a
                  href="/"
                  aria-current="page"
                  className="navbar6_link w--current no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  {lang === 'geo' ? 'მთავარი' : 'Home'}
                </a>
              </li>

              {/* About Us (Dropdown) */}
              <li className="navbar1_menu-link-item">
                <div
                  className="navbar11_menu-dropdown w-dropdown"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <div
                    className="navbar11_dropdown-toggle w-dropdown-toggle cursor-pointer no-underline"
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAboutDropdownOpen(!aboutDropdownOpen);
                      setServicesDropdownOpen(false);
                    }}
                  >
                    <div className="navbar6_link no-underline" style={{ textDecoration: 'none' }}>
                      {lang === 'geo' ? 'ჩვენს შესახებ' : 'About Us'}
                    </div>
                    <div
                      className="dropdown-chevron w-embed transition-transform duration-200"
                      style={{ transform: aboutDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <nav
                    className={`navbar11_dropdown-list w-dropdown-list ${
                      aboutDropdownOpen ? 'w--open' : ''
                    }`}
                  >
                    <div className="navbar11_dropdown-link-list">
                      <a
                        href="#about"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="navbar11_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        <strong>{lang === 'geo' ? 'ჩვენს შესახებ' : 'About Us'}</strong>
                      </a>
                      <a
                        href="#about"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="navbar11_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {lang === 'geo' ? 'ექიმი ეკა ბუხრაშვილი' : 'Dr. Eka Bukhrashvili'}
                      </a>
                    </div>
                  </nav>
                </div>
              </li>

              {/* Services (Dropdown) */}
              <li className="navbar1_menu-link-item">
                <div
                  className="navbar1_menu-dropdown w-dropdown"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <div
                    className="navbar1_dropdown-toggle w-dropdown-toggle cursor-pointer no-underline"
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setServicesDropdownOpen(!servicesDropdownOpen);
                      setAboutDropdownOpen(false);
                    }}
                  >
                    <div className="navbar6_link no-underline" style={{ textDecoration: 'none' }}>
                      {lang === 'geo' ? 'სერვისები' : 'Services'}
                    </div>
                    <div
                      className="dropdown-chevron w-embed transition-transform duration-200"
                      style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <nav
                    className={`navbar1_dropdown-list is-service w-dropdown-list ${
                      servicesDropdownOpen ? 'w--open' : ''
                    }`}
                  >
                    <a
                      href="#services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="navbar1_dropdown-link w-dropdown-link no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      <strong>{lang === 'geo' ? 'სერვისები' : 'Services'}</strong>
                    </a>
                    <div className="navbar1_dropdown-link-list flex flex-col gap-2 mt-2">
                      <a
                        href="#services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="navbar1_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {lang === 'geo' ? 'ესთეტიკური სტომატოლოგია' : 'Cosmetic Dentistry'}
                      </a>
                      <a
                        href="#services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="navbar1_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {lang === 'geo' ? 'თერაპია და წმენდა' : 'General & Preventive'}
                      </a>
                      <a
                        href="#services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="navbar1_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {lang === 'geo' ? 'ორთოდონტია (ბრეკეტები/კაპები)' : 'Orthodontics'}
                      </a>
                      <a
                        href="#services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="navbar1_dropdown-link no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {lang === 'geo' ? 'იმპლანტები და ორთოპედია' : 'Implants & Restorations'}
                      </a>
                    </div>
                  </nav>
                </div>
              </li>

              {/* Contact */}
              <li className="navbar1_menu-link-item">
                <a
                  href="#contact"
                  className="navbar6_link no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  {lang === 'geo' ? 'კონტაქტი' : 'Contact'}
                </a>
              </li>

              {/* Mobile button */}
              <li className="navbar1_menu-link-item desktop-hidden">
                <div className="navbar1_menu-buttons">
                  <div>
                    <a
                      href="#booking"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setSubmitted(false);
                        setModalStep(1);
                        setModalOpen(true);
                      }}
                      className="button is-icon is-small w-inline-block no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      <div>{lang === 'geo' ? 'დაჯავშნა' : 'Book Appointment'}</div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Right Action: Sleek Language Switcher + Primary Button + Hamburger */}
          <div className="navbar1_right-actions flex items-center gap-3">
            {/* Clean, sleek modern UI/UX Language Toggle */}
            <div className="lang-switch-wrap" role="group" aria-label="Language selector">
              <button
                type="button"
                onClick={() => setLang('geo')}
                className={`lang-btn ${lang === 'geo' ? 'active' : ''}`}
                aria-pressed={lang === 'geo'}
                title="ქართული ენა"
              >
                GEO
              </button>
              <button
                type="button"
                onClick={() => setLang('eng')}
                className={`lang-btn ${lang === 'eng' ? 'active' : ''}`}
                aria-pressed={lang === 'eng'}
                title="English Language"
              >
                ENG
              </button>
            </div>

            {/* Primary Green CTA Button */}
            <div className="navbar1_btn-wrap hide-tablet">
              <div className="navbar1_btn">
                <div>
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmitted(false);
                      setModalStep(1);
                      setModalOpen(true);
                    }}
                    className="button is-icon is-nav w-inline-block cursor-pointer no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <div>{lang === 'geo' ? 'დაჯავშნა' : 'Book Appointment'}</div>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar1_menu-button"
              aria-label="Toggle Navigation"
            >
              <div className="menu-icon1">
                <div className="menu-icon1_line-top" />
                <div className="menu-icon1_line-middle">
                  <div className="menu-icon1_line-middle-inner" />
                </div>
                <div className="menu-icon1_line-bottom" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. HERO SECTION
         ========================================================================= */}
      <main className="main-wrapper">
        <header className="section_header76">
          <div className="w-layout-grid header76_component">
            {/* Left Content Column: strictly constrained to prevent any card overflow */}
            <div
              id="w-node-f3e17d8a-0895-e3b9-5cc0-03d7d5dabac3-d5dabac1"
              className="header76_content-left z-index-2 w-full max-w-[34rem]"
            >
              {/* Main Headline */}
              <div className="margin-bottom margin-small">
                <h1 className="heading-style-h1 text-white leading-tight">
                  {lang === 'geo' ? (
                    'თქვენი ღიმილი ჩვენი მიზანია.'
                  ) : (
                    <>
                      Advanced dentistry <em>meets</em> genuine warmth.
                    </>
                  )}
                </h1>
              </div>

              {/* Subheadline Text */}
              <div className="text-rich-text text-color-white-85 w-richtext">
                <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                  {lang === 'geo'
                    ? 'თანამედროვე სტომატოლოგიური და ესთეტიკური კლინიკა ექიმი ეკა ბუხრაშვილის ხელმძღვანელობით.'
                    : 'Where advanced dentistry meets genuine warmth. Led by Dr. Eka Bukhrashvili— accepting new patients, 12+ insurances accepted, evening hours Monday and Thursday until 7:00PM.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="margin-top margin-medium">
                <div className="button-group flex flex-wrap items-center gap-3">
                  {/* Primary Green Button ("დაჯავშნა" / "Book Appointment") */}
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      setSubmitted(false);
                      setModalStep(1);
                      setModalOpen(true);
                    }}
                    className="button is-icon w-inline-block cursor-pointer shadow-lg hover:shadow-xl transition-all no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="icon-embed-xxsmall w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                        role="img"
                      >
                        <path
                          d="M5.33333 4.66667V2M10.6667 4.66667V2M4.66667 7.33333H11.3333M3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V4.66667C14 4.31304 13.8595 3.97391 13.6095 3.72386C13.3594 3.47381 13.0203 3.33333 12.6667 3.33333H3.33333C2.97971 3.33333 2.64057 3.47381 2.39052 3.72386C2.14048 3.97391 2 4.31304 2 4.66667V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14Z"
                          stroke="currentColor"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>{lang === 'geo' ? 'დაჯავშნა' : 'Book Appointment'}</div>
                  </a>

                  {/* Phone Call Trigger ("დარეკვა — 557 77 04 06" with href="tel:557770406") */}
                  <a
                    href="tel:557770406"
                    className="button is-secondary is-alternate w-button font-bold no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    {lang === 'geo' ? 'დარეკვა — 557 77 04 06' : 'Call — 557 77 04 06'}
                  </a>
                </div>
              </div>

              {/* Trust Indicators Grid: Strictly constrained to prevent stretching outside left margin */}
              <div className="margin-top margin-medium w-full max-w-full">
                <div className="header76_grid w-full max-w-full">
                  {/* Card 1: პროფესიონალიზმი */}
                  <div className="header76_card heeader76_card flex flex-col justify-between w-full h-full p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <div className="min-w-0">
                      <div className="icon-embed-medium w-embed text-white/90 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="34"
                          viewBox="0 0 36 38"
                          fill="none"
                          preserveAspectRatio="xMidYMid meet"
                          aria-hidden="true"
                          role="img"
                        >
                          <rect y="2" width="36" height="36" rx="12" fill="currentColor" fillOpacity="0.15" />
                          <path
                            d="M18 25.528C19.0989 24.5422 20.5237 23.998 22 24C22.6812 23.9993 23.3576 24.1147 24 24.3413V14.8413C23.3747 14.62 22.7013 14.5 22 14.5C20.5237 14.4979 19.0989 15.0422 18 16.028C16.9011 15.0422 15.4763 14.498 14 14.5C13.2987 14.5 12.6253 14.62 12 14.8413V24.3413C12.6424 24.1147 13.3188 23.9993 14 24C15.5367 24 16.9387 24.578 18 25.528ZM18 16.028V25.528"
                            stroke="currentColor"
                            strokeWidth="1.16667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="header76_text-wrapper min-w-0">
                        <h4 className="text-base sm:text-lg font-bold font-style-heading text-white tracking-tight mb-1 whitespace-nowrap header76_card-title">
                          {lang === 'geo' ? 'პროფესიონალიზმი' : 'Professionalism'}
                        </h4>
                        <div className="hero-overlay-card-text text-xs sm:text-sm leading-[1.4] text-white/85">
                          {lang === 'geo'
                            ? 'ინდივიდუალური მიდგომა და მკურნალობის გამჭვირვალე გეგმა.'
                            : 'Individual approach and transparent treatment plan.'}
                        </div>
                      </div>
                    </div>
                    <div className="button-group mt-3 pt-2 border-t border-white/10">
                      <a
                        href="#principles"
                        className="button is-link is-icon is-alternate w-inline-block no-underline text-xs"
                        style={{ textDecoration: 'none' }}
                      >
                        <div>{lang === 'geo' ? 'გაიგეთ მეტი' : 'Read More'}</div>
                        <div className="icon-embed-xxsmall w-embed ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                          >
                            <path
                              d="M6.75 9.75L10.5 6L6.75 2.25M10.5 6H1.5"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Card 2: პაციენტების შეფასებები */}
                  <div className="header76_card heeader76_card flex flex-col justify-between w-full h-full p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <div className="min-w-0">
                      <div className="icon-embed-medium w-embed text-white/90 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="34"
                          viewBox="0 0 36 38"
                          fill="none"
                          preserveAspectRatio="xMidYMid meet"
                          aria-hidden="true"
                          role="img"
                        >
                          <rect y="2" width="36" height="36" rx="12" fill="currentColor" fillOpacity="0.15" />
                          <path
                            d="M17.3661 13.9512C17.5661 13.3372 18.4347 13.3372 18.6341 13.9512L19.6467 17.0672C19.6903 17.2009 19.775 17.3173 19.8888 17.4C20.0025 17.4826 20.1395 17.5271 20.2801 17.5272H23.5567C24.2027 17.5272 24.4707 18.3539 23.9487 18.7339L21.2981 20.6592C21.1842 20.742 21.0995 20.8587 21.056 20.9926C21.0125 21.1265 21.0125 21.2707 21.0561 21.4046L22.0681 24.5206C22.2681 25.1352 21.5647 25.6459 21.0427 25.2659L18.3921 23.3406C18.2781 23.2577 18.1409 23.2131 18.0001 23.2131C17.8592 23.2131 17.722 23.2577 17.6081 23.3406L14.9574 25.2659C14.4354 25.6459 13.7321 25.1346 13.9321 24.5206L14.9441 21.4046C14.9876 21.2707 14.9876 21.1265 14.9441 20.9926C14.9007 20.8587 14.8159 20.742 14.7021 20.6592L12.0514 18.7339C11.5287 18.3539 11.7981 17.5272 12.4434 17.5272H15.7194C15.8601 17.5273 15.9972 17.4828 16.1111 17.4002C16.225 17.3175 16.3098 17.201 16.3534 17.0672L17.3661 13.9512Z"
                            stroke="currentColor"
                            strokeWidth="1.16667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="header76_text-wrapper min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-base sm:text-lg font-bold font-style-heading text-white tracking-tight whitespace-nowrap header76_card-title">
                            {lang === 'geo' ? 'შეფასებები' : 'Reviews'}
                          </h4>
                          <div className="header76_ratings-wrapper flex items-center gap-1 shrink-0">
                            <div className="header76_ratings-wrap flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="icon-embed-xxsmall w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M5.42958 1.75625C5.60958 1.20365 6.39138 1.20365 6.57078 1.75625L7.21278 3.73145C7.252 3.85174 7.32825 3.95655 7.43062 4.03091C7.533 4.10526 7.65625 4.14535 7.78278 4.14545H9.85998C10.4414 4.14545 10.6826 4.88945 10.2128 5.23145L8.53278 6.45185C8.4302 6.52626 8.35381 6.63125 8.31458 6.75176C8.27535 6.87226 8.27528 7.0021 8.31438 7.12265L8.95638 9.09785C9.13638 9.65045 8.50338 10.1106 8.03238 9.76865L6.35238 8.54825C6.2499 8.47385 6.12652 8.43378 5.99988 8.43378C5.87324 8.43378 5.74986 8.47385 5.64738 8.54825L3.96738 9.76865C3.49698 10.1106 2.86458 9.65045 3.04398 9.09785L3.68598 7.12265C3.72508 7.0021 3.72501 6.87226 3.68578 6.75176C3.64655 6.63125 3.57016 6.52626 3.46758 6.45185L1.78818 5.23205C1.31838 4.89005 1.56018 4.14605 2.14098 4.14605H4.21758C4.34421 4.14608 4.4676 4.10605 4.57009 4.03169C4.67259 3.95732 4.74893 3.85244 4.78818 3.73205L5.43018 1.75685L5.42958 1.75625Z"
                                      fill="#FFD230"
                                    />
                                  </svg>
                                </div>
                              ))}
                            </div>
                            <span className="font-bold text-white text-xs">5.0</span>
                          </div>
                        </div>
                        <div className="hero-overlay-card-text text-xs sm:text-sm leading-[1.4] text-white/85">
                          {lang === 'geo' ? 'პაციენტთა 100% ნდობა და რეკომენდაცია.' : '100% patient satisfaction and trust.'}
                        </div>
                      </div>
                    </div>
                    <div className="button-group mt-3 pt-2 border-t border-white/10">
                      <a
                        href="#reviews"
                        className="button is-link is-icon is-alternate w-inline-block no-underline text-xs"
                        style={{ textDecoration: 'none' }}
                      >
                        <div>{lang === 'geo' ? 'შეფასებები' : 'Reviews'}</div>
                        <div className="icon-embed-xxsmall w-embed ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                          >
                            <path
                              d="M6.75 9.75L10.5 6L6.75 2.25M10.5 6H1.5"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Moving Photos Marquee (Linear Infinite, Never Stopping) */}
            <div className="header76_content-right z-index-2 hide-mobile-landscape">
              <div className="header76_images-layout">
                {/* Left Column (HERO1, HERO2, HERO3, HERO7) */}
                <div className="header76_image-list-left">
                  <div className="header76_image-list">
                    {[HERO1, HERO2, HERO3, HERO7, HERO1, HERO2, HERO3, HERO7].map((imgSrc, idx) => (
                      <div key={`left-img-${idx}`} className="header76_image-wrapper">
                        <img
                          src={imgSrc}
                          alt={`Clinic treatment showcase ${idx + 1}`}
                          className="header76_image"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (HERO4, HERO5, HERO6, HERO8) */}
                <div className="header76_image-list-right">
                  <div className="header76_image-list">
                    {[HERO4, HERO5, HERO6, HERO8, HERO4, HERO5, HERO6, HERO8].map((imgSrc, idx) => (
                      <div key={`right-img-${idx}`} className="header76_image-wrapper">
                        <img
                          src={imgSrc}
                          alt={`Clinic suite showcase ${idx + 1}`}
                          className="header76_image"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Video Loop (Authentic Asset) */}
          <div className="header76_background-video w-embed">
            <video
              className="brand-video"
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.prod.website-files.com/6a29d43f03b10014aa9b0c8c%2F6a2b283b2dc4436259a050b1_AdobeStock_369817497_mp4.mp4"
            />
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: CLINIC PRINCIPLES & PHILOSOPHY (Professionalism, Experience, Technology)
            Dark Aurora / Fluid Shadow, high-end scroll reveal
           ========================================================================= */}
        <PhilosophyTimeline lang={lang} />

        {/* =========================================================================
            SECTION 3: FOUNDER / ABOUT SECTION (Dr. Eka Bukhrashvili)
            bg-gradient-to-b from-white to-slate-50, py-24 md:py-32, layered portrait
           ========================================================================= */}
        <FounderSection
          lang={lang}
          onBookClick={() => {
            setSubmitted(false);
            setModalStep(1);
            setModalOpen(true);
          }}
        />

        {/* =========================================================================
            4. SECTIONS BREAKDOWN:
               - Interactive Reviews Horizontal Carousel
               - Clinical Services Section
               - About Clinic Features (3D Tilt Cards)
               - Modern Booking & Schedule Section
           ========================================================================= */}
        <div ref={restContainerRef}>
          {/* Reviews Carousel (Interactive horizontal slider) */}
          <ReviewsCarousel lang={lang} />

          {/* Projects / Case Studies (Services) Section */}
          <ProjectsSection
            lang={lang}
            onBookClick={(serviceKey) => {
              if (serviceKey) setModalService(serviceKey);
              setSubmitted(false);
              setModalStep(1);
              setModalOpen(true);
            }}
          />

          {/* About Clinic Features (3D Tilt Cards) */}
          <div dangerouslySetInnerHTML={{ __html: aboutFeaturesHtml }} />

          {/* Overhauled Modern Booking System Section with Condensed Working Hours & Insurance */}
          <BookingSection lang={lang} />
        </div>

        {/* New Premium Footer */}
        <Footer
          lang={lang}
          onBookClick={() => {
            setSubmitted(false);
            setModalStep(1);
            setModalOpen(true);
          }}
        />
      </main>

      {/* =========================================================================
          INTERACTIVE ONLINE APPOINTMENT SCHEDULER MODAL
         ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {lang === 'geo' ? 'ვიზიტი წარმატებით დაჯავშნილია!' : 'Appointment Request Received!'}
                </h3>
                <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">
                  {lang === 'geo'
                    ? `გმადლობთ, ${modalName}! კლინიკის ადმინისტრაცია უმოკლეს დროში დაგიკავშირდებათ ნომერზე: ${modalPhone} ვიზიტის დროის დასადასტურებლად.`
                    : `Thank you, ${modalName}! Our clinic administration will contact you shortly at ${modalPhone} to confirm your appointment.`}
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl text-left w-full text-xs space-y-1.5 mb-6 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    {lang === 'geo' ? 'ჯავშნის დეტალები:' : 'Booking Summary:'}
                  </div>
                  <div><strong>{lang === 'geo' ? 'სპეციალისტი:' : 'Dentist:'}</strong> ექიმი ეკა ბუხრაშვილი</div>
                  <div><strong>{lang === 'geo' ? 'სერვისი:' : 'Service:'}</strong> {modalService}</div>
                  <div><strong>{lang === 'geo' ? 'თარიღი & დრო:' : 'Preferred Slot:'}</strong> {modalDate} · {modalTime}</div>
                  <div><strong>{lang === 'geo' ? 'ტელეფონი:' : 'Contact Phone:'}</strong> 557 77 04 06</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href="tel:557770406"
                    className="flex-1 py-3.5 px-4 bg-[#437b60] hover:bg-[#34624c] text-white rounded-full font-bold text-xs text-center transition-colors shadow-md no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    {lang === 'geo' ? 'დარეკვა — 557 77 04 06' : 'Call — 557 77 04 06'}
                  </a>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="py-3.5 px-6 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-slate-800 transition-colors"
                  >
                    {lang === 'geo' ? 'დახურვა' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#437b60] text-[10px] font-bold uppercase tracking-wider mb-1">
                    {lang === 'geo' ? 'ონლაინ დაჯავშნა' : 'Online Appointment'}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {lang === 'geo' ? 'ვიზიტის დაჯავშნა კლინიკაში' : 'Schedule Your Dental Visit'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'geo' ? 'ექიმი ეკა ბუხრაშვილი · ტელ: 557 77 04 06' : 'Dr. Eka Bukhrashvili · Phone: 557 77 04 06'}
                  </p>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-2 mb-6 text-xs font-semibold">
                  <div className={`px-3 py-1 rounded-full ${modalStep >= 1 ? 'bg-[#437b60] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    1. {lang === 'geo' ? 'სერვისი' : 'Service'}
                  </div>
                  <div className={`px-3 py-1 rounded-full ${modalStep >= 2 ? 'bg-[#437b60] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    2. {lang === 'geo' ? 'თარიღი/დრო' : 'Date & Time'}
                  </div>
                  <div className={`px-3 py-1 rounded-full ${modalStep >= 3 ? 'bg-[#437b60] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    3. {lang === 'geo' ? 'კონტაქტი' : 'Contact'}
                  </div>
                </div>

                {/* Step 1: Select Service */}
                {modalStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-700">
                      {lang === 'geo' ? 'აირჩიეთ სასურველი სერვისი:' : 'Select Treatment Category:'}
                    </label>
                    <div className="space-y-2">
                      {[
                        { title: lang === 'geo' ? 'კონსულტაცია & პირველადი შემოწმება' : 'Comprehensive Exam & Cleaning' },
                        { title: lang === 'geo' ? 'ესთეტიკური სტომატოლოგია & ვინირები' : 'Cosmetic Dentistry & Veneers' },
                        { title: lang === 'geo' ? 'ორთოდონტია (ბრეკეტები & კაპები)' : 'Invisalign & Orthodontics' },
                        { title: lang === 'geo' ? 'კბილების პროფესიული წმენდა' : 'Professional Dental Cleaning' },
                        { title: lang === 'geo' ? 'თერაპიული მკურნალობა & დაბჟენა' : 'Restorative & Composite Fillings' },
                        { title: lang === 'geo' ? 'გადაუდებელი სტომატოლოგიური დახმარება' : 'Emergency Dental Care' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setModalService(item.title)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                            modalService === item.title
                              ? 'border-[#437b60] bg-emerald-50/50 text-slate-900 font-bold shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div className="font-bold">{item.title}</div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              modalService === item.title ? 'border-[#437b60] bg-[#437b60] text-white' : 'border-slate-300'
                            }`}
                          >
                            {modalService === item.title ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalStep(2)}
                      className="w-full mt-4 py-3.5 bg-[#437b60] hover:bg-[#34624c] text-white rounded-full font-bold text-sm transition-colors shadow-md"
                    >
                      {lang === 'geo' ? 'შემდეგი: თარიღისა და დროის შერჩევა →' : 'Next: Choose Date & Time →'}
                    </button>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {modalStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'geo' ? 'სასურველი თარიღი:' : 'Preferred Date:'}
                      </label>
                      <input
                        type="date"
                        value={modalDate}
                        onChange={(e) => setModalDate(e.target.value)}
                        min="2026-10-10"
                        className="w-full p-3 rounded-2xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-[#437b60]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        {lang === 'geo' ? 'სასურველი დრო:' : 'Preferred Time Slot:'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((ts) => (
                          <button
                            key={ts}
                            type="button"
                            onClick={() => setModalTime(ts)}
                            className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                              modalTime === ts
                                ? 'bg-[#437b60] text-white border-[#437b60] shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-400 text-slate-800'
                            }`}
                          >
                            {ts}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setModalStep(1)}
                        className="flex-1 py-3.5 bg-slate-100 text-slate-800 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
                      >
                        {lang === 'geo' ? 'უკან' : 'Back'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalStep(3)}
                        className="flex-[2] py-3.5 bg-[#437b60] hover:bg-[#34624c] text-white rounded-full font-bold text-sm transition-colors shadow-md"
                      >
                        {lang === 'geo' ? 'შემდეგი: საკონტაქტო ინფო →' : 'Next: Contact Details →'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Details */}
                {modalStep === 3 && (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'geo' ? 'თქვენი სახელი და გვარი:' : 'Your Full Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'geo' ? 'მაგ: ნინო ბერიძე' : 'e.g. John Doe'}
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:border-[#437b60] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'geo' ? 'ტელეფონის ნომერი:' : 'Phone Number:'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        placeholder="557 77 04 06"
                        className="w-full p-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:border-[#437b60] font-medium tabular-nums"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 text-slate-700 border border-slate-200">
                      <div className="font-bold text-slate-900">{lang === 'geo' ? 'ჯავშნის რეზიუმე:' : 'Summary:'}</div>
                      <div>• {modalService}</div>
                      <div>• {modalDate} · {modalTime}</div>
                      <div>• ექიმი ეკა ბუხრაშვილი (557 77 04 06)</div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setModalStep(2)}
                        className="flex-1 py-3.5 bg-slate-100 text-slate-800 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
                      >
                        {lang === 'geo' ? 'უკან' : 'Back'}
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] py-3.5 bg-[#437b60] hover:bg-[#34624c] text-white rounded-full font-bold text-sm transition-colors shadow-lg"
                      >
                        {lang === 'geo' ? 'დაჯავშნა' : 'Confirm Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
