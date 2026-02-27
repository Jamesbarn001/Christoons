import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Gamepad2, Mic, Film, Radio, Star, Flame, Crown, Lock, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ContentRow from '../../components/ContentRow';

const bibleStories = [
    { title: 'David & Goliath', duration: '12 min', tags: ['Courage', 'Faith'], color: 'bg-gold/20', tier: 'free' },
    { title: 'Noah\'s Ark', duration: '15 min', tags: ['Obedience', 'Trust'], color: 'bg-haze-blue/20', tier: 'free' },
    { title: 'Moses & the Sea', duration: '18 min', tags: ['Miracles', 'Deliverance'], color: 'bg-royal/20', tier: 'premium' },
    { title: 'Daniel in the Den', duration: '10 min', tags: ['Bravery', 'Prayer'], color: 'bg-amber/20', tier: 'free' },
    { title: 'Joseph\'s Coat', duration: '20 min', tags: ['Forgiveness', 'Dreams'], color: 'bg-emerald-faith/20', tier: 'premium' },
];

const funZone = [
    { title: 'Bible Quiz Challenge', duration: '5 min', tags: ['Quiz', 'Fun'], color: 'bg-royal/20', tier: 'free' },
    { title: 'Verse Memory Game', duration: '8 min', tags: ['Memory', 'Scripture'], color: 'bg-gold/20', tier: 'free' },
    { title: 'Bible Crossword', duration: '10 min', tags: ['Puzzle', 'Learning'], color: 'bg-rose-grace/20', tier: 'premium' },
    { title: 'Parable Riddles', duration: '6 min', tags: ['Riddles', 'Wisdom'], color: 'bg-haze-blue/20', tier: 'free' },
];

const ChildDashboard = () => {
    const { user, canAccessContent, getDailyDevotion } = useAuth();
    const navigate = useNavigate();
    const isPremium = user?.subscriptionTier === 'premium';
    const xp = user?.xp || 0;
    const streak = user?.streak || 0;
    const devotion = getDailyDevotion();

    return (
        <div className="min-h-screen pt-20 pb-20">
            {/* Header Banner */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-amber/5 to-royal/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />

                <div className="relative z-10 px-4 md:px-8 py-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        {/* Greeting */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-choc-dark font-black text-xl shadow-gold">
                                    {user?.name?.[0]?.toUpperCase() || '⭐'}
                                </div>
                                <div>
                                    <p className="text-cream/40 text-xs uppercase tracking-widest">Welcome back,</p>
                                    <h1 className="text-2xl font-display font-black text-cream">
                                        {user?.name?.split(' ')[0]} <span className="text-gold">✨</span>
                                    </h1>
                                </div>
                            </div>
                            <p className="text-cream/50 text-sm ml-15">
                                {user?.interests?.length > 0
                                    ? `Ready to explore ${user.interests[0]}?`
                                    : 'Your adventure continues today!'}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4">
                            <div className="glass-gold rounded-2xl px-4 py-3 text-center">
                                <div className="flex items-center gap-1.5 justify-center mb-1">
                                    <Star className="w-4 h-4 text-gold fill-gold" />
                                    <span className="text-gold font-black text-lg">{xp}</span>
                                </div>
                                <div className="text-cream/40 text-xs">Faith XP</div>
                            </div>
                            <div className="glass rounded-2xl px-4 py-3 text-center">
                                <div className="flex items-center gap-1.5 justify-center mb-1">
                                    <Flame className="w-4 h-4 text-amber" />
                                    <span className="text-amber font-black text-lg">{streak}</span>
                                </div>
                                <div className="text-cream/40 text-xs">Day Streak</div>
                            </div>
                            {!isPremium && (
                                <Link to="/signup?tier=premium">
                                    <div className="glass-royal rounded-2xl px-4 py-3 text-center cursor-pointer hover:bg-royal/20 transition-all">
                                        <Crown className="w-4 h-4 text-royal-light mx-auto mb-1" />
                                        <div className="text-royal-light text-xs font-bold">Upgrade</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Dynamic Daily Devotion Card */}
                    {devotion && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-8 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-gold/20 relative overflow-hidden group hover:border-gold/40 transition-colors"
                        >
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <BookOpen size={120} className="text-gold" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 bg-gold/20 text-gold text-[10px] font-black uppercase rounded-full">Daily Wonder</span>
                                    <span className="text-cream/30 text-[10px] font-bold">{devotion.verse}</span>
                                </div>
                                <h2 className="text-xl font-display font-bold text-gold mb-2">{devotion.title}</h2>
                                <p className="text-cream/70 text-sm leading-relaxed mb-4 italic">"{devotion.text}"</p>
                                <div className="flex items-center gap-2 text-xs text-cream/40 bg-black/20 p-3 rounded-xl border border-white/5">
                                    <Star size={14} className="text-gold fill-gold" />
                                    <p><span className="text-gold font-bold">Prayer:</span> {devotion.prayer}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-gold-gradient rounded-full" />
                    <h2 className="text-cream/60 text-xs uppercase tracking-widest font-bold">Quick Access</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Bible Stories', icon: '📖', path: '/content/reading', color: 'from-gold/20 to-amber/10', border: 'border-gold/20' },
                        { label: 'Fun Zone', icon: '🎮', path: '/content/fun', color: 'from-royal/20 to-royal/5', border: 'border-royal/20' },
                        { label: 'Talents', icon: '🎤', path: '/content/talents', color: 'from-rose-grace/20 to-rose-grace/5', border: 'border-rose-grace/20' },
                        { label: 'Films', icon: '🎬', path: '/content/films', color: 'from-haze-blue/20 to-haze-blue/5', border: 'border-haze-blue/20' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(item.path)}
                            className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} cursor-pointer hover:-translate-y-1 transition-all duration-200 text-center`}
                        >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-cream/80 text-xs font-bold">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Content Rows */}
            <ContentRow
                title="📖 Bible Stories"
                items={bibleStories}
                delay={0}
                isPremium={isPremium}
            />
            <ContentRow
                title="🎮 Fun Zone"
                items={funZone}
                delay={0.1}
                isPremium={isPremium}
            />
        </div>
    );
};

export default ChildDashboard;
