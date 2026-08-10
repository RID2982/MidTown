import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Support: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support Ticket Submitted:', formData);
    setFormSubmitted(true);
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

      // Card Fade Up
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="support" className="w-full max-w-[1550px] mx-auto px-6 md:px-12 py-24 relative z-10 bg-theme-dark rounded-[3rem] text-white overflow-hidden">
      {/* Background soft glows */}
      <div className="absolute inset-0 bg-radial-[circle_at_20%_30%] from-brand-crimson/10 via-transparent to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_80%_70%] from-brand-gold/10 via-transparent to-transparent z-0 pointer-events-none" />

      <SectionHeading
        number="07"
        label="We're Here To Help"
        titleTop="Get support,"
        titleBottom="get"
        accent="involved"
        description="Didn't find your answer above? Drop us a ticket and our team will follow up directly."
        titleRef={titleRef}
        dark
        className="mb-16 z-10"
      />

      {/* Dark styled glass card matching Crowdix CTA boxes */}
      <div
        ref={cardRef}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="rounded-[2rem] p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-xl relative min-h-[380px] shadow-2xl">
          {formSubmitted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <CheckCircle2 size={48} className="text-brand-crimson mb-4" />
              <h4 className="text-lg font-heading font-extrabold uppercase tracking-wider text-white mb-2">
                Ticket Created Successfully!
              </h4>
              <p className="text-sm text-white/70 max-w-sm font-sans leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our team will verify your query and reach out to you at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', category: 'General Inquiry', message: '' });
                }}
                className="mt-8 px-6 py-2.5 rounded-full font-heading font-extrabold text-[10px] uppercase tracking-widest border border-white/20 hover:border-brand-crimson/50 bg-white/5 hover:bg-brand-crimson/10 text-white transition-all duration-300 cursor-pointer"
              >
                Submit Another Query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h3 className="text-lg font-heading font-extrabold uppercase tracking-wider text-theme-blue mb-2 border-b border-white/5 pb-4">
                Submit a Support Ticket
              </h3>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-theme-blue/70">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-crimson/50 focus:bg-white/[0.08] outline-none transition-all text-sm font-sans text-white placeholder-white/30"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-theme-blue/70">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-crimson/50 focus:bg-white/[0.08] outline-none transition-all text-sm font-sans text-white placeholder-white/30"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-theme-blue/70">
                  Query Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-crimson/50 focus:bg-white/[0.08] outline-none transition-all text-sm font-sans text-white cursor-pointer"
                  >
                    <option value="General Inquiry" className="bg-theme-dark">General Inquiry</option>
                    <option value="Join the Club" className="bg-theme-dark">Join the Club</option>
                    <option value="Sponsorship / Partnership" className="bg-theme-dark">Sponsorship & Partnership</option>
                    <option value="Event Inquiry" className="bg-theme-dark">Event Inquiry</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-theme-blue/70">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your question or request"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-crimson/50 focus:bg-white/[0.08] outline-none transition-all text-sm font-sans text-white placeholder-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-crimson to-red-800 text-white shadow-lg shadow-brand-crimson/25 hover:shadow-xl hover:shadow-brand-crimson/40 border border-white/5 cursor-pointer text-center mt-2"
              >
                Create Support Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
