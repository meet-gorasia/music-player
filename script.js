// Navigation functions:

let iframe = document.querySelector('iframe');

function frameNavigate(url) {
    iframe.src = url;
}

function navTo(destination) {
    frameNavigate('./pages/' + destination + '/' + destination + '.html')
}

function setNavElementActive(nav_element) {
    document.querySelectorAll('.menu_item').forEach(menu_item => {
        menu_item.classList.remove('active')
    })

    nav_element.classList.add('active')
}

// set nav element as active and change title when click on a nav element
document.querySelectorAll('.menu_item').forEach(menu_item => {
    let title = document.querySelector('#section_title')

    menu_item.addEventListener('click', (e) => {
        setNavElementActive(e.target)
        title.textContent = e.target.textContent
    })
})

// Player functions:

var music = new Audio('./vande.mp3');

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

function playAudio(audio_src, audio_title, audio_subtitle, thumbnail_img) {
    music.src = audio_src;
    music.play();

    let title_element = document.getElementById('title');
    title_element.innerHTML = `${audio_title} <br> <div class="subtitle">${audio_subtitle}</div>`;

    let thumbnail = document.getElementById('poster_master_play');
    thumbnail.src = thumbnail_img;
}

// change icon on play/pause
music.addEventListener('pause', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})
music.addEventListener('play', () => {
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
})

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
    } else {
        music.pause();
    }
} )

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    song_id -= 1;
    if (song_id < 1) {
        song_id = Array.from(iframe.contentDocument.getElementsByClassName('songItem')).length;
    }

    iframe.contentWindow.setSongElementActiveByID(song_id)

    let song = songs[song_id - 1]
    let song_thumbnail = "./pages/my-library/" + song.getPoster()
    parent.playAudio(song.getSrc(), song.songName, song.subtitle, song_thumbnail)
})

next.addEventListener('click', ()=>{
    song_id += 1;
    if (song_id > Array.from(iframe.contentDocument.getElementsByClassName('songItem')).length) {
        song_id = 1;
    }

    iframe.contentWindow.setSongElementActiveByID(song_id)

    let song = songs[song_id - 1]
    let song_thumbnail = "./pages/my-library/" + song.getPoster()
    parent.playAudio(song.getSrc(), song.songName, song.subtitle, song_thumbnail)
})
