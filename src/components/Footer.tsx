import React from 'react';
import LOGO1 from '../../Images/LOGO1.jpeg';

interface FooterProps {
  lang?: 'geo' | 'eng';
  onBookClick?: () => void;
}

export function Footer({ lang = 'geo', onBookClick }: FooterProps) {
  return (
    <footer id="contact" className="footer-elite bg-[#050b14] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">
          {/* Col 1: Clinic Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src={LOGO1}
                alt="EB Dental Clinic"
                className="h-11 w-auto object-contain rounded-xl bg-white p-1.5 shadow-sm"
              />
              <div>
                <span className="font-bold text-base tracking-tight text-white block">
                  EB Dental Clinic
                </span>
                <span className="text-xs text-cyan-400 font-medium block mt-0.5">
                  {lang === 'geo' ? 'ექიმი ეკა ბუხრაშვილი' : 'Dr. Eka Bukhrashvili'}
                </span>
              </div>
            </div>

            {/* Replaced description text as strictly requested */}
            <p className="text-sm text-white/90 font-normal leading-relaxed max-w-sm">
              {lang === 'geo'
                ? 'თანამედროვე სტომატოლოგიური და ესთეტიკური კლინიკა'
                : 'Modern Dental and Aesthetic Clinic'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#437b60] hover:bg-[#34624c] text-white font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Book Consultation'}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400 mb-4">
              {lang === 'geo' ? 'ნავიგაცია' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal">
              <li>
                <a
                  href="#services"
                  className="!text-white hover:!text-cyan-300 transition-colors inline-block"
                >
                  {lang === 'geo' ? 'სერვისები' : 'Our Services'}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="!text-white hover:!text-cyan-300 transition-colors inline-block"
                >
                  {lang === 'geo' ? 'ექიმის შესახებ' : 'About Doctor'}
                </a>
              </li>
              <li>
                <a
                  href="#principles"
                  className="!text-white hover:!text-cyan-300 transition-colors inline-block"
                >
                  {lang === 'geo' ? 'რა გამოგვარჩევს' : 'Why Choose Us'}
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="!text-white hover:!text-cyan-300 transition-colors inline-block"
                >
                  {lang === 'geo' ? 'შეფასებები' : 'Patient Reviews'}
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="!text-white hover:!text-cyan-300 transition-colors inline-block"
                >
                  {lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Book Appointment'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400 mb-4">
              {lang === 'geo' ? 'კონტაქტი & მისამართი' : 'Contact & Address'}
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <span className="block text-white/60 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  {lang === 'geo' ? 'ტელეფონი' : 'Phone'}
                </span>
                <a
                  href="tel:557770406"
                  className="!text-white text-base sm:text-lg font-bold hover:!text-cyan-300 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>557 77 04 06</span>
                </a>
              </div>

              <div>
                <span className="block text-white/60 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  {lang === 'geo' ? 'მისამართი' : 'Location'}
                </span>
                <p className="!text-white text-xs sm:text-sm leading-relaxed">
                  ო. ჭილაძის #166 / 10, საბურთალო, თბილისი (ბუდაპეშტის #9-ის პირდაპირ)
                </p>
                <a
                  href="https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&name=Tsotne+Dadiani+207%2C+Tbilisi%2C+Georgia&mkt=en-US&FORM=FBKPL1&q=41.738738645435%2C+44.794999300411&cp=41.738739%7E44.794998&lvl=4&style=r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs !text-cyan-400 hover:!text-cyan-300 mt-1.5 font-semibold transition-colors"
                >
                  <span>{lang === 'geo' ? 'რუკაზე გახსნა' : 'Open in Maps'}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Social Media Icons with Full Color & Proper Size */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400 mb-4">
              {lang === 'geo' ? 'სოციალური ქსელები' : 'Social Channels'}
            </h4>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/DentalAestheticss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/e.b.dental.aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp / Phone */}
              <a
                href="https://wa.me/995557770406"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-1.077-.087-.665-.21-1.52-.727-2.433-1.641-.913-.912-1.43-1.768-1.641-2.433-.14-.442-.132-.765-.087-1.076.05-.334.42-.826.824-.97.108-.038.225-.057.34-.057.17 0 .31.018.423.238.127.248.435 1.062.473 1.139.038.077.063.167.013.267-.05.1-.075.162-.15.25-.075.088-.157.195-.224.263-.075.075-.153.158-.066.308.088.15.39 1.144 1.34 1.993.535.478.986.626 1.127.696.14.07.223.058.305-.037.083-.095.355-.413.45-.554.095-.14.19-.117.322-.068.132.05.836.394.98.466.143.072.239.108.274.168.036.06.036.347-.108.752z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.176L2 22l4.98-1.399C8.428 21.503 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.637 0-3.18-.503-4.463-1.365l-.32-.213-2.96.832.846-2.884-.233-.332A8.14 8.14 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-white/70 mt-3 leading-snug">
              {lang === 'geo'
                ? 'გამოგვყევით სიახლეებისა და შედეგების სანახავად.'
                : 'Follow us to explore clinical cases & updates.'}
            </p>
          </div>
        </div>

        {/* Bottom Copyright Row with Crystal Clear White / Light Silver Contrast */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/75 gap-3">
          <p>© {new Date().getFullYear()} EB Dental Clinic. {lang === 'geo' ? 'ყველა უფლება დაცულია.' : 'All rights reserved.'}</p>
          <p className="text-white/60">{lang === 'geo' ? 'თბილისი, საქართველო' : 'Tbilisi, Georgia'}</p>
        </div>
      </div>
    </footer>
  );
}
