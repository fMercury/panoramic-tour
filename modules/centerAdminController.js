angular.module('siteApp').controller("centerAdminController",["$scope","database",'fileUpload', function($scope,database,fileUpload){

  //File uploader


  //New client variables
  $scope.newClientName="";
  $scope.newClientType="";
  $scope.newClientUrl="";
  $scope.newClientTemplate="";
  $scope.showNewClientForm=false;
  $scope.myFile=null;

  //Get all clients on app start
  database.getClients({},function(clients){
    $scope.clients = clients;
    $scope.availableTypes=$scope.getTypes();
  });

  $scope.getTypes = function(){
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
                      "image" : $scope.myFile.name,               //hardcodero
                      "web_url": $scope.newClientUrl,
                      "template_type" : $scope.newClientTemplate};   //hardcodero
    database.addClient(clientData, function(){
        var file = $scope.myFile;
        var uploadUrl = '/uploadImage';
        fileUpload.uploadFileToUrl(file, uploadUrl, function(){
          alert("Cliente cargado con éxito!");
          location.reload();
        });
    });
  }

  $scope.uploadFile = function(item){
    console.log($scope.myFile);
    var file = $scope.myFile;
    var uploadUrl = '/uploadImage';
    fileUpload.uploadFileToUrl(file, uploadUrl);
  };

}]);
