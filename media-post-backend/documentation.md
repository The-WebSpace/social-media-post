# Post Management API Documentation

## Overview

This API allows users to create, retrieve, like, and comment on posts. It also supports file uploads for posts. The server uses Express for handling HTTP requests, Mongoose for MongoDB interactions, and Multer for file uploads.

## Base URL
<pre><code>http://localhost:5888</code></pre>

## Endpoints

### 1. GET /api/posts

**Description**

Fetches all posts from the database.

**Response**

- **200 OK:** Returns an array of posts.
- **500 Internal Server Error:** If there is an issue with the server.

**Example Response**

```json
[
  {
    "_id": "63e4e1e8f4dbe8c28d44c001",
    "title": "Sample Post",
    "content": "This is a sample post.",
    "file": "sample-1675664689823.jpg",
    "likes": 0,
    "comments": [
      {
        "text": "Great post!"
      }
    ]
  }
]
```

## 2. POST /api/posts

**Description**

Creates a new post with optional file upload.

**Request**

* **Content-Type:** multipart/form-data

**Body**

* **title** (string) (Required): The title of the post.
* **content** (string) (Required): The content of the post.
* **file** (file) (Optional): A file associated with the post.

**Response**

* **201 Created:** Returns the created post.
* **400 Bad Request:** If title or content is missing.
* **500 Internal Server Error:** If there is an issue with the server.

**Example Request**

<pre><code>POST /api/posts
Content-Type: multipart/form-data

{
  "title": "New Post",
  "content": "This is a new post",
  "file": <file>
}</code></pre>

**Example Response**

<pre><code>{
  "_id": "63e4e1e8f4dbe8c28d44c001",
  "title": "New Post",
  "content": "This is a new post",
  "file": "file-1675664689823.jpg",
  "likes": 0,
  "comments": []
}</code></pre>

## 3. POST /api/posts/like/:postid

**Description**

Increments the like count of a specific post.

**Request Parameters**

* **postid** (string) (Required): ID of the post to like.

**Response**

* **200 OK:** Returns the updated post.
* **404 Not Found:** If the post doesn't exist.
* **500 Internal Server Error:** If there is an issue with the server.

**Example Request**

<pre><code>POST /api/posts/like/63e4e1e8f4dbe8c28d44c001</code></pre>

**Example Response**

<pre><code>{
  "_id": "63e4e1e8f4dbe8c28d44c001",
  "title": "New Post",
  "content": "This is a new post",
  "file": "file-1675664689823.jpg",
  "likes": 1,
  "comments": []
}</code></pre>

## 4. POST /api/posts/comment/:postid

**Description**

Adds a comment to a specific post.

**Request Parameters**

* **postid** (string) (Required): ID of the post to comment on.

**Request Body**

* **Content-Type:** application/json

**Body Parameters**

* **text** (string) (Required): The comment text.

**Response**

* **200 OK:** Returns the updated post with the new comment.
* **404 Not Found:** If the post doesn't exist.
* **500 Internal Server Error:** If there is an issue with the server.
**Example Request**

<pre><code>POST /api/posts/comment/63e4e1e8f4dbe8c28d44c001
Content-Type: application/json

{
  "text": "Great post!"
}</code></pre>

## Example Response

<pre><code>{
  "_id": "63e4e1e8f4dbe8c28d44c001",
  "title": "New Post",
  "content": "This is a new post",
  "file": "file-1675664689823.jpg",
  "likes": 1,
  "comments": [
    {
      "text": "Great post!"
    }
  ]
}</code></pre>

## Error Responses

<table border="1">
  <tr>
    <th>Status Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>400</td>
    <td>Bad Request - Missing or invalid fields</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Not Found - Post does not exist</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - Server issues</td>
  </tr>
</table>

## Setup Instructions

### 1. Install dependencies:

<pre><code>
npm init -y
npm install express mongoose cors body-parser multer uuid
</code></pre>

### 2. Run the server:

<pre><code>node server.js</code></pre>

### 3. Environment Variables:

* **PORT** (optional): Port to run the server on (default: 5000).
* MongoDB connection string should be placed in `mongoose.connect()`.
