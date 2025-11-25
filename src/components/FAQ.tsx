import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 1,
        question: '¿Qué es la facturación electrónica?',
        answer: 'Es un sistema para emitir y recibir facturas de venta en formato electrónico. Debe ser verificada por la DIAN antes de ser entregada al comprador y se requiere un software en la nube como Nodo para crear el documento correctamente.'
    },
    {
        id: 2,
        question: '¿Es obligatoria la facturación electrónica?',
        answer: 'Sí, en Colombia la facturación electrónica es obligatoria para todos los contribuyentes según la normativa de la DIAN. Nodo te ayuda a cumplir con esta obligación de manera sencilla y automática.'
    },
    {
        id: 3,
        question: '¿Está segura mi información con Nodo?',
        answer: 'Absolutamente. Nodo utiliza encriptación de nivel empresarial y almacenamiento seguro en la nube. Además, realizamos copias de seguridad automáticas diarias para garantizar que tu información nunca se pierda.'
    },
    {
        id: 4,
        question: '¿Qué debo tener en cuenta antes de empezar?',
        answer: 'Necesitas tener tu RUT actualizado, un certificado digital de firma electrónica, y estar registrado ante la DIAN como facturador electrónico. Nuestro equipo te guía en todo el proceso de configuración inicial.'
    },
    {
        id: 5,
        question: '¿Quiénes pueden facturar?',
        answer: 'Cualquier persona natural o jurídica que esté obligada a expedir factura de venta puede usar Nodo. Esto incluye comerciantes, prestadores de servicios, profesionales independientes, y todo tipo de negocios.'
    },
    {
        id: 6,
        question: '¿Mi computador debe tener alguna característica especial?',
        answer: 'No. Nodo funciona en cualquier computador con Windows (7 o superior) y solo necesitas 4GB de RAM mínimo. También funciona sin internet, sincronizando automáticamente cuando recuperes la conexión.'
    },
    {
        id: 7,
        question: '¿Puedo usar Nodo en varias sucursales?',
        answer: 'Sí, Nodo cuenta con funcionalidad multi-sucursal y multi-caja. Puedes sincronizar inventarios, ventas y clientes en tiempo real entre todas tus ubicaciones con Nodo Sync.'
    },
    {
        id: 8,
        question: '¿Qué tipo de soporte ofrecen?',
        answer: 'Ofrecemos soporte técnico continuo vía WhatsApp, correo electrónico y llamadas telefónicas. Además, tu licencia anual incluye actualizaciones constantes del software sin costo adicional.'
    }
];

export default function FAQ() {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    const toggleFAQ = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
                    <p className="text-xl text-gray-600">
                        Verifica si tu inquietud se encuentra dentro de los siguientes tópicos
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const isExpanded = expandedId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    <ChevronDown
                                        size={24}
                                        className={`text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isExpanded && (
                                    <div className="px-6 pb-5 animate-fade-in">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 bg-nodo-purple text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/30"
                    >
                        Contáctanos
                    </a>
                </div>
            </div>
        </section>
    );
}
