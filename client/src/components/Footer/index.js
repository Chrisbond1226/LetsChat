import React from "react";

// We can add more character to this

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">&copy;{new Date().getFullYear()} by Chris</div>
    </footer>
  );
};

export default Footer;
