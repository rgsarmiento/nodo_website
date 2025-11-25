import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface FormStatus {
    type: 'success' | 'error' | null;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Por favor completa todos los campos requeridos.'
            });
            return;
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({
                type: 'error',
                message: 'Por favor ingresa un correo electrónico válido.'
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        // Simular envío (aquí conectarías con tu API)
        setTimeout(() => {
            setStatus({
                type: 'success',
                message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
            });
            setIsSubmitting(false);

            // Limpiar formulario
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                setStatus({ type: null, message: '' });
            }, 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contáctanos</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            ¿Listo para llevar tu negocio al siguiente nivel? Escríbenos y un asesor te contactará en breve.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-nodo-purple shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Teléfono / WhatsApp</h3>
                                    <p className="text-gray-600">+57 300 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-nodo-purple shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Correo Electrónico</h3>
                                    <p className="text-gray-600">contacto@nodo.devpscol.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-nodo-purple shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Ubicación</h3>
                                    <p className="text-gray-600">Colombia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        {status.type && (
                            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${status.type === 'success'
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-red-50 border border-red-200'
                                }`}>
                                {status.type === 'success' ? (
                                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                                ) : (
                                    <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                                )}
                                <p className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                                    {status.message}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-nodo-purple focus:border-transparent outline-none transition-shadow"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-nodo-purple focus:border-transparent outline-none transition-shadow"
                                        placeholder="Tu teléfono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-nodo-purple focus:border-transparent outline-none transition-shadow"
                                    placeholder="tu@correo.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mensaje <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-nodo-purple focus:border-transparent outline-none transition-shadow"
                                    placeholder="¿En qué podemos ayudarte?"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 font-bold rounded-lg transition-colors shadow-lg ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-nodo-purple text-white hover:bg-purple-700 hover:shadow-purple-500/30'
                                    }`}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
