angular.module('siteApp').controller("centerController",["$scope","database", function($scope,database){

  this.getTypes = function(){
    var types=[];
    for (i in $scope.clients){
      if (!types.includes($scope.clients[i].type)){
        types.push($scope.clients[i].type);
      }
    }
    return types;
  };

  $scope.searchText="";
  $scope.searchType="";

  //Get all clients on app start
  database.getClients({},function(clients){
    $scope.clients = clients;
  });
  /*
  $scope.clients = [{
    "name" : "Cossack Spring Pea",
    "type" : "Food & Drink",
    "image" : "1.jpg"
  },{
      "name" : "Doghouse Brewing Co.",
      "type" : "Food & Drink",
      "image" : "2.jpg"
    },
    {
      "name" : "Fork And Knife",
      "type" : "Food & Drink",
      "image" : "3.jpg"
    },
    {
      "name" : "KW",
      "type" : "Clothing",
      "image" : "4.jpg"
    },
    {
      "name" : "Poids Plume",
      "type" : "Food & Drink",
      "image" : "5.jpg"
    },
    {
      "name" : "Westlands",
      "type" : "Food & Drink",
      "image" : "6.jpg"
    },
    {
      "name" : "Studio 45",
      "type" : "Fitness",
      "image" : "14.jpg"
    },
    {
      "name" : "Lingua Viva",
      "type" : "Research & Learning",
      "image" : "7.jpg"
    },
    {
      "name" : "Beach Park",
      "type" : "Lodging",
      "image" : "8.jpg"
    },
    {
      "name" : "Corsa Capital",
      "type" : "Stock Brokers",
      "image" : "9.jpg"
    },
    {
      "name" : "Taurus",
      "type" : "Construction",
      "image" : "15.jpg"
    },
    {
      "name" : "Tel",
      "type" : "Stock Brokers",
      "image" : "10.jpg"
    },
    {
      "name" : "M",
      "type" : "Clothing",
      "image" : "11.jpg"
    },
    {
      "name" : "Hula Hoop",
      "type" : "Food & Drink",
      "image" : "12.jpg"
    },
    {
      "name" : "Human",
      "type" : "Clothing",
      "image" : "16.jpg"
    },
    {
      "name" : "Act Research",
      "type" : "Research & Learning",
      "image" : "13.jpg"
    },
  ];
  */
  $scope.availableTypes=this.getTypes();

}]);
