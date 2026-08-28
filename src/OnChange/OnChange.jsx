import React, {useState} from "react";

function MyComponent() {

    const [comment, setComment] = useState();
    const [radio, setRadio] = useState("Visa");

    function handleCommentChange(e) {
        setComment(e.target.value);
    }

    function handleRadioChange(e) {
        setRadio(e.target.value);
    }

    return(
        <>
            <textarea value={comment}
            onChange={handleCommentChange}></textarea>
            <p>Comment: {comment}</p>

            <input type="radio" value="Visa" 
                   checked= {radio === "Visa"}
                   onChange={handleRadioChange}/>Visa<br />

            <input type="radio" value="MasterCard" 
                   checked= {radio === "MasterCard"}
                   onChange={handleRadioChange}/>Master Card

            <p>Radio: {radio}</p>
        </>
    )
}

export default MyComponent