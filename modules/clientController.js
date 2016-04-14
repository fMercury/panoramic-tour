angular.module('siteApp').controller("clientController",["$scope","$location","socket","database", function($scope,$location,client,database){

  $scope.user = "";
  $scope.mail="";
  $scope.currentMessage="";
  $scope.adminID=undefined;
  $scope.chat=[];
  $scope.noAdmins=false;


  //Get client info to isntatiate page content
  database.getClients({web_url : $location.path().split("/").pop()}, function(data){
    $scope.client = data[0];
    if (typeof $scope.client.page_content === "undefined" || $.isEmptyObject($scope.client.page_content)){
      alert ("Error cargando los datos del cliente.");
    }
    else{
      $scope.pageContent = $scope.client.page_content;
    }
  });

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
