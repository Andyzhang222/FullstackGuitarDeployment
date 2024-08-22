Fullstack Guitar Deployment

This repository contains the full-stack web application for a second-hand guitar sales platform. The project includes both front-end and back-end components, built to handle various functionalities such as product listing, user authentication, shopping cart management, and order processing.

Table of Contents

Features
Technologies Used
Installation
Usage
Deployment
Contributing
License
Contact
Features

Product Listing: Display all available guitars with options for filtering by brand, price range, type, and sorting.
Product Detail Pages: Provide detailed information for each guitar, including images and specifications.
User Authentication: Secure user registration, login, and session management using AWS Cognito and JWT.
Shopping Cart: Add, update, and remove items from the cart with persistent storage across sessions.
Order Management: Process user orders and manage order history.
Technologies Used

Front-End
React: For building the user interface.
Material-UI: For styling and responsive design.
TypeScript: Ensuring type safety and reducing runtime errors.
Axios: For API requests.
Back-End
Node.js: As the runtime environment.
Express.js: For creating the RESTful API services.
PostgreSQL: As the relational database management system.
Sequelize: For ORM and database migrations.
JWT: For user session management.
AWS Cognito: For user authentication and authorization.
Deployment
Docker: Containerization of the application for consistent deployment environments.
AWS EC2: Hosting the application servers.
AWS S3: Storage for static assets.
AWS Elastic Beanstalk: Simplified deployment and management of the application.
Installation

Clone the repository:
bash
Copy code
git clone https://github.com/Andyzhang222/FullstackGuitarDeployment.git
cd FullstackGuitarDeployment
Install Dependencies:
Navigate to the frontend and backend directories and install the necessary packages using Yarn:

bash
Copy code
cd frontend
yarn install

cd ../backend
yarn install
Set Up Environment Variables:
Create .env files in both the frontend and backend directories with the necessary environment variables. Refer to .env.example for the required variables.
Run the Application:
Start the backend server:
bash
Copy code
cd backend
yarn start
Start the frontend development server:
bash
Copy code
cd frontend
yarn start
The application should now be running locally. Access the frontend at http://localhost:3000 and the backend at http://localhost:5001.
Usage

Browse Products: Explore the list of available guitars, filter by preferences, and view detailed product pages.
User Registration & Login: Sign up or log in to your account to start shopping.
Shopping Cart: Add guitars to your cart and proceed to checkout.
Order History: View and manage your previous orders.
Deployment

To deploy this project using Docker:

Build Docker Images:
In both the frontend and backend directories:

bash
Copy code
docker build -t your-frontend-image-name .
docker build -t your-backend-image-name .
Run Docker Containers:
Use docker-compose.yml to run both frontend and backend containers:

bash
Copy code
docker-compose up -d
Deploy to AWS Elastic Beanstalk:
Push your Docker images to Docker Hub and configure Elastic Beanstalk with the necessary environment variables.
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features, improvements, or bug fixes.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

For any questions or support, please contact:

Andy Zhang
Email: andy.zhang.z@outlook.com
GitHub: Andyzhang222
