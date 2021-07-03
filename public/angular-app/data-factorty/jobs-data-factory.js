angular.module("meanJobs").factory("JobsDataFactory", JobsDataFactory);

function JobsDataFactory($http) {
    return {
        getAll: getAllJobs,
        getOne: getOneJob,
        addOne: addOneJob,
        deleteOne: deleteOneJob,
        editFullOne: editFullOneJob,
        editPartialOne: editPartialOneJob,
        searchByTiltle: searchJobByTiltle
    }

    function getAllJobs(offset) {
        return $http.get("/api/jobs" + offset)
            .then(complete)
            .catch(failed);
    }
    function getOneJob(id) {
        return $http.get("/api/jobs/" + id)
            .then(complete)
            .catch(failed)
    }

    function addOneJob(job) {
        return $http.post("/api/jobs/", job)
            .then(complete)
            .catch(failed)
    }

    function deleteOneJob(id) {
        return $http.delete("/api/jobs/" + id)
        .then(complete)
        .catch(failed)
    }
    function editFullOneJob(id, updatedPost) {
        return $http.put("/api/jobs/" + id, updatedPost)
        .then(complete)
        .catch(failed)
    }
    function editPartialOneJob(id, updatedPost) {
        return $http.patch("/api/jobs/" + id, updatedPost)
        .then(complete)
        .catch(failed)
    }

    function searchJobByTiltle(param) {
        return $http.get("/api/jobs/search/"+param)
        .then(complete)
        .catch(failed)
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}