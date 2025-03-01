import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light dark:bg-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/logo.svg" alt="KathaVachan Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-semibold">KathaVachan</span>
            </div>
            <p className="text-secondary mb-6">
              Simplifying BBMP eKatha creation with voice-powered technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-primary transition">
                <span className="material-symbols-rounded"><FaFacebook/></span>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition">
                <span className="material-symbols-rounded"><FaTwitter/></span>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition">
                <span className="material-symbols-rounded"><FaInstagram/></span>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition">
                <span className="material-symbols-rounded"><FaLinkedin/></span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary hover:text-primary transition">Home</a></li>
              <li><a href="#features" className="text-secondary hover:text-primary transition">Features</a></li>
              <li><a href="#process" className="text-secondary hover:text-primary transition">Process</a></li>
              <li><a href="#faq" className="text-secondary hover:text-primary transition">FAQ</a></li>
              <li><a href="#contact" className="text-secondary hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary hover:text-primary transition">BBMP Guidelines</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition">eKatha Documentation</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition">Property Laws</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="material-symbols-rounded text-primary mr-2">location_on</span>
                <span className="text-secondary">123 Tech Park, Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-rounded text-primary mr-2">phone</span>
                <span className="text-secondary">+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-rounded text-primary mr-2">email</span>
                <span className="text-secondary">info@kathavachan.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
        >
          <p className="text-secondary">
            © {new Date().getFullYear()} KathaVachan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer