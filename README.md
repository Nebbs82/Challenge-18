# MERN Book Search Engine

## Description
This is a fully functional book search engine built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. The application allows users to search for books, save books to their account, and view their saved books.

## Features
* Search for books by keyword
* Save books to user account
* View saved books
* User authentication (login and signup)
* GraphQL API with Apollo Server

## Technologies Used
* MongoDB
* Express.js
* React
* Node.js
* GraphQL
* Apollo Server

## Installation
To install the necessary dependencies, run the following command:
bun install &bun run build

## Usage

To start the application, run the following command:
bun run develop

Once the server is running, you can access the application in your web browser at http://localhost:3000.
API Documentation

The API uses GraphQL with Apollo Server. The available queries and mutations are:

    me: Returns the current user's data
    login: Logs in a user with the provided email and password
    addUser: Creates a new user with the provided username, email, and password
    saveBook: Saves a book to the current user's account
    removeBook: Removes a book from the current user's account

## Deployment

The application is deployed to Render with a MongoDB database using MongoDB Atlas.

## License
N/A

## Contact

Github Repo: [Nebbs82](https://github.com/Nebbs82/Challenge-18-Book-Search)

Deployed App: [Book Search](https://challenge-18-book-search.onrender.com)
