import React, { useState, useEffect, useCallback } from 'react';

export interface ReviewItem {
  id: number;
  name: { geo: string; eng: string };
  role: { geo: string; eng: string };
  treatment: { geo: string; eng: string };
  stars: number;
  comment: { geo: string; eng: string };
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: { geo: 'ნინო მ.', eng: 'Nino M.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'ესთეტიკური სტომატოლოგია', eng: 'Cosmetic Dentistry' },
    stars: 5,
    comment: {
      geo: 'ექიმი ეკა და მისი გუნდი საუკეთესოები არიან! ძალიან ყურადღებიანი და პროფესიონალი. ყველაფერი დეტალურად ამიხსნა და უმაღლეს დონეზე შეასრულა. მთელი გულით ვუწევ რეკომენდაციას.',
      eng: 'Dr. Eka and her team are wonderful! Extremely attentive, gentle and professional. She explained every single step in detail and did exceptional work. Highly recommend!'
    }
  },
  {
    id: 2,
    name: { geo: 'გიორგი ბ.', eng: 'Giorgi B.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'დენტალური იმპლანტაცია', eng: 'Dental Implants' },
    stars: 5,
    comment: {
      geo: 'საუკეთესო სტომატოლოგიური კლინიკაა, სადაც ოდესმე ვყოფილვარ. პატიოსნება და გამჭვირვალობა უმაღლეს დონეზეა. პერსონალი ძალიან თბილი და მზრუნველია.',
      eng: 'Hands down the best dental clinic I have visited. Total transparency, fair treatment plans and remarkably kind staff.'
    }
  },
  {
    id: 3,
    name: { geo: 'თამარ კ.', eng: 'Tamar K.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'ღიმილის დიზაინი & ვინირები', eng: 'Smile Design & Veneers' },
    stars: 5,
    comment: {
      geo: 'ძალიან კმაყოფილი ვარ შედეგით. ექიმმა ეკამ საოცარი სამუშაო შეასრულა ჩემი ღიმილისთვის. უღრმესი მადლობა მთელ გუნდს!',
      eng: 'Thrilled with the results! Dr. Eka did amazing aesthetic work on my smile. Immense gratitude to the entire team!'
    }
  },
  {
    id: 4,
    name: { geo: 'ლევან დ.', eng: 'Levan D.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'ორთოდონტია (ბრეკეტები)', eng: 'Orthodontics (Braces)' },
    stars: 5,
    comment: {
      geo: 'საოცრად თბილი და პროფესიონალური გარემო. ყოველი ვიზიტი სასიამოვნოა და შედეგი ყოველთვის მოლოდინს აჭარბებს.',
      eng: 'Such a warm, calming and professional atmosphere. Every appointment is painless and results always exceed expectations.'
    }
  },
  {
    id: 5,
    name: { geo: 'ანა ს.', eng: 'Ana S.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'თერაპიული მკურნალობა', eng: 'Restorative Care' },
    stars: 5,
    comment: {
      geo: 'ჩვენი კლინიკა ნამდვილად საუკეთესოა! მაღალი კვალიფიკაცია, სისუფთავე და უმტკივნეულო პროცედურები. რეკომენდაციას ვუწევ ყველას.',
      eng: 'Truly premier quality care! High clinical standards, spotless cleanliness, and completely pain-free procedures.'
    }
  },
  {
    id: 6,
    name: { geo: 'დავით გ.', eng: 'David G.' },
    role: { geo: 'დადასტურებული პაციენტი', eng: 'Verified Patient' },
    treatment: { geo: 'კომპლექსური რეაბილიტაცია', eng: 'Full Mouth Care' },
    stars: 5,
    comment: {
      geo: 'წლების განმავლობაში ვეძებდი სანდო სტომატოლოგს. ექიმი ეკა ბუხრაშვილი თავისი საქმის ნამდვილი ოსტატია. უმაღლესი შეფასება!',
      eng: 'I spent years looking for a trustworthy dentist. Dr. Eka Bukhrashvili is a true master of her craft. 5 stars without hesitation!'
    }
  }
];

interface ReviewsCarouselProps {
  lang: 'geo' | 'eng';
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visible count: 3 on desktop (>=1024px), 2 on tablet (>=640px), 1 on mobile (<640px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  return (
    <section id="reviews" className="section_testimonial8 relative overflow-hidden py-16 sm:py-24">
      {/* Background Graphic Asset with Overlay */}
      <div className="testimonial8_background-image-wrapper absolute inset-0 pointer-events-none z-0">
        <div className="testimonial8_image-overlay-layer absolute inset-0 bg-[#091b36]/60 backdrop-blur-[1px] z-10" />
        <img
          sizes="100vw"
          src="https://cdn.prod.website-files.com/6a29d43f03b10014aa9b0c8c/6a2bc312fe0184f45e9b8b00_fb7a133cbfa18c7315b005b02dd7691afa8e5acc.webp"
          alt="Abstract flowing blue wave background"
          loading="lazy"
          className="testimonial8_background-image w-full h-full object-cover"
        />
      </div>

      <div className="padding-global relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="container-large">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-sm border border-white/15">
              {lang === 'geo' ? 'პაციენტების შეფასებები' : 'PATIENT REVIEWS'}
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {lang === 'geo'
                ? 'რეალური ისტორიები ჩვენი პაციენტებისგან'
                : 'Real Stories from Our Patients'}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              {lang === 'geo'
                ? 'გაეცანით ჩვენი პაციენტების შთაბეჭდილებებს უმტკივნეულო მკურნალობასა და მიღწეულ შედეგებზე.'
                : 'Read firsthand experiences from our patients about their comfortable visits and radiant smiles.'}
            </p>
          </div>

          {/* Slider Container with Left and Right Arrows */}
          <div className="relative">
            {/* Carousel Viewport */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                }}
              >
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="p-2.5 sm:p-3 flex-shrink-0"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-white/20 shadow-xl flex flex-col justify-between h-full min-h-[290px] sm:min-h-[310px] hover:bg-white/15 transition-colors">
                      {/* Top: Stars & Quote */}
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.stars)].map((_, i) => (
                            <svg
                              key={i}
                              width="16"
                              height="16"
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
                                fill="#FFBA00"
                              />
                            </svg>
                          ))}
                          <span className="text-white/70 text-xs font-semibold ml-1.5">5.0</span>
                        </div>

                        {/* Review text */}
                        <p className="text-white/95 text-sm sm:text-base leading-relaxed break-words">
                          &quot;{review.comment[lang]}&quot;
                        </p>
                      </div>

                      {/* Bottom: Author & Procedure Info */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-base">
                            {review.name[lang]}
                          </div>
                          <div className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            {review.role[lang]}
                          </div>
                        </div>

                        <div className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15">
                          {review.treatment[lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left & Right Navigation Arrows */}
            <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reviews"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/20 shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dots / Indicators */}
              <div className="flex items-center gap-2">
                {[...Array(maxIndex + 1)].map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-white'
                        : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reviews"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/20 shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
