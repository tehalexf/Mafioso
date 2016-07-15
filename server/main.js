Meteor.methods({
  insertTaco( count ) {
    gameTemp.insert( { count: count } );
  }
});





	AccountsGuest.anonymous = true


	Meteor.startup(function() {

	  	Games.remove({});
		Players.remove({});
	    gameTemp.remove({});
	    People.remove({});

	    return Meteor.methods({

	    	removeAllPosts: function() {
				Games.remove({});
				Players.remove({});
	        	return gameTemp.remove({});
	      	}
	    });
	});



People.remove({});
    Meteor.server.stream_server.register( Meteor.bindEnvironment( function(socket) {
        var intervalID = Meteor.setInterval(function() {
            if (socket._meteorSession) {

                var connection = {
                    connectionID: socket._meteorSession.id,
                    connectionAddress: socket.address,
                    userID: socket._meteorSession.userId
                };

                socket.id = socket._meteorSession.id;

                People.insert(connection);

                Meteor.clearInterval(intervalID);
            }
        }, 1000);

        socket.on('close', Meteor.bindEnvironment(function () {
            People.remove({
                connectionID: socket.id
            });
        }, function(e) {
            Meteor._debug("Exception from connection close callback:", e);
        }));
    }, function(e) {
        Meteor._debug("Exception from connection registration callback:", e);
    }));