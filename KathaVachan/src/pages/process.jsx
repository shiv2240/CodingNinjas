import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CustomCursor } from '../components/customCursor';
import ModelViewer from '../components/ModelViewer';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const processSteps = [
  {
    icon: 'chat',
    title: 'Provide Details',
    description: 'Users enter property details via voice or text chat, making the process seamless and easy.'
  },
  {
    icon: 'cloud_upload',
    title: 'Secure Storage',
    description: 'The AI securely stores the provided information to process the eKatha application.'
  },
  {
    icon: 'assignment_turned_in',
    title: 'Fast Processing',
    description: 'Users receive their eKatha certificate within 3-5 working days after verification.'
  },
  {
    icon: 'history',
    title: 'Application History',
    description: 'Users can track their previous applications and maintain a history of all applied properties.'
  },
  {
    icon: 'autorenew',
    title: 'Resume Anytime',
    description: 'Users can re-continue the same chat from where they left off, ensuring flexibility.'
  },
  {
    icon: 'support',
    title: 'GenAI Assistant',
    description: 'A GenAI-powered chat assistant is available for extra support via a simple toggle.'
  },
  {
    icon: 'manage_accounts',
    title: 'Profile Management',
    description: 'Users can edit their profiles and update their information at any time.'
  },
  {
    icon: 'login',
    title: 'Login Required',
    description: 'Users must login/signup to access all features and manage their applications.'
  }
];

function Process() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gray-900 text-gray-200 flex flex-col min-h-screen overflow-auto">
      <CustomCursor />
      <Header scrollY={scrollY} />

      <main className="flex-grow pt-24 pb-32">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div>}>
              <ModelViewer />
            </Suspense>
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-xl mb-6">
                Our AI-powered voice assistant simplifies property documentation by collecting all necessary details from the customer through a chat box, either via typing or voice.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="feature-card glass p-6 rounded-lg shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="material-symbols-rounded text-primary text-2xl">{step.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-secondary text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/')} 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 mt-6"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Process;