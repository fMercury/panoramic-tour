app.controller("mdqHotelsController",["$scope","$http","$timeout","database", function($scope, $http, $timeout, database){

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

  //Get all clients on app start
  database.getClients({"center" : "MDQHotels"},function(clients){
    $scope.clients = clients;
  });

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

    $scope.filterZone = function(hotel){
      if (hotel.client_data.zone == $scope.searchZone || $scope.searchZone==""){
        return true;
      }
      else return false;
    }

    $scope.filterStars = function(hotel){
      if ($scope.selectedStars.length==0 || $scope.selectedStars.includes(hotel.client_data.stars)){
        return true;
      }
      else return false;
    }

    $scope.filterRoomType = function(hotel){
      if (hotel.client_data.roomType.includes($scope.searchRoomType) || $scope.searchRoomType=="none"){
        return true;
      }
      else return false;
    }

    $scope.filterServices = function(hotel){
      var allServices=true;
      var i=0;
      while (allServices && i<$scope.selectedServices.length){
        if (!hotel.client_data.services.length){
          allServices=false;
        }
        else{
          if (!hotel.client_data.services.includes($scope.selectedServices[i])){
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
