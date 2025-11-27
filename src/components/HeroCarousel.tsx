import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pricingData from '../data/pricing.json';
import { isOfferActive } from '../utils/offerUtils';

const productSlide = {
    id: 1,
    image: '/images/ventanas_nodo.png',
    alt: 'May Osorio - Asistente Virtual Nodo',
    isPromo: false
};

const promoSlide = {
    id: 2,
    image: pricingData.offer.promo.backgroundImage,
    alt: 'Oferta Navideña Nodo',
    isPromo: true
};

export default function HeroCarousel() {
    const [slides, setSlides] = useState([productSlide]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        // Check if offer is active and update slides accordingly
        const offerActive = isOfferActive(pricingData.offer);
        setSlides(offerActive ? [productSlide, promoSlide] : [productSlide]);
    }, []);

    useEffect(() => {
        if (isPaused || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, [isPaused, slides.length]);

    const nextSlide = () => {
        if (slides.length > 1) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        if (slides.length > 1) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
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
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />

                        {/* Overlay de oferta para slide promocional - Posicionado abajo */}
                        {slide.isPromo && (
                            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center p-4 pb-8">
                                <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-cyan-400/30 max-w-md w-full animate-fade-in">
                                    {/* Etiqueta superior */}
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <div className="h-px w-8 bg-cyan-400"></div>
                                        <p className="text-cyan-400 text-xs md:text-sm font-bold tracking-wider uppercase">
                                            {pricingData.offer.promo.title}
                                        </p>
                                        <div className="h-px w-8 bg-cyan-400"></div>
                                    </div>

                                    {/* Descuento principal */}
                                    <div className="text-center mb-4">
                                        <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 animate-pulse">
                                            {pricingData.offer.promo.discount}
                                        </h2>
                                        <p className="text-white text-lg md:text-xl font-bold tracking-wide">
                                            {pricingData.offer.promo.subtitle}
                                        </p>
                                    </div>

                                    {/* Botón CTA */}
                                    <a
                                        href={pricingData.offer.promo.buttonLink}
                                        className="block w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-900 font-bold text-base md:text-lg py-3 px-6 rounded-full transition-all transform hover:scale-105 hover:shadow-xl shadow-cyan-500/50 text-center"
                                    >
                                        {pricingData.offer.promo.buttonText}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Navigation arrows - only show if there are multiple slides */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
