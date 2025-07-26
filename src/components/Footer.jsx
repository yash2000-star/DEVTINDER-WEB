import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 text-sm text-slate-500">
      <div className="border-t border-slate-900/10 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} DevTinder. All Rights Reserved.</p>
        <nav className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
          <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;