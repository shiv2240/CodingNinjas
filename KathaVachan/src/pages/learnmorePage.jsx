import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CustomCursor } from '../components/customCursor';
import '../App.css';

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden" >
      <CustomCursor />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Voice Assistant for eKatha Creation
              </h2>
              <p className="text-xl mb-6 text-secondary">
                Our AI-powered voice assistant simplifies property documentation for BBMP by 
                *gathering necessary customer data* and *creating eKatha records effortlessly*.
              </p>
              <button
                onClick={() => navigate('/')} 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-light dark:bg-dark">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              How It Works
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "Step 1", title: "Start the Assistant", description: "Click on the *voice assistant button* and start speaking." },
                { step: "Step 2", title: "Provide Property Details", description: "The assistant will guide you through the process and collect your *property details*." },
                { step: "Step 3", title: "Generate eKatha", description: "Once all information is received, the *eKatha document is automatically generated*." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">{item.step}</h3>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Why Choose Our Voice Assistant?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Faster Documentation", description: "Automate property documentation and reduce processing time by *80%*." },
                { title: "Secure & Reliable", description: "All transactions are *encrypted* and follow strict security protocols." },
                { title: "AI-Powered Accuracy", description: "Eliminates manual errors by leveraging *AI-driven property validation*." },
                { title: "24/7 Availability", description: "Use the assistant *anytime, anywhere* without human intervention." }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="p-6 bg-primary/10 rounded-xl shadow-md text-center border border-primary dark:border-gray-700 transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                  <p className="text-secondary">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="py-20 bg-dark text-white text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Get Started with eKatha Voice Assistant
          </motion.h2>
          <p className="text-xl mb-6">Click below to *start using the assistant* and simplify property documentation.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Start Now
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LearnMore;