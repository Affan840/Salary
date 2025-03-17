import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router';
import JobFetcher from './JobFetcher'; // Import the JobFetcher component
import EstimatedSalary from './EstimatedSalary'; // Import the EstimatedSalary component
import Glassdoor from './Glassdoor';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Salary Estimator</Link>
                        </li>
                        <li>
                            <Link to="/estimated-salary">Estimated Salary</Link>
                        </li>
                        <li>
                            <Link to="/glassdoor">Glassdoor</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" exact element={<JobFetcher/>} />
                    <Route path="/estimated-salary" element={<EstimatedSalary/>} />
                    <Route path="/glassdoor" element={<Glassdoor/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;