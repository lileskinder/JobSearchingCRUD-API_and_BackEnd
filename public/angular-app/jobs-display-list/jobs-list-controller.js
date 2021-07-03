angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobsDataFactory, $routeParams, $location, $scope) { //JobsDataFactory
    const vm = this;

    this.offset = $routeParams.offset ? $routeParams.offset : 0;
    this.query = this.offset !== 0 ? "?offset=" + this.offset : "";

    JobsDataFactory.getAll(this.query).then(function (response) {
        vm.jobs = response;
    });

    vm.next = function () {
        this.query = { offset: parseInt(this.offset) + 10 };
        $location.search(this.query);
        JobsDataFactory
            .getAll(this.query)
            .then(function (jobs) {
                this.jobs = jobs
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    vm.previous = function () {
        this.query = { offset: parseInt(this.offset) - 10 };
        $location.search(this.query);
        JobsDataFactory
            .getAll(this.query)
            .then(function (jobs) {
                this.jobs = jobs
            }).catch(function (err) {
                console.log(err)
            })
    }

    vm.searching = function () {
        JobsDataFactory.searchByTiltle(vm.search).then(function (response) {
            if (response != "")
                vm.jobs = response;
        });
    }

    vm.addJob = function () {
        const postData = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            location: vm.newJobLocation,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            skills: vm.newJobSkills,
            postDate: vm.newJobPostDate

        };

        if (vm.jobForm.$valid) {
            JobsDataFactory.addOne(postData)
                .then(function (response) {
                    console.log("Saved", response)
                }).catch(function (error) {
                    console.log("Error while saving ", error)
                });
            $scope.IsShowAddedVisible()
        }

    }


    $scope.showAdded = false;
    $scope.IsShowAddedVisible = function () {
        if ($scope.showAdded) {
            $scope.showAdded = false;
        } else {
            $scope.showAdded = true;
        }
    }
}