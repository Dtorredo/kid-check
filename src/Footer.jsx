import React from "react";
import { useState } from "react-dom/client";
import './App.css';
import { SocialIcon } from 'react-social-icons';

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="social">
          <SocialIcon url="https://instagram.com" />
          <SocialIcon url="https://x.com" />
          <SocialIcon url="https://facebook.com/messenger" />
          <SocialIcon url="https://github.com" />
        </div>

        <p className="copyright">Derrick @2025</p>
      </section>
    </>
  );
}

export default Footer;