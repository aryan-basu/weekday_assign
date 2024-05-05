import { useEffect, useState } from "react";
import '../css/job.css'
const Job = () => {

    const [data, Setdata] = useState(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
        "limit": 10,
        "offset": 1
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
                Setdata(result.jdList);
              // Log the jdList
            })
            .catch((error) => console.error(error));
    }, []); 
    
    return (
        
        <>
        <h1>Weekday</h1>

            <div className="filter-container">
                <div className="filter-child">

                </div>
                <div className="filter-child">

                </div>
                <div className="filter-child">

                </div>
                <div className="filter-child">

                </div>
                <div className="filter-child">

                </div>
                <div className="filter-child">

                </div>
            </div>

            <div className="grid-container">
               
               
                
                {data?data.map((item, index) => {
                    return (
                        <div className="box">
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
                                        <img class="MuiBox-root css-bj12qo" src={item.logoUrl
} alt="logo"></img>
                                        <div><div className="sec-1-subsec-info">
                                            <h3>{item.companyName}</h3>
                                            <h2>{item.jobRole}</h2>
                                        </div>
                                            <p>{item.location} | Exp: &nbsp;{item.minExp}-{item.maxExp}  &nbsp;
 years

                                            </p>
                                        </div>

                                    </div>






                                    <p className="expected-salary">Estimated salary {item.minJdSalary
                                    }k-{item.maxJdSalary}k {item.salaryCurrencyCode
}

                                        <span aria-label="Offered salary range" class=""> ✅</span>
                                    </p>

                                    <div className="about-company">
                                        <h3>About Company:</h3>
                                        <h6>About us</h6>
                                        <p>
                                            {item.jobDetailsFromCompany}
                                        </p>
                                        <h6>Founder/Recruiter profiles:</h6>
                                        <p><a><span>Sidhu moosewala
                                        </span></a></p>

                                        <h6>About Role:</h6>

                                    </div>
                                    <div className="view-job"><a href={item.jdLink
}>View job</a></div>

                                </div>
                                <div className="button">
                                    <div className="button-text">
                                        <p>⚡ Easy Apply</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                  )  
                }) : <div class="box">
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
                                <img class="MuiBox-root css-bj12qo" src="https://storage.googleapis.com/weekday-assets/airtableAttachment_1714542815382_7w5g1.jpg" alt="logo"></img>
                                <div><div className="sec-1-subsec-info">
                                    <h3>Gemini Technologies</h3>
                                    <h2>Senior engineer</h2>
                                </div>
                                    <p>India | Exp:5-5 years

                                    </p>
                                </div>

                            </div>






                            <p className="expected-salary">Estimated salary 30-60LPA

                                <span aria-label="Offered salary range" class=""> ✅</span>
                            </p>

                            <div className="about-company">
                                <h3>About Company:</h3>
                                <h6>About us</h6>
                                <p>
                                    Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.
                                    Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.
                                    Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.
                                    Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.
                                    Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue.
                                </p>
                                <h6>Founder/Recruiter profiles:</h6>
                                <p><a><span>Sidhu moosewala
                                </span></a></p>

                                <h6>About Role:</h6>

                            </div>
                            <div className="view-job"><a href="/narrative-(yc-w23)-founding-fullstack-engineer-nfx7?candidateId=U2FsdGVkX18qS8q1yZVtdME3FhHGxxs3/lgUXUs7nySId+hJNfup1OyLMimAFy92">View job</a></div>

                        </div>
                        <div className="button">
                            <div className="button-text">
                                <p>⚡ Easy Apply</p>
                            </div>
                        </div>
                    </div>
                </div>}
           

              
            </div>
        </>
    )
}

export default Job;