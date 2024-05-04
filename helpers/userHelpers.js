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
                resolve(newUser)
            }
        })
    },
    doLogin: (user) => {
        const checkPassword = async (userPassword, password, callback, userData) => {
            await bcrypt.compare(userPassword, password).then(async (result) => {
                await callback(result, userData)
            })
        }

        return new Promise(async (resolve, reject) => {
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ username: user.username })
            const emailExist = await db.getdb().collection(collections.USER_COLLECTION).findOne({ email: user.username })
            
            const done = (isLogin, userData) => {
                if (isLogin) resolve(userData)
                else reject('Incorrect password')
            }
            
            if (usernameExist) checkPassword(user.password, usernameExist.password, done, usernameExist)
            else if (emailExist) checkPassword(user.password, emailExist.password, done, emailExist)
            else reject("Email or Username Doesn't Exist")
            
        })
    },
    addUserSession: (user, session) => {
        return new Promise((resolve, reject) => {
            session.isLogin = true
            session.user = user
            resolve()
        })
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            const users = await db.getdb().collection(collections.USER_COLLECTION).find({}).toArray()
            if (users) {
                resolve(users)
            }else {
                reject()
            }
        })
    },
    deleteOneUser: (username) => {
        return new Promise((resolve, reject) => {
            db.getdb().collection(collections.USER_COLLECTION).deleteOne({username: username})
                .then(() => {
                    resolve()
                })
        })
    },
    getOneUser: (username) => {
        return new Promise(async (resolve, reject) => {
            await db.getdb().collection(collections.USER_COLLECTION).findOne({username: username})
                .then((user) => {
                    if(user) resolve(user)
                    else reject()
                })
        })
    }
}