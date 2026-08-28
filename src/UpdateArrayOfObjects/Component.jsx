import React, {useState} from "react";

function Component() {
    const [cars, setCars] = useState([]);
    const [carYear, setCarYear] = useState(new Date().getFullYear());
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");

    function handleAddCar() {
        const newCar = {id: Date.now,
                        year: carYear,
                        brand: carBrand,
                        model: carModel};

        setCars(c => [...c, newCar]);

        setCarYear(new Date().getFullYear());
        setCarBrand("");
        setCarModel("");
    }

    function handleRemoveCar(index) {
        setCars(cars.filter((_, i) => i !== index));
    }

    function handleYearChange(e) {
        setCarYear(Number(e.target.value));
    }

    function handleBrandChange(e) {
        setCarBrand(e.target.value);
    }

    function handleModelChange(e) {
        setCarModel(e.target.value);
    }

    return (
        <div className="wrapper">
            <h2>List of car object</h2>

            <ul>
                {cars.map((car, index) =>
                <li key={car.id} onClick={() => handleRemoveCar(index)}>
                    {car.year} {car.brand} {car.model}
                </li>)}
            </ul>

            <input type="number" value={carYear} onChange={handleYearChange} />
            <input type="text" value={carBrand} onChange={handleBrandChange} 
            placeholder="Enter car brand" />
            <input type="text" value={carModel} onChange={handleModelChange} 
            placeholder="Enter car model" />

            <button onClick={handleAddCar}>Add Car</button>
        </div>
    )
}

export default Component