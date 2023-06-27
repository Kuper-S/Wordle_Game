import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContriGraph from "../../assets/contrigraph.svg";
import "./Landing.css";


const Landing = () => {
  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } },
  };

  
  return (
    <div className="landing">
      <motion.div
        className="wrapper"
        initial="hidden"
        animate="visible"
        variants={logoVariants}
      >
      
        <motion.h1 className="landing_title">Are you GOOD enough?</motion.h1>
        <motion.p className="landing_p">Guess the Word and be the CHAMP</motion.p>
        
        <Link to="/login" class>
          Sing IN<i className="fa-solid fa-arrow-right"></i>
        </Link>
        <motion.p className="landing_p">or</motion.p>
        <Link to="/login" class>
          Sing UP<i className="fa-solid fa-arrow-right"></i>
        </Link>
      <img src={ContriGraph} alt="" className="graph" />
      </motion.div>
     
    </div>
  );
};

export default Landing;
