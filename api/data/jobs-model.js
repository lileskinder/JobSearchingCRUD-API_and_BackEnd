const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    salary: Number,
    location: [String],
    // location: {
    //     address: String,
    //     coordinated: {
    //         type: [Number],
    //         index: "2dsphere"
    //     }
    // },
    description: String,
    experience: String,
    skills: [String],
    postDate: Date,

});

mongoose.model("Job", jobSchema, "jobs"); 