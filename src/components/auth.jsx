import React, { useState } from "react";
//
import {
   createUserWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import "../assets/css/auth.css";
import { auth, googleProvider } from "../config/firebase";

export const Auth = (props) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         setIsLoggedIn(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleGoogleSignIn = async () => {
      try {
         await signInWithPopup(auth, googleProvider);
         setIsLoggedIn(true);
      } catch (error) {
         console.error(error);
      }
   };

   const handleLogout = async () => {
      try {
         await signOut(auth);
         setIsLoggedIn(false);
      } catch (error) {
         console.error(error);
      }
   };

   console.log(auth?.currentUser?.email);

   return (
      <div className="login-container">
         <div className="login-box">
            {!isLoggedIn ? (
               <>
                  <h2 className="login-title">Login</h2>
                  <form onSubmit={handleSubmit}>
                     <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                     />
                     <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                     />
                     <button type="submit" className="login-button">
                        Login
                     </button>
                  </form>
                  <div className="separator">or</div>
                  <button
                     className="google-button"
                     onClick={handleGoogleSignIn}
                  >
                     <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                        alt="Google logo"
                        className="google-icon"
                     />
                     Sign in with Google
                  </button>
               </>
            ) : (
               <>
                  <h2 className="login-title">Welcome!</h2>
                  <button className="logout-button" onClick={handleLogout}>
                     Logout
                  </button>
               </>
            )}
         </div>
      </div>
   );
};
