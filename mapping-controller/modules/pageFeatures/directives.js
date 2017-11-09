app.directive('navbarDirective', function(){
  return {
    templateUrl: 'modules/pageFeatures/navbar.template.html',
    restrict: 'E'
  }
});

app.directive('footerDirective', function(){
  return {
    templateUrl: 'modules/pageFeatures/footer.template.html',
    restrict: 'E'
  }
});
