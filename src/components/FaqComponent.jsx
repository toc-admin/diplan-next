"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react"; // optional icons

const FaqComponent = ({ title, faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    if (!faqs || !Array.isArray(faqs)) {
      return null; // or a loader / empty state
    }
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <section className="w-full flex justify-center px-4 py-12">
        <div className="max-w-[1400px] w-full grid md:grid-cols-2 gap-16">
          {/* Left side - Title */}
          <div>
            <h2 className="text-[35px] sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-medium text-brand-color max-w-[442px] leading-tight">{title}</h2>
          </div>
  
          {/* Right side - FAQ list */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="border-b-1 border-dark-text/10 pb-16">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left font-medium text-lg"
                >
                  <h3 className="text-brand-color font-medium text-2xl">{faq.question}</h3>
                  {openIndex === index ? (
                    <Minus className="w-10 h-10 border-1 border-dark-text/10 p-2 rounded-full" />
                  ) : (
                    <Plus className="w-10 h-10 border-1 border-dark-text/10 p-2 rounded-full" />
                  )}
                </button>
                {openIndex === index && faq.answer && faq.answer !== "NaN" && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default FaqComponent;