import {globals, sfx, ambient} from "../globals.js";

const blackSphere = document.querySelector("#black-sphere");

globals.entered = false;
export const enter = (element) => {
    if (!globals.entered) {
        console.log("ENTERING");
        
        // Scale and Fading Animation of Enter Button
        setTimeout(() => {
            element.style.scale = 400;
            element.style.opacity = 0;
        }, 500)
        
        setTimeout(() => {
            globals.entered = true;
            blackSphere.classList.remove("pre");
        }, 1500)


        // =====[SFX]=====
        setTimeout(() => {
            sfx.enterTension.play(); // 5 seconds clip
        }, 600)
    
        setTimeout(() => {
            ambient.echoesAmbient.play(); // looping until echoes break
            ambient.echoesAmbient.loop(true);
        }, 2700)
    }
    // remove enter button from the scene (performance optimization)
    setTimeout(() => {
        element.style.display = 'none';
    }, 7500)
}

window.enter = enter;