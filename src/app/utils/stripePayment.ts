import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getCheckoutUrl = async (
    app: FirebaseApp,
    priceId: string
  ): Promise<string> => {
    // Get the authentication instance from the Firebase app.
    const auth = getAuth(app);
  
    // Get the current user's ID if authenticated, otherwise throw an error.
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated");
  
    // Get a reference to the Firestore database.
    const db = getFirestore(app);
  
    // Construct a reference to the 'checkout_sessions' collection for the current user.
    const checkoutSessionRef = collection(
      db,
      "customers",
      userId,
      "checkout_sessions"
    );
  
    // Add a document to the 'checkout_sessions' collection with specified data.
    const docRef = await addDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
  
    // Listen for changes to the document and return a Promise.
    return new Promise<string>((resolve, reject) => {
      const unsubscribe = onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data() as {
          error?: { message: string };
          url?: string;
        };
  
        // Handle errors and resolve with the URL if available.
        if (error) {
          unsubscribe();
          reject(new Error(`An error occurred: ${error.message}`));
        }
        if (url) {
          console.log("Stripe Checkout URL:", url);
          unsubscribe();
          resolve(url);
        }
      });
    });
  };
  
  export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
    // Get the authentication instance from the Firebase app.
    const auth = getAuth(app);
  
    // Get the current user.
    const user = auth.currentUser;
  
    let dataWithUrl: any;
  
    try {
      // Get a reference to the Firebase Functions and call a specific function.
      const functions = getFunctions(app, "us-central1");
      const functionRef = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createPortalLink"
      );
      
      // Call the function with the current user id and return url.
      const { data } = await functionRef({
        customerId: user?.uid,
        returnUrl: window.location.origin,
      });
  
      dataWithUrl = data as { url: string };
      console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    } catch (error) {
      console.error(error);
    }
  
    // Return a promise that resolves with the portal URL or rejects with an error.
    return new Promise<string>((resolve, reject) => {
      if (dataWithUrl && dataWithUrl.url) {
        resolve(dataWithUrl.url);
      } else {
        reject(new Error("No url returned"));
      }
    });
  };
