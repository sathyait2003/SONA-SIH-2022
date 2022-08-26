import mongoose from 'mongoose'

var state: {db: null | Promise<typeof mongoose>} = {
    db: null
}

async function connect() {
    if(state.db) return state.db;

    const url = process.env.DB_URI || ""

    let db = mongoose.connect(url)
    state.db = db
    return state.db
}

export default connect