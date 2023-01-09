import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWEk1UudDEQ350xcvh-gcquHEYwRBN2Cw",
    authDomain: "theainoa-73138.firebaseapp.com",
    projectId: "theainoa-73138",
    storageBucket: "theainoa-73138.appspot.com",
    messagingSenderId: "688069149524",
    appId: "1:688069149524:web:3e005569abc3aa7f297ec1",
    measurementId: "G-ZDKKSS7QD1",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (err) {
            console.log(err.message);
        }
        await setDoc(userDocRef, userSnapshot);
    }
    return userDocRef;
};
