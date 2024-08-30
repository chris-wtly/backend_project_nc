# Northcoders News API

## What is this?

This is the Northcoders News API, it has multipule methods attached for getting, posting, deleting and patching data.

If you wish to use this project simply copy the url from the github page (where you found this README) and clone it into a folder using git clone.

Please then enter the folder in any IDE of your chosing and run npm install to install all relevant dependencies.

Create three seperate .env files for testing, development, and production (i.e. env.test, env.development, env.production) and assign them to there relevant databases.

The env.test and env.development should link to a local database whereas env.production should link to a database hosted online (although you could also host the production database on your local machine and host the dev/test online if you so wished).

## Seeding

Please use the command 'npm run setup-dbs' to create the database and then 'npm run seed' to seed the test/development databases. To seed the production database (if hosted online) please run 'npm run seed-prod'.

## Testing

Use the command 'npm run test' to run both attached test suites.

## Version

I would recomend using Postgres 16.4 or higher and Node.js v22.4.0 or higher (although earlier versions may still work).

## Link to hosted version - https://test-mrgi.onrender.com

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
