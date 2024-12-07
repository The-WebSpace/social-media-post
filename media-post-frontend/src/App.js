// Import required modules and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import routing components from react-router-dom
import Home from './Home'; // Import the Home component
import CreatePost from './CreatePost'; // Import the CreatePost component
import './App.css'; // Import the CSS file for styling

function App() {
	return (
		// Wrap the entire application in a Router to enable routing
		<Router>
			<div className="app">
				{/* Navigation bar */}
				<nav>
					<ul>
						{/* Link to navigate to the Home page */}
						<li>
							<Link to="/">Home</Link>
						</li>
						{/* Link to navigate to the Create Post page */}
						<li>
							<Link to="/create">Create Post</Link>
						</li>
					</ul>
				</nav>
				{/* Define the application routes */}
				<Routes>
					{/* Route for the Create Post page */}
					<Route path="/create" element={<CreatePost />} />
					{/* Route for the Home page */}
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App; // Export the App component as the default export
