// this is my app
// define the packages

const app = angular.module('myApp', ['ngAria', 'ngAnimate', 'ngMessages', 'ngRoute']);


// This is for the router. I need to modify this for this project.

app.config(function($routeProvider) {
  $routeProvider
   .when('/scan', {
    templateUrl: 'modules/scan/scan.template.html',
    controller: 'scanController'
  }).when('/', {
    templateUrl: 'modules/home/home.template.html',
    controller: 'homeController'
  }).otherwise({redirectTo:'/'})
});
