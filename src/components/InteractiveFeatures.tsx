import React, { useState } from 'react';
import { FileText, Package, Monitor, Settings, ChevronDown } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    details: string[];
}

const features: Feature[] = [
    {
        id: 'facturacion',
        title: 'Facturación Electrónica',
        icon: FileText,
        color: 'purple',
        details: [
            'Integración directa con DIAN sin intermediarios',
            'Generación automática de XML y firma digital',
            'CUFE y representación gráfica',
            'Notas crédito y débito',
            'Documento soporte y nómina',
            'Reenvío automático sin internet',
            'Envío al correo del cliente',
            'Cuadre tributario 100% confiable'
        ]
    },
    {
        id: 'inventario',
        title: 'Inventario Avanzado',
        icon: Package,
        color: 'blue',
        details: [
            'Control de lotes, series y fechas de vencimiento',
            'Soporte INVIMA',
            'Kardex por producto y almacén',
            'Costeo dinámico y recálculo automático',
            'Multi-almacén',
            'Códigos alternos por proveedor',
            'Precios múltiples y condicionados',
            'Movimientos: entradas, salidas, traslados'
        ]
    },
    {
        id: 'pos',
        title: 'Punto de Venta POS',
        icon: Monitor,
        color: 'orange',
        details: [
            'Interfaz táctil con imágenes',
            'Ventas rápidas y administrativas',
            'Integración con balanzas Magellan e Ishida',
            'Lectura de códigos de barras',
            'Productos por peso',
            'Múltiples medios de pago',
            'Cierres de caja completos',
            'Control de permisos por usuario'
        ]
    },
    {
        id: 'administrativo',
        title: 'Módulos Administrativos',
        icon: Settings,
        color: 'green',
        details: [
            'Compras y proveedores',
            'Gastos e ingresos',
            'Pedidos móviles',
            'Remisiones y cotizaciones',
            'Órdenes de servicio',
            'Reportes en tiempo real',
            'Multi-sucursal con Nodo Sync',
            'Actualizaciones constantes'
        ]
    }
];

const colorClasses: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100'
    },
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100'
    },
    orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100'
    },
    green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        iconBg: 'bg-green-100'
    }
};

export default function InteractiveFeatures() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleFeature = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Características en constante evolución
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Continuamente estamos innovando y hay nuevas características en Nodo.
                        Revísalas y comprueba por ti mismo el potencial que tiene.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        const colors = colorClasses[feature.color];
                        const isExpanded = expandedId === feature.id;

                        return (
                            <div
                                key={feature.id}
                                className={`rounded-2xl border-2 transition-all cursor-pointer ${isExpanded
                                        ? `${colors.border} ${colors.bg} shadow-lg`
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                    }`}
                                onClick={() => toggleFeature(feature.id)}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center ${colors.text}`}>
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                        </div>
                                        <ChevronDown
                                            size={24}
                                            className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                        />
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-6 pl-16 animate-fade-in">
                                            <ul className="space-y-2">
                                                {feature.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                        <span className={`${colors.text} mt-1 flex-shrink-0`}>✓</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
