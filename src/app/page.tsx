"use client"

import Image from "next/image";
import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../components/Button";


export default function Home() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const goToAccount = () => {
     router.push("/account");
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      goToAccount();
    }
  }

  const rightArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <>
      <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-teal-400 to-blue-500">
          Stripe Subscription Test
      </h1>
      <span className="text-xl md:text-2xl font-light mb-8">
        Welcome! Let's get started.
      </span>
        <Button
          onClick={signIn}
          text="Login With Google"
          icon={rightArrow}
        />
      </>
    </main>
  );
}
