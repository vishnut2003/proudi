const db = require('../config/dbconnection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')

module.exports = {
    doRegister: (newUser) => {
        return new Promise(async (resolve, reject) => {
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ username: newUser.username })
            const emailExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ email: newUser.email })
            if (usernameExist && emailExist) reject('Email and Username already exist')
            else if (usernameExist) reject('Username Already Exist')
            else if (emailExist) reject('Email already exist')
            else {
                newUser.password = await bcrypt.hash(newUser.password, 10)
                await db.getdb().collection(collections.USER_COLLECTION).insertOne(newUser)
                resolve()
            }
        })
    },
    doLogin: (user) => {
        const checkPassword = async (userPassword, password, callback) => {
            await bcrypt.compare(userPassword, password).then(async (result) => {
                await callback(result)
            })
        }

        return new Promise(async (resolve, reject) => {
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ username: user.username })
            const emailExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ email: user.username })
            
            const done = (isLogin) => {
                if (isLogin) resolve()
                else reject('Incorrect password')
            }
            
            if (usernameExist) checkPassword(user.password, usernameExist.password, done)
            else if (emailExist) checkPassword(user.password, emailExist.password, done)
            else reject("Email or Username Doesn't Exist")
            
        })
    }
}