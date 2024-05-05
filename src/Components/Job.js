import React, { useEffect, useState, useRef } from "react";
import '../css/job.css';

const Job = () => {
    const [data, setData] = useState([]); // Initialize data state as an empty array
    const [page, setPage] = useState(0); // State to track current page number
    const countRef = useRef(0); // Ref to track count
    const pageRef = useRef(0); // Ref to track page

    // Function to fetch data
    const fetchData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = JSON.stringify({
                "limit": 10,
                "offset": page
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: body
            };
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const result = await response.json();

            setData(prevData => [...prevData, ...result.jdList]); // Append new data to the existing data
            if (countRef.current === 0) {
                pageRef.current = 11;
                setPage(prevPage => prevPage + 11); // Increment page number by 11 for the first call
            } else {
                pageRef.current = pageRef.current + 10;
                setPage(prevPage => prevPage + 10); // Increment page number by 10 for subsequent calls
            }
            countRef.current = 1; // Update count
            // console.log('it came', pageRef.current); // Log updated page number
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle scroll events
    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            fetchData();
        }
    };

    // Add event listener for scroll events when component mounts
    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup function to remove event listener
    }, []);

    return (
        <>
            <h1>Weekday</h1>
            <div className="filter-container">
                {/* Filters */}
            </div>
            <div className="grid-container">
                {data.map((item, index) => (
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
                                <p className="expected-salary">Estimated salary {item.minJdSalary}k-{item.maxJdSalary}k {item.salaryCurrencyCode}</p>
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
