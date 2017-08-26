var app=angular.module('myApp',['ngRoute','ngCookies', 'ngStorage']);
app.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider.when('/',{
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  }).when('/start',{
    templateUrl: 'views/start.html',
    controller: 'StartController'
  }).when('/login',{
    templateUrl: 'views/Login.html',
    controller: 'LoginController'
  }).when('/book',{
    templateUrl: 'views/book.html',
    controller: 'BookController'
  }).when('/later',{
    templateUrl: 'views/later.html',
    controller: 'LaterController'
  }).when('/changePassword',{
    templateUrl: 'views/changePassword.html',
    controller: 'PasswordController'
  }).when('/booking',{
    templateUrl: 'views/booking.html',
    controller: 'DriverController'
  }).when('/register',{
    templateUrl: 'views/register.html',
    controller: 'RegisterController'
}).when('/administrator',{
   templateUrl: 'views/admin.html',
   controller: 'AdminController'
}).when('/driver',{
  templateUrl: 'views/driver.html',
  controller: 'DriverController'
}).when('/rides',{
  templateUrl: 'views/Rides.html',
  controller: 'StartController'
}).when('/services',{
  templateUrl: 'views/services.html',
}).when('/contact',{
  templateUrl: 'views/contact.html',
}).when('/errorPage',{
  templateUrl: 'views/errorPage.html',
}).otherwise({
  redirectTo: '/',
});
});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails ) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/','/login','/register','/services','/contact','/errorPage'];

        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/');
        }
              if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/administrator') {
              $location.path('/errorPage');
        }

        if (restrictedPage && loggedInUser.role!='Driver' && $location.path()=='/driver') {
        $location.path('/errorPage');
      }

        if (restrictedPage && loggedInUser.role!='Customer' && $location.path()=='/start') {
        $location.path('/errorPage');
  }
        console.log('RestrictedPage '+restrictedPage);
        console.log($sessionStorage.tokenDetails);
    });
});
