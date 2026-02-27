import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Headphones, Film, Mic, MessageSquare, Crown, Flame, Star, TrendingUp, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ContentRow from '../../components/ContentRow';

const wordContent = [
    { title: 'The Sermon on the Mount', duration: '20 min', tags: ['Matthew 5', 'Teaching'], color: 'bg-gold/20', tier: 'free' },
    { title: 'Who Am I in Christ?', duration: '15 min', tags: ['Identity', 'Faith'], color: 'bg-royal/20', tier: 'free' },
    { title: 'Navigating Peer Pressure', duration: '18 min', tags: ['Wisdom', 'Teens'], color: 'bg-haze-blue/20', tier: 'premium' },
    { title: 'Purpose & Calling', duration: '22 min', tags: ['Destiny', 'Vision'], color: 'bg-amber/20', tier: 'premium' },
    { title: 'Prayer That Works', duration: '12 min', tags: ['Prayer', 'Power'], color: 'bg-emerald-faith/20', tier: 'free' },
];

const podcasts = [
    { title: 'Teen Talk: Faith & School', duration: '35 min', tags: ['Podcast', 'Teens'], color: 'bg-royal/20', tier: 'free' },
    { title: 'Testimony Tuesday', duration: '28 min', tags: ['Testimony', 'Inspiration'], color: 'bg-gold/20', tier: 'free' },
    { title: 'The Preacher\'s Corner', duration: '45 min', tags: ['Sermon', 'Word'], color: 'bg-haze-blue/20', tier: 'premium' },
];

const TeenDashboard = () => {
    const { user, getDailyDevotion } = useAuth();
    const navigate = useNavigate();
    const isPremium = user?.subscriptionTier === 'premium';
    const xp = user?.xp || 0;
    const streak = user?.streak || 0;
    const devotion = getDailyDevotion();

    const journeyProgress = 35; // mock %

    return (
        <div className="min-h-screen pt-20 pb-20">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-royal/15 via-transparent to-gold/10" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-royal/10 rounded-full blur-[100px]" />

                <div className="relative z-10 px-4 md:px-8 py-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-start justify-between gap-6"
                    >
                        {/* Greeting */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-royal-gradient flex items-center justify-center text-cream font-black text-xl shadow-royal">
                                    {user?.name?.[0]?.toUpperCase() || '⚡'}
                                </div>
                                <div>
                                    <p className="text-cream/40 text-xs uppercase tracking-widest">Hey,</p>
                                    <h1 className="text-2xl font-display font-black text-cream">
                                        {user?.name?.split(' ')[0]}
                                    </h1>
                                </div>
                            </div>
                            <p className="text-cream/50 text-sm">
                                Your faith journey is shaping your future. Keep going. 🔥
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-3">
                            <div className="glass-royal rounded-2xl px-4 py-3 text-center">
                                <div className="flex items-center gap-1.5 justify-center mb-1">
                                    <Star className="w-4 h-4 text-royal-light fill-royal-light" />
                                    <span className="text-royal-light font-black text-lg">{xp}</span>
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
                                    <div className="glass-gold rounded-2xl px-4 py-3 text-center cursor-pointer hover:bg-gold/20 transition-all">
                                        <Crown className="w-4 h-4 text-gold mx-auto mb-1" />
                                        <div className="text-gold text-xs font-bold">Go Premium</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Daily Devotion Card */}
                    {devotion && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 glass-royal rounded-3xl p-8 border border-royal/20 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all duration-700">
                                <BookOpen size={140} className="text-royal-light" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-royal/30 text-royal-light text-[10px] font-black uppercase tracking-widest rounded-full border border-royal/20">Daily Word</span>
                                    <div className="w-1 h-1 rounded-full bg-gold/40" />
                                    <span className="text-cream/40 text-xs font-bold font-mono">{devotion.verse}</span>
                                </div>
                                <h2 className="text-2xl font-display font-bold text-cream mb-4">{devotion.title}</h2>
                                <p className="text-cream/70 text-lg leading-relaxed mb-6 italic">"{devotion.text}"</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-gold text-[10px] font-black uppercase tracking-tighter mb-1">Reflection</p>
                                        <p className="text-cream/60 text-sm">{devotion.reflection}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-royal-light text-[10px] font-black uppercase tracking-tighter mb-1">Today's Prayer</p>
                                        <p className="text-cream/60 text-sm">{devotion.prayer}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Journey Progress */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 p-4 glass-dark rounded-2xl"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-gold" />
                                <span className="text-cream/70 text-sm font-medium">Your Faith Journey</span>
                            </div>
                            <span className="text-gold text-sm font-bold">{journeyProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${journeyProgress}%` }}
                                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                                className="h-full bg-gold-gradient rounded-full"
                            />
                        </div>
                        <p className="text-cream/30 text-xs mt-1.5">Complete more content to grow your journey</p>
                    </motion.div>
                </div>
            </div>

            {/* Quick Access */}
            <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-royal-gradient rounded-full" />
                    <h2 className="text-cream/60 text-xs uppercase tracking-widest font-bold">Explore</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                        { label: 'The Word', icon: '✝️', path: '/content/word', color: 'from-gold/20 to-amber/10', border: 'border-gold/20' },
                        { label: 'Films', icon: '🎬', path: '/content/films', color: 'from-royal/20 to-royal/5', border: 'border-royal/20' },
                        { label: 'Podcasts', icon: '🎧', path: '/content/podcasts', color: 'from-haze-blue/20 to-haze-blue/5', border: 'border-haze-blue/20' },
                        { label: 'Talents', icon: '🎤', path: '/content/talents', color: 'from-rose-grace/20 to-rose-grace/5', border: 'border-rose-grace/20' },
                        { label: 'Forum', icon: '💬', path: '/content/forum', color: 'from-emerald-faith/20 to-emerald-faith/5', border: 'border-emerald-faith/20' },
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
            <ContentRow title="✝️ The Word" items={wordContent} delay={0} isPremium={isPremium} />
            <ContentRow title="🎧 Podcasts" items={podcasts} delay={0.1} isPremium={isPremium} />
        </div>
    );
};

export default TeenDashboard;
