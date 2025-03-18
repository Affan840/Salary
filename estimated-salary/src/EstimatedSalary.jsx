import React, { useState } from "react";
import axios from "axios";

function EstimatedSalary() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [estimatedSalary, setEstimatedSalary] = useState(null);

  const handleEstimatedSalarySubmit = async (e) => {
    e.preventDefault();
    const salaryData = await fetchEstimatedSalaryData(
      jobTitle,
      location,
      yearsOfExperience
    );
    setEstimatedSalary(salaryData);
  };

  async function fetchEstimatedSalaryData(jobTitle, location, yearsOfExperience) {
    const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&location_type=ANY&years_of_experience=${encodeURIComponent(yearsOfExperience)}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "292ab28bcdmshb7ddb7eed20f132p130835jsn66c9bef19630", // Replace with your actual API key
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      return response.data; // Return the entire result
    } catch (error) {
      console.error("Error fetching estimated salary data:", error);
      return null; // Handle error appropriately
    }
  }

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
          <h2>
            Estimated Salary for {jobTitle} in {location}:
          </h2>
          <p>Min Salary: ${estimatedSalary.data[0].min_salary}</p>
          <p>Max Salary: ${estimatedSalary.data[0].max_salary}</p>
          <p>Median Salary: ${estimatedSalary.data[0].median_salary}</p>
          <p>
            Publisher:{" "}
            <a
              href={estimatedSalary.data[0].publisher_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {estimatedSalary.data[0].publisher_name}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default EstimatedSalary;
