import React, { useEffect, useState } from 'react';

interface Avatar {
    id: number;
    image: string;
    visible: boolean;
    x: number;
    y: number;
    size: number;
    shape: 'circle' | 'square' | 'rounded';
}

const avatarImages = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=9',
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=13',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=16',
    'https://i.pravatar.cc/150?img=20',
    'https://i.pravatar.cc/150?img=25',
    'https://i.pravatar.cc/150?img=30',
    'https://i.pravatar.cc/150?img=32',
    'https://i.pravatar.cc/150?img=33',
    'https://i.pravatar.cc/150?img=36',
    'https://i.pravatar.cc/150?img=40',
    'https://i.pravatar.cc/150?img=44'
];

const shapes: Array<'circle' | 'square' | 'rounded'> = ['circle', 'square', 'rounded'];

const generateAvatars = (): Avatar[] => {
    const positions = [
        // Row 1
        { x: 10, y: 15 }, { x: 20, y: 12 }, { x: 30, y: 18 }, { x: 40, y: 15 },
        { x: 50, y: 12 }, { x: 60, y: 18 }, { x: 70, y: 15 }, { x: 80, y: 12 }, { x: 90, y: 15 },
        // Row 2
        { x: 15, y: 30 }, { x: 25, y: 28 }, { x: 35, y: 32 }, { x: 45, y: 30 },
        { x: 55, y: 28 }, { x: 65, y: 32 }, { x: 75, y: 30 }, { x: 85, y: 28 },
        // Row 3 (middle)
        { x: 8, y: 50 }, { x: 18, y: 48 }, { x: 82, y: 50 }, { x: 92, y: 48 },
        // Row 4
        { x: 15, y: 68 }, { x: 25, y: 70 }, { x: 35, y: 66 }, { x: 45, y: 68 },
        { x: 55, y: 70 }, { x: 65, y: 66 }, { x: 75, y: 68 }, { x: 85, y: 70 },
        // Row 5
        { x: 10, y: 85 }, { x: 20, y: 82 }, { x: 30, y: 88 }, { x: 40, y: 85 },
        { x: 50, y: 82 }, { x: 60, y: 88 }, { x: 70, y: 85 }, { x: 80, y: 82 }, { x: 90, y: 85 }
    ];

    return positions.map((pos, index) => ({
        id: index,
        image: avatarImages[index % avatarImages.length],
        visible: Math.random() > 0.15,
        x: pos.x,
        y: pos.y,
        size: Math.random() * 20 + 50,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));
};

const getShapeClass = (shape: 'circle' | 'square' | 'rounded') => {
    switch (shape) {
        case 'circle':
            return 'rounded-full';
        case 'square':
            return 'rounded-none';
        case 'rounded':
            return 'rounded-2xl';
    }
};

export default function SocialProof() {
    const [avatars, setAvatars] = useState<Avatar[]>(generateAvatars());

    useEffect(() => {
        const interval = setInterval(() => {
            setAvatars(prev => prev.map(avatar => {
                const shouldChange = Math.random() > 0.85;
                if (shouldChange) {
                    return {
                        ...avatar,
                        visible: Math.random() > 0.15,
                        image: avatarImages[Math.floor(Math.random() * avatarImages.length)],
                        shape: shapes[Math.floor(Math.random() * shapes.length)]
                    };
                }
                return avatar;
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Arrow image from testimonials */}
                <div className="absolute -top-20 left-8 md:left-16 w-32 h-48 z-20">
                    <img
                        src="https://odoocdn.com/openerp_website/static/src/img/graphics/arrow_doodle_4.svg"
                        alt="Arrow"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Avatars Container */}
                <div className="relative min-h-[500px] md:min-h-[600px]">
                    {/* Avatars */}
                    {avatars.map((avatar) => (
                        <div
                            key={avatar.id}
                            className={`absolute transition-all duration-700 ${avatar.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                }`}
                            style={{
                                left: `${avatar.x}%`,
                                top: `${avatar.y}%`,
                                transform: 'translate(-50%, -50%)',
                                width: `${avatar.size}px`,
                                height: `${avatar.size}px`
                            }}
                        >
                            <div className={`w-full h-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 ${getShapeClass(avatar.shape)}`}>
                                {avatar.visible && (
                                    <img
                                        src={avatar.image}
                                        alt="Usuario"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Placeholder shapes */}
                    {[...Array(12)].map((_, i) => {
                        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
                        return (
                            <div
                                key={`placeholder-${i}`}
                                className={`absolute bg-gray-300 opacity-10 ${getShapeClass(randomShape)}`}
                                style={{
                                    left: `${Math.random() * 90 + 5}%`,
                                    top: `${Math.random() * 90 + 5}%`,
                                    transform: 'translate(-50%, -50%)',
                                    width: `${Math.random() * 30 + 40}px`,
                                    height: `${Math.random() * 30 + 40}px`
                                }}
                            />
                        );
                    })}

                    {/* Text with transparent background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full max-w-3xl px-4">
                        <div className="bg-pink-100/40 backdrop-blur-sm rounded-[100px] px-8 py-12 md:px-12 md:py-16">
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Únete a los cientos de usuarios
                            </h2>
                            <p className="text-lg md:text-xl text-gray-700 font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                que hacen crecer su negocio con Nodo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
