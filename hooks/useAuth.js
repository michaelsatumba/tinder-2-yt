import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from "expo-google-app-auth";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
    androidClientId: '390081284041-jb3nfn3sgitpl6l8u2maehnr3745jdhr.apps.googleusercontent.com',
    iosClientId: '390081284041-b59b4jus47q3b5ed2guboq53cpbhq4rs.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => 
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // Logged in...
            setUser(user);
        } else {
            // Not logged in...
            setUser(null);
        }

        setLoadingInitial(false)
    }),
        []
    );

    const logout = () => {
        setLoading(true);

        signOut(auth)
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };

    const signInWithGoogle = async () => {
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "success") {
                //login...
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
            }

            return Promise.reject();
        })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
    }), [user, loading, error])
    return (
        <AuthContext.Provider value={memoedValue}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}


export default function useAuth() {
    return useContext(AuthContext);
}