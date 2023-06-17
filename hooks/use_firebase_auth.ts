import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { InAuthUser } from '@/models/in_auth_user';
import FirebaseClient from '@/models/firebase_client';

export default function useFirebaseAuth() {
  const [authUser, setAtuhUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider);
      if (signInResult.user) {
        console.info(signInResult.user);
        const resp = await fetch('/api/members.add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: signInResult.user.uid,
            email: signInResult.user.email,
            displayName: signInResult.user.displayName,
            photoURL: signInResult.user.photoURL,
          }),
        });
        console.info({ status: resp.status });
        const respData = await resp.json();
        console.info(respData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const clear = () => {
    setAtuhUser(null);
    setLoading(true);
  };

  const signOut = () => FirebaseClient.getInstance().Auth.signOut().then(clear);

  const authStateChange = async (authState: User | null) => {
    if (authState === null) {
      setAtuhUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAtuhUser({
      uid: authState.uid,
      email: authState.email,
      photoURL: authState.photoURL,
      displayName: authState.displayName,
    });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChange);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
