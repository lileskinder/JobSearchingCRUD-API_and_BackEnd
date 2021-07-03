angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl:"angular-app/jobs-display-list/jobs-list.html",
        controller:"JobsController",
        controllerAs:"vm"
    }).when("/jobs/:id", {
        templateUrl:"angular-app/job-display/job.html",
        controller:"JobController",
        controllerAs:"vm"
    })
}