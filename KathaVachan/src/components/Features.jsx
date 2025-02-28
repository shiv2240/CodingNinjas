import { motion } from 'framer-motion'

const features = [
  {
    icon: 'record_voice_over',
    title: 'Voice-Powered Data Collection',
    description: 'Simply speak to our assistant and we will collect all the necessary information for your eKatha document.'
  },
  {
    icon: 'verified',
    title: 'BBMP Compliant',
    description: 'Our system is fully compliant with all BBMP requirements and regulations for property documentation.'
  },
  {
    icon: 'speed',
    title: 'Fast Processing',
    description: 'Get your eKatha document processed in record time with our streamlined digital workflow.'
  },
  {
    icon: 'security',
    title: 'Secure & Confidential',
    description: 'Your data is encrypted and protected with enterprise-grade security protocols.'
  },
  {
    icon: 'support_agent',
    title: '24/7 Support',
    description: 'Our support team is available around the clock to assist you with any questions or concerns.'
  },
  {
    icon: 'translate',
    title: 'Multilingual Support',
    description: 'Communicate in your preferred language with our assistant that supports multiple Indian languages.'
  }
]

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-secondary max-w-2xl mx-auto"
          >
            Our voice assistant makes creating eKatha documents for BBMP properties simple, secure, and efficient.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card glass"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-rounded text-primary text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold mb-4"
                >
                  How It Works
                </motion.h3>
                <motion.ol 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 ml-5"
                >
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3">1</div>
                    <div>
                      <h4 className="font-semibold">Start the Voice Assistant</h4>
                      <p className="text-secondary">Click the "Start Voice Assistant" button to begin the process.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3">2</div>
                    <div>
                      <h4 className="font-semibold">Provide Your Information</h4>
                      <p className="text-secondary">Answer the assistant's questions about your property and personal details.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3">3</div>
                    <div>
                      <h4 className="font-semibold">Verify and Submit</h4>
                      <p className="text-secondary">Review the collected information and confirm submission.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3">4</div>
                    <div>
                      <h4 className="font-semibold">Receive Your eKatha</h4>
                      <p className="text-secondary">Get your completed eKatha document via email or download it directly.</p>
                    </div>
                  </li>
                </motion.ol>
              </div>
              
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden aspect-video"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                      <span className="material-symbols-rounded text-primary text-4xl">play_arrow</span>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="How KathaVachan works" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features