const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.getAllJobs = function (req, res) {
    let offset = 0;
    let count = 10;

    const maxCount = 15;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceede the count" });
    }

    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({ message: "Offset or count is not a number" })
    }

    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        const response = {
            status: 200,
            message: jobs
        }
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.getOneJob = function (req, res) {
    const jobId = req.params.jobId;

    (jobId.length !== 24) ?
        res.status(400).json({ message: "Job ID length should be 24" }) :
        Job.findById(jobId).exec(function (err, job) {
            const response = {
                status: 200,
                message: job,
            }
            if (err) {
                response.status = 500;
                response.message = err;
            }

            if (!job) {
                response.status = 400;
                response.message = { message: "Job not found" }
            }
            res.status(response.status).json(response.message);
        })

}


module.exports.getOneJobByTitle = function (req, res) {
    console.log("this is search function backend")
    const title = req.params.title;

    console.log("Param from requst   backend" + title)
    const parameter = {
        title: title
    }
    Job.find(parameter).exec(function (err, jobs) {
        const response = {
            status: 200,
            message: jobs
        };
        if (err) {
            console.log("Error finding jobs", err);
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.deleteOneJob = function (req, res) {
    const jobId = req.params.jobId;

    (jobId.length !== 24) ?
        res.status(400).json({ message: "Job ID length should be 24" }) :
        Job.findByIdAndDelete(jobId).exec(function (err, job) {
            const response = {
                status: 200,
                message: job,
            }
            if (err) {
                response.status = 500;
                response.message = err;
            }

            if (!job) {
                response.status = 400;
                response.message = { message: "Job not found" }
            }
            res.status(response.status).json(response.message);
        })
}

module.exports.addOneJob = function (req, res) {
    const newJob = {
        title: req.body.title,
        salary: parseFloat(req.body.salary),
        location: req.body.location,
        description: req.body.description,
        skills: req.body.skills,
        postDate: req.body.postDate


    }

    Job.create(newJob, function (err, job) {
        const response = {
            status: 201,
            message: job,
        }

        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.fullUpdateJob = function (req, res) {
    const jobId = req.params.jobId;
    (jobId.length !== 24) ?
        res.status(400).json({ message: "Job ID should be length 24" }) :
        Job.findById(jobId).exec(function (err, job) {
            const response = {
                status: 200,
                message: job,
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                response.status = 404;
                response.message = { message: "Job not found" };
            }

            if (response.status != 200) {
                res.status(response.status).json(response.message);
            } else {
                job.title = req.body.title;
                job.salary = parseFloat(req.body.salary);
                job.location = req.body.location;
                job.descrition = req.body.description;
                job.skills = req.body.skills;
                job.postDate = req.body.postDate;

                job.save(function (err, updatedJob) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.message = updatedJob;
                    }
                    res.status(response.status).json(response.message);
                })
            }
        })

}

module.exports.partialUpdateJob = function (req, res) {
    const jobId = req.params.jobId;
    (jobId.length !== 24) ?
        res.status(400).json({ message: "Job ID should be length 24" }) :
        Job.findById(jobId).exec(function (err, job) {
            const response = {
                status: 200,
                message: job,
            }

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!job) {
                response.status = 404;
                response.message = { message: "Job not found" };
            }

            if (response.status != 200) {
                res.status(response.status).json(response.message);
            } else {
                if (req.body.title) {
                    job.title = req.body.title;
                }
                if (req.body.salary) {
                    job.salary = parseFloat(req.body.salary);
                }
                if (req.body.description) {
                    job.descrition = req.body.description;
                }
                if (req.body.skills) {
                    job.skills = req.body.skills;
                }
                if (req.body.postDate) {
                    job.postDate = req.body.postDate;
                }
                if (req.body.location) {
                    job.location = req.body.location;
                }


                job.save(function (err, updatedJob) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.message = updatedJob;
                    }
                    res.status(response.status).json(response.message);
                })
            }
        })
}