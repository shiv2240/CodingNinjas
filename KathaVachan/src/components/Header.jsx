import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileMenu from "../pages/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Header = ({ scrollY, currentView, setCurrentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const isScrolled = scrollY > 50;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img src="/logo.svg" alt="KathaVachan Logo" className="h-10 w-10" />
            <span className="ml-2 text-xl font-semibold">KathaVachan</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                navigate("/");
                // setCurrentView('home')
              }}
              className={`transition ${
                currentView === "home"
                  ? "text-primary"
                  : "text-dark dark:text-light hover:text-primary dark:hover:text-primary"
              }`}
            >
              Home
            </button>
            <a
              href="#features"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition"
            >
              Features
            </a>
            <button
              onClick={() => navigate("/process")}
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition"
            >
              Process
            </button>
            <a
              href="#contact"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition"
            >
              Contact
            </a>
            {!currentUser ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition"
              >
                Get Started
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    // setCurrentView('dashboard')
                  }}
                  className={`transition ${
                    currentView === "dashboard"
                      ? "text-primary"
                      : "text-dark dark:text-light hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  Dashboard
                </button>
                <ProfileMenu />
              </>
            )}
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            {currentUser && <ProfileMenu />}
            <button
              className="text-dark dark:text-light"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-rounded">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
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
              <button
                onClick={() => {
                  setCurrentView("home");
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${
                  currentView === "home"
                    ? "text-primary"
                    : "text-dark dark:text-light hover:text-primary dark:hover:text-primary"
                } transition`}
              >
                Home
              </button>
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
                href="#contact"
                className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              {!currentUser ? (
                <button
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition w-full"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              ) : (
         
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 ${
                      currentView === "dashboard"
                        ? "text-primary"
                        : "text-dark dark:text-light hover:text-primary dark:hover:text-primary"
                    } transition`}
                  >
                    Dashboard
                  </button>
   
              )}
            </div>
          </motion.div>
        )}
      </header>

  );
};

export default Header;
