# URL Shortener - Backend
This repository contains the backend logic for the URL Shortener application. The backend is responsible for processing and storing long URLs, generating short URLs, and redirecting users to the original URLs.

## Features
### Two API Routes:
#### POST /shorten:
This endpoint accepts a long URL and returns a shorter, unique URL.
The long URL is validated to ensure it is well-formed.
The system checks if the long URL has already been shortened and, if so, returns the existing short URL.
If the long URL is new, a unique short code is generated, stored in the database alongside the long URL, and then returned to the client.

#### GET /:shortCode:
This endpoint redirects users to the original URL based on the short code provided in the URL path.
The system looks up the short code in the database and, if found, redirects to the original URL.
If the short code is not found, a 404 error is returned.

### Code Structure and Separation of Concerns:
The codebase is organized into different modules to separate concerns and enhance maintainability:
#### Controllers: Handle the business logic and interactions with the database.
`urlController.ts`: Contains the logic for shortening URLs and redirecting based on short codes.
#### Routes: Define the API endpoints and associate them with corresponding controller functions.
`urlRoutes.ts`: Manages the routing for URL shortening and redirection.
#### Entities: Define the data models and schemas.
`Url.ts`: Represents the URL entity in the database, with fields for originalUrl and shortCode.
#### Utilities: Contains utility functions.
`generateShortCode.ts`: Generates unique short codes.
`isValidUrl.ts`: Validates if a given URL is well-formed.

### Security and Best Practices:
#### SQL Injection Protection:

Utilizes TypeORM's parameterized queries and entity management to prevent SQL injection attacks.
Input validation is performed to ensure only well-formed URLs are accepted.

#### CORS Protection:

Configured CORS settings to allow only specific origins and hosts to interact with the backend, enhancing security.
The backend checks both the origin and host headers to ensure that requests come from allowed sources.

#### Environment Configuration:

Utilizes environment variables for configuration, allowing different settings for development, staging, and production environments.

#### Error Handling:

Comprehensive error handling is implemented to provide clear feedback to clients and log issues for troubleshooting.