// this is my app
const app = angular.module('myApp', ['ngAria', 'ngAnimate', 'ngMessages', 'ngRoute']);


// This is for the router. I need to modify this for this project.

app.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'modules/home/home.html',
    controller: 'homeController'
  }).when('/session', {
    templateUrl: 'modules/session/session.html',
    controller: 'sessionController'
  }).otherwise({redirectTo:'/'})
});
