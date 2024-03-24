// index.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock book data
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890', review: 'Good book' },
  { id: 2, title: 'Book 2', author: 'Author 2', isbn: '0987654321', review: 'Excellent read' }
];

// Mock user data
let users = [];

// Routes

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get book by ISBN
app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Get book review by ISBN
app.get('/books/:isbn/review', (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json({ review: book.review });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Register new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Add user to mock database (for demonstration only)
  users.push({ username, password });
  res.json({ message: 'User registered successfully' });
});

// Login as registered user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if user exists in mock database (for demonstration only)
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Add a book review
app.post('/books/:isbn/review', (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    book.review = review;
    res.json({ message: 'Review added successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Delete book review
app.delete('/books/:isbn/review', (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    delete book.review;
    res.json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
