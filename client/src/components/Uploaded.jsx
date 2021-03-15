import React, { useContext, useEffect, useState } from "react";
import Doc from "./DocCard";
import firebase from "firebase/app";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { USER } from "../App";

const Uploaded = () => {
   const [body, setBody] = useState("");
   const [prompt, setPrompt] = useState("none");
   const [isDataAvalaible, setIsDataAvalaible] = useState(true);
   const user = useContext(USER);
   const uid = user.uid;

   useEffect(() => {
      const getData = async () => {
         let userData = [];
         firebase
            .firestore()
            .collection(uid)
            .onSnapshot((snapshot) => {
               snapshot.docs.forEach((doc) => {
                  userData.push(doc.data());
               });
               if (userData.length !== 0) {
                  setIsDataAvalaible(true);
                  setBody(() =>
                     userData.map((e, i) => <Doc key={i} data={e} />)
                  );
               } else {
                  setIsDataAvalaible(false);
                  setPrompt("flex");
               }
            });
      };
      getData();
   }, [uid]);

   return (
      <>
         <div className="container upload-container">
            {body}
            <div className="prompt-container" style={{ display: prompt }}>
               {!isDataAvalaible && (
                  <>
                     <div
                        style={{
                           height: "80vh",
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <h1 style={{ fontSize: "1.9rem" }}>
                           No Documents Found{" "}
                           <FindInPageIcon
                              style={{
                                 transform: "scale(1.8)",
                                 position: "relative",
                                 bottom: "3px",
                              }}
                           />
                        </h1>
                        <span>
                           click on the <b>New Tab</b> to get started.
                        </span>
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Uploaded;
