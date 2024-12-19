import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.init'; // Make sure your Firebase initialization is correct
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Auth Provider
    const googleProvider = new GoogleAuthProvider();

    // Create a user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in with email and password
    const signinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Log out user
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Google Sign-In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log('Google Sign-In successful', user);
                setLoading(false);
                return user;
            })
            .catch((error) => {
                console.error('Error with Google Sign-In:', error.message);
                setLoading(false);
                throw error; // Optional: handle the error as you see fit
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured', currentUser?.email)

            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(response => {
                        console.log('log in token', response.data);
                        setLoading(false);
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
                    .then(response => {
                        console.log('logout', response.data);
                        setLoading(false);
                    })
            }


        })

        return () => {
            unsubscribe();
        }

    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signinUser,
        logoutUser,
        googleSignIn, // Provide the googleSignIn function through context
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
