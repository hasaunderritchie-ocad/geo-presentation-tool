app.directive('navbarDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'modules/navbar/navbar.template.html',
    scope: {
      info: '='
    }
  }
})
