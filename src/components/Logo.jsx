import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md' }) => {
    const sizes = {
        sm: 'text-xl md:text-2xl',
        md: 'text-2xl md:text-3xl',
        lg: 'text-4xl md:text-5xl',
        xl: 'text-5xl md:text-7xl',
    };

    return (
        <div className="relative group cursor-pointer select-none">
            {/* Glow halo */}
            <motion.div
                className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(ellipse, rgba(245,200,66,0.15) 0%, transparent 70%)',
                }}
            />

            {/* Cross icon */}
            <div className="flex items-center gap-2">
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-80">
                        <rect x="8" y="1" width="4" height="18" rx="2" fill="url(#logoGrad)" />
                        <rect x="1" y="6" width="18" height="4" rx="2" fill="url(#logoGrad)" />
                        <defs>
                            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#C9A227" />
                                <stop offset="100%" stopColor="#FFE08A" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                <h1 className={`relative z-10 ${sizes[size]} font-display font-black tracking-tight`}>
                    <span className="text-cream">CHRIST</span>
                    <span className="gradient-text-gold">TOONS</span>
                </h1>
            </div>
        </div>
    );
};

export default Logo;
