# A 🔥 MERN Stack & GraphQL Chat SPA
## MERN Stack = MongoDB, Express, React, Node

MERN full-stack with GraphQL! By the end, I'm going to build a chat SPA with a Node.js server using Express.js, MongoDB database engine, React.js front-end, and GraphQL API back-end.


I will also architecture our GraphQL web service with Apollo Server and Apollo Client v2, and will implement routing with React Router v4.

Developed by Facebook in 2012, GraphQL is a query language and a server runtime for APIs. It is backed up by a spec and comes with official integration libraries for many languages, including JS, and frameworks, such as Express. With its vast open-source ecosystem, GraphQL offers an easily-implementable approach for orchestrating multitier apps with complex API communications. Instead of querying resources with multiple roundtrips in a RESTful API, in GraphQL, you send off queries to a single URL to get back a particular data structure that you need. Forget about under and over-fetching of data. Using a strongly-typed schema, you map out your query requests to any data source that your app has in place, be it a database or a 3rd-party API. With full control over queries, your clients, mobile or web, now exchange data more efficiently, incurring a lesser load on your infrastructure, and tolerating poor network signals.

**Top 5 Reasons to Use GraphQL:**

https://www.prisma.io/blog/top-5-reasons-to-use-graphql-b60cfa683511/

**GraphQL spec rundown:**

https://github.com/facebook/graphql#readme

**GraphQL Server Basics (schemas, resolvers, etc.):**

https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e/

**GraphQL vs. REST:**

https://blog.apollographql.com/graphql-vs-rest-5d425123e34b

**Learn GraphQL.js:**

http://graphql.org/graphql-js/


# Real-time Chat App (WIP)

> Note: this project is in active development.

## Index

- [Features](#features)
- [Technologies](#technologies)
- [Schema](#schema)
- [MongoDB Dev Setup with Docker](#mongodb-dev-setup-with-docker)

## Features

* sign up / sign in / reset password (?)

* direct messaging (1 on 1)

* private group chat (2+ users)

* channels (public / private / favorite) & teams (?)

* avatar upload in user profile

* typing indicator, edit messages, user status (logged in / out / inactive)

* respond to comments (like, quote, emoji, favorite) (?)

* file sharing (img, text, video (?))

* social login (Google, FB, GitHub, etc)

* RWD + mobile first

* chat bot (?)

* notifications

* emails (confirm registration, reset password, etc.) (?)

* lazy loading, persisted queries, Apollo Engine

* switch themes

* unit testing

* markdown, code snippets (?)

* deployment to a cloud host (AWS, Heroku, Zeit, or other)

* production (scalability, security, performance, etc.)

* CI/CD

* 12 factor app (?)

## Technologies

* Apollo Server v2

* Apollo Client v2

* Mongoose ORM

* Web Sockets (Apollo subscriptions that use Web sockets behind the scene)

* JWT auth

* Gravatar (?)

* ES 2015/16/17 + Babel, Webpack, Nodemon, Reload

## Schema

### User

```
  Field      |  Type        |  Options
  -----------------------------------------------
  _id        |  ObjectId    |
  name       |  String      |  required
  email      |  String      |  required, unique
  password   |  String      |  required
  avatarUrl  |  String      |
  role       |  String      |  required
  chats      |  [ObjectId]  |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

### Chat

```
  Field      |  Type        | Options
  -------------------------------------
  _id        |  ObjectId    |
  name       |  String      |
  users      |  [ObjectId]  |
  messages   |  [ObjectId]  |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

### Message

```
  Field      |  Type        |  Options
  --------------------------------------
  _id        |  ObjectId    |
  body       |  String      |  required
  user       |  ObjectId    |
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

## MongoDB Dev Setup with Docker

> Note: could easily use other free 3rd party cloud providers such as mLab or Atlas instead.

```sh
# Start a MongoDB container on port 27017 and create a 'root' user on the 'admin' database
docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# Run the mongo CLI client on the container as 'root' against 'admin' database and connect to 'chat'
docker exec -it mongodb mongo -u root -p secret --authenticationDatabase admin chat

# Inside the client, create an admin user for the 'chat' database
db.createUser({
  user: 'admin', pwd: 'secret', roles: ['readWrite', 'dbAdmin']
})
```
