import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-luxury-gradient" />
                {/* Radial glow effects */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-royal/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[150px]" />
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none z-10"
                    style={{
                        width: `${2 + (i % 3)}px`,
                        height: `${2 + (i % 3)}px`,
                        left: `${5 + i * 8}%`,
                        top: `${15 + (i % 5) * 15}%`,
                        background: i % 3 === 0 ? '#F5C842' : i % 3 === 1 ? '#9BA3BB' : '#9B6FD0',
                        opacity: 0.4,
                    }}
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-24"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <div className="flex items-center gap-1.5 px-4 py-1.5 glass-gold rounded-full">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        <span className="text-gold text-xs font-bold tracking-widest uppercase">
                            Faith-Based Entertainment
                        </span>
                        <Star className="w-3 h-3 text-gold fill-gold" />
                    </div>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] mb-6"
                >
                    <span className="text-cream">Faith. Learning.</span>
                    <br />
                    <span className="gradient-text-gold">Growing Together.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-4 leading-relaxed"
                >
                    A platform where children and teenagers grow in faith, discover their talents,
                    and experience the Love of Christ through the greatest stories ever told — through entertainment they love.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-sm text-gold/70 italic mb-10"
                >
                    "Train up a child in the way he should go..." — Proverbs 22:6
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link to="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group btn-gold text-base px-8 py-4 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Begin the Journey
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-ghost text-base px-8 py-4 flex items-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Watch Trailer
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-white/5"
                >
                    {[
                        { value: '500+', label: 'Bible Stories' },
                        { value: '12+', label: 'Content Categories' },
                        { value: '2', label: 'Character Families' },
                        { value: '∞', label: 'Growing Like Jesus' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-display font-black gradient-text-gold">{stat.value}</div>
                            <div className="text-xs text-cream/40 uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-choc-dark to-transparent z-20" />

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-cream/20 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-cream/20 to-transparent" />
            </motion.div>
        </div>
    );
};

export default Hero;
