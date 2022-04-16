import React, { useContext } from "react";
import s from "./NavBar.module.scss";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../index";

function NavBar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <div className={s.navbar}>
      <div>
        <a href="/">
          <img src={logo} alt="logo" width="60px" />
        </a>
      </div>
      <div>
        {user ? (
          <button onClick={() => auth.signOut()} className={s.btn}>
            LOGOUT
          </button>
        ) : (
          <NavLink to={LOGIN_ROUTE}>
            <button className={s.btn}>LOGIN</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
