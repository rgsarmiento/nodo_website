import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ChristmasPromoModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Delay initial render to allow animation
        const timer = setTimeout(() => {
            setShouldRender(true);
            // Small delay after render to trigger CSS transition
            requestAnimationFrame(() => setIsVisible(true));
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500); // Wait for animation to finish
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 transition-all duration-500 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none pointer-events-none'
                }`}
            onClick={handleClose}
        >
            <div
                className={`relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                style={{
                    backgroundImage: 'url(/nodo_promo_woman_final_1764091136520.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '500px'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gradient Overlay for better text readability if needed, but we use a card */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent"></div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 text-white transition-all"
                >
                    <X size={24} />
                </button>

                {/* Content Container - Positioning similar to reference */}
                <div className="absolute inset-0 flex items-center justify-end p-6 md:p-12">
                    {/* Glass Card */}
                    <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transform transition-transform hover:scale-[1.02]">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-1 w-8 bg-cyan-400 rounded-full"></div>
                            <p className="text-gray-300 font-medium text-sm tracking-wide uppercase">
                                Del 24 Nov al 15 Dic
                            </p>
                        </div>

                        {/* Main Offer */}
                        <div className="space-y-2 mb-8">
                            <h2 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 leading-none tracking-tighter">
                                30%
                                <span className="text-4xl md:text-5xl ml-2 text-white">OFF</span>
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                EN LICENCIA
                                <br />
                                <span className="text-purple-300">ANUAL + FOLIOS</span>
                            </h3>
                        </div>

                        {/* Features/Bullets */}
                        <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                <span>Folios <strong>SIN caducidad</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                <span>Facturación <strong>Ilimitada</strong></span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href="#pricing"
                            onClick={handleClose}
                            className="block w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-center py-4 rounded-xl transition-colors shadow-lg shadow-cyan-400/20"
                        >
                            QUIERO MI DESCUENTO
                        </a>

                        <p className="text-center text-gray-500 text-xs mt-4 cursor-pointer hover:text-gray-400" onClick={handleClose}>
                            No gracias, ver precios normales
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
