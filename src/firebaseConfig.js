import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6FAT_DUggSjsdTsxcl6jNkWE_fRE8z0U",
  authDomain: "solemotive-77045.firebaseapp.com",
  projectId: "solemotive-77045",
  storageBucket: "solemotive-77045.appspot.com", 
  messagingSenderId: "882163412474",
  appId: "1:882163412474:web:81cd531f64b3ca35380843",
  measurementId: "G-9963T4YR6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Helper function to detect mobile devices
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Helper function to handle Google Sign In
const handleGoogleSignIn = async () => {
  try {
    if (isMobileDevice()) {
      // Use redirect for mobile devices
      await signInWithRedirect(auth, googleProvider);
      // The redirect result will be handled in the component's useEffect
    } else {
      // Use popup for desktop
      return await signInWithPopup(auth, googleProvider);
    }
  } catch (error) {
    throw error;
  }
};

export { 
  auth, 
  googleProvider,
  handleGoogleSignIn,
  isMobileDevice,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
};
