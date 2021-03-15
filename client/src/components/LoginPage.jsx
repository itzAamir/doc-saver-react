import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
   const histroy = useHistory();
   const handleLogin = () => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
         .auth()
         .signInWithPopup(provider)
         .then((result) => {
            histroy.push("/");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <>
         <div className="login-container">
            <nav>
               <h1>DOCsaver</h1>
            </nav>
            <div className="login-div">
               <h4>WELCOME TO DOC-SAVER</h4>
               <span>To continue Login with google account</span>
               <button className="login-btn" onClick={handleLogin}>
                  <img
                     src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                     alt="google"
                  />{" "}
                  Sign-In with Google
               </button>
            </div>
         </div>
      </>
   );
};

export default LoginPage;
