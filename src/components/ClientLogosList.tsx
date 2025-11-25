import React, { useState, useEffect } from 'react';

interface ClientLogosListProps {
    logos: string[];
}

export default function ClientLogosList({ logos }: ClientLogosListProps) {
    const [visibleLogos, setVisibleLogos] = useState<string[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        // Initialize
        setVisibleLogos(logos.slice(0, ITEMS_PER_PAGE));
    }, [logos]);

    useEffect(() => {
        if (logos.length <= ITEMS_PER_PAGE) return;

        const interval = setInterval(() => {
            setStartIndex((prevIndex) => {
                const nextIndex = (prevIndex + ITEMS_PER_PAGE) % logos.length;
                // If we reach the end and wrap around, we might want to slice differently
                // For simplicity, let's just rotate by page

                // Better rotation: Shift by 4 to keep some context or full page replacement
                // Let's do full page replacement for "disappear and appear new ones" effect

                // Calculate new slice
                let newLogos = [];
                for (let i = 0; i < ITEMS_PER_PAGE; i++) {
                    newLogos.push(logos[(nextIndex + i) % logos.length]);
                }
                setVisibleLogos(newLogos);
                return nextIndex;
            });
        }, 4000); // Rotate every 4 seconds

        return () => clearInterval(interval);
    }, [logos]);

    if (logos.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">
                    Añade los logos de tus clientes en la carpeta <code className="bg-gray-100 px-2 py-1 rounded">public/clients</code>
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center min-h-[200px]">
            {visibleLogos.map((logo, index) => (
                <div
                    key={`${logo}-${index}`} // Use index to force re-render for animation
                    className="w-full max-w-[180px] p-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                    <img
                        src={logo}
                        alt="Cliente Nodo"
                        className="w-full h-auto object-contain max-h-20"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
}
