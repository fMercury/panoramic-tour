angular.module('siteApp').controller("clientAdminController",["$scope","database", "socket",'fileUpload', function($scope,database, client, fileUpload){

  $scope.currentChats=[];
  $scope.currentTab=0;
  $scope.currentMessage="";
  $scope.myFile=null;

  //view variables
  $scope.activeTab="page-admin";

  //Admin connect
  client.emit("admin connect");

  //Get client info
  database.getClients({name : "Test Client"}, function(data){
    $scope.client = data[0];
    $scope.pageContent = $scope.client.page_content;
    console.log($scope.pageContent);
  });

  $scope.getChatNumber=function(username){
    var i=0;
    var found=false;
    while(!found && i<$scope.currentChats.length){
      if ($scope.currentChats[i].client==username){
        found=true;
      }
      else{i++;}
    }
    return i;
  }

  $scope.switchActiveTab = function(tab){
    $scope.activeTab=tab;
  }

  $scope.sendMessage = function(){
    var msg={"username" : "Administrador", "mail":"none", "to":$scope.currentChats[$scope.currentTab-1].id ,"message": $scope.currentMessage};
    $scope.currentChats[$scope.currentTab-1].messages.push(msg);
    client.emit("chat message",msg );
    $('#chatbox').animate({scrollTop: $('#chatbox')[0].scrollHeight});
    $scope.currentMessage="";
    $("#message-area").focus();
  };

  this.setActiveChat = function(value){
    $scope.currentTab=value;
    $('#chatbox').animate({scrollTop: $('#chatbox')[0].scrollHeight});
    $("#message-area").focus();
  }

  //Socket IO event handlers
  client.on("new chat", function(data, id){
    var messages = [];
    messages.push(data);
    $scope.currentChats.push({"client" : data.username, "id":id, "messages":messages });
  });

  client.on("send message", function(data){
    if (data.username!="Administrador"){
      $scope.currentChats[$scope.getChatNumber(data.username)].messages.push(data);
    }
      $('#chatbox').animate({scrollTop: $('#chatbox')[0].scrollHeight});
  });



  //Funciones de modificación de formulario
  $scope.changePage = function(){
    database.updateClientPage($scope.client.name, $scope.pageContent,function(data){
      alert("La modificación se completó con éxito.");
    });
  }

  //Funciones de modificación de formulario
  $scope.changeComponent = function(){
    console.log("scope.file en controller");
    console.log($scope.myFile);
    var file = $scope.myFile;
    var uploadUrl = '/uploadImage';
    var serverpath ='/resources/client-content/';
    fileUpload.uploadFileToUrl(file, uploadUrl,serverpath, function(){
      $scope.pageContent.iframe_content["image_name"] = $scope.myFile.name;
      database.updateClientPage($scope.client.name, $scope.pageContent,function(data){
        alert("Imagen cargada con éxito!");
      });

    });

  }

  $scope.removeSection =function(index){
    $scope.pageContent.features.splice(index,1);
  }

  $scope.addSection =function(){
    $scope.pageContent.features.push({"title" : "Titulo", "content":"Contenido"});
  }

}]);
