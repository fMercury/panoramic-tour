angular.module('siteApp').controller("centerAdminController",["$scope","database", function($scope,database){

  //New client variables
  $scope.newClientName="";
  $scope.newClientType="";
  $scope.newClientUrl="";
  $scope.newClientTemplate="";
  $scope.showNewClientForm=false;

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

  $scope.availableTypes=this.getTypes();

  //Functions
  $scope.toggleNewClientForm = function(){
    $scope.showNewClientForm = !$scope.showNewClientForm;
  }

  $scope.generateUrl = function(){
    $scope.newClientUrl = $scope.newClientName.split(' ').join('-').toLowerCase();
  }

  $scope.addClient= function(){
    var clientData = {"name" : $scope.newClientName,
                      "type" : $scope.newClientType,
                      "image" : "12.jpg",               //hardcodero
                      "web_url": $scope.newClientUrl,
                      "template_type" : $scope.newClientTemplate};   //hardcodero
    database.addClient(clientData, function(){
        alert("Cliente cargado con éxito!");
        location.reload();
    });
  }

}]);
