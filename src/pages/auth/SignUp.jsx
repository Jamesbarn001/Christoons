import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Check, Crown, ChevronRight, ChevronLeft, Sparkles, User, Users, Star, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Logo from '../../components/Logo';

const interests = ['Bible Stories', 'Music', 'Drawing', 'Football', 'Science', 'Dancing', 'Singing', 'Reading', 'Drama', 'Art'];

const steps = [
    { id: 1, label: "Child's Profile", icon: <User className="w-4 h-4" /> },
    { id: 2, label: 'Parent Details', icon: <Users className="w-4 h-4" /> },
    { id: 3, label: 'Securing Account', icon: <Lock className="w-4 h-4" /> },
    { id: 4, label: 'Choose Plan', icon: <Crown className="w-4 h-4" /> },
];

const PasswordStrength = ({ password }) => {
    const checks = [
        { label: '8+ chars', met: password.length >= 8 },
        { label: 'Uppercase', met: /[A-Z]/.test(password) },
        { label: 'Number', met: /[0-9]/.test(password) },
        { label: 'Special', met: /[^A-Za-z0-9]/.test(password) },
    ];
    const score = checks.filter(c => c.met).length;
    const colors = ['bg-rose-grace', 'bg-rose-grace', 'bg-amber', 'bg-emerald-faith', 'bg-emerald-faith'];

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1 h-1">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i < score ? colors[score] : 'bg-white/10'}`} />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {checks.map(c => (
                    <div key={c.label} className={`flex items-center gap-1 text-[10px] font-bold uppercase transition-colors ${c.met ? 'text-emerald-faith' : 'text-cream/20'}`}>
                        <div className={`w-1 h-1 rounded-full ${c.met ? 'bg-emerald-faith' : 'bg-white/10'}`} />
                        {c.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SignUp = () => {
    const { signup, signupTeacher, validateTeacherToken } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedTier, setSelectedTier] = useState(searchParams.get('tier') || 'free');

    // Teacher Flow Check
    const isTeacherInvite = searchParams.get('role') === 'teacher';
    const teacherToken = searchParams.get('token');
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        if (isTeacherInvite && teacherToken) {
            setIsTokenValid(validateTeacherToken(teacherToken));
        }
    }, [isTeacherInvite, teacherToken, validateTeacherToken]);

    const [childData, setChildData] = useState({
        name: '', age: '', grade: '', school: '', city: '', church: '', interests: [],
    });
    const [customInterest, setCustomInterest] = useState('');
    const [parentData, setParentData] = useState({
        name: '', email: '', phone: '', work: '', isSelfEmployed: false, age: '', church: '',
    });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Teacher Data
    const [teacherData, setTeacherData] = useState({
        name: '', email: '', school: '', church: '',
    });

    const toggleInterest = (interest) => {
        setChildData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const addCustomInterest = () => {
        if (customInterest.trim() && !childData.interests.includes(customInterest.trim())) {
            setChildData(prev => ({
                ...prev,
                interests: [...prev.interests, customInterest.trim()]
            }));
            setCustomInterest('');
        }
    };

    const isPasswordStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);

    // Robust validation for strings/numbers
    const validateField = (val) => val && val.toString().trim().length > 0;
    const isAlphaOnly = (val) => /^[a-zA-Z\s'-]+$/.test(val);

    // Child Validation
    const childAge = parseInt(childData.age);
    const isChildAgeValid = !isNaN(childAge) && childAge >= 3 && childAge <= 19;
    const isChildNameValid = isAlphaOnly(childData.name);
    const isChildChurchValid = isAlphaOnly(childData.church);
    const hasInterests = childData.interests.length > 0;

    const isChildValid = isChildNameValid && isChildAgeValid && isChildChurchValid &&
        validateField(childData.grade) && validateField(childData.school) &&
        validateField(childData.city) && hasInterests;

    // Parent Validation
    const parentAge = parseInt(parentData.age);
    const isParentAgeValid = !isNaN(parentAge) && parentAge >= 18 && parentAge > childAge;
    const isParentNameValid = isAlphaOnly(parentData.name);
    const isParentChurchValid = isAlphaOnly(parentData.church);

    const isParentValid = isParentNameValid && isParentAgeValid && isParentChurchValid &&
        validateField(parentData.email) && validateField(parentData.phone) &&
        (parentData.isSelfEmployed || validateField(parentData.work));

    const isTeacherValid = ['name', 'email', 'school', 'church'].every(f => validateField(teacherData[f])) && isPasswordStrong;

    const handleSubmit = () => {
        if (isTeacherInvite) {
            if (!isTeacherValid) return;
            signupTeacher(teacherData, password);
            navigate('/admin');
        } else {
            if (!isParentValid || !isPasswordStrong) return;
            signup(childData, parentData, password, selectedTier);
            navigate(childAge > 12 ? '/dashboard/teen' : '/dashboard/child');
        }
    };

    if (isTeacherInvite && !isTokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-luxury-gradient text-center px-4">
                <div className="glass-dark rounded-4xl p-8 max-w-sm border border-rose-grace/20">
                    <div className="w-16 h-16 bg-rose-grace/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-rose-grace" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-cream mb-2">Invalid Invite</h2>
                    <p className="text-cream/50 text-sm mb-6">This teacher registration link is invalid or has expired. Please contact the administrator.</p>
                    <Link to="/" className="btn-gold block w-full">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-luxury-gradient" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link to="/"><Logo size="md" /></Link>
                </div>

                {/* Progress steps (Hide for teacher flow) */}
                {!isTeacherInvite && (
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <React.Fragment key={s.id}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${step === s.id
                                    ? 'bg-gold text-choc-dark'
                                    : step > s.id
                                        ? 'bg-emerald-faith/20 text-emerald-faith'
                                        : 'glass text-cream/30'
                                    }`}>
                                    {step > s.id ? <Check className="w-3 h-3" /> : s.icon}
                                    <span className="hidden sm:block">{s.label}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-px ${step > s.id ? 'bg-emerald-faith' : 'bg-white/10'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Card */}
                <div className="glass-dark rounded-4xl p-8 border border-white/10 shadow-card">
                    <AnimatePresence mode="wait">
                        {/* Teacher Flow */}
                        {isTeacherInvite && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display font-bold text-cream">Teacher Profile Setup</h2>
                                    <p className="text-cream/40 text-sm mt-1">Complete your registration to start managing your classroom.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <input className="input-field" placeholder="Full Name *" value={teacherData.name} onChange={e => setTeacherData({ ...teacherData, name: e.target.value })} />
                                    <input className="input-field" type="email" placeholder="Work Email *" value={teacherData.email} onChange={e => setTeacherData({ ...teacherData, email: e.target.value })} />
                                    <input className="input-field" placeholder="School Name *" value={teacherData.school} onChange={e => setTeacherData({ ...teacherData, school: e.target.value })} />
                                    <input className="input-field" placeholder="Church Name *" value={teacherData.church} onChange={e => setTeacherData({ ...teacherData, church: e.target.value })} />

                                    <div className="relative pt-2">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create Strong Password *"
                                            className="input-field"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[24px] text-cream/30">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                        <PasswordStrength password={password} />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isTeacherValid}
                                    className={`w-full py-3 mt-4 rounded-xl font-bold transition-all ${isTeacherValid ? 'btn-gold' : 'glass text-cream/20 cursor-not-allowed'}`}
                                >
                                    Complete Teacher Setup
                                </button>
                            </motion.div>
                        )}

                        {/* Step 1: Child Profile */}
                        {!isTeacherInvite && step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display font-bold text-cream">Child's Profile</h2>
                                    <p className="text-cream/40 text-sm mt-1">Tell us about your child so we can personalize their journey.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <input className="input-field col-span-2" placeholder="Full Name *" value={childData.name} onChange={e => setChildData({ ...childData, name: e.target.value })} />
                                    <input className="input-field" type="number" placeholder="Age *" value={childData.age} onChange={e => setChildData({ ...childData, age: e.target.value })} />
                                    <input className="input-field" placeholder="Grade *" value={childData.grade} onChange={e => setChildData({ ...childData, grade: e.target.value })} />
                                    <input className="input-field col-span-2" placeholder="School Name *" value={childData.school} onChange={e => setChildData({ ...childData, school: e.target.value })} />
                                    <input className="input-field" placeholder="City *" value={childData.city} onChange={e => setChildData({ ...childData, city: e.target.value })} />
                                    <input className="input-field" placeholder="Church *" value={childData.church} onChange={e => setChildData({ ...childData, church: e.target.value })} />
                                </div>

                                <div>
                                    <p className="text-cream/50 text-xs mb-2 uppercase tracking-widest">Interests & Talents *</p>
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleInterest(tag)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${childData.interests.includes(tag)
                                                    ? 'bg-gold/20 text-gold border-gold/40'
                                                    : 'glass text-cream/50 border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}

                                        {/* Custom Interests Display */}
                                        {childData.interests.filter(i => !interests.includes(i)).map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleInterest(tag)}
                                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/40 flex items-center gap-1"
                                            >
                                                {tag} <span className="opacity-40 text-[10px]">✕</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex gap-2">
                                        <input
                                            className="input-field py-2 text-xs"
                                            placeholder="Add other talent or interest..."
                                            value={customInterest}
                                            onChange={e => setCustomInterest(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addCustomInterest()}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomInterest}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={() => isChildValid && setStep(2)}
                                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isChildValid ? 'btn-gold' : 'bg-white/5 text-cream/20 cursor-not-allowed opacity-50'
                                            }`}
                                    >
                                        Next: Parent Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                    {!isChildValid && (
                                        <div className="mt-3 p-3 bg-rose-grace/10 border border-rose-grace/20 rounded-xl text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-grace">Action Required</p>
                                            <p className="text-xs text-cream/60">
                                                {!validateField(childData.name) || !validateField(childData.age) || !validateField(childData.grade) || !validateField(childData.school) || !validateField(childData.city) || !validateField(childData.church)
                                                    ? "Please complete all profile fields above."
                                                    : !isChildNameValid ? "Child's name should only contain letters."
                                                        : !isChildAgeValid ? "This platform is for ages 3 to 19."
                                                            : !isChildChurchValid ? "Church name should only contain letters."
                                                                : !hasInterests ? "Please select at least one interest or talent."
                                                                    : "Please check your inputs."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Parent Details */}
                        {!isTeacherInvite && step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display font-bold text-cream">Parent Verification</h2>
                                    <p className="text-cream/40 text-sm mt-1">We keep parents in control of their child's account.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <input className="input-field col-span-2" placeholder="Parent's Full Name *" value={parentData.name} onChange={e => setParentData({ ...parentData, name: e.target.value })} />
                                    <input className="input-field" type="number" placeholder="Your Age *" value={parentData.age} onChange={e => setParentData({ ...parentData, age: e.target.value })} />
                                    <input className="input-field" placeholder="Your Church *" value={parentData.church} onChange={e => setParentData({ ...parentData, church: e.target.value })} />
                                    <input className="input-field col-span-2" type="email" placeholder="Email Address *" value={parentData.email} onChange={e => setParentData({ ...parentData, email: e.target.value })} />
                                    <input className="input-field col-span-2" type="tel" placeholder="Phone Number *" value={parentData.phone} onChange={e => setParentData({ ...parentData, phone: e.target.value })} />
                                    <input
                                        className="input-field col-span-2"
                                        placeholder="Place of Work *"
                                        value={parentData.work}
                                        disabled={parentData.isSelfEmployed}
                                        onChange={e => setParentData({ ...parentData, work: e.target.value })}
                                    />
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={parentData.isSelfEmployed}
                                        onChange={e => setParentData({ ...parentData, isSelfEmployed: e.target.checked, work: e.target.checked ? 'Self Employed' : '' })}
                                        className="w-4 h-4 rounded border-white/20 bg-black/20 accent-gold"
                                    />
                                    <span className="text-cream/60 text-sm">I am Self-Employed</span>
                                </label>

                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setStep(1)} className="w-1/3 py-3 btn-ghost text-sm font-bold flex items-center justify-center gap-1">
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button
                                        onClick={() => isParentValid && setStep(3)}
                                        disabled={!isParentValid}
                                        className={`w-2/3 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isParentValid ? 'btn-gold' : 'glass text-cream/20 cursor-not-allowed'
                                            }`}
                                    >
                                        Next: Secure Account <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                {!isParentValid && step === 2 && (
                                    <div className="p-3 bg-rose-grace/10 border border-rose-grace/20 rounded-xl text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-grace">Action Required</p>
                                        <p className="text-xs text-cream/60">
                                            {!validateField(parentData.name) || !validateField(parentData.email) || !validateField(parentData.phone) || !validateField(parentData.age) || !validateField(parentData.church)
                                                ? "Please complete all parent details."
                                                : !isParentNameValid ? "Parent's name should only contain letters."
                                                    : !isParentAgeValid ? (parentAge < 18 ? "Parents must be at least 18 years old." : "Parent must be older than the child.")
                                                        : !isParentChurchValid ? "Church name should only contain letters."
                                                            : "Please check your inputs."}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 3: Password Creation */}
                        {!isTeacherInvite && step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display font-bold text-cream">Secure Your Journey</h2>
                                    <p className="text-cream/40 text-sm mt-1">Create a strong password to protect your family's account.</p>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create Strong Password *"
                                        className="input-field pr-12"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/70 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                <PasswordStrength password={password} />

                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setStep(2)} className="w-1/3 py-3 btn-ghost text-sm font-bold flex items-center justify-center gap-1">
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button
                                        onClick={() => isPasswordStrong && setStep(4)}
                                        disabled={!isPasswordStrong}
                                        className={`w-2/3 py-3 rounded-xl font-bold transition-all ${isPasswordStrong ? 'btn-gold' : 'glass text-cream/20 cursor-not-allowed'}`}
                                    >
                                        Next: Choose Plan <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Subscription */}
                        {!isTeacherInvite && step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display font-bold text-cream">Choose Your Plan</h2>
                                    <p className="text-cream/40 text-sm mt-1">You can always upgrade later.</p>
                                </div>

                                <div className="space-y-3">
                                    {/* Free */}
                                    <button
                                        onClick={() => setSelectedTier('free')}
                                        className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedTier === 'free'
                                            ? 'border-haze-blue/50 bg-haze-blue/10'
                                            : 'border-white/10 glass hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="w-5 h-5 text-haze-blue" />
                                                <div>
                                                    <div className="text-cream font-bold">Free</div>
                                                    <div className="text-cream/40 text-xs">Selected content, forever free</div>
                                                </div>
                                            </div>
                                            <div className="text-xl font-black text-cream">$0</div>
                                        </div>
                                    </button>

                                    {/* Premium */}
                                    <button
                                        onClick={() => setSelectedTier('premium')}
                                        className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${selectedTier === 'premium'
                                            ? 'border-gold/50 bg-gold/10'
                                            : 'border-white/10 glass hover:border-gold/20'
                                            }`}
                                    >
                                        {selectedTier === 'premium' && <div className="absolute inset-0 shimmer-overlay" />}
                                        <div className="relative flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Crown className="w-5 h-5 text-gold" />
                                                <div>
                                                    <div className="text-cream font-bold flex items-center gap-2">
                                                        Premium
                                                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">Best Value</span>
                                                    </div>
                                                    <div className="text-cream/40 text-xs">All content, personalized journey</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-black gradient-text-gold">$4.99</div>
                                                <div className="text-cream/30 text-xs text-right">/month</div>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setStep(3)} className="w-1/3 py-3 btn-ghost text-sm font-bold flex items-center justify-center gap-1">
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-2/3 btn-gold py-3 font-bold flex items-center justify-center gap-2"
                                    >
                                        <Star className="w-4 h-4" />
                                        Start My Journey
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <p className="text-center text-cream/30 text-xs mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gold hover:text-gold-light transition-colors">Log In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;
