import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/Logo';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(email, password);
            setLoading(false);
            if (result.success) {
                const u = result.user;
                if (u.role === 'super_admin' || u.role === 'admin' || u.role === 'teacher') {
                    navigate('/admin');
                } else if (parseInt(u.age) > 12) {
                    navigate('/dashboard/teen');
                } else {
                    navigate('/dashboard/child');
                }
            } else {
                setError(result.message || 'No account found with these credentials.');
            }
        }, 600);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-luxury-gradient" />
            <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-royal/8 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-sm"
            >
                <div className="flex justify-center mb-8">
                    <Link to="/"><Logo size="md" /></Link>
                </div>

                <div className="glass-dark rounded-4xl p-8 border border-white/10 shadow-card">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-display font-bold text-cream">Welcome Back</h2>
                        <p className="text-cream/40 text-sm mt-1">Continue your faith journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input-field pl-11"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(''); }}
                                autoComplete="email"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input-field pl-11 pr-11"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-rose-grace text-xs text-center bg-rose-grace/10 border border-rose-grace/20 rounded-lg px-3 py-2"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={!email.trim() || !password.trim() || loading}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${email.trim() && password.trim() && !loading ? 'btn-gold' : 'glass text-cream/20 cursor-not-allowed'
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-choc-dark/30 border-t-choc-dark rounded-full animate-spin" />
                            ) : (
                                <>Log In <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 text-center space-y-2">
                        <p className="text-cream/30 text-xs">
                            Admin: <span className="text-cream/50">admin@christoons.com</span> / Password123!
                        </p>
                    </div>
                </div>

                <p className="text-center text-cream/30 text-xs mt-6">
                    New here?{' '}
                    <Link to="/signup" className="text-gold hover:text-gold-light transition-colors font-bold">
                        Begin the Journey
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
