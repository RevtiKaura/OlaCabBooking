angular.module('myApp').controller('PasswordController',function($scope, $http,$rootScope,$location){

  $scope.editPassword= function(usr){

      $http.put('/userapi/updatePassword/'+usr.name+'/'+usr.new).then(function (response) {
        if(response)
        {
          alert('Password changed Successfully!');
          $scope.usr='';
        }
      });
  };

});
