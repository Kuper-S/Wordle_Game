import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContriGraph from "../../assets/contrigraph.svg";
import "./Landing.css";


const Landing = () => {
  return (
    <div className="landing">
      <div className="wrapper">
     
        <h1>Are you GOOD enough?</h1>
        <p>Guess the Word and be the CHAMP</p>
        <Link to="/signin">
          Sing Up<i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <img src={ContriGraph} alt="" className="graph" />

     
    </div>
  );
};

export default Landing;
