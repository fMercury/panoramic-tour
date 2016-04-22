angular.module('siteApp').controller("centerController",["$scope","database", function($scope,database){



  $scope.getTypes = function(){

    var types=[];
    for (i in $scope.clients){
      if (!types.includes($scope.clients[i].client_data.category)){
        types.push($scope.clients[i].client_data.category);
      }
    }
    return types;
  };

  $scope.searchText="";
  $scope.searchType="";

  //Get all clients on app start
  database.getClients({"center" : "Test Center"},function(clients){
    $scope.clients = clients;
    $scope.availableTypes=$scope.getTypes();
  });



  $scope.filterCategory = function(hotel){
    if (hotel.client_data.category == $scope.searchType || $scope.searchType==""){
      return true;
    }
    else return false;
  }

}]);
