import { createContext, useEffect, useState } from "react";
import { auth } from '../assets/firebase';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [loggedUser, setLoggedUser] = useState(null);

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
      .catch((error) => console.log(error.message));
  }

  function signInWithEmail(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) setLoggedUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
    })
  }

  function signOut() {
    auth.signOut()
      .then(() => {
        window.location.replace('/');
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <AuthContext.Provider value={{
      loggedUser,
      signInWithEmail,
      signOut,
      registerUser
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}
