import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD7t8VfyOJTCFP8vkkOmbWZ726IJOYory4",
  authDomain: "chat-react-34a09.firebaseapp.com",
  projectId: "chat-react-34a09",
  storageBucket: "chat-react-34a09.appspot.com",
  messagingSenderId: "765249419270",
  appId: "1:765249419270:web:ebbd7eded2e5db266ceb87",
  measurementId: "G-Q8LEHMHL6X",
});
export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ firebase, auth, firestore }}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Context.Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
