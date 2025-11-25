import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-nodo-purple to-purple-800 shadow-lg' : 'bg-gradient-to-r from-nodo-purple to-purple-800'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img src="/images/logo-nodo.png" alt="Nodo" className="h-10" />
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-white/90 hover:text-white font-medium transition-colors">Características</a>
            <a href="#pricing" className="text-white/90 hover:text-white font-medium transition-colors">Precios</a>
            <a href="#testimonials" className="text-white/90 hover:text-white font-medium transition-colors">Testimonios</a>
            <a href="#faq" className="text-white/90 hover:text-white font-medium transition-colors">FAQ</a>
            <a href="#contact" className="px-6 py-2.5 rounded-full bg-white text-nodo-purple font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Contacto
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <a href="#features" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-nodo-purple hover:bg-purple-50">Características</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-nodo-purple hover:bg-purple-50">Precios</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-nodo-purple hover:bg-purple-50">Testimonios</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-nodo-purple hover:bg-purple-50">FAQ</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-nodo-purple font-bold hover:bg-purple-50">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
}
