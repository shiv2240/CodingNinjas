import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { getDatabase, ref, get, update } from "firebase/database";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout, currentUser } = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: "",
    });

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const profileRef = ref(db, `users/${currentUser.uid}/profile`); // ✅ Correct path

            get(profileRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val());
                }
            });
        }
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
        setIsOpen(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64String = reader.result;

            const db = getDatabase();
            const profileRef = ref(db, `users/${currentUser.uid}/profile`);
            await update(profileRef, { avatar: base64String });

            setUserData((prev) => ({ ...prev, avatar: base64String }));
        };
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200"
            >
                <img
                    src={userData.avatar || "https://i.pravatar.cc/150?img=68"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 glass rounded-xl shadow-lg overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 mr-3">
                                    <div className="h-12 w-12 rounded-full overflow-hidden">
                                        <img
                                            src={userData.avatar || "https://i.pravatar.cc/150?img=68"}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{userData.name || "User"}</h3>
                                    <p className="text-sm text-secondary">{userData.email || "email@example.com"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-2">
                            <label className="w-full text-left px-4 py-2 hover:bg-primary/10 transition flex items-center cursor-pointer">
                                <span className="material-symbols-rounded mr-3 text-secondary">image</span>
                                <span>Upload Photo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                            </label>

                            <button
                                className="w-full text-left px-4 py-2 hover:bg-primary/10 transition flex items-center"
                                onClick={() => navigate("/profile")}
                            >
                                <span className="material-symbols-rounded mr-3 text-secondary">account_circle</span>
                                <span>My Profile</span>
                            </button>

                            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                                <button
                                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center"
                                    onClick={handleLogout}
                                >
                                    <span className="material-symbols-rounded mr-3">logout</span>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;
