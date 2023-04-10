const empModel = require("../models/EmployeeModel")
const userModel = require("../models/UserModel")


const resolvers = {
    Query: {
        async getAllEmployees() {
            return await empModel.find()
        },

        async login(parent, args) {
            const user = await userModel.findOne({username:args.username})
            if (user && user.password === args.password) {
                return "Logged in"
            }
            else {
                return "You shall not pass!"
            }
        },

        async getEmployee(parent, args) {
            return await empModel.findOne({_id:args.eid})
        },

        async getEmails() {
            return await empModel.find().select({email: 1})
        }
    },

    Mutation: {
        async signup(parent, args) {
            try {
                const newUser = new userModel({username:args.username, password:args.password, email:args.email})
                await newUser.save()
                return `Account Registered`
            }
            catch(e) {
                console.log(e)
                return ((e.code == 11000) ? "The email is already in use!" : "Make sure the fields have less than 50 characters!") 
            }


        },
        async addEmployee(parent, args) {
            try {
                const newEmp = empModel(args.employee)
                await newEmp.save()
                // return `The employee ${args.employee.firstName} ${args.employee.lastName} is added`
                return newEmp

            }
            catch(e) {
                console.log(e)
                return "Employee was not added. Please check error log!"
            }
        },
        async updateEmployee(parent, args) {
            try {
                // args.employee._id = args.eid
                const updatedEmp = await empModel.findByIdAndUpdate(args.employee._id, args.employee)
                if (updatedEmp) {
                    const nb = await updatedEmp.save()
                    return nb
                    // return `The employee ${args.employee.firstName} ${args.employee.lastName} is updated`
                }
                else {
                    return `Couldn't find the employee with ${args.eid} id`
                }
        
            } catch (e) {
                console.log(e)
                return "Employee was not updated. Please check error log!"
            }
        },
        async deleteEmployee(parent, args) {
            try {
                const deletedEmp = await empModel.findByIdAndDelete(args.eid)
                if (deletedEmp) {
                    return deletedEmp
                }
                else {
                    return `Couldn't find the employee with ${args.eid} id`
                }
            } catch (e) {
                console.log(e)
                return "Employee was not deleted. Please check error log!"
            }
        }
    }
}

module.exports = resolvers