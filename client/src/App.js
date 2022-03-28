import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./config/firebase.config";
import Todo from "./components/Todo";

function App() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }
    });
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          setToken(token);
          window.localStorage.setItem("auth", "true");
        });
      }
    });
  }, []);

  return (
    <div className="App">
      {auth ? (
        <Todo token={token} />
      ) : (
        <button onClick={loginWithGoogle}>Login</button>
      )}
    </div>
  );
}

export default App;
