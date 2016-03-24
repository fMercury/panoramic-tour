var app = angular.module("panoramicApp",[]);

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

}]);
