import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    business: string;
    software: string;
    rating: number;
    comment: string;
    initials: string;
    color: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'La Casa del Caficultor',
        business: 'Distribuidora de Café',
        software: 'Nodo - Facturación Electrónica',
        rating: 5,
        comment: 'Excelente software, fácil de manejar y muy completo. Ha mejorado significativamente nuestro trabajo, lo recomiendo.',
        initials: 'LC',
        color: 'bg-orange-500'
    },
    {
        id: 2,
        name: 'ConstruArvir',
        business: 'Ferretería y Construcción',
        software: 'Nodo - Facturación Electrónica',
        rating: 5,
        comment: 'El software me ha parecido muy bien, por ese medio hemos llevado un mejor control. Solo le añadiría la parte de dejarme imprimir la de los abonos, pero del resto muy bien, las atenciones súper buenas están muy pendientes de cómo vamos. Si lo necesita mejorar algo, la verdad súper recomendados, muchas gracias por su buen servicio.',
        initials: 'CO',
        color: 'bg-pink-500'
    },
    {
        id: 3,
        name: 'Oral Center',
        business: 'Consultorio Odontológico',
        software: 'Nodo POS',
        rating: 5,
        comment: 'Excelente servicio, fácil y rápido y sus colaboradores 👍 recomendado 100 de 100.',
        initials: 'OC',
        color: 'bg-cyan-500'
    },
    {
        id: 4,
        name: 'Supermercado El Ahorro',
        business: 'Minisuper',
        software: 'Nodo POS',
        rating: 5,
        comment: 'Desde que implementamos Nodo nuestras ventas son más rápidas y el control de inventario es impecable. El soporte técnico siempre está disponible.',
        initials: 'SA',
        color: 'bg-green-500'
    },
    {
        id: 5,
        name: 'Farmacia Santa Rosa',
        business: 'Farmacia',
        software: 'Nodo - Facturación Electrónica',
        rating: 5,
        comment: 'La integración con INVIMA y el control de lotes nos ha facilitado mucho el cumplimiento normativo. Muy recomendado para farmacias.',
        initials: 'FR',
        color: 'bg-blue-500'
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return visible;
    };

    return (
        <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Testimonios</h2>
                    <p className="text-xl text-gray-600">Lo que nuestros clientes dicen sobre Nodo</p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-nodo-purple hover:shadow-xl transition-all"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-nodo-purple hover:shadow-xl transition-all"
                        aria-label="Siguiente"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {getVisibleTestimonials().map((testimonial, idx) => (
                            <div
                                key={`${testimonial.id}-${idx}`}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                {/* Avatar */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className={`w-20 h-20 ${testimonial.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                                        {testimonial.initials}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg text-center">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500 text-center">{testimonial.business}</p>
                                </div>

                                {/* Software & Rating */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-semibold">Software:</span> {testimonial.software}
                                    </p>
                                    <div className="flex items-center gap-1 mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Calificación:</span>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>

                                {/* Comment */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Comentarios:</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{testimonial.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-nodo-purple w-8' : 'bg-gray-300'
                                    }`}
                                aria-label={`Ir a testimonio ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
