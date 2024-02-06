
"use client"
import { useRouter } from "next/navigation"
import { PremiumPanel } from "./premiumPanel";
import { initFirebase } from "@/firebase";
import { StandardPanel } from "./standardPanel";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "../utils/stripePayment";
import { getPremiumStatus } from "../utils/getPremiumstatus";
import { Button } from "../../components/Button";

export default function AccountPage() {
    const router = useRouter();
    const app = initFirebase();
    const auth = getAuth(app);

    const userName = auth.currentUser?.displayName;
    const email = auth.currentUser?.email;

    const [isPremium, setIsPremium] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [portalUrl, setPortalUrl] = useState('');

    useEffect( () => {
      const checkPremium = async () => {
        const newPremiumStatus = auth.currentUser ? await getPremiumStatus(app) : false;
        setIsPremium(newPremiumStatus);
      }

      checkPremium();  
    },[app, auth.currentUser]);


    useEffect( () => {
      if ( isPremium ) {
        savePortalUrl();
      } else{
        saveCheckoutUrl();
      }

    }, [isPremium]);

    const signOut = () => {
      auth.signOut();
      router.push("/");
    }

    const saveCheckoutUrl = async () => {
      const priceId = 'price_1OeKEaKVbehzPhf3cYOxKV9E';
      const newCheckoutUrl = await getCheckoutUrl(app, priceId);
      setCheckoutUrl(newCheckoutUrl);
    }

    const savePortalUrl = async () => {
      const newPortalUrl = await getPortalUrl(app);
      setPortalUrl(newPortalUrl);
    }
    
    const upgradeToPremium = async () => {
      router.push(checkoutUrl);
    }

    const manageSubscription = async () => {
       router.push(portalUrl);
    }

    const upgradeToPremiumButton = ( 
      <Button
        onClick={upgradeToPremium}
        text="Upgrade To Premium"
        disabled={ checkoutUrl ? false : true }
      />
    );

    const managePortalButton = (
      <Button
        onClick={manageSubscription}
        text="Manage Subscription"
        disabled={ portalUrl ? false : true }
      />
    );
    
    const signOutButton = (
      <button
        onClick={signOut}
        className="flex gap-2 items-center align-middle justify-center hover:underline text-slate-500 hover:text-slate-300 text-lg text-center"
      >
          Sign Out
      </button>
    );
  
    const accountSummary = (
      <div>
        <div className="text-slate-500 mb-1">Signed in as {userName}</div>
        <div className="text-slate-300 text-xl">{email}</div>
      </div>
    );
  
      const statusPanel = isPremium ? <PremiumPanel /> : <StandardPanel />;
      const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;
  
    return (
      <div className="flex flex-col justify-center items-center m-auto gap-8">
        {accountSummary} 
        {statusPanel}  
        {memberButton}
        {signOutButton}
      </div>
    );


}