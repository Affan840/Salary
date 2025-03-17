import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SalaryEstimator from './SalaryEstimator'; // Import the SalaryEstimator component
import EstimatedSalary from './EstimatedSalary'; // Import the EstimatedSalary component

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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<SalaryEstimator />} />
                    <Route path="/estimated-salary" element={<EstimatedSalary />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 