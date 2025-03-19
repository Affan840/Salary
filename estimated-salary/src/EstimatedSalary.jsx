import React, { useState } from "react";
import axios from "axios";

function EstimatedSalary() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [estimatedSalary, setEstimatedSalary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEstimatedSalarySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEstimatedSalary(null);

    const experienceCategory = mapYearsToCategory(parseInt(yearsOfExperience));
    if (!experienceCategory) {
      setError("Please enter a valid number of years.");
      setLoading(false);
      return;
    }

    // Split job titles by comma and trim spaces
    const jobTitlesArray = jobTitle.split(",").map((title) => title.trim());

    let maxSalaryData = null;

    for (const title of jobTitlesArray) {
      const salaryData = await fetchEstimatedSalaryData(title, location, experienceCategory);
      console.log(salaryData);
      
      if (salaryData && salaryData.data.length > 0) {
        const medianSalary = salaryData.data[0].median_salary;
        if (!maxSalaryData || medianSalary > maxSalaryData.median_salary) {
          maxSalaryData = {
            ...salaryData.data[0],
            job_title: title,
          };
        }
      }
    }

    setLoading(false);

    if (maxSalaryData) {
      setEstimatedSalary(maxSalaryData);
    } else {
      setError("No valid salary data found.");
    }
  };

  // Map numeric input to API-supported experience categories
  const mapYearsToCategory = (years) => {
    if (years < 1) return "LESS_THAN_ONE";
    if (years >= 1 && years <= 3) return "ONE_TO_THREE";
    if (years >= 4 && years <= 6) return "FOUR_TO_SIX";
    if (years >= 7 && years <= 9) return "SEVEN_TO_NINE";
    if (years >= 10 && years <= 14) return "TEN_TO_FOURTEEN";
    if (years >= 15) return "ABOVE_FIFTEEN";
    return null;
  };

  async function fetchEstimatedSalaryData(jobTitle, location, experienceCategory) {
    const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${encodeURIComponent(
      jobTitle
    )}&location=${encodeURIComponent(location)}&location_type=ANY&years_of_experience=${experienceCategory}`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "292ab28bcdmshb7ddb7eed20f132p130835jsn66c9bef19630", // Replace with your actual API key
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error(`Error fetching salary for ${jobTitle}:`, error);
      return null;
    }
  }

  return (
    <div>
      <h1>Estimated Salary</h1>
      <form onSubmit={handleEstimatedSalarySubmit}>
        <input
          type="text"
          placeholder="Job Titles (e.g., Java, Node, React)"
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
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          required
          min="0"
        />
        <button type="submit" disabled={loading}>
          Get Estimated Salary
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && estimatedSalary && (
        <div>
          <h2>
            Highest Estimated Salary for {estimatedSalary.job_title} in {location}:
          </h2>
          <p>Min Salary: ${estimatedSalary.min_salary}</p>
          <p>Max Salary: ${estimatedSalary.max_salary}</p>
          <p>Median Salary: ${estimatedSalary.median_salary}</p>
          <p>
            Publisher:{" "}
            <a
              href={estimatedSalary.publisher_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {estimatedSalary.publisher_name}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default EstimatedSalary;
