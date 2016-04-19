angular.module('siteApp').controller("clientAdminController",["$scope","database", "socket",'fileUpload', function($scope,database, client, fileUpload){

  $scope.currentChats=[];
  $scope.currentTab=0;
  $scope.currentMessage="";
  $scope.myFiles=[];

  //view variables
  $scope.activeTab="page-admin";
  //Admin connect
  client.emit("admin connect");

  //Get client info
  database.getClients({name : "Doghouse Brewing Co."}, function(data){
    $scope.client = data[0];
    $scope.pageContent = $scope.client.page_content;
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
    var file = $scope.myFiles[0];
    var uploadUrl = '/uploadImage';
    var serverpath ='/resources/client-content/';
    var acks=0;
    database.updateClientPage($scope.client.name, $scope.pageContent,function(data){
      alert("El texto fue modificado con éxito.");
    });

  }

  $scope.removeSection =function(index){
    $scope.pageContent.features.splice(index,1);
  }

  $scope.removeSlide =function(index){
    $scope.pageContent.iframe_content.slides.splice(index,1);
  }

  $scope.addSection =function(){
    $scope.pageContent.features.push({"title" : "Titulo", "content":"Contenido"});
  }

  $scope.addSlide =function(){
    $scope.pageContent.iframe_content.slides.push({"image" : "placeholder400x400.png", "caption":"Texto de la filmina"});
  }

  $scope.isFile = function(index){
    return typeof($scope.myFiles[index])=='undefined';
  }

  $scope.addImage = function(index){

    var file = $scope.myFiles[index];
    var uploadUrl = '/uploadImage';
    var serverpath ='/resources/client-content/';
    fileUpload.uploadFileToUrl(file, uploadUrl,serverpath, function(filename){
      $scope.pageContent.iframe_content.slides[index].image = filename;
      database.updateClientPage($scope.client.name, $scope.pageContent,function(data){
        alert("Imagen cargada con éxito!");
      });
    });
  }

}]);
