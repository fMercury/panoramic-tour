var app = angular.module("siteApp",[]);

//Scoket IO
app.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);

//Enter key press directive
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


app.controller("pannellumController",["$scope", function($scope){

  //Panorama div config
  pannellum.viewer('panorama', {
    "default": {
      "firstScene": "circle",
      "author": "Panoramic Demo",
      "sceneFadeDuration": 3000
      },
      "scenes": {
          "circle": {
              "title": "The Gates",
              "hfov": 110,
              "pitch": -3,
              "yaw": 117,
              "type": "equirectangular",
              "panorama": "../resources/from-tree.jpg",
              "hotSpots": [
                  {
                      "pitch": -2.1,
                      "yaw": 132.9,
                      "type": "scene",
                      "text": "Go to the Entrance",
                      "sceneId": "house"
                  },
                  {
                    "pitch": 0.6266281319951438,
                    "yaw": -103.70267864413779,
                    "type": "info",
                    "text": "The road stretches far away."
                  }
              ]
          },

          "house": {
              "title": "The Entrance",
              "hfov": 110,
              "yaw": 5,
              "type": "equirectangular",
              "panorama": "../resources/bma-0.jpg",
              "hotSpots": [
                  {
                      "pitch": -0.6,
                      "yaw": 37.1,
                      "type": "scene",
                      "text": "Go to the Gates",
                      "sceneId": "circle",
                      "targetYaw": -23,
                      "targetPitch": 2
                  },
                  {
                    "pitch": 2.1489150553773366,
                    "yaw": 169.69642402195143,
                    "type": "info",
                    "text": "Museum entrance."
                  },
                  {
                    "pitch": -1.0721990198467852,
                    "yaw": -11.960274462618134,
                    "type": "info",
                    "text": "Small house"
                  }
              ]
          }
      },
      "autoLoad": true,
      "hotSpotDebug": true
  });

}]);

app.controller("javascriptPanoramaController",["$scope", function($scope){

}]);

app.controller("clientController",["$scope","socket", function($scope,client){

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

app.controller("adminController",["$scope","socket", function($scope,client){

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

app.controller("centerController",["$scope", function($scope){

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

  $scope.availableTypes=this.getTypes();

}]);
