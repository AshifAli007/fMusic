$(".play").click(function(){
    var song = getSong(this);
    song[0].play();
});

$(".pause").click(function(){
    var song = getSong(this);
    song[0].pause();
});
$(".forward").click(function(){
    var song = getSong(this);
    song[0].currentTime += 5;
    console.log(song[0].duration);
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
});
$(".speeddown").click(function(){
    var song = getSong(this);
    if(song[0].playbackRate>0.1){
        song[0].playbackRate = (song[0].playbackRate - 0.1).toFixed(2);
    }else{
        song[0].playbackRate = 0.1;
    } 
});
function timeUpdate(obj){
    var songName = $(obj).attr("name");
    var span = $("span[name='"+songName+"'].currentTime");
    var seconds = Math.floor(obj.currentTime);
    var minutes = Math.floor(seconds/60);
    seconds = seconds%60;
    if(seconds<10){
        var time = minutes+ ":0" + seconds;
    }else{
        var time = minutes+ ":"+seconds;
    }
    
    $(span).html(time);
}

var songsRange = $("input[type='range'].duration");

var song;
var i=0;
var t=500;
function myloop(){
    setTimeout(function(){
            song = getSong(songsRange[i]);
            // song[0].addEventListener('loadedmetadata', function() {
                var seconds = Math.ceil(song[0].duration);
                $(songsRange[i]).attr("max",seconds);
            // });
            var songName = $(songsRange[i]).attr("name");
            var span = $("span[name='"+songName+"'].duration");
            var minutes = Math.floor(seconds/60);
            seconds = seconds%60-1;
            if(seconds<10){
                var duration = " / "+minutes +":0"+seconds;
            }else{
                var duration = " / "+minutes +":"+seconds;
            }
            
            $(span).html(duration);
            i++;
        
            t /=2;
        
        
        if(i<songsRange.length){
            myloop();
        }
    },t);
}
myloop();

function getSong(obj){
    var songName = $(obj).attr("name");
    var song = $('audio[name="'+songName+'"]');
    return song;
}