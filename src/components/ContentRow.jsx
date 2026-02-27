import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentRow = ({ title, items = [], delay = 0, isPremium = false }) => {
    return (
        <div className="py-6 px-4 md:px-8 relative max-w-7xl mx-auto">
            {/* Row header */}
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <h2 className="text-lg md:text-xl font-display font-bold text-cream group-hover:text-gold transition-colors">
                    {title}
                </h2>
                <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300 text-gold text-sm font-bold flex items-center">
                    See All <ChevronRight size={16} />
                </div>
            </div>

            {/* Scrollable row */}
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay }}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
                >
                    {items.map((item, index) => {
                        const isLocked = item.tier === 'premium' && !isPremium;
                        return (
                            <motion.div
                                key={index}
                                className="flex-none w-56 md:w-72 aspect-video rounded-2xl relative overflow-hidden cursor-pointer snap-start group"
                                whileHover={{ scale: isLocked ? 1 : 1.03, zIndex: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Thumbnail */}
                                <div className={`w-full h-full ${item.color || 'bg-cocoa/50'} relative`}>
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Lock overlay for premium */}
                                    {isLocked && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-10">
                                            <div className="w-10 h-10 rounded-full glass-gold flex items-center justify-center">
                                                <Crown className="w-5 h-5 text-gold" />
                                            </div>
                                            <span className="text-gold text-xs font-bold">Premium</span>
                                            <Link
                                                to="/signup?tier=premium"
                                                className="text-xs text-cream/60 hover:text-cream underline"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Upgrade
                                            </Link>
                                        </div>
                                    )}

                                    {/* Tier badge */}
                                    <div className="absolute top-2 left-2 z-10">
                                        <span className={item.tier === 'premium' ? 'tag-premium' : 'tag-free'}>
                                            {item.tier === 'premium' ? '⭐ Premium' : '✓ Free'}
                                        </span>
                                    </div>

                                    {/* Content info */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                                        <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-cream/60">
                                            <span>{item.duration}</span>
                                            {item.tags?.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 glass rounded-full text-cream/50 text-[10px]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hover shimmer */}
                                    {!isLocked && (
                                        <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-choc-dark to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default ContentRow;
