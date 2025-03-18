import React, { useState } from 'react';

function EstimatedSalary() {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [estimatedSalary, setEstimatedSalary] = useState(null);

    const handleEstimatedSalarySubmit = async (e) => {
        e.preventDefault();
        const salaryData = await fetchEstimatedSalaryData(jobTitle, location, yearsOfExperience);
        setEstimatedSalary(salaryData);
    };

    return (
        <div>
            <h1>Estimated Salary</h1>
            <form onSubmit={handleEstimatedSalarySubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <select
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    required
                >
                    <option value="">Select Years of Experience</option>
                    <option value="ZERO_TO_ONE">0-1 Year</option>
                    <option value="ONE_TO_THREE">1-3 Years</option>
                    <option value="THREE_TO_FIVE">3-5 Years</option>
                    <option value="FIVE_TO_SEVEN">5-7 Years</option>
                    <option value="SEVEN_TO_TEN">7-10 Years</option>
                    <option value="TEN_PLUS">10+ Years</option>
                </select>
                <button type="submit">Get Estimated Salary</button>
            </form>
            {estimatedSalary && (
                <div>
                    <h2>Estimated Salary for {jobTitle} in {location}:</h2>
                    <p>Min Salary: ${estimatedSalary.data[0].min_salary}</p>
                    <p>Max Salary: ${estimatedSalary.data[0].max_salary}</p>
                    <p>Median Salary: ${estimatedSalary.data[0].median_salary}</p>
                    <p>Publisher: <a href={estimatedSalary.data[0].publisher_link} target="_blank" rel="noopener noreferrer">{estimatedSalary.data[0].publisher_name}</a></p>
                </div>
            )}
        </div>
    );
}

async function fetchEstimatedSalaryData(jobTitle, location, yearsOfExperience) {
    const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/estimated-salary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle, location, yearsOfExperience }),
    });
    const data = await response.json();
    return data;
}

export default EstimatedSalary;