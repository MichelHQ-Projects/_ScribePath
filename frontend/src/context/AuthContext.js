import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(); // ✅ Create AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("User state changed:", firebaseUser); // ✅ Debugging
  
      if (firebaseUser) {
        try {
          const userToken = await firebaseUser.getIdToken(true); // ✅ Force refresh token
          console.log("User Token Retrieved:", token);
          setUser(firebaseUser);
          setToken(userToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  // ✅ Refresh token on expiration
  useEffect(() => {
    if (user) {
      const interval = setInterval(async () => {
        const newToken = await user.getIdToken(true); // Force refresh token
        setToken(newToken);
      }, 55 * 60 * 1000); // Refresh every 55 minutes

      return () => clearInterval(interval);
    }
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null); // ✅ Clear token on logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);