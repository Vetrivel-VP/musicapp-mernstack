import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config/firebase.config";
import { validateUser } from "./api";

function App() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [user, setUser] = useState(null);

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
          window.localStorage.setItem("auth", "true");
          console.log(token);
          // validateUser(token).then((data) => {
          //   console.log(data);
          //   setUser(data);
          // });
        });
      } else {
        setAuth(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      {auth ? <h1>To do</h1> : <button onClick={loginWithGoogle}>Login</button>}
    </div>
  );
}

export default App;
