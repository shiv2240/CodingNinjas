import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Footer from "./Footer";
import Header from "./Header";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden  ">
      <button
        className="w-full p-4 text-left flex justify-between items-center  transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white transition-transform duration-300 hover:scale-105">{question}</h3>
        <ChevronDown
          className={`text-blue-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4  border-t border-gray-200">
              <p className="backgroung-transparent">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: "What is an eKatha document?",
      answer:
        "An eKatha is a digital property ownership record issued by BBMP (Bruhat Bengaluru Mahanagara Palike) that serves as proof of property ownership in Bangalore. It contains details about the property, its owner, and tax payment history.",
    },
    {
      question: "How long does the eKatha process take?",
      answer:
        "With our voice-assisted system, the information collection process takes just 10-15 minutes. The complete processing time for your eKatha document typically ranges from 7-14 business days, depending on BBMP verification processes.",
    },
    {
      question: "What documents do I need to prepare?",
      answer:
        "You'll need your property sale deed, previous tax receipts, government-issued ID proof, address proof, and recent property tax payment receipts. Our voice assistant will guide you through each required document during the process.",
    },
    {
      question: "Is the voice assistant available in my language?",
      answer:
        "Yes, our voice assistant supports multiple Indian languages including Kannada, Hindi, Tamil, Telugu, and English to ensure you can communicate comfortably in your preferred language.",
    },
    {
      question: "How secure is my personal information?",
      answer:
        "We implement enterprise-grade encryption and security protocols to protect all your data. Your information is only used for the eKatha application process and is never shared with unauthorized third parties.",
    },
  ];

  return (
    <>
      <Header />
      <section className="py-12 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">
              Find answers to common questions about our eKatha services
            </p>
          </div>
          <div>
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQ;