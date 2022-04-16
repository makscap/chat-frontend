import React from "react";
import { RotatingLines } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={s.spinner}>
      <RotatingLines type="Puff" strokeColor="#6495ED" height={80} width={80} />
    </div>
  );
}

export default Spinner;
