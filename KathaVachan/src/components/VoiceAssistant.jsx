import 'regenerator-runtime/runtime'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlinePlus } from "react-icons/ai";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { db, auth } from '../firebaseConfig/firebase';
import { ref, push, set, get } from "firebase/database";

const VoiceAssistant = ({ onClose, initialMessages = null, propertyData = null }) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated!");
    return;
  }
  const userId = user.uid;
  const [step, setStep] = useState(initialMessages ? 6 : 0)
  const [formData, setFormData] = useState({
    name: '',
    address: propertyData?.address || '',
    propertyId: propertyData?.propertyId || '',
    phoneNumber: '',
    email: '',
    propertyType: '',
  })

  const messagesEndRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [messages, setMessages] = useState(
    initialMessages ||
    [{ text: "Hello! I'm your KathaVachan assistant. I can help you create your eKatha document for BBMP. What's your name?", isUser: false }]
  );
  const [chatId, setChatId] = useState();
  const [chatSessions, setChatSessions] = useState([]);

  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      addMessage("Your browser doesn't support speech recognition. Please try using Chrome.", false)
    }

    // Ensure the assistant speaks the first question on mount
    if (!initialMessages) {
      speakText(messages[0].text)
    }
  }, [browserSupportsSpeechRecognition])

  useEffect(() => {
    const createChatSession = async () => {
      if (!chatId) {
        const chatsRef = ref(db, `users/${userId}/chats`);
        const newChatRef = push(chatsRef);
        setChatId(newChatRef.key);
      }
    };

    createChatSession();
  }, [chatId, userId]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesis.cancel()
      speechSynthesis.speak(utterance)
    }
  }

  const addMessage = async (text, isUser) => {
    setMessages((prev) => [...prev, { text, isUser }]);

    if (!isUser) {
      speakText(text);
    }

    if (!auth.currentUser) {
      console.error("User not authenticated!");
      return;
    }

    const userId = auth.currentUser.uid;

    if (!chatId) {
      console.error("Chat ID not set!");
      return;
    }

    const messageRef = ref(db, `users/${userId}/chats/${chatId}/messages`);
    push(messageRef, {
      text,
      isUser,
      timestamp: Date.now()
    }).catch(error => console.error("Error saving message:", error));
  };

  useEffect(() => {
    const fetchChats = async () => {
      if (!auth.currentUser) return;
      
      const userId = auth.currentUser.uid;
      const chatsRef = ref(db, `users/${userId}/chats/${chatId}/messages`);
  
      try {
        const snapshot = await get(chatsRef);
        if (snapshot.exists()) {
          setChatSessions(Object.keys(snapshot.val())); // Store chat session IDs
        }
      } catch (error) {
        console.error("Error fetching chat sessions:", error);
      }
    };
  
    fetchChats();
  }, [chatId]);

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening()
      setIsListening(false)

      setTimeout(() => {
        if (transcript.trim()) {
          addMessage(transcript, true)
          processUserInput(transcript)
          resetTranscript() // Clear transcript after use
        }
      }, 500) // Small delay to ensure final transcript is captured
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: false })
      setIsListening(true)
    }
  };

  // function to handle file selection 
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file); // Store the file in state
      addMessage(`📄 ${file.name} uploaded`, true); // Display file in chat
    }
  };

  const processUserInput = (input) => {
    setIsProcessing(true)

    setTimeout(() => {
      switch (step) {
        case 0:
          setFormData(prev => ({ ...prev, name: input }))
          addMessage(`Thanks, ${input}! Now, please tell me your property address.`, false)
          setStep(1)
          break
        case 1:
          setFormData(prev => ({ ...prev, address: input }))
          addMessage("Great! What's your property ID or khata number?", false)
          setStep(2)
          break
        case 2:
          setFormData(prev => ({ ...prev, propertyId: input }))
          addMessage("Thank you. What's your phone number?", false)
          setStep(3)
          break
        case 3:
          setFormData(prev => ({ ...prev, phoneNumber: input }))
          addMessage("Almost there! What's your email address?", false)
          setStep(4)
          break
        case 4:
          setFormData(prev => ({ ...prev, email: input }))
          addMessage("Finally, what type of property is this? (Residential, Commercial, etc.)", false)
          setStep(5)
          break
        case 5:
          setFormData(prev => ({ ...prev, propertyType: input }))
          addMessage("Thank you for providing all the information! I'm now creating your eKatha document. You'll receive it via email shortly.", false)
          setStep(6)
          break
        case 6:
          if (input.toLowerCase().includes('status')) {
            addMessage("Your eKatha application is currently being processed. It typically takes 3-5 business days to complete.", false)
          } else if (input.toLowerCase().includes('document') || input.toLowerCase().includes('upload')) {
            addMessage("You can upload additional documents from your dashboard. Click on 'Upload Documents' in the Quick Actions menu.", false)
          } else if (input.toLowerCase().includes('change') || input.toLowerCase().includes('update')) {
            addMessage("To update your information, please provide the details you'd like to change, and I'll help you update your application.", false)
          } else {
            addMessage("Thank you for your question. Is there anything specific about your eKatha application that you'd like to know?", false)
          }
          break
        default:
          addMessage("Thank you for using KathaVachan! Your eKatha application is being processed.", false)
      }
      setIsProcessing(false)
    }, 1000)
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    const input = e.target.userInput.value
    if (input.trim()) {
      addMessage(input, true)
      processUserInput(input)
      e.target.userInput.value = ''
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${!propertyData ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-50" : ""} flex items-center justify-center p-4`}
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
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold">KathaVachan Assistant</h3>
            <button onClick={onClose} className="text-secondary hover:text-dark dark:hover:text-light">
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`${message.isUser ? 'ml-auto bg-primary/10' : 'mr-auto glass'} rounded-xl p-3 max-w-[80%]`}>
                <p>{message.text}</p>
              </div>
            ))}
            {/* Scroll Target */}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex items-center gap-3 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            {/* File Input (Hidden) */}
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={onFileChange}
            />

            {/* + Button for Document Upload */}
            <button
              onClick={() => document.getElementById("file-upload").click()}
              className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <AiOutlinePlus size={28} />
            </button>

            {/* Text Input */}
            <form onSubmit={handleTextSubmit} className="flex flex-1">
              <input
                type="text"
                name="userInput"
                placeholder="Type your response..."
                className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </form>

            {/* Mic Button */}
            <button
              onClick={handleListen}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all"
            >
              <span className="material-symbols-rounded text-2xl">
                {isListening ? 'stop' : 'mic'}
              </span>
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VoiceAssistant