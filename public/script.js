
$(".play").click(function(){
    var song = getSong(this);
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
});
$(".speeddown").click(function(){
    var song = getSong(this);
    if(song[0].playbackRate>0.1){
        song[0].playbackRate = (song[0].playbackRate - 0.1).toFixed(2);
    }else{
        song[0].playbackRate = 0.1;
    } 
});


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

document.documentElement.classList.add('js');
addEventListener('change', update, false);
addEventListener('input', update, false);
const _R = document.querySelectorAll('#r'), 
			_F = document.querySelectorAll('form');


function update() {
    var songName = $(this).attr("name");
    var song = getSong(this)[0];
    var button = $("button[name='"+songName+"'].play")[0];
    if(song.paused){
        $(button).trigger("click");
    }
    const _Rval = document.querySelector('input[type="range"][name="'+songName+'"]'), 
			_F = document.querySelector('form[name="'+songName+'"]'); 
            // _O = document.querySelectorAll('output[for=r]');
	let newval = +_Rval.value;
	
	// if(newval !== val) {
		let val = newval;
		_F.style.setProperty('--val', val);
		// _O.textContent = val;
	// }
};
document.documentElement.classList.add('js');
_R.forEach(function(obj){
    obj.addEventListener('input', update, false);
    obj.addEventListener('change', update, false);
});

function timeUpdate(obj){
    var songName = $(obj).attr("name");
    // if(obj.paused){
    //     console.log("Hii");
    //     var button = $("button[name='"+songName+"'].play")[0];
    //     $(button).trigger("click");
    // }
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
    const _Rval = document.querySelector('input[type="range"][name="'+songName+'"]'), 
			_F = document.querySelector('form[name="'+songName+'"]'); 
    let newval = +_Rval.value;
    let val = newval;
    _F.style.setProperty('--val', val);
    $(span).html(time);

}
  




