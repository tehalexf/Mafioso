callme = function() {
     if (People.find() != undefined) {
        return People.find().fetch().length;
    }
    return 'Well well well...';
}
//Generates the access code
function generateAccessCode(){
    var code = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

      for(var i=0; i < 6; i++){
        code += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return code;
}
  
generateNewGame = function (){
  var game = {
    accessCode: generateAccessCode(),
    state: "waitingForPlayers",
    location: null,
    lengthInMinutes: 8,
    endTime: null,
    paused: false,
    pausedTime: null
  };

  var gameID = Games.insert(game);
  game = Games.findOne(gameID);
  console.log(game)
  return game;
}

generateNewPlayer = function(game, name){
  var player = {
    gameID: game._id,
    name: name,
    role: null,
    // isSpy: false,
    // isFirstPlayer: false
  };

  var playerID = Players.insert(player);

  return Players.findOne(playerID);
}

if (Meteor.isClient) {

  WebFontConfig = {
    google: { families: [ 'Gloria+Hallelujah::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  Template.startMenu.events({
    'click #btn-join-game': function(e){
      playerName = $("#playerName").val()
      if (!playerName)
          return false;

      $("#joinroom").removeClass("hidden");
      console.log($("#roomid").val())


      Meteor.call( 'insertTaco', 0, 1, 2, 3, ( error ) => {
        if ( error ) {
          console.log( error );
        }
      });

    }, 

    'click #btn-new-game': function(event){ 
      playerName = $("#playerName").val()
      if (!playerName)
          return false;

      // var playerName = event.target.playerName.value;
      // console.log(playerName)
      console.log(event)

      var game = generateNewGame();
      var player = generateNewPlayer(game, playerName);

      Meteor.subscribe('games', game.accessCode);
      // $("#btn-join-game").addClass("hidden");
      // $("#btn-new-game").addClass("hidden");
      Session.set("loading", true);
      Meteor.subscribe('players', game._id, function onReady(){
        Session.set("loading", false);

        Session.set("gameID", game._id);
        Session.set("playerID", player._id);
        Session.set("currentView", "lobby");
      });
    }


  });



// Template.startMenu.events({
//   'submit #create-game': function (event) {
//     GAnalytics.event("game-actions", "newgame");

    

//     if (!playerName || Session.get('loading')) {
//       return false;
//     }

//     var game = generateNewGame();
//     var player = generateNewPlayer(game, playerName);

//     Meteor.subscribe('games', game.accessCode);

//     Session.set("loading", true);
    
//     Meteor.subscribe('players', game._id, function onReady(){
//       Session.set("loading", false);

//       Session.set("gameID", game._id);
//       Session.set("playerID", player._id);
//       Session.set("currentView", "lobby");
//     });

//     return false;
//   },
//   'click .btn-back': function () {
//     Session.set("currentView", "startMenu");
//     return false;
//   }
// });


  Template.main.helpers({
    whichView: function() {
      return Session.get('currentView');
    },

  });


  ApplicationController = RouteController.extend({
    layoutTemplate: 'AppLayout',


    onBeforeAction: function () {
      console.log('app before hook!');
      this.next();
    },

    action: function () {
      console.log('this should be overridden!');
    }
  });

  HomeController = ApplicationController.extend({
    action: function () {
      this.render('Home1');
    }
  });

  PostController = ApplicationController.extend({
    show: function () {
      this.render('PostShow');
    },

    index: function () {
      this.render('PostIndex');
    }
  });
}