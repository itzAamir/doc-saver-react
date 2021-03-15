import React, { useState } from "react";
import { storage } from "../firebase/config";
import firebase from "firebase/app";
import BsAlert from "./BootstrapAlert";
import PublishIcon from "@material-ui/icons/Publish";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";

const NewForm = () => {
   const [fileName, setFileName] = useState("");
   const [isValidFile, setIsValidFile] = useState(false);
   const [uploadPercent, setUploadPercent] = useState(0);
   const [isUploading, setIsUploading] = useState(false);
   const [bsAlert, setBsAlert] = useState("");
   // Keeping name bsAlert because alert is already a function is JS
   let location = useLocation();
   const userId = location.state;

   function handleImageChange(e) {
      const img = e.target.files[0];
      if (img !== undefined) {
         if (img.type === "image/png" || img.type === "image/jpeg") {
            setFileName(img.name);
            setIsValidFile(true);
         } else {
            setFileName(
               <span style={{ color: "red" }}>
                  {" "}
                  {img.type} File type not supported
               </span>
            );
            setIsValidFile(false);
         }
      } else {
         setFileName("");
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      const docName = document.getElementById("doc-name");
      const docDesc = document.getElementById("doc-desc");
      const docImg = document.getElementById("file-uploader");

      // Uploading Image
      if (fileName === "" || docName.value === "") {
         setBsAlert(
            <BsAlert type="danger">
               Make sure you have entered the document name and uploaded the
               image file properly.
            </BsAlert>
         );
      } else {
         if (isValidFile) {
            setIsUploading(true);
            const uploadTask = storage
               .ref(`/image/${userId}/${fileName}`)
               .put(docImg.files[0]);

            //initiates the firebase side uploading
            uploadTask.on(
               "state_changed",
               (snapShot) => {
                  //takes a snap shot of the process as it is happening
                  setUploadPercent(
                     (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                  );
               },
               (err) => {
                  console.log(err);
               },
               () => {
                  storage
                     .ref("image/" + userId)
                     .child(fileName)
                     .getDownloadURL()
                     .then((fireBaseUrl) => {
                        // Uploading docs
                        const doc = {
                           name: docName.value,
                           description: docDesc.value,
                           imgUrl: fireBaseUrl,
                           docId: uuid(),
                        };
                        firebase
                           .firestore()
                           .collection(userId)
                           .doc(doc.docId)
                           .set(doc);

                        setIsUploading(false);
                        setBsAlert(
                           <BsAlert type="success">
                              File has been Uploaded Successfully.
                           </BsAlert>
                        );

                        // After Uploading file Clearing up stuff
                        setFileName("");
                        docName.value = "";
                        docDesc.value = "";
                        docImg.value = "";
                        setTimeout(() => {
                           setUploadPercent(0);
                        }, 2000);
                     });
               }
            );
         } else {
            setBsAlert(
               <BsAlert type="danger">File Type Not Supported.</BsAlert>
            );
         }
      }
   }

   return (
      <>
         {bsAlert}
         <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-group container mt-4">
               <label htmlFor="doc-name">
                  Doc Name<span style={{ color: "var(--danger)" }}>*</span>{" "}
               </label>
               <input
                  type="text"
                  id="doc-name"
                  className="form-control"
                  placeholder="Enter Document Name"
               />
               <label htmlFor="doc-desc" className="mt-2">
                  Desc
               </label>
               <input
                  type="text"
                  id="doc-desc"
                  className="form-control"
                  placeholder="Enter description (optional)"
               />
               <label
                  style={{
                     width: "100%",
                     backgroundColor: "var(--success)",
                     color: "white",
                     padding: "7px",
                     textAlign: "center",
                     cursor: "pointer",
                  }}
                  htmlFor="file-uploader"
                  className="mt-3"
               >
                  Select Image <PhotoCameraIcon />
               </label>{" "}
               <br />
               <span>{fileName}</span>
               <div className="progress">
                  <div
                     className="progress-bar"
                     role="progressbar"
                     aria-valuenow={uploadPercent}
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{ width: `${uploadPercent}%` }}
                  >
                     {Math.round(uploadPercent) + "%"}
                  </div>
               </div>
               <input
                  type="file"
                  className="form-control-file"
                  id="file-uploader"
                  hidden
                  onChange={handleImageChange}
               />
               <button
                  style={{
                     width: "100%",
                     position: "fixed",
                     bottom: "0",
                     left: "0",
                     borderRadius: "0",
                  }}
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={isUploading}
               >
                  UPLOAD <PublishIcon />
               </button>
            </div>
         </form>
      </>
   );
};

export default NewForm;
