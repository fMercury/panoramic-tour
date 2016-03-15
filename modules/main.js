var app = angular.module("panoramicApp",[]);

app.controller("mainController",["$scope", function($scope){

  //Panorama div config
  pannellum.viewer('panorama', {
    "default": {
      "firstScene": "circle",
      "author": "Matías Cincunegui",
      "sceneFadeDuration": 3000
      },
      "scenes": {
          "circle": {
              "title": "Camino",
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
                      "text": "Ir a la Casa",
                      "sceneId": "house"
                  },
                  {
                    "pitch": 0.6266281319951438,
                    "yaw": -103.70267864413779,
                    "type": "info",
                    "text": "Salida"
                  }
              ]
          },

          "house": {
              "title": "Casa",
              "hfov": 110,
              "yaw": 5,
              "type": "equirectangular",
              "panorama": "../resources/bma-0.jpg",
              "hotSpots": [
                  {
                      "pitch": -0.6,
                      "yaw": 37.1,
                      "type": "scene",
                      "text": "Ir al camino",
                      "sceneId": "circle",
                      "targetYaw": -23,
                      "targetPitch": 2
                  },
                  {
                    "pitch": 2.1489150553773366,
                    "yaw": 169.69642402195143,
                    "type": "info",
                    "text": "Entrada al Museo"
                  },
                  {
                    "pitch": -1.0721990198467852,
                    "yaw": -11.960274462618134,
                    "type": "info",
                    "text": "Casa Chica"
                  }
              ]
          }
      },
      "autoLoad": true,
      "hotSpotDebug": true
  });

}]);
