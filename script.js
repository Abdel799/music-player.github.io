const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const mainButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Music
const songs = [
    {
        name: 'angels',
        displayName: 'Angels',
        artist: 'Chase Atlantic',
    },

    {
        name: 'better',
        displayName: 'Better',
        artist: 'Khalid',
    },

    {
        name: 'less than zero',
        displayName: 'Less Than Zero',
        artist: 'The Weeknd',
    },

    {
        name: 'stargazing',
        displayName: 'Stargazing',
        artist: 'The Neighborhood',
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    mainButton.classList.replace('fa-play', 'fa-pause');
    mainButton.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    mainButton.classList.replace('fa-pause', 'fa-play');
    mainButton.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause listener
mainButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song){
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong(){

    if(songIndex === 0){
        songIndex = 3;
    }

    else{songIndex--;}

    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){

    if(songIndex===3){
        songIndex = 0;
    }

    else{songIndex++;}
    
    loadSong(songs[songIndex]);
    playSong();
}

// On load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(event){
    if (isPlaying){
        const {duration, currentTime} = event.srcElement;
        
        // Update progress bar width
        const progPercent = (currentTime / duration) * 100;
        
        progress.style.width = `${progPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        
        //Delay switching duration element to avoid nan
        if (durationSeconds){
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progContainer.addEventListener('click', setProgressBar);

