import React, { useState, useEffect, useRef } from "react";
import "../css/dropdown.css";

const DropdownOne = ({ options, placeholder, dropdownName, onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    const unselectedOptions = options.filter((option) => option !== selectedOption);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Call the callback function whenever selected option changes
        onOptionChange(selectedOption);
    }, [selectedOption, onOptionChange]);

    return (
        <div className="dropdown-name" ref={dropdownRef}>
            <p>{dropdownName}</p>
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption && (
                        <span className="selected-pill" onClick={() => setSelectedOption("")}>
                            {selectedOption} <span className="remove-option">&times;</span>
                        </span>
                    )}
                    <input
                        type="text"
                        className="selected-options"
                        placeholder={selectedOption ? "" : placeholder}
                        
                        readOnly
                    />
                    <div className="dropdown-icon">
                        {isOpen && (
                            <div className="up-arrow">
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                                    <path d="M4.516 12.452c0.436 0.446 1.043 0.481 1.576 0l3.908-3.747 3.908 3.747c0.533 0.481 1.141 0.446 1.574 0 0.436-0.445 0.408-1.197 0-1.615-0.406-0.418-4.695-4.502-4.695-4.502-0.217-0.223-0.502-0.335-0.787-0.335s-0.57 0.112-0.789 0.335c0 0-4.287 4.084-4.695 4.502s-0.436 1.17 0 1.615z"></path>
                                </svg>
                            </div>
                        )}
                        {!isOpen && (
                            <div className="down-arrow">
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
                {isOpen && (
                    <div className="dropdown-content">
                        {unselectedOptions.map((option) => (
                            <div key={option} className="dropdown-option" onClick={() => toggleOption(option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownOne;
