import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

interface AuthContextType {
    user: User | null;
    recentlyRegistered: boolean;
    setRecentlyRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const objType = {
    user: null, recentlyRegistered: false, setRecentlyRegistered: () => { },
}

const AuthContext = createContext<AuthContextType>(objType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [recentlyRegistered, setRecentlyRegistered] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ?? null);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={{ user, recentlyRegistered, setRecentlyRegistered }}>{children}</AuthContext.Provider>;
};
