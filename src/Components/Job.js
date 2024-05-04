import { useEffect, useState } from "react";
import '../css/job.css'
const Job = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
        "limit": 10,
        "offset": 0
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };
    useEffect(() => {
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.json()) // Assuming the response is JSON
            .then((result) => {
                console.log("API Response:", result.jdList); // Log the API response
              // Log the jdList
            })
            .catch((error) => console.error(error));
    }, []); 
    
    return (
        
        <>
        <h1>Weekday</h1>

            <div className="grid-container">
               
                <div class="box">
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
                                <img   class="MuiBox-root css-bj12qo" src="https://storage.googleapis.com/weekday-assets/airtableAttachment_1714542815382_7w5g1.jpg" alt="logo"></img>
                                <div><div className="sec-1-subsec-info">
                                    <h3>Gemini Technologies</h3>
                                    <h2>Senior engineer</h2>
                                </div>
                                    <p>India | Exp:5-5 years</p>
                                </div>
                             
                            </div>
                            





                    </div>
                        <div className="button">
                            <div className="button-text">
                                <p>⚡ Easy Apply</p>
                                </div>
                        </div>
              </div>
                </div>
                <div class="box">2</div>
                <div class="box">3</div>
                <div class="box">4</div>
                <div class="box">5</div>
                <div class="box">6</div>
                <div class="box">7</div>
                <div class="box">8</div>
                <div class="box">9</div>
                <div class="box">10</div>
            </div>
        </>
    )
}

export default Job;