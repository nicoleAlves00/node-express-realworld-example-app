# ![Node/Express/Mongoose Example App](project-logo.png)

[![Build Status](https://travis-ci.org/anishkny/node-express-realworld-example-app.svg?branch=master)](https://travis-ci.org/anishkny/node-express-realworld-example-app)

> ### Example Node (Express + Mongoose) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) API spec.

<a href="https://thinkster.io/tutorials/node-json-api" target="_blank"><img width="454" src="https://raw.githubusercontent.com/gothinkster/realworld/master/media/learn-btn-hr.png" /></a>

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

Alternately, to quickly try out this repo in the cloud, you can [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/realworld)

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Error Handling

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand](https://github.com/gothinkster/realworld/blob/master/API.md#errors-and-status-codes)

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.

## E2E users route testing

Endpoint testing of complete users authenticated route is being done using Mocha JS Framework and Chai Assertions. These are demo testcases to understand automation testing in Mocha and Chai. Testing of users route is carred out in multiple unit tests (it blocks) of Chai which make it easiear for the reader to understand the overall E2E concept. Clean code practice is being observed by commenting every test senario, using root hook to clean database after all tests are being carried. Though one bug is being found in the functionality of the users post login route. The api should only allow the users to login who type complete and correct password but rather it give 200 http "o.k" response on empty password string. which is a functionality failure of the users post login route. For quick understanding a Mochawesome HTML report is also being added for reference. After completing the above mentioned prerequisites to run the app along with Mocha, Chai, Chai-http and Mochawesome report generator, E2E users api test can be run by simply typing "npm run test-html". I hope it will give you a good understanding of running unit as well as e2e tests using Mocha, Chai and Mochawesome report generator.    
<br />

## E2E Testing starts from line 65 in test/e2e_users_routes.js
In line 66 test/e2e_users_routes.js a test to update an user is conducted. However, it seems like the router.put is not fiding the user id to update and return it with the new value updated.

In line 86 in test/e2e_users_routes.js a test to get an user by ID is conducted. As the response is a Promise, chai.then.expect() is used. The test passes. However, there's an 'Error: Not found' as the user is never returned, it is listed as user undefined meaning it gets the Promise but not the sent user.

In line 111 in test/e2e_users_routes.js a test to get a profile is conducted. The test should check if an user profile given an username in the route is being returned. However, it does not return anything, an Error: 404 is returned instead.

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)
