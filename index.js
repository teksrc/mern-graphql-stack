// Creating a standalone GraphQL Server

const {ApolloServer, gql} = require('apollo-server')
const crypto = require('crypto') // Generate Ids for Users

const fakeDb = {
  users: [
    {
      id: '1',
      email: 'frankc@gmail.com',
      name: 'Frank',
      role: 'Software Engineer',
      avatarUrl: 'https://gravatar.com/...'
    },
    {
      id: '2',
      email: 'kristenc@gmail.com',
      name: 'Kristen',
      role: 'doTERRA Health Advocate',
      avatarUrl: 'https://gravatar.com/...'
    }
  ],
  messages: [
    {
      id: '1',
      userId: '1',
      body: 'Hi from user 1',
      createdAt: Date.now(),
    },
    {
      id: '2',
      userId: '2',
      body: 'Hey from user 2',
      createdAt: Date.now(),
    },
    {
      id: '3',
      userId: '1',
      body: 'How are you? - User 1',
      createdAt: Date.now(),
    }
  ]
}

// Basically our Schema
const typeDefs = gql`
  type Query {
    users: [User!]!,
    user(id: ID!): User,
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String, role: String!): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    role: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`

const resolvers = {
  Query: {
    users: () => fakeDb.users,
    user: args => fakeDb.users.find(user => user.id === args.id),
    messages: () => fakeDb.messages
  },
  Mutation: {
    addUser: ({email, name}) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name
      }

      fakeDb.users.push(user)

      return user
    }
  },
  User: {
    messages: ({id}) => fakeDb.messages.filter(message => message.userId === id)
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then((serverInfo) => {
  console.log(`Apollo Server Listening at ${serverInfo.url}`)
})

// const express = require('express') // Node Express server to run
// const graphqlHttp = require('express-graphql') // Middleware for connecting Express to GraphQL
// const {buildSchema} = require('graphql') // Required for building GraphQL Schema
// const crypto = require('crypto') // Do not need to yarn add because it's built into Node

// /* GraphQL created by Facebook in 2012
// GraphQL is not a storage or database engine, it's an extraction layer on top of the existing db/API
// that comes with a query language that allows me to create queries for my GraphQL service
// When I query my service I ussue queries with the specific data and specific fields I want to get back
// Very useful for REST APIs due to reducing under fetching or over fetching of data
// Useful for multiple clients for ex web client or mobile client
// */

// // I create fake DB since we do not have an existing API to set the layer on now
// // This could be PostgreSQL or the collections could be hosted by a AWS mLab sandbox env vars outside
// const fakeDb = {
//   users: [
//     {
//       id: '1',
//       email: 'frankc@gmail.com',
//       name: 'Frank',
//       role: 'Software Engineer',
//       avatarUrl: 'https://gravatar.com/...'
//     },
//     {
//       id: '2',
//       email: 'kristenc@gmail.com',
//       name: 'Kristen',
//       role: 'doTERRA Health Advocate',
//       avatarUrl: 'https://gravatar.com/...'
//     }
//   ],
//   messages: [
//     {
//       id: '1',
//       userId: '1',
//       body: 'Hi from user 1',
//       createdAt: Date.now(),
//     },
//     {
//       id: '2',
//       userId: '2',
//       body: 'Hey from user 2',
//       createdAt: Date.now(),
//     },
//     {
//       id: '3',
//       userId: '1',
//       body: 'How are you? - User 1',
//       createdAt: Date.now(),
//     }
//   ]
// }

// // We need a User class for correlating messages to specific Users
// class User {
//   constructor(user) {
//     Object.assign(this, user)
//   }

//   get messages() {
    // return fakeDb.messages.filter(message => message.userId === this.id)
//   }
// }

// // Schema types for GraphQL Queries:
// // Mutating(adding a user), fetching an individual User or individual Message

// const schema = buildSchema(`
//   type Query {
//     users: [User!]!,
//     user(id: ID!): User,
//     messages: [Message!]!
//   }

//   type Mutation {
//     addUser(email: String!, name: String, role: String!): User
//   }

//   type User {
//     id: ID!
//     email: String!
//     name: String
//     avatarUrl: String
//     role: String
//     messages: [Message!]!
//   }

//   type Message {
//     id: ID!
//     body: String!
//     createdAt: String
//   }
// `)

// // rootValue for handling response callbacks to handle Http request
// const rootValue = {
  // users: () => fakeDb.users.map(user => new User(user)),
  // addUser: ({email, name}) => {
  //   const user = {
  //     id: crypto.randomBytes(10).toString('hex'),
  //     email,
  //     name
  //   }

  //   fakeDb.users.push(user)

  //   return user
  // },
  // user: args => fakeDb.users.find(user => user.id === args.id),
  // messages: () => fakeDb.messages
// }

// // I need a Node Express Server
// const app = express()

// // I set the endpoint which will be localhost:3000/graphql and use graphqlHttp middleware
// // Middleware, our object with config including GUIy available in browser at the port

// app.use('/graphql', graphqlHttp({
//   schema,
//   rootValue,
//   graphiql: true
// }))

// // I listen for the port and console.log that I'm listening
// app.listen(3000, () => console.log('Listening on Port 3000'))

// /* GET requestExample:
// curl -X POST -H "Content-Type: application/json" -d '{"query": "{users {id} }"}' localhost:3000/graphql -w "\n"

// We can make AJAX, ApolloClient, dispatch Redux Action creators, or a MobX fetch equivalent from the Client side to GraphQL to
// query the database specifically to store in the client side assisting with payload performance improvement

// Ex:

// # {
// #   users {
// #     name
// #     role
// #     messages {
// #       id
// #       body
// #     }
// #   }
// # }

// # query {
// #   users {
// #     id
// #     email
// #     name
// #     avatarUrl
// #     role
// #     messages {
// #       id
// #       body
// #       createdAt
// #     }
// #   }
// # }

// Apollo Server`
// */
