const mongoose = require('mongoose')
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", err => {
    console.log("uncaughtException");
    console.log(err.name, err.message);
        process.exit(1);
});

//connect to MongoDB using mongoose
const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect( db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    //when in development will display to console.
    if (process.env.NODE_ENV === "development") {
        console.log("DB connection successful!");
    }
});

//Listening to our server
const port = process.env.PORT || 8000
const server = app.listen(port, () => console.log(`Listening on port ${port}`))

//catching unhandled errors so we dont get stuck in a loop
process.on("unhandledRejection", err => {
    console.log("UNHANDLER REJECTION SHUTTING DOWN...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
