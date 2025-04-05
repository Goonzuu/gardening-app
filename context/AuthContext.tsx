import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    userRole: 'user' | 'gardener' | null;
    setRecentlyRegistered: React.Dispatch<React.SetStateAction<boolean>>;
    recentlyRegistered: boolean;
}

const objType = {
    user: null, userRole: null, recentlyRegistered: false, setRecentlyRegistered: () => { },
}

const AuthContext = createContext<AuthContextType>(objType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<'user' | 'gardener' | null>(null);
    const [recentlyRegistered, setRecentlyRegistered] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const role = userSnap.data().role;
                    setUserRole(role);
                } else {
                    setUserRole(null);
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={{ user, userRole, recentlyRegistered, setRecentlyRegistered }}>{children}</AuthContext.Provider>;
};
