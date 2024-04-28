// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3030;




const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load users and books data from JSON files
let users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
let books = JSON.parse(fs.readFileSync(path.join(__dirname, 'books.json')));

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/users' && req.method === 'POST') {
        createUser(req, res);
    } else if (reqUrl.pathname === '/users' && req.method === 'GET') {
        getAllUsers(req, res);
    } else if (reqUrl.pathname === '/users/authenticate' && req.method === 'POST') {
        authenticateUser(req, res);
    } else if (reqUrl.pathname === '/books' && req.method === 'POST') {
        createBook(req, res);
    } else if (reqUrl.pathname.startsWith('/books/') && req.method === 'DELETE') {
        deleteBook(req, res);
    } else if (reqUrl.pathname.startsWith('/books/') && (req.method === 'POST' || req.method === 'PUT')) {
        loanOutOrReturnBook(req, res);
    } else if (reqUrl.pathname.startsWith('/books/') && req.method === 'PUT') {
        updateBook(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Function to handle creating a new user
function createUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        saveUsers();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created successfully' }));
    });
}

// Function to handle getting all users
function getAllUsers(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}

// Function to handle authenticating a user
function authenticateUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const credentials = JSON.parse(body);
        const foundUser = users.find(user => user.username === credentials.username && user.password === credentials.password);
        if (foundUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Authentication successful' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Authentication failed' }));
        }
    });
}

// Function to handle creating a new book
function createBook(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const newBook = JSON.parse(body);
        books.push(newBook);
        saveBooks();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book created successfully' }));
    });
}

// Function to handle deleting a book
function deleteBook(req, res) {
    const bookId = parseInt(req.url.split('/').pop());
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book deleted successfully' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Book not found' }));
    }
}

// Function to handle loaning out or returning a book
function loanOutOrReturnBook(req, res) {
    const bookId = parseInt(req.url.split('/').pop()); // Extract book ID from request URL
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', () => {
        const action = req.method === 'POST' ? 'loan out' : 'return';
        const updatedBook = JSON.parse(body);

        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            if (action === 'loan out') {
                // Implement logic for loaning out the book
                // For example, you might set the 'available' property of the book to false
                books[index].available = false;
            } else {
                // Implement logic for returning the book
                // For example, you might set the 'available' property of the book to true
                books[index].available = true;
            }
            
            // Save the updated books data to the JSON file
            saveBooks();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Book ${action} successful` }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    });
}


// Function to handle updating a book
function updateBook(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const updatedBook = JSON.parse(body);
        const index = books.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
            books[index] = updatedBook;
            saveBooks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book updated successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    });
}

// Function to save users data to JSON file
function saveUsers() {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
}

// Function to save books data to JSON file
function saveBooks() {
    fs.writeFileSync(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2));
}

const PORT = 3000;
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);



// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
});
