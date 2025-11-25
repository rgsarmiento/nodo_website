import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientLogosListProps {
    logos: string[];
}

export default function ClientLogosList({ logos }: ClientLogosListProps) {
    const ITEMS_PER_PAGE = 8;
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    useEffect(() => {
        // Initial setup: Take the first 8 unique logos
        // If fewer than 8, just take all of them
        const initialIndices = logos.slice(0, ITEMS_PER_PAGE).map((_, i) => i);
        setActiveIndices(initialIndices);
    }, [logos]);

    useEffect(() => {
        // If we don't have enough logos to rotate (need at least ITEMS_PER_PAGE + 1), do nothing
        if (logos.length <= ITEMS_PER_PAGE) return;

        const interval = setInterval(() => {
            setActiveIndices((currentIndices) => {
                // 1. Identify which logos are NOT currently visible
                const allIndices = logos.map((_, i) => i);
                const availableIndices = allIndices.filter(i => !currentIndices.includes(i));

                // If no available logos to swap in, return current (shouldn't happen due to check above)
                if (availableIndices.length === 0) return currentIndices;

                // 2. Determine how many to swap
                // We want to swap 3, but we can't swap more than we have available
                const countToSwap = Math.min(3, availableIndices.length);

                // 3. Pick random slots to remove from the current view
                // We shuffle the current indices and pick the first 'countToSwap'
                const slotsToReplace = [...currentIndices]
                    .map((_, index) => index) // get slot indices 0..7
                    .sort(() => 0.5 - Math.random()) // shuffle
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
                // Key must be unique to the logo content to trigger animation on change
                // We use slotIndex + logoIndex to ensure it's unique per slot but changes when logo changes
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
                                    filter: 'grayscale(0%)', // Flash color on exit
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
