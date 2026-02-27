import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Lock, Crown, ChevronRight, Star, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock content data
const contentData = {
    reading: [
        { id: 1, title: 'David & Goliath', dur: '5 min', tier: 'free', img: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Noah\'s Ark', dur: '8 min', tier: 'free', img: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Creation Story', dur: '6 min', tier: 'premium', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
    ],
    films: [
        { id: 4, title: 'The Chosen One', dur: '120 min', tier: 'premium', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Faith Journey', dur: '45 min', tier: 'free', img: 'https://images.unsplash.com/photo-1510133590517-f27578c74b29?auto=format&fit=crop&w=800&q=80' },
    ]
};

const ContentPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { user, canAccessContent } = useAuth();
    const [selectedItem, setSelectedItem] = useState(null);

    const items = contentData[category] || [];
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const handlePlay = (item) => {
        if (canAccessContent(item.tier)) {
            // Play logic
            console.log("Playing:", item.title);
        } else {
            setSelectedItem(item);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 bg-gold-gradient rounded-full" />
                    <span className="text-gold text-xs font-black uppercase tracking-widest">{formattedCategory}</span>
                </div>
                <h1 className="text-5xl font-display font-black text-cream inline-block relative">
                    Explore {formattedCategory}
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full" />
                </h1>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative cursor-pointer"
                        onClick={() => handlePlay(item)}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video rounded-4xl overflow-hidden border border-white/5 shadow-card relative">
                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-choc-dark via-transparent to-transparent opacity-60" />

                            {/* Play/Lock Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-14 h-14 rounded-full glass flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${!canAccessContent(item.tier) ? 'bg-black/40' : 'bg-gold/20'}`}>
                                    {!canAccessContent(item.tier) ? <Lock className="w-6 h-6 text-cream/40" /> : <Play className="w-6 h-6 text-gold fill-gold" />}
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                {item.tier === 'premium' && (
                                    <div className="bg-gold text-choc-dark px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 shadow-gold">
                                        <Crown size={10} /> Premium
                                    </div>
                                )}
                                <div className="glass px-2 py-1 rounded-lg text-[10px] font-bold text-cream flex items-center gap-1 backdrop-blur-md">
                                    <Clock size={10} /> {item.dur}
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="mt-4">
                            <h3 className="text-xl font-display font-bold text-cream group-hover:text-gold transition-colors">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex text-gold">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                                <span className="text-cream/20 text-[10px] font-bold uppercase tracking-tighter">Bible Story</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Locked Content Modal Overlay */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-choc-dark/95 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-card-gradient border border-gold/30 rounded-5xl p-10 max-w-lg w-full text-center relative shadow-gold-lg"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 text-cream/30 hover:text-cream transition-colors"
                            >
                                <ChevronRight className="rotate-180" />
                            </button>

                            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Crown className="w-10 h-10 text-gold" />
                            </div>

                            <h2 className="text-3xl font-display font-bold text-cream mb-4">Premium Journey Only</h2>
                            <p className="text-cream/60 mb-8 leading-relaxed">
                                Join our premium members to unlock <span className="text-cream font-bold">{selectedItem.title}</span> and hundreds of other faith-building adventures.
                            </p>

                            <button className="btn-gold w-full py-4 rounded-2xl mb-4 group overflow-hidden relative">
                                <div className="absolute inset-0 shimmer-overlay group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Upgrade to Premium <Crown size={18} />
                                </span>
                            </button>
                            <p className="text-cream/20 text-xs">Starting at only $4.99/month</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContentPage;
