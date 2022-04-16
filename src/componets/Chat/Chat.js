import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../index";
import Spinner from "../Spinner/Spinner";
import s from "./Chat.module.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import Rooms from "../Rooms/Rooms";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const db = firebase.firestore();

  const [messages, loading] = useCollectionData(
    db.collection("messages").orderBy("createdAt")
  );

  // const [collection] = useCollectionData(db.collection("messages"));

  const answerChuck = async (e) => {
    // e.preventDefault();

    await fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        firestore.collection("messages").add({
          uid: data.id,
          displayName: "Chuck Norris",
          photoURL:
            data.icon_url !== false
              ? "https://img.icons8.com/plasticine/400/chuck-norris.png"
              : data.icon_url,
          text: data.value,
          createdAt: firebase.firestore.Timestamp.now().toDate(),
        });
        console.log(data);
      });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.Timestamp.now().toDate(),
    });
    setValue("");
    answerChuck();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={s.container}>
      <div className={s.chat_view}>
        <Rooms />
        <form className={s.form}>
          <div className={s.chat}>
            {messages.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  // backgroundColor: user.uid === item.uid ? "green" : "red",
                  // marginRight: user.uid === item.uid ? "auto" : "auto",
                }}
              >
                <div className={s.photoMessage}>
                  <img src={item.photoURL} alt="avatar" className={s.avatar} />
                  {/* <div>{item.displayName}</div> */}
                  <div
                    style={{
                      backgroundColor:
                        user.uid === item.uid ? "lightgrey" : "black",
                      color: user.uid === item.uid ? "black" : "white",
                      marginRight: user.uid === item.uid ? "auto" : "auto",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
                {/* <div>{item.createdAt.toDate().toDateString()}</div> */}
                <div className={s.date}>
                  {item.createdAt.toDate().toISOString().slice(0, 19)}
                </div>
              </div>
            ))}
          </div>
          <div className={s.send_group}>
            <input
              className={s.input}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={s.btn}
              onClick={(e) => {
                e.preventDefault();
                sendMessage(e);
              }}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
