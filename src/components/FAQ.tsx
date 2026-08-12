import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I join the Rotaract Club of Salem Midtown?',
    answer: 'Membership is open to college students, professionals, and entrepreneurs aged 18-30 in Salem. Fill out our Join Us form, and our Secretary will reach out to invite you to our next general body meeting.',
  },
  {
    question: 'Are there any fees or commitments involved in joining?',
    answer: 'There is a nominal annual induction fee to cover district registry and resources. Members are expected to actively participate in weekly or bi-weekly meetings and volunteer for key project execution.',
  },
  {
    question: 'How often does the club meet, and where?',
    answer: 'We hold general body meetings on a bi-weekly basis, alongside additional project-specific planning sessions as needed. Venue and timing are shared with members in advance through our official communication channels.',
  },
  {
    question: "What are the 'avenues of service' I keep hearing about?",
    answer: 'Rotaract organizes all its work into five avenues — Club Service, Community Service, Professional Service, International Service, and Public Image. Every project we run falls under one of these, and most members gravitate toward the avenue that matches their interests.',
  },
  {
    question: "I'm not a college student — can I still join?",
    answer: 'Yes. Rotaract membership is open to young working professionals and entrepreneurs as well as students, generally between 18 and 30 years old. What matters most is a genuine interest in community service and fellowship.',
  },
];

export const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No opacity, and a small px offset rather than a full-height mask —
      // see the note in ClubAbout.tsx.
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'lines,words' });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 24,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-white">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <SectionHeading
        number="07"
        label="FAQs — We're Here to Help"
        titleTop="Ask anything,"
        titleBottom="we're ready to"
        accent="answer"
        description="Joining, meeting times, fees, avenues of service — the questions we're asked most, answered plainly."
        titleRef={titleRef}
        className="mb-16"
      />

      {/* FAQ Grid Cards in Blue matching Crowdix Dropdowns */}
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <div
              key={index}
              className="bg-theme-blue rounded-xl overflow-hidden transition-all duration-300 border border-black/5 shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-6 text-left cursor-pointer"
              >
                <span className="font-heading font-extrabold text-sm md:text-base text-black tracking-wide">
                  {faq.question}
                </span>

                {/* Custom Webflow Indicator: vertical line rotates/vanishes */}
                <div className="faq-icon-box w-9 h-9 rounded-full bg-white/20 border border-black/5 flex items-center justify-center relative shrink-0">
                  {/* Vertical Line */}
                  <div 
                    className={`absolute w-0.5 h-5 bg-black transition-transform duration-350 ${
                      isOpen ? 'rotate-90 scale-y-0 opacity-0' : 'rotate-0 scale-y-100 opacity-100'
                    }`} 
                  />
                  {/* Horizontal Line */}
                  <div className="absolute w-5 h-0.5 bg-black" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-2 text-xs md:text-sm text-[#444] font-sans leading-relaxed border-t border-black/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
