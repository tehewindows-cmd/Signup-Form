import React, { useState, useContext, createContext } from "react";
import ComponentB from "./ComponentB.jsx";

export const UserContext = createContext();

function ComponentA() {

    const [user, setUser] = useState("Tehe");

    return (
        <>
            <h2>ComponentA</h2>
            <h3>Hello {user}</h3>

            <UserContext.Provider value={user}>
                <ComponentB user={user} />
            </UserContext.Provider>
            
        </>
    )
}

export default ComponentA