$(document).ready(function() {


 var fun = [ "lol", "lmaoooo", "true true", "lmaooooooo", "lololololololollol", "okay okay", "oooooof", "no youre drunk" ];
 var randomizeRoles = ['drunk', 'sober' ];



 function randomItem(index) {
   return Math.floor(Math.random() * index.length);
 }

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBfoL7_T0cprLB_TxGYR4O_cneTF7mywfw",
    authDomain: "kikkoproject3.firebaseapp.com",
    databaseURL: "https://kikkoproject3.firebaseio.com",
    projectId: "kikkoproject3",
    storageBucket: "kikkoproject3.appspot.com",
    messagingSenderId: "709430091006"
  };
  firebase.initializeApp(config);


  // Establish to identify which branch of our Firebase Database
  var messagesBranch = firebase.database().ref('messages');


  // Initite The Gathering Session
  var gathering = new Gathering(firebase.database(), 'kikkosfavoritepeopleonlyareinvited');


  // ON LOAD, CREATES A RANDOM ID, SENDS IT TO FIREBASE GATHERING SESSION
  var uniqueIDtTatGoesToTheServerSoYouCanTell = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
  console.log(uniqueIDtTatGoesToTheServerSoYouCanTell);
  gathering.join(null, uniqueIDtTatGoesToTheServerSoYouCanTell);

  // ASSIGNS THE USER THE ROLE RANDOMLY. ONLY RUNS ONCE
  var userRole = randomizeRoles[randomItem(randomizeRoles)];


  // Send Data to Firebase
  $('#send-button').click(function() {
    var user1Message = $('#message-box').text();
    messagesBranch.push({
      message : user1Message,
      author: uniqueIDtTatGoesToTheServerSoYouCanTell,
      role: userRole
    });

    // Empty out the divs
    $('#message-box').html('');

  })

  // Recieve Data from Firebase
  var getDataFromFirebase = function() {
    messagesBranch.on('child_added', function(myFirebaseItem) {

      // Access the child of the main branch
      var firebaseChild = myFirebaseItem.val();

      // Get the message metadata
      var message = firebaseChild.message;
      var author = firebaseChild.author;
      var role = firebaseChild.role;


      // ID MY UNIQUE ID is EQUAL TO THE MSG AUTHOR FROM THE FIREBASE DATABASE
      if (uniqueIDtTatGoesToTheServerSoYouCanTell == firebaseChild.author) {
        $('#messages').prepend('<div class="gsm" style="color:white">'+ message + '    </div>');
      } else {
        $('#messages').prepend('<div class="msg" style="color:white">'+ message + ' ' + fun[randomItem(fun)] + '    </div>');
        $('#messages').prepend('<div class="msg" style="color:white">'+ message + ' ' + fun[randomItem(fun)] + '    </div>');
      }




      // $('#messages').append(message + ' by ' + author);
      // $('#messages').prepend('<div class="drunkmessage">' + message + " " + drunkResponse  + '</div>');
      // $('#messages').prepend('<div class="sobermessage">' + message + " " + drunkResponse  + fun[randomItem(fun)] + '</div>');
      // $('#messages').prepend('<div class="sobermessage">' + message + " " + drunkResponse  + fun[randomItem(fun)] +'</div>');


    });
  }

  getDataFromFirebase();





});
