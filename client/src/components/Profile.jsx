import React from "react";
import firebase from "firebase/app";
import { useLocation } from "react-router-dom";

const Profile = () => {
   const location = useLocation();
   const userName = location.state.name;
   const userPic = location.state.img;

   const handleLogout = () => {
      firebase
         .auth()
         .signOut()
         .then(() => {
            // Sign-out successful.
         })
         .catch((error) => {
            // An error happened.
         });
   };
   return (
      <div
         className="container mt-4"
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <h1>Hello {userName}</h1>
         <img
            src={userPic}
            alt="profile"
            width="150px"
            style={{ borderRadius: "10px" }}
         />
         <button
            className="btn btn-danger mt-4"
            style={{ width: "80%" }}
            onClick={handleLogout}
         >
            Logout
         </button>
      </div>
   );
};

export default Profile;
