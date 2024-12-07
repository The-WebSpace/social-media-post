// Import required modules and hooks from React and axios for HTTP requests
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
	// State to manage the input for new comments
	const [commentInput, setCommentInput] = useState("");

	// State to store the list of posts fetched from the API
	const [posts, setPosts] = useState([]);

	// useEffect to fetch posts when the component mounts
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts") // API endpoint to get all posts
			.then((response) => setPosts(response.data)) // Update posts state with fetched data
			.catch((error) => console.error("Error fetching posts:", error)); // Handle errors
	}, []);

	// Function to handle liking a post
	const handleLike = (postId) => {
		axios
			.post(`http://localhost:5000/api/posts/like/${postId}`) // API endpoint to like a post
			.then((response) => {
				// Update the posts state with the modified post returned by the API
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts); // Update state with the new list of posts
			})
			.catch((error) => console.error("Error liking post:", error)); // Handle errors
	};

	// Function to handle adding a comment to a post
	const handleAddComment = (postId, commentText) => {
		axios
			.post(`http://localhost:5000/api/posts/comment/${postId}`, {
				text: commentText, // Pass the comment text to the API
			})
			.then((response) => {
				// Update the posts state with the modified post returned by the API
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts); // Update state with the new list of posts
			})
			.catch((error) => console.error("Error adding comment:", error)); // Handle errors
	};

	return (
		<div className="home">
			<h2>Recent Posts</h2>
			{/* Loop through all posts and render them */}
			{posts.map((post) => (
				<div key={post._id} className="post">
					{/* Display the title of the post */}
					<h3>{post.title}</h3>

					{/* Display the content of the post */}
					<p>{post.content}</p>

					{/* Render media file if available */}
					{post.file && (
						<div>
							{/* Check if the file is a video */}
							{post.file.includes(".mp4") ? (
								<video width="320" height="240" controls>
									<source
										src={`http://localhost:5000/uploads/${post.file}`}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							) : (
								/* If not a video, display it as an image */
								<img
									src={`http://localhost:5000/uploads/${post.file}`}
									alt="Post Media"
								/>
							)}
						</div>
					)}

					{/* Display the number of likes */}
					<p>Likes: {post.likes}</p>

					{/* Button to like a post */}
					<button onClick={() => handleLike(post._id)}>Like</button>

					{/* Display the number of comments */}
					<p>Comments: {post.comments.length}</p>

					{/* List all comments for the post */}
					<ul>
						{post.comments.map((comment, index) => (
							<li key={index}>{comment.text}</li>
						))}
					</ul>

					{/* Input for adding a new comment */}
					<input
						type="text"
						placeholder="Add a comment"
						className="comment-input"
						onChange={(e) => setCommentInput(e.target.value)} // Update the commentInput state on change
					/>

					{/* Button to add the comment */}
					<button
						onClick={() => handleAddComment(post._id, commentInput)} // Add the comment on button click
						className="comment-button"
					>
						Add Comment
					</button>
				</div>
			))}
		</div>
	);
}

export default Home;
