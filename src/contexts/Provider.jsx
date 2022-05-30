import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";
import "firebase/compat/firestore";
import Loader from "../components/Loader";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AuthContext = React.createContext();

const useAuth = () => {
  const { auth, user } = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return { auth, user };
};

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.languageCode = "ind";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, loading }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { firebase, useAuth };
