const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json());

// app.post('/api/salary', async (req, res) => {
//     const { jobTitle, yearsOfExperience } = req.body;
//     const averageSalary = await getSalaryFromLinkedIn(jobTitle, yearsOfExperience);
//     res.json({ averageSalary });
// });

app.post("/api/estimated-salary", async (req, res) => {
  const { jobTitle, location, yearsOfExperience } = req.body;
  const estimatedSalary = await getEstimatedSalary(
    jobTitle,
    location,
    yearsOfExperience
  );
  res.json(estimatedSalary);
});

// app.post('/api/jobs', async (req, res) => {
//     const { query } = req.body;
//     const jobData = await getJobDataFromGlassdoor(query);
//     res.json(jobData);
// });

async function getSalaryFromLinkedIn(jobTitle, yearsOfExperience) {
  const url = `https://linkedin-data-api.p.rapidapi.com/search-jobs-v2?keywords=${encodeURIComponent(
    jobTitle
  )}&locationId=92000000&experienceLevel=${yearsOfExperience}&datePosted=anyTime&sort=mostRelevant`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "292ab28bcdmshb7ddb7eed20f132p130835jsn66c9bef19630", // Replace with your actual API key
      "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(url, options);
    const result = response.data; // Adjust based on the actual response structure
    // Here you would extract the average salary from the result
    // For example, if the result contains salary data, you might do:
    // return result.salary; // Adjust this line based on the actual response
    return result; // Return the entire result for now
  } catch (error) {
    console.error("Error fetching job data:", error);
    return null; // Handle error appropriately
  }
}

async function getEstimatedSalary(jobTitle, location, yearsOfExperience) {
  const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${encodeURIComponent(
    jobTitle
  )}&location=${encodeURIComponent(
    location
  )}&location_type=ANY&years_of_experience=${encodeURIComponent(
    yearsOfExperience
  )}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "292ab28bcdmshb7ddb7eed20f132p130835jsn66c9bef19630", // Replace with your actual API key
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data; // Return the entire result for now
  } catch (error) {
    console.error("Error fetching estimated salary data:", error);
    return null; // Handle error appropriately
  }
}

async function getJobDataFromGlassdoor(query) {
  const url = `https://glassdoor-real-time.p.rapidapi.com/jobs/search?query=${encodeURIComponent(
    query
  )}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "292ab28bcdmshb7ddb7eed20f132p130835jsn66c9bef19630", // Replace with your actual API key
      "x-rapidapi-host": "glassdoor-real-time.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data; // Return the entire result for now
  } catch (error) {
    console.error("Error fetching job data from Glassdoor:", error);
    return null; // Handle error appropriately
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
