var userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",'brunofin','sheevergaming'];
var api ='https://wind-bow.hyperdev.space/twitch-api/'

function getChannelInfo(){
  userArray.forEach(function(name){
    
    function makeUrl (type, name){
      return api+type+'/'+ name + '?callback=?';
    }
  
    $.getJSON(makeUrl('streams',name), function(data){
      var streaming, status;     
        if (data.stream === null) {
                streaming = 'Offline';
                status = 'Offline';
            } else if (data.stream === undefined) {
                streaming = 'Account Closed';
                status = 'Offline';
            } else {
                streaming = data.stream.game;
                status = 'Online';
            }     
      
      $.getJSON(makeUrl('channels', name), function(data){
       // console.log(data.url);
        var logo = data.logo != undefined ? data.logo : 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F';
        var active = status == "Online" ? 'active' : "inactive";
        
        var statusText;
        if (streaming == "Offline" && status == "Offline") {
          statusText = '<p>Offline</p>';
        } else if (streaming == "Account Closed") {
          statusText = '<p>Account Closed</p>';
        } else if (status == "Online") {
          statusText = '<a href="'+data.url+'" target="_blank">'+data.status+'</a>';
        }
        
        var offlineLogo = status != "Online" ? 'decolor': "" ;
      
      var html = '<div class="row userList ' + active + '" id="' + name + '" style="background: url('+data.profile_banner+');background-size:100% auto;'+offlineLogo+';"><div class="col-md-2 col-lg-2 col-xs-4"><img class="img-responsive img-circle '+offlineLogo +'" src="'+logo+'"></div><div class="col-md-4 col-lg-4 col-xs-8 boxText"><p><a href="'+data.url+'" target="_blank">'+name+'</a></p></div><div class="col-md-6 col-lg-6 col-xs-12 boxText">' +statusText + '</div></div>';
     
  status === 'Online' ? $('#usersList').prepend(html) : $('#usersList').append(html)
      })  
    });//get streams data
  })//userArray foreach  
}

$(document).ready(function(){
   getChannelInfo();
   $('.button').click(function () {
        $('.button').removeClass('selectedButton');
        $(this).addClass('selectedButton');
        var status = $(this).attr('id');

        if (status === 'online-status-all') {
            $('.active, .inactive').removeClass('hidden');
        } else if (status === 'online-status-online') {
            $('.active').removeClass('hidden');
            $('.inactive').addClass('hidden');
        } else {
            $('.inactive').removeClass('hidden');
            $('.active').addClass('hidden');
        }
    });
  

});