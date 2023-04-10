const express = require("express")
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');


const typeDefs = require("./GraphQL/TypeDefs")
const resolvers = require("./GraphQL/Resolvers")
const server = new ApolloServer({typeDefs, resolvers})

app = express()
server.applyMiddleware({ app });

mongoose.connect(
    // "mongodb://127.0.0.1:27017/employees",
    "mongodb+srv://user:user@cluster0.yojbzm5.mongodb.net/employees?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
);


app.listen(8000, () => {
    console.log("listening at 8000")
})