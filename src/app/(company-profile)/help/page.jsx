"use client";

import React, { useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Help() {
  const faqs = [
    {
      id: 1,
      question: "What is Green Cure?",
      answer: "Green Cure is a platform dedicated to providing health-related information and services for wellness and a better lifestyle.",
    },
    {
      id: 2,
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button on the homepage and fill out your details in the registration form.",
    },
    {
      id: 3,
      question: "Is my personal data secure?",
      answer: "Yes, we prioritize your privacy and use various security measures to protect your personal information. Please refer to our Privacy Policy for more details.",
    },
    {
      id: 4,
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account by reach out to our support team via email at support@greencure.com. Once deleted, your data will be permanently removed.",
    },
    {
      id: 5,
      question: "Who can I contact for support?",
      answer: "If you need assistance, you can reach out to our support team via email at support@greencure.com.",
    },
  ];

  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gcNeutrals-baseWhite to-gcPrimary-basePrimary min-h-screen flex flex-col justify-between">
        <Navbar />
        <section className="pt-16 flex md:flex-row flex-col gap-10 px-6">
          <div className="max-w-3xl mx-auto bg-gcNeutrals-baseWhite p-6 shadow-lg rounded-lg my-10">
            <h1 className="gcHeading3p text-gcPrimary-600 xl:mb-6 lg:mb-5 md:mb-4 sm:mb-3.5 mb-3">Frequently Asked Questions</h1>
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} isActive={activeFAQ === faq.id} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

const FAQItem = ({ faq, isActive, toggleFAQ }) => {
  return (
    <div className="border-b border-gray-300">
      <button className="w-full text-left lg:py-4 md:py-3.5 sm:py-3 py-2 flex justify-between items-center" onClick={() => toggleFAQ(faq.id)}>
        <span className="gcContentAccent1p text-gcPrimary-1000">{faq.question}</span>
        <svg className={`w-6 h-6 transform transition-transform ${isActive ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen" : "max-h-0"}`}>
        <p className="text-gray-700 gcContentBody2p px-4 pb-4">{faq.answer}</p>
      </div>
    </div>
  );
};
