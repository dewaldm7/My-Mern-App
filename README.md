# my-mern-app

Welcome to my Task Creator App built with the MERN Stack

- I used the MERN stack to create the app. MongoDB was used for data managment, the back-end was created using
  node.js and express and for the front-end I used React
- Redux was used for state managment in React
- React-Bootstrap, Bootswatch and CSS was used for styling and creation of the user interface

Setting Up:

- Open the My-Mern-App in your code editor, cd into the backend folder and install
  node modules [type npm install].

- Navigate to the client folder inside the app folder and

install node modules for your frontend [type npm install]

- To run frontend cd into frontend folder and type npm start

- To run backend open another terminal window, cd into backend and type npm start

How to use the App:

- After the app has opened in the browser you will be greeted by a welcome message on the homepage

- Use the buttons to register if you are a new user and login if you are an existing user

- Once you are logged in you will be directed to the My Tasks page. Click on the create new task button to create a task

- The app has CRUD functionality which will allow you to create, update, read and delete tasks

- If the logged in user has an admin status they will be able to edit their user profile. The admin status can be changed in the mongoDB database - 0 = default and 1 = admin

Testing:

-To run tests, navigate to the test file in your terminal and type [npm test]

Github link:

- Link: https://github.com/dewaldm7/my-mern-app

Safety Measures

- My mongoDB URI and secret is stored in a .env file

- Jsonwebtoken is used to authenticate users

- All passwords are encrypted using bcryptjs

- Helmet is used on this app
