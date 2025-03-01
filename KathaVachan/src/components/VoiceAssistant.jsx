import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const VoiceAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your KathaVachan assistant. How can I help you today?", isUser: false }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      addMessage("Your browser doesn't support speech recognition. Please try using Chrome.", false);
    }
  }, [browserSupportsSpeechRecognition]);

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      
      if (transcript) {
        addMessage(transcript, true);
        processUserInput(transcript);
      }
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
      setIsListening(true);
    }
  };

  const processUserInput = async (input) => {
    setIsProcessing(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: input }] }]
      });
  
      const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  
      addMessage(responseText, false);
    } catch (error) {
      addMessage("Sorry, I couldn't process your request. Please try again.", false);
      console.error("Gemini API Error:", error);
    }
    setIsProcessing(false);
  };
  
  

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const input = e.target.userInput.value;
    if (input.trim()) {
      addMessage(input, true);
      processUserInput(input);
      e.target.userInput.value = '';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">KathaVachan Assistant</h3>
            <button onClick={onClose} className="text-secondary hover:text-dark">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${message.isUser ? 'ml-auto bg-primary/10' : 'mr-auto glass'} rounded-xl p-3 max-w-[80%]`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <form onSubmit={handleTextSubmit} className="flex-1 mr-2">
                <input
                  type="text"
                  name="userInput"
                  placeholder="Type your response..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                />
              </form>
              <button
                onClick={handleListen}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-blue-600'
                } text-white`}
              >
                {isListening ? '🔴' : '🎤'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAssistant;
