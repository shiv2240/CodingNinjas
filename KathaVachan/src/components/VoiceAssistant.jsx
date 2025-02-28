import 'regenerator-runtime/runtime'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const VoiceAssistant = ({ onClose }) => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    propertyId: '',
    phoneNumber: '',
    email: '',
    propertyType: '',
  })
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your KathaVachan assistant. I can help you create your eKatha document for BBMP. What's your name?", isUser: false }
  ])
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      addMessage("Your browser doesn't support speech recognition. Please try using Chrome.", false)
    }
  }, [browserSupportsSpeechRecognition])

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { text, isUser }])
  }

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening()
      setIsListening(false)
      
      if (transcript) {
        addMessage(transcript, true)
        processUserInput(transcript)
      }
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: false })
      setIsListening(true)
    }
  }

  const processUserInput = (input) => {
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      switch (step) {
        case 0: // Name
          setFormData(prev => ({ ...prev, name: input }))
          addMessage(`Thanks, ${input}! Now, please tell me your property address.`, false)
          setStep(1)
          break
        case 1: // Address
          setFormData(prev => ({ ...prev, address: input }))
          addMessage("Great! What's your property ID or khata number?", false)
          setStep(2)
          break
        case 2: // Property ID
          setFormData(prev => ({ ...prev, propertyId: input }))
          addMessage("Thank you. What's your phone number?", false)
          setStep(3)
          break
        case 3: // Phone
          setFormData(prev => ({ ...prev, phoneNumber: input }))
          addMessage("Almost there! What's your email address?", false)
          setStep(4)
          break
        case 4: // Email
          setFormData(prev => ({ ...prev, email: input }))
          addMessage("Finally, what type of property is this? (Residential, Commercial, etc.)", false)
          setStep(5)
          break
        case 5: // Property Type
          setFormData(prev => ({ ...prev, propertyType: input }))
          addMessage("Thank you for providing all the information! I'm now creating your eKatha document. You'll receive it via email shortly.", false)
          setStep(6)
          break
        case 6:
          addMessage("Is there anything else you'd like to know about the eKatha process?", false)
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
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-rounded">support_agent</span>
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">KathaVachan Assistant</h3>
                <p className="text-sm text-secondary">{isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready'}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-secondary hover:text-dark dark:hover:text-light"
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${message.isUser ? 'ml-auto bg-primary/10' : 'mr-auto glass'} rounded-xl p-3 max-w-[80%]`}
              >
                <p className={message.isUser ? 'text-dark dark:text-light' : 'text-secondary'}>{message.text}</p>
              </div>
            ))}
            {isListening && (
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-100"></div>
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-200"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {step < 6 ? (
              <div className="flex items-center">
                <form onSubmit={handleTextSubmit} className="flex-1 mr-2">
                  <input
                    type="text"
                    name="userInput"
                    placeholder="Type your response..."
                    className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </form>
                <button
                  onClick={handleListen}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-primary hover:bg-blue-600'
                  } text-white`}
                >
                  <span className="material-symbols-rounded">
                    {isListening ? 'stop' : 'mic'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <span className="material-symbols-rounded text-5xl text-green-500">check_circle</span>
                  <h3 className="text-xl font-semibold mt-2">eKatha Application Submitted</h3>
                  <p className="text-secondary mt-1">Reference ID: KV{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition w-full"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VoiceAssistant