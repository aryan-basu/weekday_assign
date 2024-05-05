import React, { useEffect, useRef, useState } from "react";
import '../css/job.css';
import Dropdown from "./dropdown";
import exp from "../constant/experience";
import locations from "../constant/locations";
import pay from "../constant/pay";
import techstack from "../constant/techstack";
import role from "../constant/Role";
import remote from "../constant/remote";
import DropdownOne from "./dropdownone";

const Job = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const pageRef = useRef(0);
    const limit = 10; // Set the limit for each API call

    // States for selected options
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTechstack, setSelectedTechstack] = useState([]);
    const [selectedPay, setSelectedPay] = useState("");
    const [selectedRemote, setSelectedRemote] = useState("");
    const [selectedExp, setSelectedExp] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [companyname, setCompanyName] = useState("");

    // Function to fetch data
    const fetchData = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var body = JSON.stringify({
                "limit": limit,
                "offset": pageRef.current * limit // Calculate the offset based on the current page and limit
            });
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: body
            };
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const result = await response.json();

            setData(prevData => [...prevData, ...result.jdList]); // Append new data to the existing data

            pageRef.current = pageRef.current + 1; // Increment page number

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle scroll events
    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            fetchData();
        }
    };

    // Add event listener for scroll events when component mounts
    useEffect(() => {
        if (window.scrollY === 0)
            fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup function to remove event listener
    }, []);

    // Function to filter data based on selected options
    useEffect(() => {
        filterData();
    }, [selectedRoles, selectedTechstack, selectedPay, selectedRemote, selectedExp, selectedLocation, companyname,data]);

    // Function to handle selected options change
    const handleSelectedOptionsChange = (option, dropdownName) => {
        // Handle the updated selected options here
        switch (dropdownName) {
            case "Roles":
                setSelectedRoles(option);
                break;
            case "Techstack":
                setSelectedTechstack(option);
                break;
            case "Minimum Base Pay":
                setSelectedPay(option);
                break;
            case "Remote":
                setSelectedRemote(option);
                break;
            case "Minimum Experience":
                setSelectedExp(option);
                break;
            case "Location":
                setSelectedLocation(option);
                break;
            default:
                break;
        }
    };

    // Function to filter data based on selected options
    const filterData = () => {
        let filtered = [...data];

        if (selectedLocation.length > 0) {
            filtered = filtered.filter(job => {
                // Check if any of the selected locations are included in the job's location
                return selectedLocation.some(selected => job.location.includes(selected));
            });
        }

        
        if (selectedRoles.length > 0) {
            filtered = filtered.filter(job => {
                // Check if any of the selected roles match the job's role
                return selectedRoles.some(selected => job.jobRole === selected);
            });
        }
        //  add this if api has tech stack also as a prameter
        // if (selectedTechstack.length > 0) {
        //     filtered = filtered.filter(job => {
        //         // Check if any of the selected techstacks match the job's techstack
        //         return selectedTechstack.some(selected => job?.techStack.includes(selected));
        //     });
        // }

        if (selectedRemote.length > 0) {
            filtered = filtered.filter(job => job.remote === selectedRemote);
        }

        // Filter by minimum base pay
        if (selectedPay !== "") {
            const numericSelectedPay = parseInt(selectedPay.replace(/\D/g, ''), 10);
            filtered = filtered.filter(job => job.minJdSalary >= numericSelectedPay);
        }

        // Filter by minimum experience
        if (selectedExp !== "") {
            filtered = filtered.filter(job => job.minExp <= selectedExp);
        }

        // Filter by company name
        if (companyname !== "") {
            filtered = filtered.filter(job => job.companyName.toLowerCase().includes(companyname.toLowerCase()));
        }

        setFilteredData(filtered);
    };

    return (
        <>
            <div className="page-header">
                <span>  <img className="MuiBox-root css-6sxfzj" src="https://jobs.weekday.works/_next/static/media/logo-small.08826abd.png" alt="logo"></img></span>
                <h1>Weekday</h1>
            </div>

            <div className="filter-container">
                {/* Filters */}
                <Dropdown
                    options={role}
                    placeholder={"Roles"}
                    dropdownName={"Roles"}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Roles")}
                />
                <Dropdown
                    options={techstack}
                    placeholder={"Techstack"}
                    dropdownName={"Techstack"}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Techstack")}
                />
                <DropdownOne
                    options={pay}
                    placeholder={"Minimum Base Salary"}
                    dropdownName={"Minimum Base Pay"}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Minimum Base Pay")}
                />
                <Dropdown
                    options={remote}
                    placeholder={"Remote"}
                    dropdownName={"Remote"}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Remote")}
                />
                <DropdownOne
                    options={exp}
                    placeholder={"Minimum Experience"}
                    dropdownName={""}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Minimum Experience")}
                />
                <Dropdown
                    options={locations}
                    placeholder={"Location"}
                    dropdownName={""}
                    onOptionChange={(option) => handleSelectedOptionsChange(option, "Location")}
                />

                <input
                    type="text"
                    className="company"
                    placeholder={'Company Name'}
                    onChange={(e) => setCompanyName(e.target.value.toLowerCase())}
                />
            </div>
            <div className="grid-container">
                {filteredData.map((item, index) => (
                    <div className="box" key={index}>
                        <div className="box-body">
                            <div className="day-card">
                                <div className="pill-wrap">
                                    <div className="day-pill">
                                        <p>Posted 3 days ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="section1-info">
                                    <img className="logo" src={item.logoUrl} alt="Company Logo" />
                                    <div>
                                        <div className="sec-1-subsec-info">
                                            <h3>{item.companyName}</h3>
                                            <h2>{item.jobRole}</h2>
                                        </div>
                                        <p>{item.location} | Exp: {item.minExp}-{item.maxExp} years</p>
                                    </div>
                                </div>
                                {item.minJdSalary === null && item.maxJdSalary == null ? '' : <p className="expected-salary">Estimated salary{item.minJdSalary === null ? '' : ` ${item.minJdSalary}k-`} { item.maxJdSalary===null?'':`${item.maxJdSalary}k `}{item.salaryCurrencyCode}</p>}
                                <div className="about-company">
                                    <h3>About Company:</h3>
                                    <h6>About us</h6>
                                    <p>{item.jobDetailsFromCompany}</p>
                                    <h6>Founder/Recruiter profiles:</h6>
                                    <p><a href="#">{item.companyName}</a></p>
                                    <h6>About Role:</h6>
                                </div>
                                <div className="view-job">
                                    <a href={item.jdLink}>View job</a>
                                </div>
                            </div>
                            <div className="button">
                                <div className="button-text">
                                    <p>⚡ Easy Apply</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Job;
