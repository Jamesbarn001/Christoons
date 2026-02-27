import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Mic, Film, Radio, Heart, Shield, Zap } from 'lucide-react';

const features = [
    {
        icon: <Heart className="w-6 h-6" />,
        title: 'Grow in Faith',
        desc: 'Every story, game, and song is crafted to plant seeds of faith that last a lifetime.',
        color: 'from-rose-grace/20 to-rose-grace/5',
        border: 'border-rose-grace/20',
        iconColor: 'text-rose-grace',
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Learn & Play',
        desc: 'Bible knowledge meets fun — quizzes, games, and interactive adventures that teach without boring.',
        color: 'from-gold/20 to-gold/5',
        border: 'border-gold/20',
        iconColor: 'text-gold',
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: 'Safe & Curated',
        desc: 'Every piece of content is reviewed and approved. Parents can trust every moment their child spends here.',
        color: 'from-emerald-faith/20 to-emerald-faith/5',
        border: 'border-emerald-faith/20',
        iconColor: 'text-emerald-faith',
    },
];

const characters = [
    { name: 'James', family: 'Freeman', color: 'bg-haze-blue-dark', emoji: '⚡', desc: 'The curious explorer' },
    { name: 'Joy', family: 'Freeman', color: 'bg-royal', emoji: '🌟', desc: 'The joyful dreamer' },
    { name: 'Anna', family: 'Sterling', color: 'bg-rose-grace', emoji: '🌸', desc: 'The gentle artist' },
    { name: 'Joseph', family: 'Sterling', color: 'bg-emerald-faith', emoji: '🌿', desc: 'The faithful leader' },
    { name: 'Shalom', family: 'Sterling', color: 'bg-amber', emoji: '🕊️', desc: 'The peacemaker' },
];

const AboutSection = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Our Mission
                    </span>
                    <h2 className="section-title text-4xl md:text-6xl mb-6">
                        Growing Like Jesus
                    </h2>
                    <div className="gold-divider" />
                    <p className="text-cream/60 max-w-2xl mx-auto text-lg leading-relaxed mt-6">
                        CHRISTTOONS is a companion in the holistic growth of children and teenagers —
                        walking with them from childhood through their teen years, shaping who they become
                        in faith, character, and purpose. Entertainment is just one branch of a much bigger journey.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={`relative p-6 rounded-3xl bg-gradient-to-br ${feat.color} border ${feat.border} group hover:-translate-y-2 transition-all duration-300`}
                        >
                            <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center mb-4 ${feat.iconColor}`}>
                                {feat.icon}
                            </div>
                            <h3 className="text-xl font-display font-bold text-cream mb-2">{feat.title}</h3>
                            <p className="text-cream/50 text-sm leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Characters section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-haze-blue text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Meet the Characters
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-cream mb-2">
                        The Freemans & The Sterlings
                    </h2>
                    <p className="text-cream/40 text-sm max-w-lg mx-auto">
                        Two families. One faith. Countless adventures through time and scripture.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {characters.map((char, i) => (
                        <motion.div
                            key={char.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group flex flex-col items-center gap-3 cursor-pointer"
                        >
                            <div className="relative">
                                {/* Halo ring */}
                                <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-gold/60 group-hover:shadow-gold transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                {/* Avatar */}
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${char.color} flex items-center justify-center text-3xl shadow-card border-2 border-white/10 group-hover:scale-105 transition-transform duration-300`}>
                                    {char.emoji}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-cream font-bold group-hover:text-gold transition-colors">{char.name}</div>
                                <div className="text-cream/30 text-xs">{char.family}</div>
                                <div className="text-cream/40 text-xs italic mt-0.5">{char.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scripture banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-20 p-8 glass-gold rounded-3xl text-center"
                >
                    <p className="text-gold/80 text-xs tracking-[0.3em] uppercase mb-3">Faith · Hope · Love</p>
                    <blockquote className="text-xl md:text-2xl font-display font-semibold text-cream/90 italic leading-relaxed">
                        "Let the little children come to me, and do not hinder them,
                        for the kingdom of heaven belongs to such as these."
                    </blockquote>
                    <p className="text-gold text-sm mt-3 font-bold">— Matthew 19:14</p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
