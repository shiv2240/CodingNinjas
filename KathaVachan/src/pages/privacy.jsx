import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CustomCursor } from '../components/customCursor';
import ChatBotToggle from '../components/chatBot';
import '../App.css';

function PrivacyPolicy() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="relative">
        <CustomCursor />
        <Header scrollY={scrollY} />
        
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="text-lg mb-4">
              Welcome to our Privacy Policy page. Your privacy is critically important to us.
            </p>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
              <p className="text-lg mb-2">We collect various types of information, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal Information (name, email, phone number, etc.)</li>
                <li>Usage Data (your voice as model, your input style, etc.)</li>
                <li>Cookies and Tracking Technologies</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
              <p className="text-lg mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our services</li>
                <li>Improve user experience</li>
                <li>Send important notifications</li>
                <li>Analyze website traffic and trends</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
              <p className="text-lg">We implement industry-standard security measures to protect your data.</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
              <p className="text-lg">We may share data with trusted third-party services for analytics and performance improvements.</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
              <p className="text-lg">You have the right to access, modify, or delete your personal data.</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
              <p className="text-lg">We may update our privacy policy from time to time. Please review this page periodically.</p>
            </section>
          </motion.div>
        </main>
        
        <Footer />
        <ChatBotToggle />
      </div>
    </>
  );
}

export default PrivacyPolicy;