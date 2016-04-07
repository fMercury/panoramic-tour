angular.module('siteApp').controller("clientAdminController",["$scope","socket", function($scope,client){

  $scope.currentChats=[];
  $scope.currentTab=0;
  $scope.currentMessage="";

  //Admin connect
  client.emit("admin connect");

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

}]);
