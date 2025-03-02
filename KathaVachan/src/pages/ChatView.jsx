import { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { ref, onValue } from "firebase/database";
import { motion, AnimatePresence } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import VoiceAssistant from "../components/VoiceAssistant";

const ChatView = ({ userId, chatId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);

  useEffect(() => {
    if (!userId || !chatId) return;

    const messagesRef = ref(db, `users/${userId}/chats/${chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text,
          isUser: data[key].isUser || false,
        }));
        setMessages(messageList);
      }
    });
  }, [userId, chatId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);

    // Create a clone of the chat content for PDF generation
    const element = document.getElementById('chat-content').cloneNode(true);

    // Add a header to the PDF with better styling for visibility
    const header = document.createElement('div');
    header.innerHTML = `
      <div style="padding: 20px; text-align: center; margin-bottom: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h1 style="font-size: 24px; margin-bottom: 10px; color: #0071e3;">KathaVachan eKatha Conversation</h1>
        <p style="font-size: 16px; color: #333;">Property ID: ${chatId} | Date: ${formatDate(new Date())}</p>
      </div>
    `;
    element.prepend(header);

    // Style the messages for better PDF visibility
    const messages = element.querySelectorAll('div[class*="rounded-xl"]');
    messages.forEach(msg => {
      // Check if it's a user message or assistant message
      const isUserMessage = msg.classList.contains('bg-primary/10') || 
                           msg.classList.contains('ml-auto');
      
      // Apply appropriate styling
      msg.style.backgroundColor = isUserMessage ? 'black' : 'black';
      msg.style.border = isUserMessage ? '1px solid #cce5ff' : '1px solid #e6e6e6';
      msg.style.color = 'white';
      msg.style.padding = '10px 15px';
      msg.style.borderRadius = '8px';
      msg.style.marginBottom = '10px';
      msg.style.maxWidth = '80%';
      msg.style.marginLeft = isUserMessage ? 'auto' : '0';
      msg.style.marginRight = isUserMessage ? '0' : 'auto';
    });

    // Configure PDF options with better quality
    const options = {
      margin: [20, 20],
      filename: `KathaVachan_${chatId}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    // Generate PDF
    html2pdf().from(element).set(options).save().then(() => {
      setIsDownloading(false);
    });
  };

  const handleReopenChat = () => {
    setIsReopenModalOpen(true);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col h-[80vh]">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="mr-4 text-secondary hover:text-dark dark:hover:text-light"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <div>
            <h3 className="font-semibold">{chatId}</h3>
            <p className="text-secondary text-sm">Chat Details</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleReopenChat}
            className="flex items-center text-secondary hover:text-primary transition"
          >
            <span className="material-symbols-rounded mr-1">refresh</span>
            <span className="hidden sm:inline">Reopen</span>
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center text-secondary hover:text-primary transition"
          >
            <span className="material-symbols-rounded mr-1">
              {isDownloading ? 'hourglass_empty' : 'download'}
            </span>
            <span className="hidden sm:inline">
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Chat content */}
      <div 
        id="chat-content"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <div className="text-center text-secondary text-sm mb-4">
          <span>{formatDate(new Date())}</span>
        </div>
        
        {messages.map((message, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`${message.isUser ? 'ml-auto bg-primary/10' : 'mr-auto glass'} rounded-xl p-3 max-w-[80%]`}
          >
            <p className={message.isUser ? 'text-dark dark:text-light' : 'text-secondary'}>{message.text}</p>
          </motion.div>
        ))}
        
        {messages.length > 0 && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <span className="material-symbols-rounded mr-2">check_circle</span>
              eKatha Application Completed
            </div>
          </div>
        )}
      </div>
      
      {/* Reopen Chat Modal */}
      {isReopenModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="glass rounded-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <VoiceAssistant 
              onClose={() => setIsReopenModalOpen(false)} 
              initialMessages={messages}
              propertyData={{
                propertyId: chatId,
                address: "Chat Address"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;