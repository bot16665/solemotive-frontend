import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import api from '../utils/axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user with backend
  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) return null;

    try {
      const response = await api.post('/users/sync', {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });

      return response.data.user;
    } catch (error) {
      console.error('Error syncing user with backend:', error);
      return null;
    }
  };

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const dbUser = await syncUserWithBackend(firebaseUser);
          setUser({
            ...dbUser,
            firebaseUser
          });
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
