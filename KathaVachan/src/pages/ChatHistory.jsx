import { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ChatHistory = ({ userId, onChatSelect, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!userId) return;

    const chatRef = ref(db, `users/${userId}/chats`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatList = Object.keys(data).map((chatId) => ({
          id: chatId,
          address: data[chatId].address || "Unknown Address",
          date: data[chatId].date || new Date().toISOString(),
          status: data[chatId].status || "pending",
        }));
        setChats(chatList);
      }
    });
  }, [userId]);

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

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || chat.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Conversation History</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">search</span>
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <span className="material-symbols-rounded absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl p-4 cursor-pointer transition ${selectedChatId === chat.id ? "bg-primary text-white" : ""}`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">eKatha-id: {chat.id}</h3>
                <p className="text-secondary text-sm">{chat.address}</p>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  chat.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {chat.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-secondary text-sm">
                <span className="material-symbols-rounded text-sm mr-1">schedule</span>
                {formatDate(chat.date)}
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1 text-secondary hover:text-primary transition">
                  <span className="material-symbols-rounded text-sm">download</span>
                </button>
                <button className="p-1 text-secondary hover:text-primary transition">
                  <span className="material-symbols-rounded text-sm">visibility</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;