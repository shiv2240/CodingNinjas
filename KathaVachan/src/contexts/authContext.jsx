import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

   
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

   
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

   
    function logout() {
        return signOut(auth);
    }

    
    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout, googleSignIn }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
}
