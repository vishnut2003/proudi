
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vishnu:XlRtWTrARIim23wt@proudi.nf4nfnx.mongodb.net/?retryWrites=true&w=majority&appName=proudi";

const state = {
    db: null
}

const dbConnect = async (done) => {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    });
    await client.connect()
    state.db = await client.db('proudi')
    done()
}

const getdb = () => {
    return state.db
}

module.exports = { getdb, dbConnect }