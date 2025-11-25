import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    fadeDirection: number;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const particles: Particle[] = [];
        const particleCount = 120; // More particles for intensity

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1; // Faster speed

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 1, // Larger particles
                speedX: Math.cos(angle) * speed, // Diagonal X movement
                speedY: Math.sin(angle) * speed, // Diagonal Y movement
                opacity: Math.random(),
                fadeDirection: Math.random() > 0.5 ? 1 : -1
            });
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position (diagonal movement)
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around screen edges
                if (particle.x < -10) particle.x = canvas.width + 10;
                if (particle.x > canvas.width + 10) particle.x = -10;
                if (particle.y < -10) particle.y = canvas.height + 10;
                if (particle.y > canvas.height + 10) particle.y = -10;

                // Update opacity (faster blinking)
                particle.opacity += particle.fadeDirection * 0.02;
                if (particle.opacity >= 1) {
                    particle.opacity = 1;
                    particle.fadeDirection = -1;
                } else if (particle.opacity <= 0.1) {
                    particle.opacity = 0.1;
                    particle.fadeDirection = 1;
                }

                // Draw particle with glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
