 //to set volume to 75% as initial volume
 var presentSong=$("audio")[0];
 $(document).ready(function(){
    $(this).scrollTop(0);
});
function myOnLoadedData(obj){
            //  console.log();
}
var volume1;
function mute(obj){
    var song = getSong(obj)[0];
    $(obj).toggleClass("muted");
    var songName = $(obj).attr("name");
                // $("input[type='range'][name='"+songName+"'].volume")[0].value = presentSong.volume;
                _F = document.querySelector('form[name="'+songName+'"].volume');
    
    if(song.muted == false){
        volume1 = song.volume;
        song.muted = true;
        song.volume = 0;
        _F.style.setProperty('--val',0);
        $("input[type='range'][name='"+songName+"'].volume")[0].value = 0;

    }else{
        song.muted = false;
        console.log(volume1);
        song.volume = volume1;
        _F.style.setProperty('--val',volume1);
        $("input[type='range'][name='"+songName+"'].volume")[0].value = volume1;
    }
    console.log(typeof(volume1));

}
function myOnCanPlayThroughFunction(obj){
    var seconds = Math.ceil(obj.duration);
    console.log(seconds);
    console.log(obj);
    $(obj).attr("max",seconds);
var songName = $(obj).attr("name");
var span = $("span[name='"+songName+"'].duration");
var minutes = Math.floor(seconds/60);
seconds = seconds%60-1;
if(seconds<10){
    var duration = " / "+minutes +":0"+seconds;
}else{
    var duration = " / "+minutes +":"+seconds;
}

$(span).html(duration);
}
$(document).keydown(function(e){
    switch (e.keyCode) {
        case 38:
                console.log("up Arrow");
                if(presentSong.volume<1){
                    presentSong.volume = (presentSong.volume+0.1).toFixed(1);
                }
                console.log(presentSong.volume);
                
                var songName = $(presentSong).attr("name");
                $("input[type='range'][name='"+songName+"'].volume")[0].value = presentSong.volume;
                 _F = document.querySelector('form[name="'+songName+'"].volume');
                _F.style.setProperty('--val',presentSong.volume);
            break;
            case 40:
                console.log("Key Down");
                if(presentSong.volume>0){
                    presentSong.volume = (presentSong.volume-0.1).toFixed(1);
                }
                console.log(presentSong.volume);
                
                var songName = $(presentSong).attr("name");
                $("input[type='range'][name='"+songName+"'].volume")[0].value = presentSong.volume;
                _F = document.querySelector('form[name="'+songName+'"].volume');
                _F.style.setProperty('--val',presentSong.volume);
                break;
            case 37:
                console.log("Key Left");
                presentSong.currentTime -=5;
                var songName = $(presentSong).attr("name");
                var button = $(".play[name='"+songName+"']");
                if(presentSong.paused == true){
                    $(button).trigger("click");
                }
                break;
            case 39:
                console.log("Key right");
                presentSong.currentTime +=5;
                var songName = $(presentSong).attr("name");
                var button = $(".play[name='"+songName+"']");
                if(presentSong.paused == true){
                    $(button).trigger("click");
                }
                break;
            case 32:
                console.log("Key space");
                
                var songName = $(presentSong).attr("name");
                var button = $("button[name='"+songName+"'].play");
                if($(button).hasClass("paused")){
        
                    presentSong.pause();
                }else{
                    presentSong.play();
                    
                }  
                $(button).toggleClass("paused");
                
                break;
            case 221:
                console.log("speed up");
                var songName = $(presentSong).attr("name");
                $(".speedup[name='"+songName+"']").trigger("click");
                break;
            case 219:
                console.log("speed down");
                var songName = $(presentSong).attr("name");
                $(".speeddown[name='"+songName+"']").trigger("click");
                break;
        default:
            break;
    }
});
 var AllAudios = $("audio");
 for(var i=0;i<AllAudios.length;i++){
     AllAudios[i].volume = 0.7;
     AllAudios[i].loop = true;

 }
$(".play").click(function(){
    var song = getSong(this);
    var AllAudios = $("audio");
    for(var i=0;i<AllAudios.length;i++){
        if(!(song[0] === AllAudios[i])){
            if(AllAudios[i].paused == false){
                AllAudios[i].pause();
                var name = $(AllAudios[i]).attr("name");
                var button = $("button[name='"+name+"']");
                $(button).toggleClass("paused");
            }
        }else{
            
        }
    }
    
    if($(this).hasClass("paused")){
        
        song[0].pause();
    }else{
        song[0].play();
        
    }  
    $(this).toggleClass("paused");
});
$(".forward").click(function(){
    var song = getSong(this);
    song[0].currentTime += 5;
});
$(".backward").click(function(){
    var song = getSong(this);
    song[0].currentTime -= 5;
});
$("input[type='range'].duration").change(function(){
    var song = getSong(this);
    song[0].currentTime = this.value;
}); 
$("input[type='range'].volume").change(function(){
    var song = getSong(this);
    song[0].volume = this.value;
    
});
$(".speedup").click(function(){
    var song = getSong(this);
    song[0].playbackRate =(song[0].playbackRate+0.1).toFixed(2);
    var currentPlaybackSpeed = $(".currentPlaybackSpeed");
    if(song[0].playbackRate == 1){
        $(currentPlaybackSpeed).html("<h2>Normal</h2>");
    }else{
        $(currentPlaybackSpeed).html("<h2>"+song[0].playbackRate+"x</h2>");
    }
    
    $(currentPlaybackSpeed).fadeIn(200);
    $(currentPlaybackSpeed).fadeOut(200);


});
$(".speeddown").click(function(){
    var song = getSong(this);
    if(song[0].playbackRate>0.1){
        song[0].playbackRate = (song[0].playbackRate - 0.1).toFixed(2);
    }else{
        song[0].playbackRate = 0.1;
    } 
    var currentPlaybackSpeed = $(".currentPlaybackSpeed");
    if(song[0].playbackRate == 1){
        $(currentPlaybackSpeed).html("<h2>Normal</h2>");
    }else{
        $(currentPlaybackSpeed).html("<h2>"+song[0].playbackRate+"x</h2>");
    }
    $(currentPlaybackSpeed).fadeIn(200);
    $(currentPlaybackSpeed).fadeOut(200);
});


