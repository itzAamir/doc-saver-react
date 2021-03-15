import React from "react";
import { NavLink } from "react-router-dom";

const ACTIVE_STYLE = {
   opacity: 1,
   textDecoration: "underline",
};

const Navbar = ({ user }) => {
   return (
      <nav className="navBar">
         <h2>DOCsaver</h2>
         <NavLink
            to={{
               pathname: "/profile",
               state: { name: user.displayName, img: user.photoURL },
            }}
            style={{ color: "white" }}
         >
            <div className="profile">
               <span>{user.displayName}</span>
               <img src={user.photoURL} alt="profile" />
            </div>
         </NavLink>
         <div className="navLinks">
            <NavLink
               exact
               to={{
                  pathname: "/",
                  state: user.uid,
               }}
               activeStyle={ACTIVE_STYLE}
            >
               Uploaded
            </NavLink>
            <NavLink
               exact
               to={{
                  pathname: "/new",
                  state: user.uid,
               }}
               activeStyle={ACTIVE_STYLE}
            >
               New
            </NavLink>
         </div>
      </nav>
   );
};

export default Navbar;
