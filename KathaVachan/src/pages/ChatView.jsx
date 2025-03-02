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

    const userMessages = messages.filter(msg => msg.isUser);
    if (userMessages.length === 0) {
        alert("No user messages to download.");
        setIsDownloading(false);
        return;
    }

    const pageStyle = `
        .pdf-page {
            border: 0.5px solid black;
            padding: 30px;
            margin: 20px;
            background: #fff;
            box-sizing: border-box;
        }
        .message-box {
            background-color: #f5f5f5;
            color: #333;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 0.5px solid #aaa;
            font-size: 16px;
            line-height: 1.5;
            page-break-inside: avoid;
            box-sizing: border-box;
        }
    `;

    const pdfContent = document.createElement('div');
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    pdfContent.style.color = '#333';
    pdfContent.innerHTML = `<style>${pageStyle}</style>`;

    const mainPage = document.createElement('div');
    mainPage.classList.add('pdf-page');

    mainPage.innerHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="font-size: 16px; font-weight: bold;">ID: ${chatId}</p>
            <img src="./BBMP.png" alt="KathaVachan Logo" style="max-width: 120px;">
        </div>
        <h1 style="text-align: center; color: #333;">KathaVachan eKatha Validation</h1>
        <p style="text-align: center; font-size: 16px; font-weight: bold;">Property ID: ${chatId} | Date: ${formatDate(new Date())}</p>
        <hr style="margin: 20px 0; border: 1px solid #000;">
    `;

    mainPage.innerHTML += `<h2 style="text-align: left; color: black; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Your Responses:</h2>`;

    userMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-box');
        messageDiv.textContent = `${msg.text}`;
        mainPage.appendChild(messageDiv);
    });

    mainPage.innerHTML += `<div style="page-break-before: always;"></div>`;

    mainPage.innerHTML += `
        <h2 style="text-align: center; color: black; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Full Chat Transcript</h2>
    `;

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-box');
        messageDiv.innerHTML = msg.isUser 
  ? `<strong>User</strong> - ${msg.text}` 
  : `<strong>AI</strong> - ${msg.text}`;

        mainPage.appendChild(messageDiv);
    });

    mainPage.innerHTML += `
        <hr style="margin: 20px 0; border: 1px solid #000;">
        <div style="display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 16px; font-weight: bold; color: #333; display: flex; align-items: center;">
                <img src="/K_Gov.png" alt="Security Icon" style="max-width: 50px; margin-right: 5px; vertical-align: middle;"> Approved by KathaVachan
            </p>
        </div>
    `;

    pdfContent.appendChild(mainPage);

    const options = {
        margin: 10,
        filename: `KathaVachan_${chatId}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(pdfContent).set(options).save().then(() => {
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