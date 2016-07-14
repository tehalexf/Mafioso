Meteor.methods({
  insertTaco( count ) {
    gameTemp.insert( { count: count } );
  }


});

if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {
Games.remove({});
Players.remove({});
        return gameTemp.remove({});

      }

    });

  });

}