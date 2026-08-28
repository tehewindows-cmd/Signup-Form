import React, {useState} from "react";

function UpdateArray() {
    const [food, setFood] = useState(["Apple", "Orange", "banana"]);
    const [inputValue, setInputValue] = useState("");

    function handleAddFood() {

        setFood(f => [...f, inputValue]);
        setInputValue("");
    }

    function handleRemoveFood(index) {

        setFood(food.filter((_, i) => i !== index));
    }

    return (
        <div>
            <h2>List of foods</h2>
            <ul>
                {food.map((fooditem, index) => 
                <li key={fooditem} onClick={() => handleRemoveFood(index)}>
                    {fooditem}
                </li>)}
            </ul>

            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleAddFood}>Add</button>
        </div>
    )
}

export default UpdateArray