import React, { useEffect, useState, createContext } from 'react';
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom"
import Uploaded from "./components/Uploaded";
import NewForm from "./components/NewForm";
import Document from "./components/Document";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import firebase from "firebase/app";

const USER = createContext();

const App = () => {
    const [isSignedIn, setIsSigned] = useState(false);
    const [userValue, setUserValue] = useState({});

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUserValue(user);
                setIsSigned(true);
            } else {
                setIsSigned(false);
            }
        });
    }, [])


    return (
        <>
            {isSignedIn
                ?
                (
                    <>
                        <USER.Provider value={userValue}>
                            <Navbar user={userValue} />
                            <Switch>
                                <Route exact path="/"><Uploaded /></Route>
                                <Route exact path="/new"><NewForm /></Route>
                                <Route exact path="/document/:uid/:docId"><Document /></Route>
                                <Route exact path="/profile"><Profile /></Route>
                            </Switch>
                        </USER.Provider>
                    </>
                )
                :
                < LoginPage />
            }
        </>
    );
}

export {
    USER, App as default
};