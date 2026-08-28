import React, {useState} from "react";

function UpdateObjects() {
    const [car, setCar] = useState({year: 2024, brand: "Ford", model: "mustang"});

    function UpdateYearValue(e) {
        setCar( c => ({...c, year: e.target.value}));
    }
    function UpdateBrandValue(e) {
        setCar( c => ({...c, brand: e.target.value}));
    }
    function UpdateModelValue(e) {
        setCar( c => ({...c, model: e.target.value}));
    }

    return (
        <div>
            <h3>Your fav car is: {car.year} {car.brand} {car.model}</h3>

            <input type="number" value={car.year} onChange={UpdateYearValue}/><br />
            <input type="text" value={car.brand} onChange={UpdateBrandValue}/><br />
            <input type="text" value={car.model} onChange={UpdateModelValue}/>
        </div>
    )
}
export default UpdateObjects