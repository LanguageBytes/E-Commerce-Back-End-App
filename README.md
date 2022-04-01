# <p align ="center"> E-Commerce Back End Application Object-Relational Mapping (ORM) </p>

<p align ="center"> <img src="E-Commerce-Backend.gif"/> </p>

## Description

A simple E-commerce backend application which will let the user make get, post, update and delete requests.

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize

WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data

WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database

WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Installation
   
 ```
 npm i

 ```
 *node must be installed.

## Usage

Log into sql and enter your credential details into the example .env file (remove the word EXAMPLE from the file name)

Run the following commands in the terminal:

 ```
 
 npm run seed

 npm start

 ```

