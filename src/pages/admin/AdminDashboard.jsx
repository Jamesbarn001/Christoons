import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
    Users, Crown, Eye, UserCheck, UserX, Shield, AlertTriangle,
    TrendingUp, Activity, Lock, Globe, Clock, ChevronRight,
    BookOpen, Film, Mic, Radio, Plus, CheckCircle, XCircle,
    Wifi, Server, Bell
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockStats = {
    subscribers: { total: 1284, premium: 847, free: 437, growth: '+12%' },
    visitors: { today: 3421, week: 18920, month: 74300 },
    children: { active: 692, inactive: 155 },
    teens: { active: 437, inactive: 118 },
};

const mockSecurityEvents = [
    { id: 1, type: 'brute_force', ip: '192.168.45.221', action: 'Login attempt (x12)', time: '2 min ago', severity: 'high', blocked: true },
    { id: 2, type: 'bad_content', ip: '41.90.123.77', action: 'Attempted to post flagged content', time: '18 min ago', severity: 'high', blocked: true },
    { id: 3, type: 'rate_limit', ip: '197.232.10.5', action: 'API rate limit exceeded', time: '1 hr ago', severity: 'medium', blocked: true },
    { id: 4, type: 'suspicious', ip: '102.0.8.44', action: 'Unusual navigation pattern', time: '3 hr ago', severity: 'low', blocked: false },
    { id: 5, type: 'brute_force', ip: '196.201.55.12', action: 'Login attempt (x7)', time: '5 hr ago', severity: 'medium', blocked: true },
    { id: 6, type: 'bad_content', ip: '41.90.200.11', action: 'Profanity filter triggered', time: '8 hr ago', severity: 'high', blocked: true },
];

