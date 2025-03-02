import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import VoiceAssistant from './components/VoiceAssistant'
import Features from './components/Features'
import Footer from './components/Footer'
import ModelViewer from './components/ModelViewer'
import { CustomCursor } from './components/customCursor'
import ChatBotToggle from './components/chatBot'
import './App.css'

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <div className="relative">
      <CustomCursor/>
      {/* <Routing/> */}
      <Header scrollY={scrollY} />
      
      <main>
        <Hero setIsAssistantOpen={setIsAssistantOpen} />
        
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-light dark:bg-dark flex items-center justify-center">Loading 3D Model...</div>}>
              <ModelViewer />
            </Suspense>
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Revolutionizing eKatha Creation</h2>
              <p className="text-xl mb-8">
                Our advanced voice assistant technology makes property documentation effortless.
                Simply speak, and we'll handle the rest.
              </p>
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
              >
                Try Voice Assistant
              </button>
            </motion.div>
          </div>
        </section>
        
        <Features />
      </main>
      
      <Footer />
      
      {isAssistantOpen && (
        <VoiceAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
    <ChatBotToggle/>
    </>
  )
}

export default Home