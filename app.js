var app = angular.module('app', []);

const news = "news";
const redditUrl = "https://www.reddit.com/r/"
const jsonFile = "/new.json"
const morePostsTitle = "Click here to see more posts on r/"

app.controller('SearchController', function($scope, $http){
	$scope.subreddits = {};
	$scope.searchText = "";
	$scope.posts = {};

	$scope.getPosts = function(subreddit) {
		if(!$scope.subreddits[subreddit]) {
			// Since this is a new sub reddit you want to add to your reader, grab the posts related to that subreddit 
			// and display it properly
			var subredditUrl = redditUrl + subreddit;
			$http.get(subredditUrl + jsonFile).then(function(response){
				if(response.status >= 200 && response.status < 300) {
					var children = response.data.data.children;
					$scope.subreddits[subreddit] = children;
					$scope.searchText = subreddit;
					$scope.posts = children;
					// Create a new link to actual subreddit to see more posts
					var link = {
						data: {
							"title": morePostsTitle + subreddit,
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
			// If we only have one subreddit left after deleting the personalized subreddits, ensure /r/news is displayed
			$scope.posts = $scope.subreddits[news];
		}
	}

	// By default, get the posts pertaining to r/news 
	$scope.getPosts(news);
});