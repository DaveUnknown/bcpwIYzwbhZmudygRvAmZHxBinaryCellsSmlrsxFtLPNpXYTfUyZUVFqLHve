import { initiateAnalyser, getSpectrum} from '../Modules/audioAnalyser.js';
import { globals } from '../globals.js';

const bar1 = document.querySelector(".bars-container .bar:nth-child(1)");
const bar2 = document.querySelector(".bars-container .bar:nth-child(2)");
const bar3 = document.querySelector(".bars-container .bar:nth-child(3)");
const bar4 = document.querySelector(".bars-container .bar:nth-child(4)");

// const trackName = document.querySelector(".track-name");
// const containerWidth = trackName.parentElement.clientWidth;
// const textWidth = trackName.scrollWidth;


// if (textWidth > containerWidth) {
//     let offset = (textWidth - containerWidth) + 10; // Calculate overflow in pixels

//     trackName.style.animation = "none"

//     trackName.style.setProperty("--offset", `-${offset}px`);
//     trackName.style.setProperty("--duration", `${offset / 10}s`);

//     // freeze animation on hover
//     trackName.addEventListener("mouseenter", () => {
//       trackName.style.animationPlayState = "paused";
//     });

//     // start animation when leaving hover
//     trackName.addEventListener("mouseleave", () => {
//       trackName.style.animation = `scrollLeft var(--duration) linear 1 alternate`;
//     });

//     // reset animation to "none" after it ends
//     trackName.addEventListener("animationend", () => {
//       trackName.style.animation = "none";
//     });
// }

// [ Dynamic Visualizer Canceled ]
let dataArray = initiateAnalyser(256);
const minBarHeight = 10;
(async function updateVisualizer() {
    while (globals.allowBeat) {  
        let spectra = getSpectrum(dataArray);

        let sum = spectra.reduce((partialSum, a) => partialSum + a, 0);
        
        if (sum > 400) {
            bar1.style.height = `${Math.max(Math.min(Math.random() * 50), minBarHeight) ?? minBarHeight}%`;
            bar2.style.height = `${Math.max(Math.min(Math.random() * 50), minBarHeight) ?? minBarHeight}%`;
            bar3.style.height = `${Math.max(Math.min(Math.random() * 50), minBarHeight) ?? minBarHeight}%`;
            bar4.style.height = `${Math.max(Math.min(Math.random() * 50), minBarHeight) ?? minBarHeight}%`;
        }
        else {
            bar1.style.height = `${minBarHeight}%`;
            bar2.style.height = `${minBarHeight}%`;
            bar3.style.height = `${minBarHeight}%`;
            bar4.style.height = `${minBarHeight}%`;
        }

      await new Promise(resolve => setTimeout(resolve, 100));
    }
})();
