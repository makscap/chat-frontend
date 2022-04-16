import React, { useContext } from "react";
import s from "./Login.module.scss";
import { Context } from "../../index";
import firebase from "firebase/compat/app";

function Login() {
  const { auth } = useContext(Context);

  const login = async (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };
  return (
    <div className={s.container}>
      <div className={s.login_form}>
        <form className={s.form}>
          <button onClick={login} className={s.btn}>
            Sign in with GOOGLE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
