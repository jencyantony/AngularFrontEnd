var libraryApp = angular.module("libraryApp", ["ngRoute"]);

libraryApp.config(function($routeProvider){
  $routeProvider.when("/home", {
    templateUrl:"app/view/home.html",
    controller:"homeController"
  }).when("/student", {
    templateUrl:"/app/view/userHome.html",
    controller:"userHomeController"
  }).when("/registerUser", {
    templateUrl:"/app/view/registerUser.html",
    controller:"registerUserController"
  }).otherwise({
    redirectTo: "/index.html"
  })
});

libraryApp.controller("homeController", ["$scope", "$location", function($scope, $location){
  $scope.login=function(){
    var userName = $scope.userName;
    var password = $scope.password;

    if(userName!=null && password!=null){
        $location.path('/student').search({userName:userName, password:password});
    }
  };
}]);

libraryApp.controller("userHomeController", ["$scope", "$http", "$location", function($scope, $http, $location){
	$http.get('/scripts/user.json').then(function (response){
		$scope.userDetails = response.data.user;
	});
	
	$scope.logout = function(){
		$location.path('/home');
	};
}]);

libraryApp.controller("registerUserController", ["$scope", function($scope){
  //TBD
}]);

libraryApp.service('validateAndGetUserService', ["$http", "$q", function($http, $q){
	return {
		getUser: function(userId, password){
			var deferred = $q.defer();
			$http({
			    method: 'POST',
			    url: '/LibraryManagementService/libraryManagement/home/student',
			    data: {
			        "userName": $routeParams.userName,
			        "password": $routeParams.password
			      }
			}).then(function (response){
				deferred.resolve(response);
			}, function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		}
	}
}]);