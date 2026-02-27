import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Bell, Menu, X, Crown, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 50);
    });

    const childLinks = [
        { name: 'Bible Stories', path: '/content/reading' },
        { name: 'Fun Zone', path: '/content/fun' },
        { name: 'Talents', path: '/content/talents' },
        { name: 'Films', path: '/content/films' },
    ];

    const teenLinks = [
        { name: 'The Word', path: '/content/word' },
        { name: 'Films', path: '/content/films' },
        { name: 'Podcasts', path: '/content/podcasts' },
        { name: 'Talents', path: '/content/talents' },
    ];

    const navLinks = user
        ? (user.age > 12 ? teenLinks : childLinks)
        : [];

    const isPremium = user?.subscriptionTier === 'premium';

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between transition-all duration-500 ${scrolled
                    ? 'bg-choc-dark/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent'
                    }`}
            >
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <Logo size="sm" />
                    </Link>

                    {user && (
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === item.path
                                        ? 'text-gold bg-gold/10'
                                        : 'text-cream/60 hover:text-cream hover:bg-white/5'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            {/* Search */}
                            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-cream/50 hover:text-cream hover:bg-white/5 transition-all">
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Subscription badge */}
                            {isPremium ? (
                                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
                                    <Crown className="w-3 h-3 text-gold" />
                                    <span className="text-gold text-xs font-bold">Premium</span>
                                </div>
                            ) : (
                                <Link
                                    to="/upgrade"
                                    className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-royal/10 border border-royal/30 rounded-full hover:bg-royal/20 transition-all"
                                >
                                    <Sparkles className="w-3 h-3 text-royal-light" />
                                    <span className="text-royal-light text-xs font-bold">Upgrade</span>
                                </Link>
                            )}

                            {/* User avatar */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-choc-dark font-bold text-sm shadow-gold">
                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="hidden md:flex flex-col -gap-1">
                                    <span className="text-[10px] text-cream/40 font-bold uppercase tracking-tight">
                                        {user.role === 'child' || user.role === 'teen' ? 'Faith Seeker' : user.role.replace('_', ' ')}
                                    </span>
                                    <span className="text-sm text-cream font-bold max-w-[100px] truncate leading-tight">
                                        {user.name.split(' ')[0]}
                                    </span>
                                </div>
                            </div>

                            {/* Admin/Teacher Dashboard link */}
                            {(user.role === 'admin' || user.role === 'super_admin' || user.role === 'teacher') && (
                                <Link
                                    to="/admin"
                                    className={`hidden md:block text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-widest transition-all ${user.role === 'teacher'
                                            ? 'bg-royal/20 text-royal-light border border-royal/30 hover:bg-royal/30'
                                            : 'bg-gold/20 text-gold border border-gold/30 hover:bg-gold/30'
                                        }`}
                                >
                                    {user.role === 'teacher' ? 'Classroom' : 'Admin'}
                                </Link>
                            )}

                            <button
                                onClick={logout}
                                className="text-xs text-cream/30 hover:text-cream/70 transition-colors hidden md:block"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="text-sm text-cream/70 hover:text-cream transition-colors px-3 py-1.5"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="btn-gold text-sm px-5 py-2"
                            >
                                Join Free
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-cream/70 hover:bg-white/5"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-[60px] left-0 right-0 z-40 overflow-hidden bg-choc-dark/98 backdrop-blur-xl border-b border-white/5"
            >
                <div className="px-6 py-4 flex flex-col gap-2">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className="py-2 text-cream/70 hover:text-gold transition-colors font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {user && (
                        <button
                            onClick={() => { logout(); setMenuOpen(false); }}
                            className="py-2 text-left text-cream/30 hover:text-cream/60 transition-colors text-sm mt-2 border-t border-white/5 pt-4"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;
