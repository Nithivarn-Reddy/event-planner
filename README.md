This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### Running the Backend.

1) Install XAMPP on your machine from here :https://www.apachefriends.org/download.html or Install Php and MySQL separately on your machine.(Installing XAMPP is probably a best way as you get both PHP and MySQL both integrated in it.

2) Move the Backend folder under htdocs folder which is present in the location where XAMPP is installed.

3) Start the XAMPP runner and then start apache web server and MySQL database. If your using Linux OS, then probably cd into the path where XAMPP is installed and run ./manager-linux-x64.run

4) Now check whether Apache Web Server and MySQL have started properly. Go to browser and type localhost and then enter, you should to redirected to XAMPP welcome page, then go to phpmyadmin and create a database with a proper name ( for this project I have created a database with the name oopphp16. Next, also create tables Events and users by running the following scripts.) If you change database , you need to update it in the Dbh.php as well.

Events_creation_script

`Create table Events (id int(11) PRIMARY KEY AUTO_INCREMENT,title TEXT,description TEXT,date_time DATETIME);`

Users_table_script

`Create table users(userName varchar(100) PRIMARY KEY,password varchar(100));`

5) Now , start the react app using npm start.

Then you can access the event planner.



