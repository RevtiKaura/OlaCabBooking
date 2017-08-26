angular.module('myApp').controller('BookController',function($scope, $http,$rootScope,$location,$cookies){

$scope.Booking='';

$scope.confirmBooking=function(){
var ub=$cookies.getObject('authUser');
$scope.Booking={
  User:ub.currentUser.userInfo,
  StartPoint:$rootScope.startPoint,
  EndPoint:$rootScope.endPoint,
  BookingDate:$rootScope.bookDate,
  BookingTime:$rootScope.bookTime,
  Distance:$rootScope.di,
  Time:$rootScope.tym,
  Amount:$rootScope.Tot,
  BookingType:'Later',
  CabCategory:$rootScope.SelCar
}


$http.post('/bookingapi/AddBooking/',$scope.Booking).then(function(response){
  console.log('Data of confirmBooking submitted successfully');
});
alert('Booking Done!');
  $location.path('/');
}
});
