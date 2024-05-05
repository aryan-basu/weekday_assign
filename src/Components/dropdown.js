import React, { useState, useEffect, useRef } from "react";
import "../css/dropdown.css";

const Dropdown = ({ options, placeholder, dropdownName }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const clearSelectedOptions = () => {
        setSelectedOptions([]);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-name" ref={dropdownRef}>
            <p>{dropdownName}</p>
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
                        placeholder={selectedOptions.length === 0 ? placeholder : ""}
                        readOnly
                    />
                    <div className="dropdown-icon">
                        <div className="cross-arrow" onClick={clearSelectedOptions}>
                            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg">
                                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                            </svg>
                        </div>
                        <span className="line"></span>
                        <div className="down-arrow" >
                            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg">
                                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                            </svg>
                        </div>
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

export default Dropdown;
