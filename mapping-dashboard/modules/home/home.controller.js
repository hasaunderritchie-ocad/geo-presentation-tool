app.controller("homeController", function($scope, scanning, dataFetch){
  // my controller is here.
  $scope.scanning = false;
  $scope.hello = "hello world";
  $scope.beginScanning = function(){
    $scope.scanning = true;
    console.log("clicked");
    scan();
  }
  scan = function(){
    scanning.init();
  }
  $scope.sayData = document.getElementById('result').innerHTML;
  console.log($scope.sayData);
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    return xhr;
  }
  $scope.getSomeData = function(){
    url = 'http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR?limit=500';
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      throw new Error('CORS not supported');
    }
    xhr.onload = function() {
       var responseText = xhr.responseText;
       console.log(responseText);
       // process the response.
      };

      xhr.onerror = function() {
        console.log('There was an error!');
      };
      xhr.withCredentials = true;
      xhr.send()
    // url = 'http://app.toronto.ca/cc_sr_v1_app/data/edc_eventcal_APR?limit=500';
    // $.get(url, data => {
    //   console.log(data);
    // });
  }

});
