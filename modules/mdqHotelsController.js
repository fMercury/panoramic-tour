app.controller("mdqHotelsController",["$scope","$http","$timeout", function($scope, $http, $timeout){

  var self=this;

  //Filter variables
  $scope.searchName="";
  $scope.searchZone="";
  $scope.searchRoomType="none";

  //Slider varialbe
  $scope.startFade = false;;
  $scope.sliderClosed=false;

  $scope.zones = ["Centro","Aquarium","Stella Maris","Casino Central","Centro Cultural Villa Victoria", "La Perla  - Constitución", "Laguna de los Padres","Monumento Alfonsina Storni","Museo del Mar","Playa Bristol","Playa Varese","Plaza Mitre","Plaza San Martín","Puerto de Mar del Plata","Punta Mogotes","Reserva de Lobos Marinos","Torreón del Monje"];
  $scope.filteredClients=[];
  $scope.selectedStars=[];
  $scope.selectedHotels=[];
  $scope.selectedServices=[];
  $scope.specialRooms = [{"adults" : 2, "kids":0, "kids_ages": []}];
  $scope.specialRoomComplete=false;
  $scope.accomodationType = "";
  $scope.apartamentType='2';
  $scope.roomQuality='standard';

  //Form information
  $scope.arrivalDate="";
  $scope.leavingDate="";
  $scope.username="";
  $scope.email="";
  $scope.phone="";
  $scope.dni="";

  $scope.eh = function(){
    console.log($scope.roomQuality);
  }

  $scope.clients = [{
    "name" : "Cossack Spring Pea",
    "zone" : "Aquarium",
    "stars" : "2",
    "roomType": ["Individual","Doble","Familiar","Mútiple"],
    "services" : ["Wi-Fi","Desayuno"],
    "image" : "1.jpg"
  },{
      "name" : "Doghouse Brewing Co.",
      "zone" : "Centro",
      "stars" : "1",
      "roomType": ["Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "2.jpg"
    },
    {
      "name" : "Fork And Knife",
      "zone" : "Laguna de los Padres",
      "stars" : "4",
      "roomType": ["Múltiple"],
      "services" : [],
      "image" : "3.jpg"
    },
    {
      "name" : "KW",
      "zone" : "Casino Central",
      "stars" : "2",
      "roomType": ["Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Spa"],
      "image" : "4.jpg"
    },
    {
      "name" : "Poids Plume",
      "zone" : "Centro",
      "stars" : "2",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "5.jpg"
    },
    {
      "name" : "Westlands",
      "zone" : "Centro",
      "stars" : "3",
      "roomType": ["Individual","Doble","Familiar","Mútiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "6.jpg"
    },
    {
      "name" : "Studio 45",
      "zone" : "Stella Maris",
      "stars" : "5",
      "roomType": ["Individual","Doble","Familiar","Mútiple"],
      "services" : ["Wi-Fi","Desayuno","Pileta"],
      "image" : "14.jpg"
    },
    {
      "name" : "Lingua Viva",
      "zone" : "Museo del Mar",
      "stars" : "2",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Playa"],
      "image" : "7.jpg"
    },
    {
      "name" : "Beach Park",
      "zone" : "Laguna de los Padres",
      "stars" : "2",
      "roomType": ["Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Playa"],
      "image" : "8.jpg"
    },
    {
      "name" : "Corsa Capital",
      "zone" : "Playa Varese",
      "stars" : "3",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Pileta"],
      "image" : "9.jpg"
    },
    {
      "name" : "Taurus",
      "zone" : "Plaza Mitre",
      "stars" : "1",
      "roomType": ["Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "15.jpg"
    },
    {
      "name" : "Tel",
      "zone" : "Plaza Mitre",
      "stars" : "3",
      "roomType": ["Individual","Doble","Familiar","Mútiple"],
      "services" : ["Wi-Fi","Pileta"],
      "image" : "10.jpg"
    },
    {
      "name" : "M",
      "zone" : "Playa Varese",
      "stars" : "4",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Spa","Pileta"],
      "image" : "11.jpg"
    },
    {
      "name" : "Hula Hoop",
      "zone" : "Torreón del Monje",
      "stars" : "5",
      "roomType": ["Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno","Spa"],
      "image" : "12.jpg"
    },
    {
      "name" : "Human",
      "zone" : "Torreón del Monje",
      "stars" : "3",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "16.jpg"
    },
    {
      "name" : "Act Research",
      "zone" : "Centro Cultural Villa Victoria",
      "stars" : "4",
      "roomType": ["Doble","Familiar", "Múltiple"],
      "services" : ["Wi-Fi","Desayuno"],
      "image" : "13.jpg"
    },
  ];

  this.getTypes = function(){
    var types=[];
    for (i in $scope.clients){
      if (!types.includes($scope.clients[i].type)){
        types.push($scope.clients[i].type);
      }
    }
    return types;
  };

  this.selectStars = function(value){
    if ($scope.selectedStars.includes(value)){
      $scope.selectedStars.splice($scope.selectedStars.indexOf(value), 1);
    }
    else{
      $scope.selectedStars.push(value);
    }
  };

  this.addHotel = function(value){
    if ($scope.selectedHotels.includes(value)){
      $scope.selectedHotels.splice($scope.selectedHotels.indexOf(value), 1);
    }
    else{
      $scope.selectedHotels.push(value);
    }
  };

  this.removeHotel = function(value){
    if ($scope.selectedHotels.includes(value)){
      $scope.selectedHotels.splice($scope.selectedHotels.indexOf(value), 1);
    }
  };

  this.addService = function(value){
    if ($scope.selectedServices.includes(value)){
      $scope.selectedServices.splice($scope.selectedServices.indexOf(value), 1);
    }
    else{
      $scope.selectedServices.push(value);
    }
  };

  this.removeService = function(value){
    if ($scope.selectedServices.includes(value)){
      $scope.selectedServices.splice($scope.selectedServices.indexOf(value), 1);
    }
  };

  this.changeKidsAmount = function(index){
    console.log(index);
    var new_ages=[];
    var i=0;
    while (i<$scope.specialRooms[index].kids){
      new_ages.push({"age" : 2});
      i++;
    }
    $scope.specialRooms[index].kids_ages=new_ages;
  }

  this.addSpecialRoom = function(){
    $scope.specialRooms.push({"adults" : 2, "kids":0, "kids_ages": []});
  }

  this.removeSpecialRoom = function(index){
    $scope.specialRooms.splice(index,1);
  }

  this.setSpecialRoomComplete = function(value){
    $scope.specialRoomComplete=value;
  }

  this.sendEmail = function(){
      var specialRoomData=[];
      if ($scope.searchRoomType=='Familiar' || $scope.searchRoomType=='Múltiple'){
        specialRoomData=$scope.specialRooms;
      }
      var people=0;
      if ($scope.searchRoomType=='Individual'){
        people=1;
      }
      else if ($scope.searchRoomType=='Doble'){
        people=2;
      }
      else{
        for (k in specialRoomData){
          people+=parseInt(specialRoomData[k].adults)+parseInt(specialRoomData[k].kids);
        }
      }
        console.log(specialRoomData);
      $http({
          method: 'GET',
          url: '/sendEmail',
          params: {
            'username' : $scope.username,
            "email" : $scope.email,
            "phone" : $scope.phone,
            "dni" : $scope.dni,
            "arrivalDate": $scope.arrivalDate,
            "leavingDate" : $scope.leavingDate,
            "people" : people,
            "hotels": $scope.selectedHotels,
            "specialRooms" : specialRoomData
          },
       }).success(function(data){
          alert("¡El mail ha sido enviado con éxito!");
          location.reload();
      }).error(function(){
          alert("Error en el envío.");
      });
    };

    $scope.closeSlider = function(){
        $scope.startFade = true;
        $timeout(function(){
            $scope.sliderClosed=true;
        }, 500);
    };


    $(document).ready(function(){
      $scope.availableTypes=self.getTypes();
      //Datepicker code
      $(function () {
            $('#arrival-day-pick').datetimepicker();
            $('#leaving-day-pick').datetimepicker();

            $('#arrival-day-pick').datetimepicker().on("changeDate", function(ev){
                $scope.arrivalDate=$('#arrival-input').val();
            });

            $('#leaving-day-pick').datetimepicker().on("changeDate", function(ev){
                $scope.leavingDate=$('#leaving-input').val();
            });
      });
    });

    $scope.filterRoomType = function(hotel){
      if (hotel.roomType.includes($scope.searchRoomType) || $scope.searchRoomType=="none"){
        return true;
      }
      else return false;
    }

    $scope.filterServices = function(hotel){
      var allServices=true;
      var i=0;
      while (allServices && i<$scope.selectedServices.length){
        if (!hotel.services.length){
          allServices=false;
        }
        else{
          if (!hotel.services.includes($scope.selectedServices[i])){
            allServices=false;
          }
        }
        i++;
      }
      return allServices;
    }

}]);



app.filter('inArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                if (!arrayFilter.length){
                  return true;
                }
                else{
                  return arrayFilter.indexOf(listItem[element]) != -1;
                }
            });
        }
    };
});
