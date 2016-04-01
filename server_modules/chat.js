module.exports = function (server) {
    var module = {};
    var io = require('socket.io').listen(server);

    var connectedAdmins=[];
    var connectedClients={};

    //Get admin by id
    module.getAdminIndex = function(id){
      var i=0;
      var found = false;
      while (!found && i<connectedAdmins.length){
        if (connectedAdmins[i].admin_id==id){
          found=true;
        }
        else{
          i++;
        }
      }
      if (found){return i}
      else {return null;}
    }

    //Assigns a client to the room with least clients being served
    module.assignAdmin = function(){
        var chosen_admin=0;
        var least_clients=99999;
        for (i in connectedAdmins){
          if (connectedAdmins[i].clients < least_clients){
            chosen_admin=i;
            least_clients=connectedAdmins[i].clients;
          }
        }
        return chosen_admin;
    }

    module.listen = function(){
      io.on('connection', function(socket){
        connectedClients[socket.id] = {"room":"none","role":"user"};
        //Admin connection
        socket.on("admin connect", function(data){
          connectedAdmins.push({"admin_id" : socket.id, "clients" : 0});
          connectedClients[socket.id].room=socket.id;
          connectedClients[socket.id].role="admin";
          io.to(socket.id).emit("join room", socket.id);
        });

        //Chat message
      	socket.on("chat message", function(data){
          //If client is unassigned
          if (connectedClients[socket.id]["room"]=="none"){
            //If there is al least one admin
            if (connectedAdmins.length){
              var adminNumber = module.assignAdmin();
              connectedClients[socket.id].room = connectedAdmins[adminNumber].admin_id;
              connectedAdmins[adminNumber].clients++;
              io.to(connectedAdmins[adminNumber].admin_id).emit("new chat", data, socket.id);
              io.to(socket.id).emit("set admin id",connectedAdmins[adminNumber].admin_id );
            }
            //otherwise, send email
            else{
              io.to(socket.id).emit("no admins");
            }
          }
          //Client connected, send message to room
          else{
            if (typeof data.to === "undefined") {
              io.to(connectedClients[socket.id]["room"]).emit("send message", data);
            }
            else{
              io.to(data.to).emit("send message", data);
            }
          }
      	});

        //Client leave room
        socket.on('leave room', function(){
          connectedClients[socket.id].room="none";
        });

        //Disconnection
      	socket.on('disconnect', function(){
          //if a regular client is disconnected
          if (connectedClients[socket.id].role=="user"){
            if (connectedClients[socket.id].room!="none"){
              var adminNumber = module.getAdminIndex(connectedClients[socket.id].room);
              if (!typeof connectedAdmins[adminNumber] === "undefined") {
                connectedAdmins[adminNumber].clients--;
              }
            }
            delete connectedClients[socket.id];
          }
          //if an admin disconnected
          else if (connectedClients[socket.id].role=="admin"){
            var admin_index = module.getAdminIndex(socket.id);
            if (admin_index!=null){
              //Notify room members the admin left
              socket.broadcast.to(socket.id).emit("admin disconnected");
              //Erase from array
              connectedAdmins.splice(admin_index,1);
            }
          }
        });
      });
    };

    return module;
};
