import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientLogosListProps {
    apiEndpoint?: string;
}

export default function ClientLogosList({ apiEndpoint = '/api/client-logos.json' }: ClientLogosListProps) {
    const ITEMS_PER_PAGE = 8;
    const [logos, setLogos] = useState<string[]>([]);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch logos from API
    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                setLogos(data);

                // Initialize with first 8 logos
                const initialIndices = data.slice(0, ITEMS_PER_PAGE).map((_: any, i: number) => i);
                setActiveIndices(initialIndices);
            } catch (error) {
                console.error('Error fetching client logos:', error);
                setLogos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLogos();
    }, [apiEndpoint]);

    useEffect(() => {
        // If we don't have enough logos to rotate, do nothing
        if (logos.length <= ITEMS_PER_PAGE) return;

        const interval = setInterval(() => {
            setActiveIndices((currentIndices) => {
                // 1. Identify which logos are NOT currently visible
                const allIndices = logos.map((_, i) => i);
                const availableIndices = allIndices.filter(i => !currentIndices.includes(i));

                // If no available logos to swap in, return current
                if (availableIndices.length === 0) return currentIndices;

                // 2. Determine how many to swap (up to 3)
                const countToSwap = Math.min(3, availableIndices.length);

                // 3. Pick random slots to remove from the current view
                const slotsToReplace = [...currentIndices]
                    .map((_, index) => index)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, countToSwap);

                // 4. Pick random new logos from available
                const newLogos = [...availableIndices]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, countToSwap);

                // 5. Construct the new state
                const nextIndices = [...currentIndices];
                slotsToReplace.forEach((slotIndex, i) => {
                    nextIndices[slotIndex] = newLogos[i];
                });

                return nextIndices;
            });
        }, 3000); // Rotate every 3 seconds

        return () => clearInterval(interval);
    }, [logos]);

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Cargando logos...</p>
            </div>
        );
    }

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
            {activeIndices.map((logoIndex, slotIndex) => {
                const logoSrc = logos[logoIndex];
                const key = `slot-${slotIndex}-${logoIndex}`;

                return (
                    <div key={slotIndex} className="w-full h-24 flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'grayscale(100%)',
                                    transition: { duration: 0.8, ease: "easeOut" }
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.1,
                                    filter: 'grayscale(0%)',
                                    transition: { duration: 0.8, ease: "easeInOut" }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    filter: 'grayscale(0%)',
                                    transition: { duration: 0.3 }
                                }}
                                className="absolute inset-0 flex items-center justify-center p-4"
                            >
                                <img
                                    src={logoSrc}
                                    alt="Cliente Nodo"
                                    className="w-full h-full object-contain max-h-20"
                                    loading="lazy"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
