# Asset Tracker

The project consists of a frontend, an API server and a database.

​
The frontend is built with Angular version 8.0.3. https://angular.io/.


User interface and design is provided by Angular Material https://material.angular.io/.
​

The API server is built with NodeJS https://nodejs.org/en/.

​
The database is postgreSQL https://www.postgresql.org/.

​
The API server employs ExpressJS https://expressjs.com/ to facilitate routes and http endpoints to connect the frontend to the database. The interface to the database is provided by node-postgres https://node-postgres.com/.

​
Token-based security and authentication is built into the app. Tokens are ditributed by the node server based on valid login credentials.

## Online demo

You can see our app in acction at <a href="http://asset-tracker.bluerockapps.com">asset-tracker.bluerockapps.com</a>

username: demo@bluerockapps.com
password: password
​
## Deployment
​
The project can be deployed on MAC, Linux, Windows or on a cloud platform including AWS, Azure or a provider of your choice. 
​
## Running the project on your computer
​
The project can be run locally by copying frontend and the API server files into distinct folders on your computer. 


In addition, a PostgreSQL database must be setup. There is a sql script located `/src/assets/asset-tracker.sql'. It can be run to setup the required database structure and configuration data. 


Setting up a PostgreSQL database is outside the scope of this document, for further instructions please visit the https://www.postgresql.org

​
NodeJS along with NPM (Node Package Manager) will need to be installed on your computer https://nodejs.org/en/. 

​
Dependant libraries will need to be installed for both the frontend and the API server. To do this, open a terminal session in each of the folders where the files are installed and type `npm install`.

​
Once completed, you will need to start both the frontend application and the API server. 

​
To start the frontend application run `ng serve` in the folder where the frontend files are. Then you can navigate to `http://localhost:4200/`.

​
To start the API server run `node server` in the folder where the API server files are.

​
In order to properly run the entire application you must have the fronten and the API server running and have the the PostgreSQL database installed and setup.

​
Both the API server and the front end can be stopped by holding down the `CTRL` and pressing `c`.
​
## User Management
​
The application is role-based. Currently, there are two roles: `Admin` and `User`. Others can be added. 

Two users have been added for demo purposes, an admin user and a read-only user. New users can be created.

Each user added to the system must have a unique email address. Once added, the newly created user must run the verify page to change the password, recieve and valid token and complete the setup of the user.

The forgot password feature will only be available if the app has access to our backend email middleware server.

## File Structure

The app folder is the root of the application. Files and folders are structured in a flat pattern, meaning components, modules, services and other associated files are nested no more then two folders deep.  This is done to simplify pathing requirements.


The `component` folder is where all of the components used to run the app are located. There is a `component.module` file located in this folder as well, it contains all required dependancies for the components.


The `constants` folder contains states and provinces used in the app.


The `external` folder contains all the componets used to login to the app. There is also forgot password, register and verify componets, but they are only available for use when running our cloud service.


The `interceptor` folder contains an http interceptor file that has two responsiblities.

1. Adds the json token to secure http calls
2. Provides error checking in case of network problems


The `internal` folder is where the app runs from once logged in.


The `model` folder houses typescript interface models used by the app.


The `service` folder contains service components that are used to connect to the API service endpoints. Each componet name matches a module file located on the API server. Individual endpoints that are defined in the service components match endpoints that are defined in each assocated module located on the API server.