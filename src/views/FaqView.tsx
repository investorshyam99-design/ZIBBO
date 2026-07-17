import React from 'react';
import SEO from '../components/SEO';

const faqs = [
  {
    question: "What is the delivery time?",
    answer: "Our standard delivery takes 3-5 business days. Express delivery is available for select locations and takes 1-2 business days."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship only within India. We are working on expanding our shipping network soon."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day no-questions-asked return policy for unused products in their original packaging. Custom or personalized items cannot be returned."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order directly on our website using your order ID."
  },
  {
    question: "Are the products authentic?",
    answer: "Yes, all our products are 100% authentic and sourced directly from manufacturers or authorized distributors."
  }
];

export default function FaqView() {
  return (
    <div className="min-h-[60vh] bg-white py-16 px-4">
      <SEO 
        title="FAQ | Frequently Asked Questions | ZIBBO"
        description="Find answers to commonly asked questions about ZIBBO products, shipping, returns, and more."
        type="website"
        url="https://zibbo.com/faq"
        faqs={faqs}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-brand-navy mb-2">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-brand-navy mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is here to help you.</p>
          <a href="/contact" className="inline-block bg-brand-navy text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
