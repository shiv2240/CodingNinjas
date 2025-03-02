import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
      {
        "question": "What is e-Katha?",
        "answer": "e-Katha is the digital version of the property Katha certificate issued online by BBMP, allowing property owners to apply, track, and manage their Katha online."
      },
      {
        "question": "Who is eligible to apply for e-Katha?",
        "answer": "Property owners in BBMP limits who have proper ownership documents and up-to-date tax payments."
      },
      {
        "question": "How can I apply for e-Katha online?",
        "answer": "You can apply through the BBMP Sakala website or the official BBMP e-Katha portal by submitting the required documents and paying the necessary fees."
      },
      {
        "question": "Can I apply for e-Katha without a sale deed?",
        "answer": "No, a valid sale deed is mandatory to establish ownership."
      },
      {
        "question": "What are the steps for transferring e-Katha to a new owner?",
        "answer": "Submit an online application with the sale deed and previous owner’s Katha. Pay the processing fee. Await BBMP verification and approval."
      },
      {
        "question": "How long does the e-Katha transfer process take?",
        "answer": "It typically takes 30–45 days after document submission and verification."
      },
      {
        "question": "What if the previous owner did not have a Katha?",
        "answer": "You will need to apply for a new Katha with additional supporting documents like the encumbrance certificate and property tax receipts."
      },
      {
        "question": "Is property tax payment mandatory before applying for e-Katha?",
        "answer": "Yes, all dues must be cleared before submission."
      },
      {
        "question": "How can I check my property tax details before applying for e-Katha?",
        "answer": "You can check the tax status on the BBMP website by entering your property ID."
      },
      {
        "question": "How can I track my e-Katha application status?",
        "answer": "You can check the status on the BBMP Sakala website using your application number."
      },
      {
        "question": "What should I do if my e-Katha application is rejected?",
        "answer": "Review the rejection reason, correct the issues, and reapply with the necessary documents."
      },
      {
        "question": "Can I apply for Katha bifurcation online?",
        "answer": "Yes, you need to provide the sale deed, tax receipts, and a legal affidavit."
      },
      {
        "question": "What if I want to merge two properties under one e-Katha?",
        "answer": "Apply for Katha amalgamation with all relevant property documents."
      }  
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