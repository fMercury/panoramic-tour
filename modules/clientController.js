angular.module('siteApp').controller("clientController",["$scope","socket", function($scope,client){

  $scope.user = "";
  $scope.mail="";
  $scope.currentMessage="";
  $scope.adminID=undefined;
  $scope.chat=[];
  $scope.noAdmins=false;


  $scope.sendMessage = function(){
    if (!$scope.noAdmins){
      var msg= {"username" : $scope.user, "mail":$scope.mail, "to": $scope.adminID, "message": $scope.currentMessage};
      client.emit("chat message", msg);
      $scope.chat.push(msg);
      $scope.currentMessage="";
      $("#message-area").focus();
      $('#chatbox').animate({scrollTop: $('#chatbox')[0].scrollHeight});
    }
  };

  client.on("admin disconnected", function(){
    client.emit("leave room");
  });

  client.on("no admins", function(){
    $scope.noAdmins=true;
  });

  client.on("send message", function(data){
    //Scroll chatbox to bottom
    $scope.chat.push(data);
    //Scroll chatbox to bottom
    $('#chatbox').animate({scrollTop: $('#chatbox')[0].scrollHeight});
  });

  client.on("set admin id", function(data){
    $scope.adminID = data;
  });
}]);
