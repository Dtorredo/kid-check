import React from "react";
import { useState } from "react-dom/client";
import './App.css'; // Import the CSS file

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="social">
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-facebook-messenger"></i></a>
          <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
        </div>

        <p className="copyright">Derrick @2025</p>
      </section>
    </>
  );
}

export default Footer;