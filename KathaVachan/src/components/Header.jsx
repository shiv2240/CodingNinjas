import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Header = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const isScrolled = scrollY > 50

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button
      onClick={() => navigate("/")}
      className="flex items-center focus:outline-none"
    >
      <img src="/logo.svg" alt="KathaVachan Logo" className="h-10 w-10" />
      <span className="ml-2 text-xl font-semibold">KathaVachan</span>
    </button>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition">Features</a>
          <a href="#process" className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition">Process</a>
          <a href="#faq" className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition">FAQ</a>
          <a href="/contact" className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition">Contact</a>
          <button className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition" onClick={()=> navigate('/login')}>
            Get Started
          </button>
        </nav>
        
        <button 
          className="md:hidden text-dark dark:text-light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-rounded">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 glass"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#process" 
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </a>
            <a 
              href="#faq" 
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <button 
              className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition w-full"
              onClick={() =>{
                navigate('/login')
                setIsMenuOpen(false)
              } }
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header