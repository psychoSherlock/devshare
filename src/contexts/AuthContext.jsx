import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../fireConf";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const register = (fullName, email, password) => {
    // Will work on username later as it requires complex username checking
    let promise = new Promise(function (resolve, reject) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((ref) => {
          updateProfile(ref.user, {
            displayName: fullName,
          });
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };

  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      signInWithEmailAndPassword(auth, email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
  const signout = () => {
    return signOut(auth);
  };
  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);
  const value = {
    currentUser,
    register,
    signin,
    signout,
    passwordReset,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