const mockPendingContent = [
    { id: 1, title: 'The Armor of God — Lesson 3', type: 'Bible Story', author: 'Ms. Apple', submitted: '10 min ago', status: 'pending' },
    { id: 2, title: 'Teen Talk: Dealing with Anxiety', type: 'Podcast', author: 'Mr. David', submitted: '45 min ago', status: 'pending' },
    { id: 3, title: 'Worship Dance: Oceans', type: 'Talent', author: 'Ms. Apple', submitted: '2 hr ago', status: 'pending' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color, glow }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative p-5 glass-dark rounded-3xl border ${color} overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
    >
        {glow && <div className={`absolute inset-0 ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />}
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl glass flex items-center justify-center ${color.replace('border-', 'text-')}`}>
                    {icon}
                </div>
                {sub && <span className="text-emerald-faith text-xs font-bold bg-emerald-faith/10 px-2 py-0.5 rounded-full">{sub}</span>}
            </div>
            <div className="text-3xl font-display font-black text-cream mb-1">{value}</div>
            <div className="text-cream/40 text-xs uppercase tracking-widest">{label}</div>
        </div>
    </motion.div>
);

const SeverityBadge = ({ severity }) => {
    const map = {
        high: 'bg-rose-grace/20 text-rose-grace border-rose-grace/30',
        medium: 'bg-amber/20 text-amber border-amber/30',
        low: 'bg-haze-blue/20 text-haze-blue border-haze-blue/30',
    };
    return (
        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${map[severity]}`}>
            {severity}
        </span>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [pendingContent, setPendingContent] = useState(mockPendingContent);

    const isSuperAdmin = user?.role === 'super_admin';

    const approveContent = (id) => {
        setPendingContent(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
    };
    const rejectContent = (id) => {
        setPendingContent(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
        { id: 'content', label: 'Manage Content', icon: <Film className="w-4 h-4" /> },
        ...(isSuperAdmin ? [{ id: 'teachers', label: 'Teacher Invites', icon: <UserCheck className="w-4 h-4" /> }] : []),
        ...(isSuperAdmin ? [{ id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }] : []),
    ];

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-faith animate-pulse" />
                        <span className="text-emerald-faith text-xs font-bold uppercase tracking-widest">System Online</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-cream">
                        {isSuperAdmin ? 'Super Admin' : 'Teacher'} Dashboard
                    </h1>
                    <p className="text-cream/40 text-sm mt-1">
                        Welcome back, {user?.name} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-gold text-choc-dark'
                                : 'glass text-cream/50 hover:text-cream'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">

                    {/* ── OVERVIEW TAB ── */}
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* Subscriber Stats */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-5 bg-gold-gradient rounded-full" />
                                    <h2 className="text-cream/60 text-xs uppercase tracking-widest font-bold">Subscribers</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <StatCard icon={<Users className="w-5 h-5" />} label="Total Subscribers" value={mockStats.subscribers.total.toLocaleString()} sub={mockStats.subscribers.growth} color="border-gold/20" glow="bg-gold/5" />
                                    <StatCard icon={<Crown className="w-5 h-5" />} label="Premium Members" value={mockStats.subscribers.premium.toLocaleString()} color="border-gold/30" glow="bg-gold/5" />
                                    <StatCard icon={<Wifi className="w-5 h-5" />} label="Free Members" value={mockStats.subscribers.free.toLocaleString()} color="border-haze-blue/20" />
                                    <StatCard icon={<Eye className="w-5 h-5" />} label="Visitors Today" value={mockStats.visitors.today.toLocaleString()} color="border-royal/20" />
                                </div>
                            </div>

                            {/* Children Stats */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-5 bg-emerald-faith rounded-full" />
                                    <h2 className="text-cream/60 text-xs uppercase tracking-widest font-bold">Children</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard icon={<UserCheck className="w-5 h-5" />} label="Active Children" value={mockStats.children.active} color="border-emerald-faith/30" glow="bg-emerald-faith/5" />
                                    <StatCard icon={<UserX className="w-5 h-5" />} label="Inactive Children" value={mockStats.children.inactive} color="border-rose-grace/20" />
                                </div>
                            </div>

                            {/* Teen Stats */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-5 bg-royal-gradient rounded-full" />
                                    <h2 className="text-cream/60 text-xs uppercase tracking-widest font-bold">Teenagers</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard icon={<UserCheck className="w-5 h-5" />} label="Active Teens" value={mockStats.teens.active} color="border-royal/30" glow="bg-royal/5" />
                                    <StatCard icon={<UserX className="w-5 h-5" />} label="Inactive Teens" value={mockStats.teens.inactive} color="border-rose-grace/20" />
                                </div>
                            </div>

                            {/* Visitor Breakdown */}
                            <div className="glass-dark rounded-3xl p-6 border border-white/5">
                                <h3 className="text-cream font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-gold" /> Visitor Breakdown
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    {[
                                        { label: 'Today', value: mockStats.visitors.today.toLocaleString() },
                                        { label: 'This Week', value: mockStats.visitors.week.toLocaleString() },
                                        { label: 'This Month', value: mockStats.visitors.month.toLocaleString() },
                                    ].map(v => (
                                        <div key={v.label} className="glass rounded-2xl p-4">
                                            <div className="text-2xl font-display font-black gradient-text-gold">{v.value}</div>
                                            <div className="text-cream/40 text-xs mt-1">{v.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── MANAGE CONTENT TAB ── */}
                    {activeTab === 'content' && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-display font-bold text-cream">Content Library</h2>
                                <button className="btn-gold text-xs px-4 py-2 flex items-center gap-2">
                                    <Plus size={16} /> Add New Content
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {['All', 'Animations', 'Reading', 'Music', 'Games'].map(f => (
                                    <button key={f} className="glass px-3 py-1.5 rounded-lg text-xs text-cream/60 hover:text-cream whitespace-nowrap">{f}</button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-cream/40 text-[10px] font-black uppercase tracking-widest">Pending Review</h3>
                                </div>

                                {pendingContent.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`glass-dark rounded-2xl p-5 border transition-all ${item.status === 'approved' ? 'border-emerald-faith/30 bg-emerald-faith/5' :
                                            item.status === 'rejected' ? 'border-rose-grace/30 bg-rose-grace/5' :
                                                'border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-cream/50 uppercase font-black">{item.type}</span>
                                                    <span className="text-cream/30 text-xs font-medium">by {item.author}</span>
                                                    <span className="text-cream/20 text-[10px]">· {item.submitted}</span>
                                                </div>
                                                <h3 className="text-cream font-bold">{item.title}</h3>
                                            </div>

                                            {item.status === 'pending' ? (
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => approveContent(item.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-faith/20 text-emerald-faith border border-emerald-faith/30 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-faith/30 transition-all"
                                                    >
                                                        <CheckCircle className="w-3 h-3" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => rejectContent(item.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-grace/20 text-rose-grace border border-rose-grace/30 rounded-xl text-[10px] font-black uppercase hover:bg-rose-grace/30 transition-all"
                                                    >
                                                        <XCircle className="w-3 h-3" /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${item.status === 'approved'
                                                    ? 'bg-emerald-faith/20 text-emerald-faith border-emerald-faith/30'
                                                    : 'bg-rose-grace/20 text-rose-grace border-rose-grace/30'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content moderation note */}
                            <div className="glass-gold rounded-2xl p-4 flex items-start gap-3 mt-6">
                                <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gold text-sm font-bold mb-0.5 uppercase tracking-tighter">AI Moderation Shield Active</p>
                                    <p className="text-cream/50 text-[10px] leading-relaxed">
                                        All submitted content is automatically scanned for abusive language, sexual content,
                                        and inappropriate material before reaching this review queue. Flagged content is blocked immediately.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── TEACHER INVITES TAB ── */}
                    {activeTab === 'teachers' && isSuperAdmin && (
                        <motion.div
                            key="teachers"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="glass-dark rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Users size={120} />
                                </div>
                                <div className="max-w-xl relative z-10">
                                    <h2 className="text-2xl font-display font-bold text-cream mb-2">Teacher Invite System</h2>
                                    <p className="text-cream/50 text-sm mb-6">Create personal registration links for new staff members. These links bypass regular signup and grant Teacher permissions automatically.</p>

                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Teacher Name or Email"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:outline-none focus:border-gold/50"
                                            />
                                            <button className="btn-gold px-6 py-3 text-sm font-bold">Generate Link</button>
                                        </div>

                                        <div className="p-4 bg-emerald-faith/10 border border-emerald-faith/20 rounded-xl flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-faith/20 flex items-center justify-center text-emerald-faith">
                                                    <Globe size={16} />
                                                </div>
                                                <span className="text-xs font-mono text-emerald-faith/80">christoons.com/signup?token=TCHR_982...</span>
                                            </div>
                                            <button className="text-emerald-faith text-[10px] font-black uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Copy Link</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass-dark rounded-2xl p-6 border border-white/5">
                                    <h3 className="text-cream font-bold mb-4 text-sm">Active Teachers</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Ms. Apple', role: 'Curriculum lead', items: 12 },
                                            { name: 'Mr. David', role: 'Teen Counselor', items: 8 }
                                        ].map(t => (
                                            <div key={t.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-royal-gradient flex items-center justify-center text-[10px] font-bold">{t.name[0]}</div>
                                                    <div>
                                                        <p className="text-xs font-bold text-cream">{t.name}</p>
                                                        <p className="text-[10px] text-cream/40">{t.role}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-gold">{t.items} items</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── SECURITY TAB (Super Admin only) ── */}
                    {activeTab === 'security' && isSuperAdmin && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Security summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Threats Blocked', value: mockSecurityEvents.filter(e => e.blocked).length, icon: <Shield className="w-5 h-5" />, color: 'border-emerald-faith/30', textColor: 'text-emerald-faith' },
                                    { label: 'High Severity', value: mockSecurityEvents.filter(e => e.severity === 'high').length, icon: <AlertTriangle className="w-5 h-5" />, color: 'border-rose-grace/30', textColor: 'text-rose-grace' },
                                    { label: 'Brute Force', value: mockSecurityEvents.filter(e => e.type === 'brute_force').length, icon: <Lock className="w-5 h-5" />, color: 'border-amber/30', textColor: 'text-amber' },
                                    { label: 'Bad Content', value: mockSecurityEvents.filter(e => e.type === 'bad_content').length, icon: <XCircle className="w-5 h-5" />, color: 'border-royal/30', textColor: 'text-royal-light' },
                                ].map(s => (
                                    <div key={s.label} className={`glass-dark rounded-2xl p-4 border ${s.color}`}>
                                        <div className={`${s.textColor} mb-2`}>{s.icon}</div>
                                        <div className={`text-2xl font-display font-black ${s.textColor}`}>{s.value}</div>
                                        <div className="text-cream/40 text-xs mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Security event log */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-cream font-bold flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-rose-grace" />
                                        Security Event Log
                                    </h2>
                                    <span className="text-cream/30 text-xs">Last 24 hours</span>
                                </div>

                                <div className="space-y-3">
                                    {mockSecurityEvents.map((event, i) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="glass-dark rounded-2xl p-4 border border-white/5 flex items-center gap-4"
                                        >
                                            {/* Severity indicator */}
                                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${event.severity === 'high' ? 'bg-rose-grace animate-pulse' :
                                                event.severity === 'medium' ? 'bg-amber' : 'bg-haze-blue'
                                                }`} />

                                            {/* IP */}
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center gap-1.5">
                                                    <Globe className="w-3 h-3 text-cream/30" />
                                                    <span className="text-cream/60 text-xs font-mono">{event.ip}</span>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-cream/80 text-sm truncate">{event.action}</p>
                                            </div>

                                            {/* Meta */}
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <SeverityBadge severity={event.severity} />
                                                <div className="flex items-center gap-1 text-cream/30 text-xs">
                                                    <Clock className="w-3 h-3" />
                                                    {event.time}
                                                </div>
                                                {event.blocked ? (
                                                    <span className="text-[10px] font-black text-emerald-faith bg-emerald-faith/10 border border-emerald-faith/20 px-2 py-0.5 rounded-full">BLOCKED</span>
                                                ) : (
                                                    <span className="text-[10px] font-black text-amber bg-amber/10 border border-amber/20 px-2 py-0.5 rounded-full">MONITORED</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Security notice */}
                            <div className="glass-dark rounded-2xl p-4 border border-rose-grace/10 flex items-start gap-3">
                                <Bell className="w-5 h-5 text-rose-grace flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-rose-grace text-sm font-bold mb-0.5">Real-Time Protection Active</p>
                                    <p className="text-cream/40 text-xs leading-relaxed">
                                        Brute-force attempts are automatically blocked after 5 failed logins.
                                        Content moderation AI scans all uploads. Suspicious IPs are flagged and monitored.
                                        All events are logged for audit purposes.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminDashboard;
