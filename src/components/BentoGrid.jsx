import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Mic, Film, Radio, Lock, Headphones, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const childCategories = [
    {
        id: 'reading',
        title: 'Bible Stories',
        desc: 'Adventures from Scripture',
        icon: <BookOpen className="w-8 h-8" />,
        gradient: 'from-gold/30 to-amber/20',
        border: 'border-gold/20',
        textColor: 'text-gold',
        colSpan: 'col-span-12 md:col-span-7',
        emoji: '📖',
    },
    {
        id: 'fun',
        title: 'Fun Zone',
        desc: 'Games & Riddles',
        icon: <Gamepad2 className="w-8 h-8" />,
        gradient: 'from-royal/30 to-royal/10',
        border: 'border-royal/20',
        textColor: 'text-royal-light',
        colSpan: 'col-span-12 md:col-span-5',
        emoji: '🎮',
    },
    {
        id: 'talents',
        title: 'Talents',
        desc: 'Sing, Dance & Create',
        icon: <Mic className="w-8 h-8" />,
        gradient: 'from-rose-grace/20 to-rose-grace/5',
        border: 'border-rose-grace/20',
        textColor: 'text-rose-grace',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎤',
    },
    {
        id: 'films',
        title: 'Films',
        desc: 'Movies & Series',
        icon: <Film className="w-8 h-8" />,
        gradient: 'from-haze-blue/20 to-haze-blue/5',
        border: 'border-haze-blue/20',
        textColor: 'text-haze-blue',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎬',
    },
    {
        id: 'podcasts',
        title: 'Podcasts',
        desc: 'Listen & Learn',
        icon: <Radio className="w-8 h-8" />,
        gradient: 'from-emerald-faith/20 to-emerald-faith/5',
        border: 'border-emerald-faith/20',
        textColor: 'text-emerald-faith',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎙️',
    },
];

const teenCategories = [
    {
        id: 'word',
        title: 'The Word',
        desc: 'Devotionals & Scripture',
        icon: <BookOpen className="w-8 h-8" />,
        gradient: 'from-gold/30 to-amber/20',
        border: 'border-gold/20',
        textColor: 'text-gold',
        colSpan: 'col-span-12 md:col-span-8',
        emoji: '✝️',
    },
    {
        id: 'films',
        title: 'Films',
        desc: 'Faith-Based Cinema',
        icon: <Film className="w-8 h-8" />,
        gradient: 'from-royal/30 to-royal/10',
        border: 'border-royal/20',
        textColor: 'text-royal-light',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎬',
    },
    {
        id: 'podcasts',
        title: 'Podcasts',
        desc: 'Preachers & Testimonies',
        icon: <Headphones className="w-8 h-8" />,
        gradient: 'from-haze-blue/20 to-haze-blue/5',
        border: 'border-haze-blue/20',
        textColor: 'text-haze-blue',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎧',
    },
    {
        id: 'talents',
        title: 'Talents',
        desc: 'Showcase Your Gift',
        icon: <Mic className="w-8 h-8" />,
        gradient: 'from-rose-grace/20 to-rose-grace/5',
        border: 'border-rose-grace/20',
        textColor: 'text-rose-grace',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '🎤',
    },
    {
        id: 'forum',
        title: 'Teen Forum',
        desc: 'Discuss & Grow Together',
        icon: <MessageSquare className="w-8 h-8" />,
        gradient: 'from-emerald-faith/20 to-emerald-faith/5',
        border: 'border-emerald-faith/20',
        textColor: 'text-emerald-faith',
        colSpan: 'col-span-12 md:col-span-4',
        emoji: '💬',
    },
];

const BentoGrid = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userInterests = user?.interests || [];

    const isTeen = user && parseInt(user.age) > 12;
    const baseCategories = isTeen ? teenCategories : childCategories;

    // Sort categories: items matching interests come first
    const categories = [...baseCategories].sort((a, b) => {
        const aMatch = userInterests.includes(a.title);
        const bMatch = userInterests.includes(b.title);
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
    });

    const handleInteraction = (categoryId) => {
        if (user) {
            navigate(`/content/${categoryId}`);
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8" role="region" aria-label="Content Categories">
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3"
                >
                    <div className="w-1 h-6 bg-gold-gradient rounded-full" />
                    <h2 className="text-cream/60 text-sm font-medium uppercase tracking-widest">
                        {isTeen ? 'Your Teen Journey' : 'Your Adventure Awaits'}
                    </h2>
                </motion.div>
            )}

            <div className="grid grid-cols-12 gap-4 auto-rows-[180px]">
                {categories.map((cat, i) => {
                    const isInteresting = userInterests.includes(cat.title);

                    return (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            onClick={() => handleInteraction(cat.id)}
                            role="button"
                            aria-label={`Explore ${cat.title}`}
                            className={`${cat.colSpan} relative bg-gradient-to-br ${cat.gradient} border ${isInteresting ? 'border-gold/40 shadow-gold/20' : cat.border
                                } rounded-3xl p-6 cursor-pointer group overflow-hidden hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`}
                        >
                            {isInteresting && (
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-gold/20 text-gold px-2 py-0.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 border border-gold/30">
                                        <Sparkles size={10} /> Picked for You
                                    </div>
                                </div>
                            )}
                            {/* Background emoji watermark */}
                            <div className="absolute -bottom-4 -right-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none">
                                {cat.emoji}
                            </div>

                            {/* Hover shimmer */}
                            <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center ${cat.textColor}`}>
                                    {cat.icon}
                                </div>

                                <div>
                                    <h3 className={`text-2xl font-display font-bold mb-1 ${cat.textColor}`}>
                                        {cat.title}
                                    </h3>
                                    <p className="text-cream/50 text-sm">{cat.desc}</p>
                                </div>
                            </div>

                            {/* Lock for non-users */}
                            {!user && (
                                <div className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-cream/50" />
                                </div>
                            )}

                            {/* Hover CTA */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full glass ${cat.textColor}`}>
                                    {user ? 'Explore →' : 'Sign Up to Unlock'}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default BentoGrid;
