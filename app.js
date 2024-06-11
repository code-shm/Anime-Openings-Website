console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.querySelector('.songInfo img');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let container = document.querySelector('.container');
let songColor = document.querySelectorAll('.songItemPlay');
let songList = document.getElementsByClassName('songItemContainer');
let songItemsCol = document.querySelectorAll('.songItem')
let headText = document.getElementById('headText')

for(item of songColor){
    item.style.color = '#00FF00';
}

let songs =[
    {songName: "Hikaru Nara -Your Lie in April", filePath: "assets/songs/1.mp3", coverPath: "assets/covers/1.jpeg"},
    {songName: "Hacking To the Gate -Stiens Gate", filePath: "assets/songs/2.mp3", coverPath: "assets/covers/2.jpeg"},
    {songName: "This Game -No Game No Life", filePath: "assets/songs/3.mp3", coverPath: "assets/covers/3.jpeg"},
    {songName: "Again -Full Metal Alchemist Brotherhood ", filePath: "assets/songs/4.mp3", coverPath: "assets/covers/4.jpeg"},
    {songName: "Unravel -Tokyo Ghoul", filePath: "assets/songs/5.mp3", coverPath: "assets/covers/5.jpeg"},
    {songName: "Funkist Snow Fairy -Fairy Tail", filePath: "assets/songs/6.mp3", coverPath: "assets/covers/6.jpeg"},
    {songName: "The World -Death Note", filePath: "assets/songs/7.mp3", coverPath: "assets/covers/7.jpeg"},
    {songName: "Silhoutte - Naruto", filePath: "assets/songs/8.mp3", coverPath: "assets/covers/8.jpeg"},
    {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    {songName: "Fly High -Haikyuu", filePath: "assets/songs/10.mp3", coverPath: "assets/covers/10.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"},
    // {songName: "Blue Bird -Naruto", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpeg"}
]

songItems.forEach((elements, i) => {
    elements.getElementsByTagName("img")[0].src = songs[i].coverPath;
    elements.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

function disScreen(){
    for(songItem of songItemsCol){
        songItem.style.opacity = 0;
    }
}

function showScreen(){
    for(songItem of songItemsCol){
        songItem.style.opacity = 1;
    }
}


function clickPausePlay(flag){
    container.addEventListener('click', function(){
        if(flag == 0){
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            flag = 1;
        } else if(flag == 1){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            flag = 0;
        }
    })
}

masterPlay.addEventListener('click',function(){
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        container.style.backgroundImage = `url('assets/back/${songIndex+1}.jpg')`;
        // container.classList.remove('container');
        // container.classList.add('playContainer')
        headText.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        disScreen();
        let flag = 0;
        clickPausePlay(flag);
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        container.style.backgroundImage = `url('assets/bg.jpg')`
        // container.classList.add('container');
        // container.classList.remove('playContainer')
        headText.innerText = "Best Anime Openings";
        gif.style.opacity = 0;
        showScreen();
        let flag = 1;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `assets/songs/${songIndex+1}.mp3`;
        container.style.backgroundImage = `url('assets/back/${songIndex+1}.jpg')`;
        // container.classList.remove('container');
        // container.classList.add('playContainer')
        headText.innerText = songs[songIndex].songName;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        disScreen();
    })
})

document.getElementById('next').addEventListener('click',()=>{
    let pSongIndex = songIndex;
    if(songIndex>=songs.length){
        songIndex = 0;
    } else{
        songIndex+=1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    container.style.backgroundImage = `url('assets/back/${songIndex+1}.jpg')`;
    // container.classList.remove('container');
    // container.classList.add('playContainer')
    headText.innerText = songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    disScreen();
})

document.getElementById('previous').addEventListener('click',()=>{
    let pSongIndex = songIndex;
    if(songIndex<=0){
        songIndex = songs.length-1;
    } else{
        songIndex-=1;
    }
    audioElement.src = `assets/songs/${songIndex+1}.mp3`;
    container.style.backgroundImage = `url('assets/back/${songIndex+1}.jpg')`;
    // container.classList.remove('container');
    // container.classList.add('playContainer')
    headText.innerText = songs[songIndex].songName;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    disScreen();
})