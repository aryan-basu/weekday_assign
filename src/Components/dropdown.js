import React, { useState } from "react";
import "../css/dropdown.css";

const Dropdown = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option) => {
        setSelectedOptions((prevOptions) => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter((item) => item !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };

    const unselectedOptions = options.filter((option) => !selectedOptions.includes(option));

    return (
        <div className="dropdown">
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                {selectedOptions.map((option) => (
                    <span key={option} className="selected-pill" onClick={() => toggleOption(option)}>
                        {option} <span className="remove-option">&times;</span>
                    </span>
                ))}
                <input
                    type="text"
                    className="selected-options"
                    placeholder={selectedOptions.length === 0 ? "Select an option" : ""}
                    readOnly
                />
               
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    {unselectedOptions.map((option) => (
                        <div
                            key={option}
                            className="dropdown-option"
                            onClick={() => toggleOption(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
