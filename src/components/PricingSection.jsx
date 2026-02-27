import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const freeTier = [
    'Selected Bible Stories',
    'Sample Fun Zone games',
    'Basic character profiles',
    'Weekly devotional content',
    'Community highlights',
];

const premiumTier = [
    'All Bible Stories & Series',
    'Full Fun Zone & Games',
    'All Films & Podcasts',
    'Talents showcase & upload',
    'Personalized learning journey',
    'Daily devotionals & verse',
    'Teen Forum access',
    'Early access to new content',
    'Ad-free experience',
];

const PricingSection = () => {
    const [billing, setBilling] = useState('monthly');

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-royal-light text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Choose Your Journey
                    </span>
                    <h2 className="section-title text-4xl md:text-5xl mb-4">
                        Start Free. Go Premium.
                    </h2>
                    <div className="gold-divider" />
                    <p className="text-cream/50 max-w-lg mx-auto mt-4">
                        Every child deserves access to faith-based content. Start free, upgrade when you're ready.
                    </p>

                    {/* Billing toggle */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button
                            onClick={() => setBilling('monthly')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-gold text-choc-dark' : 'text-cream/50 hover:text-cream'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling('yearly')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billing === 'yearly' ? 'bg-gold text-choc-dark' : 'text-cream/50 hover:text-cream'}`}
                        >
                            Yearly
                            <span className="ml-1.5 text-xs bg-emerald-faith/20 text-emerald-faith px-1.5 py-0.5 rounded-full">-30%</span>
                        </button>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Free Tier */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative p-8 glass-dark rounded-4xl border border-white/10"
                    >
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-haze-blue" />
                                <span className="text-haze-blue font-bold text-sm uppercase tracking-widest">Free</span>
                            </div>
                            <div className="text-5xl font-display font-black text-cream mb-1">$0</div>
                            <div className="text-cream/40 text-sm">Forever free, no card needed</div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {freeTier.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-haze-blue mt-0.5 flex-shrink-0" />
                                    <span className="text-cream/70 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link to="/signup?tier=free">
                            <button className="w-full btn-ghost py-3 text-sm font-bold">
                                Start Free
                            </button>
                        </Link>
                    </motion.div>

                    {/* Premium Tier */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative p-8 rounded-4xl border border-gold/30 bg-gradient-to-br from-gold/10 via-amber/5 to-royal/10 overflow-hidden animate-glow-pulse"
                    >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 shimmer-overlay pointer-events-none" />

                        {/* Popular badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gold-gradient rounded-full">
                            <Crown className="w-3 h-3 text-choc-dark" />
                            <span className="text-choc-dark text-xs font-black">BEST VALUE</span>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-5 h-5 text-gold" />
                                <span className="text-gold font-bold text-sm uppercase tracking-widest">Premium</span>
                            </div>
                            <div className="flex items-end gap-2 mb-1">
                                <div className="text-5xl font-display font-black gradient-text-gold">
                                    {billing === 'monthly' ? '$4.99' : '$3.49'}
                                </div>
                                <div className="text-cream/40 text-sm mb-2">/month</div>
                            </div>
                            {billing === 'yearly' && (
                                <div className="text-emerald-faith text-xs font-bold">Save 30% — billed $41.88/year</div>
                            )}
                            {billing === 'monthly' && (
                                <div className="text-cream/30 text-xs">Cancel anytime</div>
                            )}
                        </div>

                        <ul className="space-y-3 mb-8">
                            {premiumTier.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                                    <span className="text-cream/80 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link to="/signup?tier=premium">
                            <button className="relative w-full btn-gold py-3 text-sm font-bold overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Crown className="w-4 h-4" />
                                    Start Premium Journey
                                </span>
                                <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Trust note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center text-cream/25 text-xs mt-8 flex items-center justify-center gap-2"
                >
                    <Lock className="w-3 h-3" />
                    Secure payments · Cancel anytime · Parent-controlled accounts
                </motion.p>
            </div>
        </section>
    );
};

export default PricingSection;
