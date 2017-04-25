## An appliicatoin for managing a business transactions
This module is an effort to implement an appliication to manage a little business transactions. To implemnt I have used Material Design data tables in Angular Material. Data tables are used to present raw data sets and usually appear in desktop enterprise applications.

### Demo
A live [Demo](http://jamiakarimia-khalpar.netne.net)

### Installation
__Run via ServerWAMP/LAMP__
* Install [WAMP](http://www.developerdrive.com/2011/08/installing-and-configuring-a-wamp-server-on-your-computer/)
* Install [LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-14-04)

__Clone the project from Github__
```
git clone https://github.com/SanaullaParvez/sadi
```
OR
```
Download the Project and put it to the `www` directory
```
__Using Bower__

Bower is a dependency management tools or a package manager.Bower js is used for managing front end components like html, css, js etc. Run the following command ...
```
bower install
```
If the following question arrive: `Unable to find a suitable version for angular, please choose one by typing one of the numbers below:`

Then Press: `2`.

The angular version should be : `1.5.11 or 1.5.8`

__Change BASE_URL__

In your `constants/header.php` file, include the root directory as the BASE_URL variable.
```javascript
define("BASE_URL", "http://localhost/sadi/");
```
__Configure Database access__

In your `constants/mysql.php` file, include all of the following values.

* Set your MySQL Host
```
define('MYSQL_SERVER', 'localhost');
```
* Set your MySQL Database Port
```
define('MYSQL_PORT', '3306');
```
* Set your MySQL Database Name
``` 
define('MYSQL_DB', 'database_name');
```
* Set your MySQL User
```
define('MYSQL_USER', 'mysql_user_name');
```
* Set your MySQL Password
```
define('MYSQL_PASS', '********');
```

## Upload files to server
If you want you can use Gulp to interact with the files on your server through FTP.

__Using npm__

Npm is also a dependency management tools. Npm is used for installing Node js modules .Run the following command ...
```
npm install
```
__Using Gulp__

Here we use [Gulp](http://brandonclapp.com/what-is-gulp-js-and-why-use-it/) for upload and update codes.
For more details visit: [Gulp and FTP](http://loige.co/gulp-and-ftp-update-a-website-on-the-fly/).