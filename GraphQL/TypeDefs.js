const {gql} = require("apollo-server-express")

const typeDefs = gql`
    # Type
    type Employee {
        _id: String
        firstName: String!
        lastName: String!
        email: String! 
        gender: String!
        salary: Float!
    },

    type User {
        username: String!
        email: String!
        password: String! 
    },

    type Email {
        email: String!
    }

    # Querries
    type Query {
        getAllEmployees: [Employee]
        login(username: String!, password: String!): String
        getEmployee(eid: String!): Employee
        getEmails: [Email]
    }

    input InputData {
        firstName: String!
        lastName: String!
        email: String! 
        gender: String!
        salary: Float!
    }

    # email not included for the time being...
    input UpdateData {
        _id: String!
        firstName: String!
        lastName: String!
        gender: String!
        salary: Float!
    }

    # Mutations
    type Mutation {
        signup(username: String!, password: String!, email: String!): String
        addEmployee(employee: InputData!): Employee!
        updateEmployee(employee: UpdateData!): Employee!
        deleteEmployee(eid: String!): Employee!

    }

`

module.exports = typeDefs;