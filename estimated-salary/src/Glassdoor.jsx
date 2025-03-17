import React, { useState } from 'react';

function Glassdoor() {
    const [companyId, setCompanyId] = useState('');
    const [jobData, setJobData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetchJobData(companyId);
        setJobData(data);
    };

    return (
        <div>
            <h1>Job Fetcher</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    required
                />
                <button type="submit">Fetch Jobs</button>
            </form>
            {jobData && (
                <div>
                    <h2>Job Data:</h2>
                    <pre>{JSON.stringify(jobData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

async function fetchJobData(companyId) {
    const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
    });
    const data = await response.json();
    return data;
}

export default Glassdoor;