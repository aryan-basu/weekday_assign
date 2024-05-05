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
                <div className="dropdown-icon">
                    <span className="line"></span>
                    <div className="down-arrow">
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </div>
                </div>
               
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
