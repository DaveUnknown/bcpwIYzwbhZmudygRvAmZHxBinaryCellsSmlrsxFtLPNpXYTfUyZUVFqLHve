import Starfield from './Modules/starfield.js';
import {globals, sfx, ambient, music} from './globals.js'
import mouseMove from './EventListeners/mouseEvent.js';
import { typeWrite } from './Modules/typeWrite.js';

const page = document.querySelector(".starfield");
const topTitle = document.querySelector(".centeredTitle");
const displayText = document.querySelector(".hero-container");
const blackSphere = document.querySelector("#black-sphere");
const blueSphere = document.querySelector("#blue-sphere");

const visualizer = document.querySelector(".visualizer");
const trackname = document.querySelector(".track-name");

// Type Write
const progress = document.querySelector(".progress");
const progressDate = document.querySelector(".progress-date");

Starfield.setup({
    container: document.querySelector('.starfield'),
    numStars: 250,                    // Number of stars
    baseSpeed: 1,                     // Base speed of stars (will affect acceleration)
    trailLength: 0.01,                 // Length of star trail (0-1)
    starColor: 'rgb(255,255,255)',  // Color of stars (only rgb)
    canvasColor: 'rgb(24, 25, 32)',      // Canvas background color (only rgb)
    hueJitter: 0,                     // Maximum hue variation in degrees (0-360)
    maxAcceleration: 0.5,              // Maximum acceleration
    accelerationRate: 0.2,            // Rate of acceleration
    decelerationRate: 0.2,            // Rate of deceleration
    minSpawnRadius: 80,               // Minimum spawn distance from origin
    maxSpawnRadius: 500,              // Maximum spawn distance from origin
    auto: false,

});

// let documentWidth;
// let documentHeight;
let centerX;
let centerY;
function updateScreen() {
    // documentWidth = document.documentElement.clientWidth;
    // documentHeight = document.documentElement.clientHeight;

    // Get center of the screen
    if (!globals.echoesOpened) {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    }

    // console.log("Resolution Updated!");
    // console.log("docW: ", documentWidth);
    // console.log("docH: ", documentHeight);
}

(async function updateLoop() {
    while (true) {
        updateScreen();
        await new Promise(resolve => setTimeout(resolve, 500));
    }
})();

mouseMove(({ x, y }) => {
    // console.log('x: ', x, 'y: ', y);
    // console.log('documentWidth: ', documentWidth, 'documentHeight: ', documentHeight);

    if (globals.entered && !globals.echoesOpened) {
        moveEchoes(x, y);
    }
});



let giveTimeToPlay = false 
function moveEchoes(clientX, clientY) {
    // console.log(clientX, clientY)

    // offsets based on distance from center
    const offsetX = (clientX - centerX) * 0.08;
    const offsetY = (clientY - centerY) * 0.08;
    
    // Move black orb (more movement)
    blueSphere.style.transform = `translate(${offsetX * -5}px, ${offsetY * -5}px)`;
    
    // Move blue orb (less movement for parallax effect)
    blackSphere.style.transform = `translate(${offsetX * 5}px, ${offsetY * 5}px)`;

    // Distance between the two spheres (with amplification)
    const dx = Math.abs(offsetX * 0.2);
    const dy = Math.abs(offsetY * 0.2);
    const distance = Math.sqrt(dx * dx + dy * dy); // pythagorean theorem :)

    // Adjust brightness based on distance
    const brightness = Math.max(1 - (distance / 3), 0);

    // Brightness adjustment
    const r = Math.min(Math.round(88 + brightness * 30 * 5.5), 240);
    const g = Math.min(Math.round(167 + brightness * 30 * 3), 240);
    const b = 255;  // Keeping blue at 255 for consistency
    // console.log("brightness: ", brightness," r: ", r, " g: ", g, " b: ", b)

    // Apply radial gradient with adjusted brightness
    blueSphere.style.background = `radial-gradient(circle, 
    rgba(${r},${g},${b},1) 45%, 
    rgba(${r},${g},${b},0.7) 90%, 
    rgba(${r},${g},${b},0) 100%)`;
    
    // `radial-gradient(circle, rgba(${r},${g},${b},1) 0%, 
    //                                              rgba(${r},${g},${b},1) 50%, 
    //                                              rgba(${r},${g},${b},0.7) 70%, 
    //                                              rgba(${r},${g},${b},0.8) 80%, 
    //                                              rgba(${r},${g},${b},0.1) 100%)`;
                                   
    setTimeout(() => {
        giveTimeToPlay = true // Time given to play at the start
    }, 4000)                                         
    // If perfectly aligned, vanish
    if ((distance < 0.1) && !globals.echoesOpened && giveTimeToPlay) {
        globals.echoesOpened = true
        setTimeout(() => {
            blueSphere.style.display = "none";
            blackSphere.style.display = "none";
        }, 200)
        ambient.echoesAmbient.stop();
        sfx.echoesOpen.play();
        initiation();
    }
};

