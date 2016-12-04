'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('MailDesk', [
  'ui.router',
  'ngMaterial'
]);



app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/inbox');

	$stateProvider
		.state('inbox', {
			url: '/inbox',
			views: {
				"": {
					templateUrl:'view1/inbox.html'
				},
				"messages@inbox": {
					templateUrl: 'view1/messages.html',
					controller: 'inboxController'
				}
			}
		})
		.state('inbox.message', {
			url: '/message/:id/thread/:thread',
			templateUrl: 'view1/thread.html',
			controller: 'threadController',
			onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
			    $timeout(function() { 
			    	if($stateParams.thread) {
				      $location.hash('anchor'+$stateParams.thread);
				      $anchorScroll()
				  	}
			    }, 100)
			 }
		});
});

app.controller('inboxController', function($scope){
	$scope.messages = [];

	for(var i=0; i< 10; i++) {
		$scope.messages.push({id: i, subject: 'This is message: ' + i});
	}
});

app.controller('threadController', function($scope, $stateParams){
	$scope.message = {id: $stateParams.id, subject: 'This is thread: ' + $stateParams.id + ' msg:' + $stateParams.thread};
	$scope.thread = [];
	for(var i=0; i< 100; i++) {
		$scope.thread.push({id: i,  subject: 'This is a long message that goes here. '});
	}
});
