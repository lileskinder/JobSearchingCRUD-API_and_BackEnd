const mongoose = require("mongoose");
require("./jobs-model"); 

const dbName = "Jobs"; 
const dbUrl = "mongodb://localhost:27017/" + dbName;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });


process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        process.exit(0);
    })
})

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        process.exit(0);
    })
})

process.on("SIGUSR2", function () {
    mongoose.connection.close(function () {
        process.kill(process.pid, "SIGUSR2");
    })
})