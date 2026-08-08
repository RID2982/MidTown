import React, { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollSkew } from '../hooks/useScrollSkew';

export const Support: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
  const headingRef = useScrollSkew<HTMLHeadingElement>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support Ticket Submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <section id="support" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 bg-white">
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
          We're Here To Help
        </span>
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
          <motion.span
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="block"
          >
            Get <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Support & Help</span>
          </motion.span>
        </h2>
        <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
          Didn't find your answer above? Drop us a ticket and our team will follow up directly.
        </p>
      </div>

      <motion.div
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card hover-beige-gradient rounded-3xl p-8 md:p-10 border border-text-primary/5 relative min-h-[380px] shadow-sm bg-white">
          {formSubmitted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <CheckCircle2 size={48} className="text-brand-crimson mb-4" />
              <h4 className="text-lg font-heading font-bold text-text-primary mb-2">
                Ticket Created Successfully!
              </h4>
              <p className="text-sm text-text-muted max-w-sm">
                Thank you, <strong>{formData.name}</strong>. Our team will verify your query and reach out to you at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', category: 'General Inquiry', message: '' });
                }}
                className="mt-6 px-6 py-2.5 rounded-full font-heading font-semibold text-xs border border-text-primary/5 hover:border-brand-crimson/25 bg-text-primary/2 hover:bg-brand-crimson/5 text-text-primary hover:text-brand-crimson transition-all duration-300 cursor-pointer"
              >
                Submit Another Query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
                Submit a Support Ticket
              </h3>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-text-primary/5 focus:border-brand-crimson/30 focus:bg-white focus:ring-1 focus:ring-brand-crimson outline-none transition-all text-sm font-sans"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-text-primary/5 focus:border-brand-crimson/30 focus:bg-white focus:ring-1 focus:ring-brand-crimson outline-none transition-all text-sm font-sans"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                  Query Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-bg-secondary border border-text-primary/5 focus:border-brand-crimson/30 focus:bg-white focus:ring-1 focus:ring-brand-crimson outline-none transition-all text-sm font-sans text-text-primary cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Join the Club">Join the Club</option>
                    <option value="Sponsorship / Partnership">Sponsorship & Partnership</option>
                    <option value="Event Inquiry">Event Inquiry</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your question or request"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-text-primary/5 focus:border-brand-crimson/30 focus:bg-white focus:ring-1 focus:ring-brand-crimson outline-none transition-all text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-brand-crimson to-red-800 hover:from-brand-crimson/95 hover:to-red-750 text-white shadow-md shadow-brand-crimson/20 hover:shadow-lg border border-white/5 cursor-pointer text-center"
              >
                Create Support Ticket
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};
