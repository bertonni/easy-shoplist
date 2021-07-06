import { createContext, useEffect, useState } from "react";
import { auth } from '../assets/firebase';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedUser(user);
      }
    })
    return () => {
      setLoggedUser(null);
      unsubscribe();
    }
  }, [])

  function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoggedUser(userCredential.user);
      })
      .catch((error) => setError(error.message));
  }

  function signInWithEmail(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) setLoggedUser(userCredential.user);
        window.location.replace('/');
      })
      .catch((error) => setError(error.message));
  }

  function signOut() {
    auth.signOut()
      .then(() => {
        window.location.replace('/');
      })
      .catch((error) => setError(error.message))
  }

  return (
    <AuthContext.Provider value={{
      loggedUser,
      error,
      setError,
      signInWithEmail,
      signOut,
      registerUser
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}
