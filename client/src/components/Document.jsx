import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const Document = () => {
   const { uid, docId } = useParams();
   const [data, setData] = useState({});
   const [isFullScreen, setIsFullScreen] = useState(false);
   const [fullScreen, setFullScreen] = useState("");
   const [contentDisabled, setDisabled] = useState(true);

   useEffect(() => {
      const getData = async () => {
         const ref = await firebase
            .firestore()
            .collection(uid)
            .doc(docId)
            .get();
         setData(ref.data());
      };
      getData();
   }, [uid, docId]);

   const handleImgClick = () => {
      setFullScreen("fullscreen");
      setIsFullScreen(true);
   };

   const handleCloseClick = (e) => {
      e.stopPropagation();
      const imgDiv = document.querySelector(".img-div");
      setIsFullScreen(false);
      imgDiv.classList.remove("fullscreen");
   };

   const handleEdit = () => {
      setDisabled(false);
   };

   const handleCancel = () => {
      setDisabled(true);
   };

   const handleSave = () => {
      const name = document.querySelector(".doc-name");
      const desc = document.querySelector(".description");
      const obj = {
         name: name.value,
         description: desc.value,
         imgUrl: data.imgUrl,
      };
      let updateRef = firebase.firestore().collection(uid).doc(docId);
      updateRef
         .set(obj)
         .then(() => {
            alert("Changes have been saved...");
            setDisabled(true);
         })
         .catch((err) => console.error(err));
   };

   return (
      <div
         className="container mt-3 doc-container"
         style={{
            display: "grid",
            placeItems: "center",
         }}
      >
         <div
            className={`img-div ${isFullScreen && fullScreen}`}
            onClick={handleImgClick}
         >
            <img
               src={data.imgUrl}
               alt="Doc-Name"
               className="img-fluid doc-img"
            />
            {!isFullScreen && <ZoomOutMapIcon className="zoom-icon" />}
            {isFullScreen && (
               <CloseIcon className="close-icon" onClick={handleCloseClick} />
            )}
         </div>

         <div className="name-div container">
            Name:
            <input
               type="text"
               defaultValue={data.name}
               className="doc-name"
               disabled={contentDisabled}
               placeholder="No Name..."
            />
         </div>
         <div className="description-div container">
            Description:
            <input
               type="text"
               defaultValue={data.description}
               className="description"
               disabled={contentDisabled}
               placeholder="No description..."
            />
         </div>
         {contentDisabled && !isFullScreen && (
            <button
               className="btn btn-primary full-width-btn"
               onClick={handleEdit}
            >
               Edit{" "}
               <EditIcon
                  style={{
                     position: "relative",
                     bottom: "3px",
                     transform: "scale(0.8)",
                  }}
               />
            </button>
         )}

         {!contentDisabled && !isFullScreen && (
            <button
               className="btn btn-primary full-width-btn"
               onClick={handleSave}
            >
               Save{" "}
               <SaveIcon
                  style={{
                     position: "relative",
                     bottom: "2px",
                  }}
               />
            </button>
         )}

         {!contentDisabled && !isFullScreen && (
            <button
               className="btn btn-danger full-width-btn"
               onClick={handleCancel}
            >
               Cancel{" "}
               <CancelIcon
                  style={{
                     position: "relative",
                     bottom: "2px",
                  }}
               />
            </button>
         )}
      </div>
   );
};

export default Document;
