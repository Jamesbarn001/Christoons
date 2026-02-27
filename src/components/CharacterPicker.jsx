import React from 'react';
import { motion } from 'framer-motion';

const CharacterPicker = () => {
    const characters = [
        { id: 1, name: 'Zion', family: 'Freeman', color: 'bg-blue-500' },
        { id: 2, name: 'Faith', family: 'Freeman', color: 'bg-indigo-500' },
        { id: 3, name: 'Noah', family: 'Sterling', color: 'bg-emerald-500' },
        { id: 4, name: 'Grace', family: 'Sterling', color: 'bg-rose-500' },
        { id: 5, name: 'Elijah', family: 'Sterling', color: 'bg-orange-500' },
    ];

    return (
        <div className="relative z-30 -mt-20 pb-12 px-8">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-center text-cream-200/80 uppercase tracking-widest text-sm mb-6 font-semibold">
                    Who is Watching?
                </h3>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {characters.map((char, index) => (
                        <motion.div
                            key={char.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            whileHover={{ y: -5 }}
                            className="group flex flex-col items-center gap-3 cursor-pointer"
                        >
                            <div className="relative">
                                {/* Golden Halo Ring on Hover */}
                                <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-gold-400/80 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100" />

                                {/* Avatar Placeholder */}
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${char.color} border-2 border-chocolate-800 shadow-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300`}>
                                    {/* Mock Image Gradient if no image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/50">
                                        {char.name[0]}
                                    </div>
                                </div>
                            </div>

                            <span className="text-cream-200 font-medium group-hover:text-gold-400 transition-colors">
                                {char.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CharacterPicker;
