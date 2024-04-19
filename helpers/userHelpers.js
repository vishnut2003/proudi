const db = require('../config/dbconnection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')

module.exports = {
    doRegister: (newUser) => {
        return new Promise ( async (resolve, reject) => {
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({username: newUser.username})
            const emailExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({email: newUser.email})
            if (usernameExist && emailExist) reject('Email and Username already exist')
            else if (usernameExist) reject('Username Already Exist')
            else if (emailExist) reject('Email already exist')
            else {
                newUser.password = await bcrypt.hash(newUser.password, 10)
                await db.getdb().collection(collections.USER_COLLECTION).insertOne(newUser)
                resolve()
            }
        })
    }
}