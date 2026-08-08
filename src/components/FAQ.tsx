import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I join the Rotaract Club of Salem Midtown?',
    answer: 'Membership is open to college students, professionals, and entrepreneurs aged 18-30 in Salem. Fill out the query form on this page, and our Secretary will reach out to invite you to our next general body meeting.',
  },
  {
    question: 'What regions are covered by Rotary District 2982?',
    answer: 'District 2982 spans Salem, Namakkal, Dharmapuri, Krishnagiri, and surrounding locales in Tamil Nadu, India, uniting multiple community and institutional clubs under a single leadership council.',
  },
  {
    question: 'How can our company or organization partner with your club?',
    answer: 'We collaborate with corporate partners and NGOs for community projects (CSR). You can write to us via our support form selecting the "Sponsorship / Partnership" option.',
  },
  {
    question: 'Are there any fees or commitments involved in joining?',
    answer: 'There is a nominal annual induction fee to cover district registry and resources. Members are expected to actively participate in weekly or bi-weekly meetings and volunteer for key project execution.',
  },
];

export const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 bg-white">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <span className="text-brand-crimson text-xs uppercase font-heading font-extrabold tracking-widest mb-3">
          Common Questions
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight overflow-hidden pb-1">
          <motion.span
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="block"
          >
            Frequently Asked <span className="bg-gradient-to-r from-brand-crimson to-red-800 bg-clip-text text-transparent">Questions</span>
          </motion.span>
        </h2>
        <p className="text-text-muted font-sans text-sm md:text-base mt-4 leading-relaxed">
          Have questions about operations, membership, or collaborations? Start here.
        </p>
      </div>

      <motion.div
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto flex flex-col gap-3"
      >
        {FAQS.map((faq, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <div
              key={index}
              className="glass-card hover-beige-gradient rounded-2xl overflow-hidden transition-all duration-300 border border-text-primary/5 shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-heading font-semibold text-sm hover:text-brand-crimson transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="text-brand-gold shrink-0" size={16} />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-crimson' : 'text-text-muted'}`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-2 text-xs md:text-sm text-text-muted font-sans border-t border-text-primary/5 bg-bg-secondary leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};
