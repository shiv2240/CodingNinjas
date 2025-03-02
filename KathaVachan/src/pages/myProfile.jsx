import { useState, useEffect } from "react";
import { db } from "../firebaseConfig/firebase";
import { ref, get, update } from "firebase/database";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const profileRef = ref(db, `users/${currentUser.uid}/profile`);
      get(profileRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched user data:", data); // Debugging log
          setUserData(data);
        }
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!currentUser) return;
    const profileRef = ref(db, `users/${currentUser.uid}/profile`);
    await update(profileRef, userData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result;
      const profileRef = ref(db, `users/${currentUser.uid}/profile`);
      await update(profileRef, { avatar: base64String });
      setUserData((prev) => ({ ...prev, avatar: base64String }));
    };
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mt-10 mx-auto px-4 py-10"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white"
        >
          My Profile
        </motion.h1>

        <motion.div
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <motion.label className="relative cursor-pointer" whileHover={{ scale: 1.1 }}>
              <img
                src={userData.avatar || "https://i.pravatar.cc/150?img=68"}
                alt="Profile"
                className="w-24 h-24 rounded-full border"
              />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </motion.label>
          </div>

          <label className="block mb-2 text-gray-800 dark:text-gray-200 font-medium">Name</label>
          <motion.input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 border rounded mb-4"
            whileFocus={{ scale: 1.02 }}
          />

          <label className="block mb-2 text-gray-800 dark:text-gray-200 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            readOnly
            className="w-full p-2 border text-gray-800 dark:text-gray-200 rounded bg-gray-100 dark:bg-gray-700 mb-4"
          />

          <motion.button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Profile
          </motion.button>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">My Dashboard</h2>
          <div className="flex flex-col space-y-4">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard
            </motion.button>
            <motion.button
              onClick={() => navigate('/upload-documents')}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Documents
            </motion.button>
            <motion.button
              onClick={() => navigate('/view-status')}
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Application Status
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyProfile;