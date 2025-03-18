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
                            <Link to="">Estimated Salary</Link>
                        </li>

                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<EstimatedSalary/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;