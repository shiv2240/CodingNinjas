import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import ChatHistory from "./ChatHistory";
import ChatView from "./ChatView";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Dashboard = ({ setIsAssistantOpen }) => {
  const [userId, setUserId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (loading) {
    return <p className="text-lg text-secondary text-center">Loading...</p>;
  }

  if (!userId) {
    return <p className="text-lg text-secondary text-center">Please log in to view your chats.</p>;
  }
  function handleClick(){
    if (currentUser) {
        setIsAssistantOpen(true);
      } else {
        setShowModal(true);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Header />
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Your <span className="gradient-text">eKatha</span> Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-secondary"
          >
            Manage your property documents and conversation history
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with stats and navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4"
          >
            <div className="glass rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Total Properties</span>
                  <span className="font-semibold">{/* Add logic to count total properties */}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Completed</span>
                  <span className="font-semibold">{/* Add logic to count completed properties */}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Pending</span>
                  <span className="font-semibold">{/* Add logic to count pending properties */}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button onClick={handleClick} className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition flex items-center justify-center">
                  <span className="material-symbols-rounded mr-2">add</span>
                  New eKatha
                </button>
                <button className="w-full border border-primary text-primary hover:bg-primary/10 font-medium py-2 px-4 rounded-xl transition flex items-center justify-center">
                  <span className="material-symbols-rounded mr-2">upload_file</span>
                  Upload Documents
                </button>
                <button onClick={()=> navigate("/contact")} className="w-full border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-medium py-2 px-4 rounded-xl transition flex items-center justify-center">
                  <span className="material-symbols-rounded mr-2">help</span>
                  Get Support
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-3/4"
          >
            {selectedChatId ? (
              <ChatView userId={userId} chatId={selectedChatId} onClose={() => setSelectedChatId(null)} />
            ) : (
              <ChatHistory userId={userId} onChatSelect={setSelectedChatId} selectedChatId={selectedChatId} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;