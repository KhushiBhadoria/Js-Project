const music=document.querySelector('audio');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');
const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const progress =document.getElementById('progress');
const progressContainer =document.getElementById('progress-container');
const currentTimeEl=document.getElementById('current-time');
const durationEl= document.getElementById('duration');
const songs=[
    
        {name:'kanha',
        displayName:'Radha Krishna song',
        artist:'He Himself!'},

    
    
        {name:'krishna',
        displayName:'Krishna song',
        artist:'He Himself!'},

    
    
        {name:'krishna2',
        displayName:'Radha song',
        artist:'He Himself!'},

        {name:'radha-krishna',
        displayName:'Radha song',
        artist:'He Himself!'}

    

];

let isPlaying= false;

function playSong(){
    isPlaying= true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));

function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`images/${song.name}.jpg`;

}

let songIndex=0;

function nextSong(){
    songIndex++;
    if(songIndex>songs.length -1){
        songIndex=0;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length -1;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e){
    if(isPlaying){
        //console.log(e);
        const{duration,currentTime}= e.srcElement;
        console.log(duration,currentTime);
        const progressPercent=(currentTime/duration)*100;
        console.log(progressPercent)
        progress.style.width=`${progressPercent}%`;

        const durationMinutes=Math.floor(duration/60);
        console.log('minutes',durationMinutes);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
            console.log('seconds',durationSeconds);
           

        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;


        }
        const currentMinutes=Math.floor(currentTime/60);
        console.log('minutes',currentMinutes);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
            
        }
        console.log('seconds',currentSeconds);
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;

    }
    function setProgressBar(e){
        console.log(e);
        const width=this.clientWidth;
        console.log('width',width);
        const clickX=e.offsetX;
        console.log('clickX',clickX);
        const{duration}=music;
        console.log(clickX/width);
        console.log((clickX/width)*duration);
        music.currentTime=(clickX/width)*duration;

    }


}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('clicks',setProgressBar);