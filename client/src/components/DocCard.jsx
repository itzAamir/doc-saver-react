import React, { useContext } from "react";
import { storage } from "../firebase/config";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";
import { USER } from "../App";

const Doc = ({ data }) => {
   const user = useContext(USER);
   const handleDelete = async () => {
      // Creating reference of doc
      const docRef = firebase.firestore().collection(user.uid).doc(data.docId);
      // Creating reference of imaged
      const imgRef = storage.refFromURL(data.imgUrl);
      imgRef
         .delete()
         .then(() => {
            // Deleting Doc
            docRef.delete();
            alert("File has been deleted");
            window.location.reload();
         })
         .catch((err) => console.error(err));
   };

   return (
      <div className="doc">
         <span>{data.name}</span>
         <div className="btn-div">
            <NavLink to={`/document/${user.uid}/${data.docId}`}>
               <button className="open-btn btn btn-primary btn-sm">Open</button>
            </NavLink>
            <button
               className="del-btn btn btn-danger btn-sm"
               onClick={handleDelete}
            >
               Delete
            </button>
         </div>
      </div>
   );
};

export default Doc;
