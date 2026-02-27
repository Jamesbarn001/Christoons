import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoSplash = ({ onComplete }) => {
    const [show, setShow] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleEnter = () => {
        setShow(false);
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] bg-choc-dark flex items-center justify-center overflow-hidden"
                >
                    {/* Video Background */}
                    <video
                        className="opacity-75"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlay={() => setVideoLoaded(true)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            background: '#1A0A08',
                        }}
                    >
                        <source src="/assets/kling_20260218_Image_to_Video__Cinematic_4902_0.mp4" type="video/mp4" />
                    </video>

                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-choc-dark/70 via-choc-dark/40 to-choc-dark/80 z-10" />

                    {/* Radial glow center */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,200,66,0.08)_0%,_transparent_70%)] z-10" />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: videoLoaded ? 1 : 0.7, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="relative z-20 flex flex-col items-center text-center px-6"
                    >
                        {/* Cross emblem */}
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="mb-8"
                        >
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect x="20" y="4" width="8" height="40" rx="4" fill="url(#crossGrad)" />
                                <rect x="4" y="16" width="40" height="8" rx="4" fill="url(#crossGrad)" />
                                <defs>
                                    <linearGradient id="crossGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#C9A227" />
                                        <stop offset="50%" stopColor="#F5C842" />
                                        <stop offset="100%" stopColor="#FFE08A" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>

                        {/* Logo */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-5xl md:text-7xl font-display font-black tracking-tight mb-3"
                        >
                            <span className="text-cream">CHRIST</span>
                            <span className="gradient-text-gold">TOONS</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-cream/60 text-sm md:text-base tracking-[0.3em] uppercase mb-2 font-light"
                        >
                            Faith · Hope · Love
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.3 }}
                            className="text-cream/40 text-xs tracking-widest uppercase mb-12"
                        >
                            Growing Like Jesus
                        </motion.p>

                        {/* Enter button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEnter}
                            className="relative group btn-gold text-base px-10 py-4 overflow-hidden"
                        >
                            <span className="relative z-10">Begin the Journey</span>
                            <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2.2 }}
                            onClick={handleEnter}
                            className="mt-4 text-cream/30 text-xs hover:text-cream/60 transition-colors tracking-widest uppercase"
                        >
                            Skip Intro
                        </motion.button>
                    </motion.div>

                    {/* Bottom scripture */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="absolute bottom-8 left-0 right-0 text-center text-cream/25 text-xs italic z-20 px-4"
                    >
                        "Train up a child in the way he should go..." — Proverbs 22:6
                    </motion.p>

                    {/* Corner particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-gold/40 z-10"
                            style={{
                                left: `${10 + i * 15}%`,
                                top: `${20 + (i % 3) * 20}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoSplash;
