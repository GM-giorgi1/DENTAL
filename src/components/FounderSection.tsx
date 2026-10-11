import React from 'react';
import HERO7 from '../../Images/HERO7.jpeg';

interface FounderSectionProps {
  lang?: 'geo' | 'eng';
  onBookClick?: () => void;
}

export function FounderSection({ lang = 'geo', onBookClick }: FounderSectionProps) {
  return (
    <section id="about" className="bg-gradient-to-b from-white to-slate-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content (Left Column) */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-slate-500 uppercase mb-4">
            {lang === 'geo' ? 'გაიცანით დამფუძნებელი' : 'MEET THE FOUNDER'}
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-6">
            {lang === 'geo' ? 'ექიმი ეკა ბუხრაშვილი' : 'Dr. Eka Bukhrashvili'}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {lang === 'geo'
              ? 'თუ ეძებთ სტომატოლოგიურ კლინიკას, რომელსაც მთელი ოჯახი ენდობა, ჩვენი ცენტრი შექმნილია თქვენს კომფორტზე ზრუნვით. 15 წლიანი გამოცდილებით, ჩვენი გუნდი გთავაზობთ უმაღლესი ხარისხის მომსახურებას, თანამედროვე აპარატურას და მოქნილ გრაფიკს.'
              : 'If you are looking for a dental clinic trusted by the entire family, our practice is designed with your comfort in mind. Backed by 15 years of expertise, our team provides premier quality care, state-of-the-art technology, and flexible scheduling.'}
          </p>
          {onBookClick && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="slice"
              >
                <span className="text">
                  {lang === 'geo' ? 'ვიზიტის დაჯავშნა' : 'Book a Consultation'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Image (Right Column - Premium Aesthetic) */}
        <div className="relative max-w-md mx-auto lg:max-w-none w-full">
          <div className="absolute inset-0 bg-slate-200 rounded-3xl transform translate-x-6 translate-y-6 -z-10" />
          <img
            src={HERO7}
            alt={lang === 'geo' ? 'ექიმი ეკა ბუხრაშვილი' : 'Dr. Eka Bukhrashvili'}
            className="relative rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
