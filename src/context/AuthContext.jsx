import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Initial devotions mock data
const initialDevotions = {
    child: [
        { id: 1, title: "God's Amazing World", verse: "Genesis 1:1", text: "In the beginning, God created everything! He made the stars, the trees, and YOU. You are special to Him.", prayer: "Thank You God for making the world so beautiful and for making me." },
        { id: 2, title: "Kind Words", verse: "Proverbs 16:24", text: "Kind words are like honey—sweet for the soul. Let's try to say something nice to everyone today!", prayer: "Lord, help me use my tongue to speak only words that make others smile." }
    ],
    teen: [
        { id: 1, title: "Walking in Light", verse: "1 John 1:7", text: "Walking in the light isn't about being perfect; it's about being honest with God and each other. Authenticity beats performance every time.", reflection: "Where have you been 'performing' lately instead of being real?", prayer: "Jesus, help me to walk in the Truth and find freedom in Your grace." },
        { id: 2, title: "Strength in Weakness", verse: "2 Corinthians 12:9", text: "His grace is sufficient. When we feel like we can't handle it, that's exactly where His power shows up best.", reflection: "What's one thing you're struggling with that you need to hand over to Him today?", prayer: "Father, I lean on Your strength today because mine is running thin. Amen." }
    ]
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [devotions] = useState(initialDevotions);

    useEffect(() => {
        // Restore session
        const sessionUser = JSON.parse(sessionStorage.getItem('ct_session_user'));
        if (sessionUser) setUser(sessionUser);

        const storedUsers = JSON.parse(localStorage.getItem('christoons_users')) || [];
        if (storedUsers.length === 0) {
            const defaultUsers = [
                {
                    email: 'admin@christoons.com',
                    password: 'Password123!', // Default admin password
                    name: 'Super Admin',
                    role: 'super_admin',
                    subscriptionTier: 'premium',
                    age: 30,
                    interests: [],
                },
                {
                    email: 'teacher@school.com',
                    password: 'Teacher2026!',
                    name: 'Ms. Apple',
                    role: 'teacher',
                    subscriptionTier: 'premium',
                    age: 28,
                    interests: [],
                },
            ];
            localStorage.setItem('christoons_users', JSON.stringify(defaultUsers));
            setRegisteredUsers(defaultUsers);
        } else {
            setRegisteredUsers(storedUsers);
        }
    }, []);

    const login = (email, password) => {
        const allUsers = JSON.parse(localStorage.getItem('christoons_users')) || [];
        const foundUser = allUsers.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            sessionStorage.setItem('ct_session_user', JSON.stringify(foundUser));
            return { success: true, user: foundUser };
        }
        return { success: false, message: 'Invalid email or password.' };
    };

    const signup = (childData, parentData, password, subscriptionTier = 'free') => {
        const age = parseInt(childData.age);
        let role = age > 12 ? 'teen' : 'child';

        const newUser = {
            ...childData,
            age,
            email: parentData.email,
            password, // In a real app, this would be hashed
            parent: parentData,
            role,
            subscriptionTier,
            joinedAt: new Date().toISOString(),
            xp: 0,
            streak: 0,
            completedContent: [],
        };

        const allUsers = JSON.parse(localStorage.getItem('christoons_users')) || [];

        // Prevent duplicate emails
        if (allUsers.some(u => u.email.toLowerCase() === parentData.email.toLowerCase())) {
            return { success: false, message: 'Email already registered.' };
        }

        const updatedUsers = [...allUsers, newUser];
        localStorage.setItem('christoons_users', JSON.stringify(updatedUsers));
        setRegisteredUsers(updatedUsers);
        setUser(newUser);
        sessionStorage.setItem('ct_session_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    };

    const validateTeacherToken = (token) => {
        // Mock token validation logic
        return token === 'CHRIST123';
    };

    const signupTeacher = (teacherData, password) => {
        const newUser = {
            ...teacherData,
            password,
            role: 'teacher',
            subscriptionTier: 'premium',
            joinedAt: new Date().toISOString(),
        };

        const allUsers = JSON.parse(localStorage.getItem('christoons_users')) || [];
        const updatedUsers = [...allUsers, newUser];
        localStorage.setItem('christoons_users', JSON.stringify(updatedUsers));
        setRegisteredUsers(updatedUsers);
        setUser(newUser);
        sessionStorage.setItem('ct_session_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('ct_session_user');
    };

    const updateProfile = (updates) => {
        const updated = { ...user, ...updates };
        setUser(updated);
        sessionStorage.setItem('ct_session_user', JSON.stringify(updated));

        const allUsers = JSON.parse(localStorage.getItem('christoons_users')) || [];
        const updatedUsers = allUsers.map(u => u.email === updated.email ? updated : u);
        localStorage.setItem('christoons_users', JSON.stringify(updatedUsers));
    };

    const upgradeToPremium = () => updateProfile({ subscriptionTier: 'premium' });

    const canAccessContent = (contentTier) => {
        if (!user) return false;
        if (contentTier === 'free') return true;
        return user.subscriptionTier === 'premium';
    };

    const getDailyDevotion = () => {
        if (!user) return null;
        const type = user.role === 'teen' ? 'teen' : 'child';
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const index = dayOfYear % devotions[type].length;
        return devotions[type][index];
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            signupTeacher,
            validateTeacherToken,
            logout,
            updateProfile,
            upgradeToPremium,
            canAccessContent,
            getDailyDevotion,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
