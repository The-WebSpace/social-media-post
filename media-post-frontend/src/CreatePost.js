// Import necessary modules and hooks
import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import axios for HTTP requests

function CreatePost() {
	// State to manage the new post data
	const [newPost, setNewPost] = useState({
		title: "", // Initialize title as an empty string
		content: "", // Initialize content as an empty string
		file: null, // Initialize file as null
	});

	// Handle changes in input fields (title and content)
	const handleInputChange = (event) => {
		const { name, value } = event.target; // Destructure name and value from the input
		setNewPost({ ...newPost, [name]: value }); // Update the corresponding field in the state
	};

	// Handle file input changes
	const handleFileChange = (event) => {
		setNewPost({ ...newPost, file: event.target.files[0] }); // Update the file field in the state
	};

	// Handle form submission to create a new post
	const handlePostSubmit = () => {
		const formData = new FormData(); // Create a FormData object to handle file uploads
		formData.append("title", newPost.title); // Append title to the form data
		formData.append("content", newPost.content); // Append content to the form data
		formData.append("file", newPost.file); // Append the selected file to the form data

		// Send a POST request to the API endpoint
		axios
			.post("http://localhost:5000/api/posts", formData)
			.then((response) => {
				// Reset the form fields after successful post creation
				setNewPost({ title: "", content: "", file: null });
			})
			.catch((error) => console.error("Error creating post:", error)); // Handle errors
	};

	return (
		<div className="create-post">
			<h2>Create a Post</h2>

			{/* Input for the title */}
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={newPost.title}
				onChange={handleInputChange} // Update title on input change
			/>

			{/* Textarea for the content */}
			<textarea
				name="content"
				placeholder="Content"
				value={newPost.content}
				onChange={handleInputChange} // Update content on input change
			></textarea>

			{/* Input for file upload */}
			<input type="file" name="file" onChange={handleFileChange} /> 

			{/* Button to submit the form */}
			<button onClick={handlePostSubmit}>Post</button>
		</div>
	);
}

export default CreatePost; // Export the CreatePost component as the default export
