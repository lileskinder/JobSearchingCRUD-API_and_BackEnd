const express = require("express");
const jobsController = require("../controllers/jobsController");

const router = express.Router();


router.route("/jobs")
    .get(jobsController.getAllJobs)
    .post(jobsController.addOneJob);

router.route("/jobs/:jobId")
    .get(jobsController.getOneJob)
    .delete(jobsController.deleteOneJob)
    .put(jobsController.fullUpdateJob)
    .patch(jobsController.partialUpdateJob);

router.route("/jobs/search/:title")
    .get(jobsController.getOneJobByTitle);



module.exports = router;