function initiation() {
    setTimeout(() => {
        ambient.landingAmbient.play();
        page.style.opacity = 1;
        musicQueue();
    }, 2000)
    setTimeout(() => {
        playQueue();
        topTitle.style.opacity = 1;
    }, 4000)
    setTimeout(() => {
        displayText.style.opacity = 1;
    }, 6000)
    setTimeout(() => {
        sfx.typewritterTyping.play();
        typeWrite(progress, "This page is a work in progress.", 200, () => 
            {   
                typeWrite(progressDate, "ESTIMATED COMPLETION: 01/09/2025", 200);
                sfx.typewritterTyping.play();
            }, 300);
    }, 8000);

}

// 0: musicList | 1: ambientList
let type = 0;
let index;
const musicList = {
    0 : [music.nightSpringsRemix, "Night Springs Remix"],
    1 : [music.yotonYoNonVocal, "Yötön Yö (Non Vocal)"],
    2 : [music.yotonYoVocal, "Yötön Yö (Vocal)"],
    3 : [music.sadMelodicalVibe, "Old Times"],
    4 : [music.chillingUniverse, "Little Rocket In Space"]
}
const ambientList = {
    0 : [ambient.ritualExposed, "Ritual Exposed"],
    1 : [ambient.sadDramaticHopeless, "Lost In Dream"],
    2 : [ambient.tensionSpatialDramatic, "The Man of Everything"],
    3 : [ambient.fobeatsySpooky, "Uder the Page"]
}

async function musicQueue() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (globals.musicQueue.length < 8) {
            // Wait before adding new music
            let random = Math.random();
            
            if (type === 0) {
                index = Math.floor(random * Object.keys(musicList).length);
                if (!globals.musicQueue.includes(musicList[index])) {
                    globals.musicQueue.push(musicList[index]);
                    // console.log(`musicList[${index}]`);
                    type = 1;
                } else {
                    // console.log("musicQueue | music is already in queue, trying again...");
                    continue
                }
            } else {
                index = Math.floor(random * Object.keys(ambientList).length);
                if (!globals.musicQueue.includes(ambientList[index])) {
                    globals.musicQueue.push(ambientList[index]);
                    // console.log(`ambientList[${index}]`);
                    type = 0;
                } else {
                    // console.log("musicQueue | ambient is already in queue, trying again...");
                    continue
                }
            }
        }
    }
}

let elapsed;
let isPlaying = false;
let lastTrackTime = 0;
const delay = 30; // in seconds
const fallbackTrack = ambient.lowRadioNoise;
async function playQueue() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Check every 2s

        if (isPlaying) {
            // console.log("Track is already playing...");
            continue;
        }
        // First Run Only
        else if (lastTrackTime === 0) {
            // console.log("Playing fallback track for the first run...");
            fallbackTrack.play();
            lastTrackTime = Date.now();

        // Subsequent Runs
        } else {
            elapsed = (Date.now() - lastTrackTime) / 1000;
            // console.log("Elapsed time since last track:", elapsed, "seconds");
            
            if (elapsed > delay && globals.musicQueue.length !== 0) {
                // console.log("Stopping fallback track and playing next track from queue.");
                fallbackTrack.stop();
                let currentTrack = globals.musicQueue.shift();
                let track = currentTrack[0];
                let trackName = currentTrack[1];
                console.log("Now playing:", trackName);
                track.play();
                visualizer.style.bottom = "0%";
                trackname.innerHTML = trackName;
                isPlaying = true;
                lastTrackTime = Date.now();
                await new Promise(resolve => track.once("end", resolve));
                visualizer.style.bottom = "-5%";
                setTimeout(() => {
                    trackname.innerHTML = " ";
                }, 4000)
                isPlaying = false;
                lastTrackTime = 0;
                // console.log("Track ended, setting isPlaying to false and elapsed time to 0.");
            } else {
                if (!fallbackTrack.playing()) {
                    // console.log("Fallback track is not playing, starting it again.");
                    fallbackTrack.play();
                }
            }
        }
    }
}
