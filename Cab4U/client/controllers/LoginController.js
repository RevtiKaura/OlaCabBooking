angular.module('myApp').controller('LoginController', function($scope, $http, AuthenticationService, $location,$rootScope,$cookies) {

    $scope.LoginUser = function() {
        $rootScope.checked=true;
        $rootScope.checkedBook=true;
        $rootScope.checkedRide=true;
        $rootScope.checkedAdmin=true;
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role=='Admin') {
                  console.log($rootScope.userBook);
                  $location.path('/administrator');
                  $rootScope.checked=false;
                  $rootScope.LoginName=$cookies.getObject('authUser');
                  console.log($rootScope.LoginName);
                  $rootScope.checkedAdmin=false;
                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Driver') {
                    $location.path('/driver');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.checked=false;
                    $rootScope.checkedBook=false;

                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Customer') {
                    $location.path('/start');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.checked=false;
                    $rootScope.checkedRide=false;
                  }
                  else {
                    console.log('Not authorized');
                  }
        });
    };

function init(){
    AuthenticationService.Logout();
    $rootScope.checked=true;
    };
    init();
})