// var songsRange = $("input[type='range'].duration");

// var song;
// var i=0;
// var t=3000;
// function myloop(){
//     setTimeout(function(){
//             song = getSong(songsRange[i]);
//             // song[0].addEventListener('loadedmetadata', function() {
//                 var seconds = Math.ceil(song[0].duration);
//                 $(songsRange[i]).attr("max",seconds);
//             // });
//             var songName = $(songsRange[i]).attr("name");
//             var span = $("span[name='"+songName+"'].duration");
//             var minutes = Math.floor(seconds/60);
//             seconds = seconds%60-1;
//             if(seconds<10){
//                 var duration = " / "+minutes +":0"+seconds;
//             }else{
//                 var duration = " / "+minutes +":"+seconds;
//             }
            
//             $(span).html(duration);
//             i++;
        
//             t /=2;
        
        
//         if(i<songsRange.length){
//             myloop();
//         }
//     },t);
// }
// myloop();
function getSong(obj){
    var songName = $(obj).attr("name");
    var song = $('audio[name="'+songName+'"]');
    return song;
}

// document.documentElement.classList.add('js');
addEventListener('change', update, false);
addEventListener('input', update, false);
var _R = document.querySelectorAll('#r');


function update() {
    var songName = $(this).attr("name");
    var song = getSong(this)[0];
    var button = $("button[name='"+songName+"'].play")[0];
    if(song.paused){
        $(button).trigger("click");
    }
    var _Rval = document.querySelector('input[type="range"][name="'+songName+'"].duration'), 
			_F = document.querySelector('form[name="'+songName+'"].duration');
	let newval = +_Rval.value;
		let val = newval;
		_F.style.setProperty('--val', val);
};
document.documentElement.classList.add('js');
_R.forEach(function(obj){
    obj.addEventListener('input', update, false);
    obj.addEventListener('change', update, false);
});

/////////////////////Sound Bar//////////////////
const _V = document.querySelectorAll("#v");
function updateVolume(){
    
    var songName = $(this).attr("name");
    var _Vval = document.querySelector('input[type="range"][name="'+songName+'"].volume'),
            _F = document.querySelector('form[name="'+songName+'"].volume');
            
    let newval = +_Vval.value;
    let val = newval;
    console.log(val);
    _F.style.setProperty('--val',val);
}

_V.forEach(function(obj){
    obj.addEventListener('input', updateVolume, false);
    obj.addEventListener('change', updateVolume, false);
});


///////////////////////Sound Bar///////////////////
function timeUpdate(obj){
    presentSong = getSong(obj)[0];
    var songName = $(obj).attr("name");
    var span = $("span[name='"+songName+"'].currentTime");
    var rangeDuration = $("input[type='range'][name='"+songName+"'].duration");
    var seconds = Math.floor(obj.currentTime);
    var minutes = Math.floor(seconds/60);
    rangeDuration[0].value = seconds;
    seconds = seconds%60;
    if(seconds<10){
        var time = minutes+ ":0" + seconds;
    }else{
        var time = minutes+ ":"+seconds;
    }
    var _Rval = document.querySelector('input[type="range"][name="'+songName+'"]'), 
			_F = document.querySelector('form[name="'+songName+'"]'); 
    let newval = +_Rval.value;
    let val = newval;
    _F.style.setProperty('--val', val);
    $(span).html(time);

}
/////for Slideshow////////////////

// $("div.slideshow > div + div").hide();   //best code i learnt

////////////////////For Scrolling ///////////////////
var currentSong = 1;
var songLength = $("audio").length;
$(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        if(currentSong > 1){
            currentSong -= 1;
            var song = "#song" + currentSong;
            var pos = $(song).offset();
            var top = pos.top;
            var left = pos.left;
            window.scrollTo((left < 0 ? 0 : left), (top < 0 ? 0 : top));
            
        }else if(currentSong == 1){
            var song = "#song" + currentSong;
            var pos = $(song).offset();
            var top = pos.top;
            var left = pos.left;
            window.scrollTo((left < 0 ? 0 : left), (top < 0 ? 0 : top));
        }
        
    }
    else {
        if(currentSong < songLength){
            currentSong +=1;
            
            var song = "#song" + currentSong;
            var pos = $(song).offset();
            var top = pos.top;
            var left = pos.left;
            window.scrollTo((left < 0 ? 0 : left), (top < 0 ? 0 : top));
        }
        
    }
});

////////////////for overlay content//////////////////////////////////////////////
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  function create(){
      $("#insert").html('<form action="/add" method="POST" > <input type="text" placeholder="Enter Playlist Name" autocomplete="off" name="playlistName"> <button type="submit" class="ghost">Create</button></form>');
      
  }
  $("div.repeat > span").on("click",function(){
      var song = getSong(this)[0];
      if(song.loop == false){
          song.loop = true;
      }else{
          song.loop = false;
      }
      console.log(song.loop);
    $(this).toggleClass("loop");
  });


