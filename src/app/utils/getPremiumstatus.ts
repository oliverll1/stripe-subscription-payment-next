import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const getPremiumStatus = async (app: FirebaseApp) => {
    // Get the authentication instance from the Firebase app.
    const auth = getAuth(app);
  
    // Get the current user id if authenticated, otherwise throw an error.
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not logged in");
  
    // Get a reference to the firestore database.
    const db = getFirestore(app);
  
    // Construct a reference to the subscriptions collection for the current user.
    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  
    // Construct a query to get subscriptions where the status is either 'trialing' or 'active'.
    const q = query(
      subscriptionsRef,
      where("status", "in", ["trialing", "active"])
    );
  
    // Return a Promise that resolves with a boolean indicating premium status.
    return new Promise<boolean>((resolve, reject) => {
      // Set up a snapshot listener for the query.
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // In this implementation, we only expect one active or trialing subscription to exist.
          console.log("Subscription snapshot", snapshot.docs.length);
  
          // Check the number of documents in the snapshot to determine premium status.
          if (snapshot.docs.length === 0) {
            console.log("No active or trialing subscriptions found");
            resolve(false);
          } else {
            console.log("Active or trialing subscription found");
            resolve(true);
          }
  
          // Unsubscribe from the snapshot listener to avoid further updates.
          unsubscribe();
        },
        reject  // Handle any errors that occur during the snapshot listener.
      );
    });
  };
  