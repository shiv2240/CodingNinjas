import { motion } from 'framer-motion'

const Hero = ({ setIsAssistantOpen }) => {
  return (
    <section className="min-h-screen pt-24 flex items-center relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Voice-Powered <span className="gradient-text">eKatha</span> Assistant
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-secondary">
                Simplify BBMP property documentation with our AI-powered voice assistant. 
                Just speak, and we'll handle the paperwork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsAssistantOpen(true)}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                >
                  Start Voice Assistant
                </button>
                <a 
                  href="#learn-more" 
                  className="border border-dark dark:border-light hover:border-primary dark:hover:border-primary text-dark dark:text-light hover:text-primary dark:hover:text-primary font-semibold py-3 px-8 rounded-full transition duration-300 text-center"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-rounded">mic</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">KathaVachan Assistant</h3>
                    <p className="text-secondary">Ready to help you</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="glass rounded-xl p-4">
                    <p className="text-secondary">Hello! I'm your KathaVachan assistant. I can help you create your eKatha document for BBMP. Would you like to get started?</p>
                  </div>
                  
                  <div className="bg-primary/10 rounded-xl p-4 ml-auto max-w-[80%]">
                    <p>Yes, I need to create an eKatha for my property.</p>
                  </div>
                  
                  <div className="glass rounded-xl p-4">
                    <p className="text-secondary">Great! I'll need some information about your property. First, could you tell me your property address?</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsAssistantOpen(true)}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-300 flex items-center justify-center"
                >
                  <span className="material-symbols-rounded mr-2">mic</span>
                  Continue with Voice Assistant
                </button>
              </div>
              
              <div className="absolute -bottom-6 -right-6 -z-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 -z-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero