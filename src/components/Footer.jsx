import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-base-200">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-base-content/60">
        
        <p>© {new Date().getFullYear()} DevTinder. All Rights Reserved.</p>
        
        <nav className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="link link-hover">About</a>
          <a href="#" className="link link-hover">Privacy</a>
          <a href="#" className="link link-hover">Terms</a>
          <a href="#" className="link link-hover">Help</a>
        </nav>
        
      </div>
    </footer>
  );
};

export default Footer;