import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <ChevronDown
          className={`text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700">{answer}</p>
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
      question: "What is eKatha?",
      answer: "eKatha is an electronic version of the property document issued by BBMP.",
    },
    {
      question: "How do I apply for eKatha?",
      answer: "You can apply for eKatha through our AI-powered voice assistant.",
    },
    // Add more FAQ items as needed
  ];

  return (
    <>
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
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