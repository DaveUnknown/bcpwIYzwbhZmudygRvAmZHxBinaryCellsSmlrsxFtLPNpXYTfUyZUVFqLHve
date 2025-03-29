let analyser;
let dataArray;

export function initiateAnalyser(fftSize = 256) {
    if (!Howler.ctx) {
        console.warn("Web Audio API is not supported in this browser.");
        return null;
    }

    const audioCtx = Howler.ctx;

    if (!analyser) {
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = fftSize;

        if (Howler.masterGain) {
            Howler.masterGain.disconnect();
            Howler.masterGain.connect(analyser);
            Howler.masterGain.connect(audioCtx.destination);
            console.log("| Analyser connected to Howler.masterGain (all sounds).");
        } else {
            console.warn("Howler.masterGain is undefined.");
        }
    }

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    console.log(dataArray);
    return dataArray;
}


// export function getBass(dataArrayPointer=null, bassThreshold=120, decay=1) {
//     if (!dataArrayPointer) console.log("dataArray is null");
//     if (!analyser) return;
//     analyser.getByteFrequencyData(dataArrayPointer);
//     // Extract bass from index 0 to 10 filter
//     let bassRaw = dataArrayPointer.slice(0, 10).filter((value) => value > bassThreshold);;
//     // Take sum of bass
//     let bass = bassRaw.reduce((a, b) => a + b, 0);
//     bass = Math.max(1, bass / decay);
//     return bass;
// }

export function getBass(dataArrayPointer = null, bassThreshold = 120, decay = 1) {
    if (!dataArrayPointer) {
        console.warn("dataArray is null");
        return 0;
    }
    if (!analyser) return 0;

    analyser.getByteFrequencyData(dataArrayPointer);

    // Correct bass range: Approx indices 3-12
    let bassRaw = dataArrayPointer.slice(3, 13).filter(value => value > bassThreshold);

    // Sum and normalize
    let bass = bassRaw.reduce((a, b) => a + b, 0);
    bass = Math.max(1, bass / decay);
    return bass;
}

export function getSpectrum(dataArrayPointer=null) {
    if (!dataArrayPointer) {
        console.warn("dataArray is null");
        return 0;
    }
    if (!analyser) return 0;

    analyser.getByteFrequencyData(dataArrayPointer);

    return dataArrayPointer;
}

export function detectBeats(dataArrayPointer) {
    let beats = [];
    analyser.getByteFrequencyData(dataArrayPointer);
    for (let i = 1; i < dataArrayPointer.length - 1; i++) {
        if (dataArrayPointer[i] > dataArrayPointer[i - 1] * 1.2) {
            beats.push(i);
        }
    }
    return beats;
}
