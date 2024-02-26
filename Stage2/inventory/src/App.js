import React, { useState, useEffect } from "react";
import './App.css';

const Table = () => {
    const [data, setData] = useState(null);
    const [foodList, setFoodList] = useState([]);
    const [lastPressedButton, setLastPressedButton] = useState(null);

    //Called when the component is ready
    useEffect(() => {
        //Define the function
        const fetchFoodData = async () => {
            try {
                const response = await fetch("data.json");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log("Missing file");
            }
        }
        //Calls the function
        fetchFoodData();
    }, []);

    // Function to open inventory
    const loadElements = (el) => {
        if (el == null) {
            return;
        }
        // Clear previous elements
        setFoodList([]);
        
        // Update foodList state with new elements
        setFoodList(el);

        setLastPressedButton(null);
    };

    const handleClick = (idx) => {
        setLastPressedButton(idx); // Update lastPressedButton state
    };

    return (
        <div>
            <header>
                <h1>
                    Inventory
                </h1>
            </header>
            <div className="tab">
                <TableRow data={data} loadElements={loadElements} />
            </div>
            <div id="foodList" className="btn-group">
                <div>
                    {foodList.map((item, index) => (
                        <TableElement
                            key={index}
                            index={index}
                            data={item}
                            className={index === lastPressedButton ? 'button button-clicked' : 'button'}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const TableRow = ({ data, loadElements }) => {
    if (!data) {
        return null;
    }
    return (
        Object.keys(data).map((d, index) =>
            <TableHeaders key={index} className="tablinks" name={d} data={data[d]} loadElements={loadElements} />
        )
    )
}

const TableHeaders = ({ name, data, loadElements }) => {
    const handleClick = () => {
        loadElements(data)
    }

    return (
        <button onClick={handleClick}>{name}</button>
    )
}

const TableElement = ({ data, className, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {data}
        </button>
    )
}

function App() {
    return (
        <div>
            <Table></Table>
        </div>
    );
}

export default App;
