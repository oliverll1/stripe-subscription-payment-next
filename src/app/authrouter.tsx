"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const HOME_ROUTE = "/";
const ACCOUNT_ROUTE = "/account";

const AuthRouter = (props: any) => {
  // Initialize the Firebase app and obtain the authentication instance
  const app = initFirebase();
  const auth = getAuth(app);

  // Use the useAuthState hook to get the current user and loading state
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const redirect = (
    isLoading: boolean,
    firebaseUser: User | null | undefined
  ) => {
    if (!isLoading) {
      if (firebaseUser) {
        router.push(ACCOUNT_ROUTE);
      } else {
        router.push(HOME_ROUTE);
      }
    }
  };
    
  useEffect(() => {
    redirect(loading, user);
  }, [loading, user]);

  // If authentication is still loading, display a loading message.
  if (loading) {
    return <><span>Loading</span></>;
  } else {
    return <>{props.children}</>;
  }
};

export default AuthRouter;