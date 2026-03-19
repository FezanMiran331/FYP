"use client"
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is HoloMeet?",
      answer: "HoloMeet is a professional AI-powered virtual classroom platform designed for educational institutions. It combines real-time video communication, smart attendance monitoring, and AI-driven meeting summarization to create engaging and effective online learning experiences."
    },
    {
      question: "How does the AI-powered meeting summarizer work?",
      answer: "Our AI technology automatically captures meeting audio, converts speech to text using advanced transcription, and generates comprehensive summaries with key points and action items. You can download these summaries as reports for future reference."
    },
    {
      question: "Can I track student attendance automatically?",
      answer: "Yes! HoloMeet offers smart attendance monitoring with customizable participation requirements. The system tracks real-time activity, analyzes active participation time, and generates automated attendance reports at the end of each session."
    },
    {
      question: "What are the system requirements?",
      answer: "HoloMeet is a web-based platform that works on any modern browser (Chrome, Firefox, Safari, Edge). You'll need a stable internet connection, a webcam, and a microphone. No software installation is required."
    },
    {
      question: "Is HoloMeet secure?",
      answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, secure password protection, domain-based access control, and institutional email verification. Your data and privacy are our top priorities."
    },
    {
      question: "How many participants can join a meeting?",
      answer: "HoloMeet supports 1-to-many broadcasting, allowing hundreds of participants to join a single session. The exact number depends on your subscription plan. Contact our sales team for custom enterprise solutions."
    },
    {
      question: "Can I share my screen during meetings?",
      answer: "Yes! HoloMeet includes screen sharing with annotation tools, allowing you to highlight important points, draw on shared content, and create interactive presentations during your virtual classes."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can explore all of HoloMeet's capabilities and see how it transforms your virtual classroom experience."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 customer support via email, live chat, and phone. Our dedicated support team is always ready to help you with technical issues, setup assistance, and any questions you may have."
    },
    {
      question: "Can I integrate HoloMeet with my existing LMS?",
      answer: "Yes, HoloMeet offers API integration capabilities and can work alongside popular Learning Management Systems. Contact our technical team to discuss your specific integration requirements."
    }
  ];

  return (
    <section 
      className="relative py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="w-[95%] max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-12 py-2 bg-blue-700/30 text-blue-300 rounded-full text-xl font-semibold mb-6 border border-blue-600/40">
            Support
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about HoloMeet. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-3 text-left flex justify-between items-center hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer Panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-700/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-10">
          <h3 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 mb-6">
            Our team is here to help. Get in touch with us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all duration-300">
              Contact Support
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-white/5 text-white rounded-lg font-semibold border border-white/20 hover:border-blue-500/50 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}