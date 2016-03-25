var app = angular.module("siteApp",[]);

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
