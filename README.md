This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) , XAMPP. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Running the Backend.

1) Install XAMPP on your machine from here :https://www.apachefriends.org/download.html or Install Php and MySQL separately on your machine.(Installing XAMPP is probably a best way as you get both PHP and MySQL both integrated in it.)

2) Move the Backend folder under htdocs folder which is present in the location where XAMPP is installed.

3) Start the XAMPP runner and then start apache web server and MySQL database. If your using Linux OS, then probably cd into the path where XAMPP is installed and run ./manager-linux-x64.run

4) Now check whether Apache Web Server and MySQL have started properly. Go to browser and type localhost and then enter, you should to redirected to XAMPP welcome page, then go to phpmyadmin and create a database with a proper name ( for this project I have created a database with the name oopphp16. Next, also create tables Events and users by running the following scripts.) If you change database name , you need to update it in the Dbh.php as well.

Events_creation_script

`Create table Events (id int(11) PRIMARY KEY AUTO_INCREMENT,title TEXT,description TEXT,date_time DATETIME);`

Users_table_script

`Create table users(userName varchar(100) PRIMARY KEY,password varchar(100));`

### Accessing the event planner.

Now , start the react app using `npm start`.

Then you can access the event planner on [http://localhost:3000](http://localhost:3000) .



