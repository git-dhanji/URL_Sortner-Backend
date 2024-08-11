

const mongoose = require('mongoose');


async function connectDb(url) {
    try {
        const user = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to MongoDB successfully ${user.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}


module.exports = connectDb;