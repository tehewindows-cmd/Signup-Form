import React, { useState, useContext } from "react";
import { UserContext } from "./ComponentA.jsx";

function ComponentC() {

    const user = useContext(UserContext);

    return (
        
        <div>
            <h2>ComponentC</h2>
            <h3>Bye {user}</h3>
        </div>
    )
}

export default ComponentC