// server.js

// Importing required packages
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors'); // Middleware to allow cross-origin requests
const multer = require('multer'); // Middleware for handling file uploads
const path = require('path'); // Utility for working with file and directory paths

const app = express(); // Initialize express application
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory


/* This code is uploaded from npmjs.com from package - multer : storage - DiskStorage  */
// Configure file upload storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the upload directory
    },
    filename: function (req, file, cb) {
        // Set file name as field name + current timestamp + original file extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }); // Initialize multer with the defined storage settings



// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://db1webspace:3456@db1@db1webspace/?ssl=true&replicaSet=atlas-28228u-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {});


// Define the schema for a post
const postSchema = new mongoose.Schema({
    title: String, // Title of the post
    content: String, // Content of the post
    file: String, // Filename of the uploaded file
    likes: { type: Number, default: 0 }, // Number of likes, default is 0
    comments: [{ text: String }] // Array of comments, each containing text
});


// Create a Post model from the schema
const Post = mongoose.model('Post', postSchema);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Route to fetch all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.json(posts); // Send posts as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors with a 500 response
    }
});

// Route to create a new post
app.post('/api/posts', upload.single('file'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.file ? req.file.filename : undefined; // Check if a file was uploaded

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required fields' });
        }

        // Create a new post document and save it
        const post = new Post({ title, content, file });
        await post.save();
        res.status(201).json(post); // Respond with the created post
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to like a post
app.post('/api/posts/like/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId); // Find the post by ID

        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // If post not found, return 404
        }

        post.likes += 1; // Increment the likes count
        await post.save(); // Save the updated post

        res.json(post); // Respond with the updated post
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a comment to a post
app.post('/api/posts/comment/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { text } = req.body; // Extract comment text from request body
        const post = await Post.findById(postId); // Find the post by ID

        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // If post not found, return 404
        }

        post.comments.push({ text }); // Add the new comment
        await post.save(); // Save the updated post

        res.json(post); // Respond with the updated post
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
