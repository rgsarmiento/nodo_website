import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/images/ventanas_nodo.png',
        alt: 'May Osorio - Asistente Virtual Nodo',
        isPromo: false
    },
    {
        id: 2,
        image: '/nodo_promo_woman_final_1764091136520.png',
        alt: 'Oferta Navideña Nodo',
        isPromo: true
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div
            className="relative w-full max-w-md lg:max-w-lg mx-auto aspect-square flex items-center justify-center group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`w-full h-full object-contain drop-shadow-2xl ${slide.isPromo ? 'rounded-2xl shadow-2xl border-4 border-white/20' : ''
                            }`}
                    />

                    {/* Promo Overlay */}
                    {slide.isPromo && (
                        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl text-center transform transition-transform duration-500 hover:scale-105">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-1 w-6 bg-cyan-400 rounded-full"></div>
                                <p className="text-gray-300 font-medium text-xs tracking-wide uppercase">
                                    Hasta el 15 Dic
                                </p>
                                <div className="h-1 w-6 bg-cyan-400 rounded-full"></div>
                            </div>
                            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 leading-none tracking-tighter mb-1">
                                30% <span className="text-2xl text-white">OFF</span>
                            </h2>
                            <h3 className="text-xl font-bold text-white leading-tight mb-3">
                                EN LICENCIA <span className="text-purple-300">ANUAL</span>
                            </h3>
                            <a href="#pricing" className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-sm px-6 py-2 rounded-full transition-colors">
                                QUIERO MI DESCUENTO
                            </a>
                        </div>
                    )}
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all text-white opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all text-white opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-cyan-400 w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
