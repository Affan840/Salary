import React, { useState } from 'react';

function JobFetcher() {
    const [jobTitle, setJobTitle] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [averageSalary, setAverageSalary] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const salaryData = await fetchSalaryData(jobTitle, yearsOfExperience);
        console.log(salaryData);
        
    };

    return (
        <div>
            <h1>Salary Estimator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
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
                <button type="submit">Get Average Salary</button>
            </form>
            {averageSalary && <h2>Average Salary: ${averageSalary}</h2>}
        </div>
    );
}

async function fetchSalaryData(jobTitle, yearsOfExperience) {
    const response = await fetch('http://localhost:5000/api/salary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle, yearsOfExperience }),
    });
    const data = await response.json();
    return data;
}

export default JobFetcher;