angular.element(document).ready(function(){
    angular.module('project',[])
        .controller('myCtrl', ['$scope','parser',function ($scope,parser) {
            $scope.search = '';
            $scope.games = [];
            $scope.players = [];
			$scope.total_kills = [];
			$scope.kills = [];
			$scope.killsMeans = [];
           
            $scope.games = parser.getGames();
        }])
        .factory('parser',function(){
            return {
                getGames : function(){
                    return main.init();
                }
            };						
        });

    angular.bootstrap(document,['project']);
});