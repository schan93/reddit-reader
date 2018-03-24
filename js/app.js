var app = angular.module('app', []);

app.controller('SearchController', function($scope, $http){
	$scope.subreddits = {};
	$scope.searchText = "";
	$scope.posts = {};
	const news = "news";

	$scope.getPosts = function(subreddit) {
		if(!$scope.subreddits[subreddit]) {
			var subredditUrl = "https://www.reddit.com/r/" + subreddit;
			$http.get("https://www.reddit.com/r/" + subreddit + "/new.json").then(function(response){
				if(response.status >= 200 && response.status < 300) {
					var children = response.data.data.children;
					$scope.subreddits[subreddit] = children;
					$scope.searchText = "";
					$scope.posts = children;
					// Create a new link to actual subreddit to see more posts
					var link = {
						data: {
							"title": "Click here to see more posts on r/" + subreddit,
							"url": subredditUrl
						}
					};
					$scope.posts.push(link);
				}
			});	
		}
	}

	$scope.clickLink = function(subreddit) {
		$scope.posts = $scope.subreddits[subreddit];
		$scope.searchText = subreddit;
	}

	$scope.delete = function(subreddit) {
		delete $scope.subreddits[subreddit];
		$scope.posts = null;
		$scope.searchText = "";
		if(Object.keys($scope.subreddits).length === 1) {
			$scope.posts = $scope.subreddits[news];
		}
	}

	//
	$scope.getPosts(news);
});