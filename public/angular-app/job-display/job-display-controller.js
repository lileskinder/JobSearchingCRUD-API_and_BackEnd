angular.module("meanJobs").controller("JobController", JobController);


function JobController(JobsDataFactory, $routeParams, $scope) {

    const vm = this;
    const jobId = $routeParams.id;
    $scope.showPartialUpdateForm = false;
    $scope.showFullUpdateForm = false;

    JobsDataFactory.getOne(jobId).then(function (response) {
        vm.job = response;
    })

    vm.deleteJob = function () {
        JobsDataFactory.deleteOne(jobId)
            .then(function (response) {
                console.log("Job Deleted", response);
            }).catch(function (error) {
                console.log("Error Deleting Job ", error);
            })

            $scope.IsShowDeleteVisible();
    }

    vm.fullUpdateJob = function () {
        const updatedData = {
            title: vm.updatedJobTitle,
            salary: vm.updatedJobSalary,
            location: vm.updatedJobLocation,
            description: vm.updatedJobDescription,
            experience: vm.updatedJobExperience,
            skills: vm.updatedJobSkills,
            postDate: vm.updatedJobPostDate

        };

        if (vm.jobForm.$valid) {
            JobsDataFactory.editFullOne(jobId, updatedData)
                .then(function (response) {
                    console.log("Saved", response)
                }).catch(function (error) {
                    console.log("Error while saving ", error)
                });

        }
        $scope.IsShowFullUpdateVisible();


    }


    vm.partialUpdateJob = function () {
        const updatedData = {
            title: vm.updatedJobTitle,
            salary: vm.updatedJobSalary,
            location: vm.updatedJobLocation,
            description: vm.updatedJobDescription,
            experience: vm.updatedJobExperience,
            skills: vm.updatedJobSkills,
            postDate: vm.updatedJobPostDate
        };

        if (vm.jobForm.$valid) {
            JobsDataFactory.editPartialOne(jobId, updatedData)
                .then(function (response) {
                    console.log("Saved", response)
                }).catch(function (error) {
                    console.log("Error while saving ", error)
                });
            $scope.IsShowPartialUpdateVisible();
        }
    }


    $scope.IsFullUpdateVisible = function () {
        if ($scope.showFullUpdateForm) {
            $scope.showFullUpdateForm = false;
        } else {
            $scope.showFullUpdateForm = true;
            $scope.showPartialUpdateForm = false;
        }
    }



    $scope.IsPartialUpdateVisible = function () {
        if ($scope.showPartialUpdateForm) {
            $scope.showPartialUpdateForm = false;
        } else {
            $scope.showPartialUpdateForm = true;
            $scope.showFullUpdateForm = false;
        }
    }


    $scope.showFullUpdate = false;
    $scope.IsShowFullUpdateVisible = function () {
        if ($scope.showFullUpdate) {
            $scope.showFullUpdate = false;
        } else {
            $scope.showFullUpdate = true;
        }
    }

    $scope.showPartialUpdate = false;
    $scope.IsShowPartialUpdateVisible = function () {
        if ($scope.showPartialUpdate) {
            $scope.showPartialUpdate = false;
        } else {
            $scope.showPartialUpdate = true;
        }
    }


    $scope.showDeleted = false;
    $scope.IsShowDeleteVisible = function () {
        if ($scope.showDeleted) {
            $scope.showDeleted = false;
        } else {
            $scope.showDeleted = true;
        }
    }
}