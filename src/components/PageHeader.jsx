import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrollFillWordCSS from './ScrollFillWordCSS';
import './PageHeader.css';

export default function PageHeader() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contacto' }
  ];

  return (
    <header className="page-header">
      <div className="page-header-container grid grid-cols-3">
        {/* Logo */}
        <Link to="/" className="page-header-logo">
          <div style={{ width: 140, height: 32 }}>
            <ScrollFillWordCSS
              text="KUNORO"
              height={32}
              base="#ffffff"      
              fill="#85c500"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="page-header-nav syne-font flex justify-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`page-header-nav-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        

       
        {/* CTA Button */}
       <div className='flex justify-end itens-center gap-5'>
        <div className="flex items-center">
          <div class="available">Disponible para trabajar</div>
        </div>
        <Link to="/contacto" className="page-header-cta syne-font">
            <span>Empezar</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
       </div>
      </div>
    </header>
  );
}
