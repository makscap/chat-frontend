import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRouter from "./componets/AppRouter/AppRouter";
import NavBar from "./componets/NavBar/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import Spinner from "./componets/Spinner/Spinner";
import s from "./App.scss";

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <div className="app_position">
        <NavBar />
        <AppRouter />
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
