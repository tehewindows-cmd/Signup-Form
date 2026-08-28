import React, { useState, useContext } from "react";
import ComponentC from "./ComponentC.jsx";

function ComponentB() {
    return (
        <div>
            <h2>ComponentB</h2>
            <ComponentC />
        </div>
    )
}

export default ComponentB